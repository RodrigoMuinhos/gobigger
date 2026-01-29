using Microsoft.AspNetCore.Diagnostics;
using SitefBridge.Infrastructure;
using SitefBridge.Models;
using SitefBridge.Services;

var builder = WebApplication.CreateBuilder(args);

// Logging: console + bridge.log (para Start-Process e troubleshooting)
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddProvider(new FileLoggerProvider(Path.Combine(AppContext.BaseDirectory, "bridge.log")));

builder.Services.AddSingleton<ConfigService>();
builder.Services.AddSingleton<NativeProbeService>();
builder.Services.AddSingleton<TransactionStore>();
builder.Services.AddSingleton<SitefTransactionRunner>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
	c.SwaggerDoc("v1", new global::Microsoft.OpenApi.OpenApiInfo
	{
		Title = "siTEF Bridge",
		Version = "v1",
		Description = "Local HTTP bridge for siTEF (CliSiTef32I.dll) - LunaKiosk compatible",
	});
});

var app = builder.Build();

// Never leak stack traces to clients
app.UseExceptionHandler(errApp =>
{
	errApp.Run(async context =>
	{
		var feature = context.Features.Get<IExceptionHandlerFeature>();
		var logger = context.RequestServices.GetRequiredService<ILoggerFactory>().CreateLogger("Unhandled");
		if (feature?.Error is not null)
		{
			logger.LogError(feature.Error, "Unhandled exception");
		}

		context.Response.StatusCode = StatusCodes.Status500InternalServerError;
		context.Response.ContentType = "application/json";
		await context.Response.WriteAsJsonAsync(new ApiError("INTERNAL_ERROR", "Erro interno"));
	});
});

// Swagger enabled even in Production (exe local)
app.UseSwagger();
app.UseSwaggerUI(c =>
{
	c.SwaggerEndpoint("/swagger/v1/swagger.json", "siTEF Bridge v1");
	c.RoutePrefix = "swagger";
});

var api = app.MapGroup("/api");

// Health
api.MapGet("/health", (ConfigService cfg, NativeProbeService probeSvc) =>
{
	var probe = probeSvc.Probe();

	var ok = cfg.Mode != SitefMode.Native || (probe.DllFound && probe.IniExists);
	var response = new HealthResponse(
		Ok: ok,
		Mode: cfg.Mode.ToString().ToUpperInvariant(),
		NativeDir: cfg.NativeDir,
		PinpadCom: cfg.PinpadCom,
		Ini: new IniInfo(Exists: probe.IniExists, HasPinpadSection: probe.IniHasPinpadSection),
		NativeVersion: new NativeVersionInfo(Status: probe.NativeVersionStatus, CheckedAt: probe.CheckedAt),
		Message: ok ? "ok" : probe.Message
	);

	return Results.Ok(response);
})
.WithName("Health")
.WithTags("Health")
.Produces<HealthResponse>(StatusCodes.Status200OK);

// Config
api.MapGet("/config", (ConfigService cfg, NativeProbeService probeSvc) =>
{
	var probe = probeSvc.Probe();
	var response = cfg.GetConfigResponse(probe);
	return Results.Ok(response);
})
.WithName("Config")
.WithTags("Config")
.Produces<ConfigResponse>(StatusCodes.Status200OK);

// TEF
var tef = api.MapGroup("/tef").WithTags("TEF");

tef.MapPost("/transactions", (CreateTransactionRequest req, SitefTransactionRunner runner) =>
{
	var (ok, err, tx) = runner.Start(req);
	if (!ok)
	{
		return err!.Error == "NATIVE_NOT_READY"
			? Results.Json(err, statusCode: StatusCodes.Status503ServiceUnavailable)
			: Results.BadRequest(err);
	}

	return Results.Ok(ToResponse(tx!));
})
.WithName("CreateTransaction")
.Produces<TransactionResponse>(StatusCodes.Status200OK)
.Produces<ApiError>(StatusCodes.Status400BadRequest)
.Produces<ApiError>(StatusCodes.Status503ServiceUnavailable);

tef.MapGet("/transactions/{transactionId:guid}", (Guid transactionId, TransactionStore store) =>
{
	if (!store.TryGet(transactionId, out var tx))
		return Results.NotFound(new ApiError("NOT_FOUND", "Transação não encontrada"));

	return Results.Ok(new
	{
		transactionId = tx.Id,
		status = tx.Status.ToString().ToUpperInvariant(),
		message = tx.Message,
		requiresUserAction = tx.RequiresUserAction,
		amountCents = tx.AmountCents,
		type = tx.Type.ToString().ToUpperInvariant(),
		invoiceId = tx.InvoiceId,
		@operator = tx.Operator,
		terminal = tx.Terminal,
		createdAt = tx.CreatedAt,
		updatedAt = tx.UpdatedAt,
	});
})
.WithName("GetTransaction")
.Produces(StatusCodes.Status200OK)
.Produces<ApiError>(StatusCodes.Status404NotFound);

tef.MapPost("/transactions/{transactionId:guid}/continue", (Guid transactionId, SitefTransactionRunner runner) =>
{
	var (ok, err, tx) = runner.Continue(transactionId);
	if (!ok)
	{
		return err!.Error switch
		{
			"NATIVE_NOT_READY" => Results.Json(err, statusCode: StatusCodes.Status503ServiceUnavailable),
			"NOT_FOUND" => Results.NotFound(err),
			_ => Results.BadRequest(err),
		};
	}

	return Results.Ok(ToResponse(tx!));
})
.WithName("ContinueTransaction")
.Produces<TransactionResponse>(StatusCodes.Status200OK)
.Produces<ApiError>(StatusCodes.Status400BadRequest)
.Produces<ApiError>(StatusCodes.Status404NotFound)
.Produces<ApiError>(StatusCodes.Status503ServiceUnavailable);

tef.MapPost("/transactions/{transactionId:guid}/cancel", (Guid transactionId, SitefTransactionRunner runner) =>
{
	var (ok, err, tx) = runner.Cancel(transactionId);
	if (!ok)
	{
		return err!.Error switch
		{
			"NOT_FOUND" => Results.NotFound(err),
			"CONFLICT" => Results.Conflict(err),
			_ => Results.BadRequest(err),
		};
	}

	return Results.Ok(ToResponse(tx!));
})
.WithName("CancelTransaction")
.Produces<TransactionResponse>(StatusCodes.Status200OK)
.Produces<ApiError>(StatusCodes.Status400BadRequest)
.Produces<ApiError>(StatusCodes.Status404NotFound)
.Produces<ApiError>(StatusCodes.Status409Conflict);

tef.MapGet("/transactions/{transactionId:guid}/receipt", (Guid transactionId, SitefTransactionRunner runner) =>
{
	var (ok, err, receipt) = runner.GetReceipt(transactionId);
	if (!ok)
		return Results.NotFound(err);

	return Results.Ok(receipt);
})
.WithName("GetReceipt")
.Produces<ReceiptResponse>(StatusCodes.Status200OK)
.Produces<ApiError>(StatusCodes.Status404NotFound);

app.Run();

static TransactionResponse ToResponse(TransactionDetails tx)
{
	return new TransactionResponse(
		TransactionId: tx.Id.ToString(),
		Status: tx.Status.ToString().ToUpperInvariant(),
		Message: tx.Message,
		RequiresUserAction: tx.RequiresUserAction
	);
}
