use actix_files::Files;
use actix_web::{get, HttpRequest, Responder};

/// Greet saying Hello {name}! Useful for basic debugging
#[get("/hello/{name}")]
pub async fn hello(req: HttpRequest) -> impl Responder {
    let name = req.match_info().get("name").unwrap();
    format!("Hello {}!", &name)
}

/// Serve client documentation.
///
/// The documentation is generated with a static documentation generator. Its static
/// assets are placed at './client/docs/' directory and served under '/client/docs/' URL.
pub fn client_docs() -> Files {
    Files::new("/client/docs/", "./client/docs").index_file("index.html")
}

/// Serve index.
///
/// This must be the latest mount path in the application because, setted at root ('/'),
/// services registered after this one will be inaccessible.
///
/// See https://docs.rs/actix-files/0.5.0/actix_files/struct.Files.html#impl
pub fn index() -> Files {
    Files::new("/", "./client/build/").index_file("index.html")
}

#[cfg(test)]
mod tests {
    use crate::handlers::{hello, index};
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
