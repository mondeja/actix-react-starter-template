# Contribution guide

You need a [POSIX] shell under Linux/MacOS with [Python] and [Node] installed.

## Setup development environment

1. Install [Python].
1. Install [Node]
1. Install [Rust using rustup][rustup-install].
1. Install [pre-commit] with `pip install pre-commit` and prepare its hooks
   with `pre-commit install`.

## Run application

Run the application and go to <http://localhost:8080>.

```sh
$ ./run
```

This step will build the web server and UI client.

As this script is composed by independent functions, you can use it to build
parts of the application standalone. For example, if you want to build the
client just use:

```sh
$ SOURCING=1 . run && build_client
```

See all available options in the _./run_ script header.

## Test application

```sh
$ ./test
```

See all available options in the _./test_ script header.

---

## GIT workflow

If you want to create a website you can fork this repository and configure it
to update some files changed on `actix-react-starter-template` repository
following next commands:

### Fork repository and configure `template` remote

1. Fork this repository to your user using Github UI. Change its name your
   repository settings.
1. Clone it to your local environment:
   ```sh
   $ git clone https://github.com/<username>/<project>.git
   ```
1. Configure `template` remote, from which changes to
   `actix-react-starter-template` will be fetched:
   ```sh
   $ cd <project>
   $ git remote get-url --all origin
   https://github.com/<username>/<project-name>.git
   $ LC_ALL=C git remote get-url --all template
   fatal: No such remote 'template'
   $ git remote add template https://github.com/mondeja/actix-react-starter-template.git
   $ git remote get-url --all template
   https://github.com/mondeja/actix-react-starter-template.git
   ```

### Update specific files from `template` remote

1. Fetch the `template` remote:
   ```sh
   $ git fetch template
   ```
1. Update certain files in your local branch (example for _./run_):
   ```sh
   $ git checkout template/master -- run
   ```

**WARNING!** Keep in mind that the content of the files will be ovewritten,
so try to write custom build process in separate files.

[posix]: https://en.wikipedia.org/wiki/POSIX
[python]: https://www.python.org
[node]: https://nodejs.org
[pre-commit]: https://pre-commit.com
[rustup-install]: https://doc.rust-lang.org/book/ch01-01-installation.html
