# cipher

**cipher** is a thin streaming layer for encryption/decryption.

## Installation

    npm install cipher

## Usage

Require as `cipher`

    var cipher = require("cipher");

## CipherStream

**CipherStream** creates a Stream object which takes data in and encrypts it.

`new CipherStream(password[, algorithm])` where `algorithm` defaults to AES192.

Example:

    var cipher = require("cipher"),
        fs = require("fs");
    
    fs.createReadStream("plain.txt").pipe(new cipher.CipherStream("secret")).pipe(fs.writeReadStream("secret.txt"));


## DecipherStream

**DecipherStream** creates a Stream object which takes encrypted data in and decrypts it.

`new DecipherStream(password[, algorithm])` where `algorithm` defaults to AES192.

Example:

    var cipher = require("cipher"),
        fs = require("fs");
    
    fs.createReadStream("secret.txt").pipe(new cipher.DecipherStream("secret")).pipe(fs.writeReadStream("plain.txt"));

## HMAC

**hmac** is a simple wrapper function to create SHA-256 hmac values.

`cipher.hmac(data, key) → String`

## License

**MIT**