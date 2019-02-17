# Uonet+ request signer for Python

![pypi](https://img.shields.io/pypi/v/uonet-request-signer.svg?style=flat-square)

## Installation

```console
$ pip install -U uonet-request-signer
```

## Usage

```python
from uonet_request_signer import sign_content

signed = sign_content(password, certificate, content)
```

## Tests

```console
$ python -m pytest .
```
