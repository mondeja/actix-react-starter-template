use actix_web::{web, App, HttpRequest, HttpServer, Responder};

// Default configuration values
static DEFAULT_HOST: &str = "127.0.0.1";
const DEFAULT_PORT: u16 = 8888;

async fn greet(req: HttpRequest) -> impl Responder {
    let name = req.match_info().get("name").unwrap_or("World");
    format!("Hello {}!", &name)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
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
    println!("Serving on http://{}:{}", host, port);
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(greet))
            .route("/{name}", web::get().to(greet))
    })
    .bind((host, port))?
    .run()
    .await
}
