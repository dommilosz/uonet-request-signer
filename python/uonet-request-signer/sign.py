# -*- coding: utf-8 -*-

from OpenSSL import crypto
import base64
import json


def sign(password, certificate, data):
    encoding = "utf-8"
    data_string = (
        json.dumps(data).encode(encoding)
        if isinstance(data, dict) or isinstance(data, list)
        else str(data).encode(encoding)
    )
    p12 = crypto.load_pkcs12(base64.b64decode(certificate), password.encode(encoding))
    signed = crypto.sign(p12.get_privatekey(), data_string, "RSA-SHA1")
    return base64.b64encode(signed).decode(encoding)
