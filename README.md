# cipher

**cipherstream** is a thin streaming layer for encryption/decryption.

## Installation

    npm install cipherstream

## Usage

Require as `cipherstream`

    var cipherstream = require("cipherstream");

## CipherStream

**CipherStream** creates a Stream object which takes data in and encrypts it.

`new CipherStream(password[, algorithm])` where `algorithm` defaults to AES192.

Example:

    var cipherstream = require("cipherstream"),
        fs = require("fs");
    
    fs.createReadStream("plain.txt").pipe(new cipherstream.CipherStream("secret")).pipe(fs.writeReadStream("secret.txt"));


## DecipherStream

**DecipherStream** creates a Stream object which takes encrypted data in and decrypts it.

`new DecipherStream(password[, algorithm])` where `algorithm` defaults to AES192.

Example:

    var cipherstream = require("cipherstream"),
        fs = require("fs");
    
    fs.createReadStream("secret.txt").pipe(new cipherstream.DecipherStream("secret")).pipe(fs.writeReadStream("plain.txt"));

## HMAC

**hmac** is a simple wrapper function to create SHA-256 hmac values.

`cipherstream.hmac(data, key) → String`

## License

**MIT**