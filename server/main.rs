use actix_files::{Files, NamedFile};
use actix_web::dev::{ServiceRequest, ServiceResponse};
use actix_web::{get, App, HttpRequest, HttpServer, Responder};

// Default configuration values
static DEFAULT_HOST: &str = "127.0.0.1";
const DEFAULT_PORT: u16 = 8888;

/// Greet saying Hello {name}! Useful for basic debugging
#[get("/hello/{name}")]
async fn hello(req: HttpRequest) -> impl Responder {
    let name = req.match_info().get("name").unwrap();
    format!("Hello {}!", &name)
}

/// Serve static files.
/// See https://docs.rs/actix-files/0.5.0/actix_files/struct.Files.html#impl
fn static_files() -> Files {
    Files::new("/", "./client/build")
        .index_file("index.html")
        .default_handler(|req: ServiceRequest| {
            let (http_req, _payload) = req.into_parts();

            async {
                let response =
                    NamedFile::open("./client/build/index.html")?.into_response(&http_req)?;
                Ok(ServiceResponse::new(http_req, response))
            }
        })
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
    println!("[INFO] Serving on http://{}:{}", host, port);
    HttpServer::new(|| App::new().service(hello).service(static_files()))
        .bind((host, port))?
        .run()
        .await
}
