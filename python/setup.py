# -*- coding: utf-8 -*-

from setuptools import setup

setup(
    name="uonet-request-signer",
    version="1.0.0",
    description="Uonet+ request signer for Python",
    url="https://github.com/wulkanowy/uonet-request-signer",
    author="Wulkanowy",
    author_email="wulkanowyinc@gmail.com",
    maintainer="Kacper Ziubryniewicz",
    maintainer_email="kapi2289@gmail.com",
    license="MIT",
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Natural Language :: English",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
        "Topic :: Security :: Cryptography",
        "Topic :: Education",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
    packages=["uonet_request_signer"],
    package_dir={"uonet_request_signer": "uonet-request-signer"},
    install_requires=["pyopenssl"],
    extras_require={"testing": ["pytest"]},
)
