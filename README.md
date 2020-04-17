[![Actions Status](https://github.com/perl-actions/install-with-cplay/workflows/check/badge.svg)](https://github.com/perl-actions/install-with-cplay/actions)

# install-with-cplay

## Basic Usage using system Perl

GitHub action to install a perl distribution using App::cplay

```yaml
jobs:
  cplay:
    runs-on: ubuntu-latest
    name: "cplay"
    steps:
      - name: Install multiple modules
        uses: perl-actions/install-with-cplay@v1.0
        with:
          install: |
            First::Module
            Second::Module
```

## Using Perl Tester

```
jobs:
  perl:
    runs-on: ubuntu-latest

    strategy:
      fail-fast: false
      matrix:
        perl-version:
          - "5.30"
          - "5.28"

    container:
      image: perldocker/perl-tester:${{ matrix.perl-version }}

    steps:
      # no need to checkout
      #- uses: actions/checkout@v2

      - name: perl -V
        run: perl -V

      - name: "install-with-cplay"
        uses: perl-actions/install-with-cplay@v1.0
        with:
          install: |
            First::Module
            Second::Module
```

## Inputs

### `install`

List of one or more modules, separated by a newline `\n` character.

### `cpanfile`

Install modules from a cpanfile.

### `tarball`

Install a distribution from a tarball URL or Path.

### `tests`

Boolean variable used to disable unit tests during installation
Possible values: true | false [default: true]

### `args`

Extra arguments to pass to the cplay command line.

## Outputs

none

## Example usage

### Install one module or distribution

```yaml
- name: Install one module
  uses: perl-actions/install-with-cplay@v1.0
  with:
    install: Module::One
```

You can use either a module name or a distribution name

```yaml
- name: Install one distribution
  uses: perl-actions/install-with-cplay@v1.0
  with:
    install: Distribution-Name
```

### Install multiple modules

To install more than a single module, use a string seperated by `\n` character.

```yaml
- name: Install multiple modules
  uses: perl-actions/install-with-cplay@v1.0
  with:
    install: |
    	Module::One
      Another::Module
```

### Install using a cpanfile

You can use a `cpanfile` to install multiple modules.

```yaml
- name: Install using a cpanfile
  uses: perl-actions/install-with-cplay@v1.0
  with:
    cpanfile: "your-cpanfile"
```

you can also requests some specific rules using the extra `args` argument.

```yaml
- name: Install using a cpanfile
  uses: perl-actions/install-with-cplay@v1.0
  with:
    cpanfile: "your-cpanfile"
    args: "--with-recommends --with-requires"
```

### Install from a tarball

```yaml
install_from_tarball:
  runs-on: ubuntu-latest
  name: "Install from tarball"
  steps:
    - name: install-with-cplay --from-tarball
      uses: perl-actions/install-with-cplay@v1.0
      with:
        tarball: "https://github.com/${{ github.repository }}/archive/p5.tar.gz"
```

### Disabling Unit tests during installation

```yaml
- name: Install multiple modules
  uses: perl-actions/install-with-cplay@v1.0
  with:
    install: My::Module
    tests: false
```
