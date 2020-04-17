[![Actions Status](https://github.com/perl-actions/install-with-cplay/workflows/check/badge.svg)](https://github.com/perl-actions/install-with-cplay/actions)

# install-with-cplay

GitHub action to install a perl distribution using App::cplay

```
jobs:
  cplay:
    runs-on: ubuntu-latest
    name: "cplay"
    steps:
      - name: "install-with-cplay"
        uses: perl-actions/install-with-cplay@cplay-ci
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
- name: Install multiple modules
  uses: perl-actions/install-with-cplay@v1.0
  with:
    install: Module::One
```

You can use either a module name or a distribution name

```yaml
- name: Install multiple modules
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
