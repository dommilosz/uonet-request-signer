# -*- coding: utf-8 -*-

from setuptools import setup

setup(
    name="uonet-request-signer",
    version="1.0.0",
    description="Uonet+ request signer for Python",
    author="Wulkanowy",
    author_email="wulkanowyinc@gmail.com",
    maintainer="Kacper Ziubryniewicz",
    maintainer_email="kapi2289@gmail.com",
    packages=["uonet_request_signer"],
    package_dir={"uonet_request_signer": "uonet-request-signer"},
    install_requires=["pyopenssl"],
)
