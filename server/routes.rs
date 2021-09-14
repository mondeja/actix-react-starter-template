use crate::handlers;
use actix_web::web;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(handlers::hello);
    cfg.service(handlers::client_docs());
    cfg.service(handlers::index());
}
