use actix_files::{Files, NamedFile};
use actix_web::dev::{ServiceRequest, ServiceResponse};
use actix_web::{get, middleware, App, HttpRequest, HttpServer, Responder};

// Default configuration values
static DEFAULT_HOST: &str = "127.0.0.1";
const DEFAULT_PORT: u16 = 8888;
static DEFAULT_RUST_LOG: &str = "actix_web=info";

/// Greet saying Hello {name}! Useful for basic debugging
#[get("/hello/{name}")]
async fn hello(req: HttpRequest) -> impl Responder {
    let name = req.match_info().get("name").unwrap();
    format!("Hello {}!", &name)
}

/// Serve client documentation.
///
/// The documentation is generated with a static documentation generator. Its static
/// assets are placed at './client/docs/' directory and served under '/client/docs/' URL.
fn client_docs() -> Files {
    Files::new("/client/docs/", "./client/docs")
        .index_file("index.html")
        .default_handler(|req: ServiceRequest| {
            let (http_req, _payload) = req.into_parts();

            async {
                let response =
                    NamedFile::open("./client/docs/index.html")?.into_response(&http_req)?;
                Ok(ServiceResponse::new(http_req, response))
            }
        })
}

/// Serve index.
///
/// This must be the latest mount path in the application because, setted at root ('/'),
/// services registered after this one will be inaccessible.
///
/// See https://docs.rs/actix-files/0.5.0/actix_files/struct.Files.html#impl
fn index() -> Files {
    Files::new("/", "./client/build/")
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
            .service(hello)
            .service(client_docs())
            .service(index())
    })
    .bind((host, port))?
    .run()
    .await
}

#[cfg(test)]
mod tests {
    use super::*;

    use actix_web::dev::Service;
    use actix_web::web::Bytes;
    use actix_web::{http, test, App, Error};

    #[actix_rt::test]
    async fn test_hello() -> Result<(), Error> {
        let app = App::new().service(hello);
        let mut app = test::init_service(app).await;

        // assert response status
        let req = test::TestRequest::get().uri("/hello/world").to_request();
        let resp = app.call(req).await.unwrap();
        assert_eq!(resp.status(), http::StatusCode::OK);

        // assert response contents
        let req = test::TestRequest::get().uri("/hello/world").to_request();
        let result = test::read_response(&mut app, req).await;
        assert_eq!(result, Bytes::from_static(b"Hello world!"));

        let req = test::TestRequest::get().uri("/hello/mondeja").to_request();
        let result = test::read_response(&mut app, req).await;
        assert_eq!(result, Bytes::from_static(b"Hello mondeja!"));

        Ok(())

        // -----------------------------------------
        // Other way to test this:
        //let mut resp = app.call(req).await.unwrap();
        //assert_eq!(resp.status(), http::StatusCode::OK);

        // assert body content
        //let body = resp.take_body();
        //let body = body.as_ref().unwrap();
        //assert_eq!(
        //    &Body::from(b"Hello world!".as_ref()), // or serde.....
        //    body
        //);
        // -----------------------------------------
    }

    #[actix_rt::test]
    async fn test_index() -> Result<(), Error> {
        let app = App::new().service(index());
        let mut app = test::init_service(app).await;

        // assert response status
        let req = test::TestRequest::get().uri("/index.html").to_request();
        let resp = app.call(req).await.unwrap();
        assert_eq!(resp.status(), http::StatusCode::OK);

        Ok(())
    }
}
