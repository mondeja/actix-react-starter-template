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

> See available options in the _./run_ script header.

## Test application

```sh
./test
```

> See available options in the _./test_ script header.

[posix]: https://en.wikipedia.org/wiki/POSIX
[python]: https://www.python.org
[node]: https://nodejs.org
[pre-commit]: https://pre-commit.com
[rustup-install]: https://doc.rust-lang.org/book/ch01-01-installation.html
