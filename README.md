[![Actions Status](https://github.com/perl-actions/install-cplay/workflows/check/badge.svg)](https://github.com/perl-actions/install-cplay/actions)

# install-cplay

GitHub action to install App::cplay

This action installs 'cplay' as root so you can then use it in your workflow.

## Inputs

none

## Outputs

none

## Example usage

```
uses: perl-actions/install-cplay@v1.0
run: |
   sudo cplay Module::To::Install
```