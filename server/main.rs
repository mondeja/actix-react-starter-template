mod handlers;
mod routes;

use actix_web::{middleware, web, App, HttpResponse, HttpServer};

// Default configuration values
static DEFAULT_HOST: &str = "127.0.0.1";
const DEFAULT_PORT: u16 = 8888;
static DEFAULT_RUST_LOG: &str = "actix_web=info";

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // configure logger
    let rust_log = match std::env::var("RUST_LOG") {
        Ok(val) => val,
        Err(_e) => DEFAULT_RUST_LOG.to_string(),
    };
    std::env::set_var("RUST_LOG", rust_log);
    env_logger::init();

    // configure port from environment variable
    let port: u16 = match std::env::var("PORT") {
        Ok(val) => val.parse::<u16>().unwrap_or(DEFAULT_PORT),
        Err(_e) => DEFAULT_PORT,
    };

    // configure host from environment variable
    let host = match std::env::var("HOST") {
        Ok(val) => val,
        Err(_e) => DEFAULT_HOST.to_string(),
    };

    // start HTTP server
    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Logger::default())
            .default_service(web::route().to(HttpResponse::NotFound))
            .configure(routes::init)
    })
    .bind((host, port))?
    .run()
    .await
    .ok();

    Ok(())
}
