# Contribution guide

You need a [POSIX] shell under Linux/MacOS with [Python] and [Node] installed.

## Setup development environment

1. Install [Python].
1. Install [Node]
1. Install [Rust using rustup][rustup-install].
1. Install [pre-commit] with `pip install pre-commit` and prepare its hooks
 with `pre-commit install`.

## Run application

Run the application and go to <http://localhost:8080>. This step will build
the web server and UI client.
   
```sh
./run
```

[POSIX]: https://en.wikipedia.org/wiki/POSIX
[Python]: https://www.python.org
[Node]: https://nodejs.org
[pre-commit]: https://pre-commit.com
[rustup-install]: https://doc.rust-lang.org/book/ch01-01-installation.html
