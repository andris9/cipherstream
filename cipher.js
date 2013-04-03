var Stream = require("stream").Stream,
    utillib = require("util"),
    crypto = require('crypto'),
    fs = require("fs");

module.exports.CipherStream = CipherStream;
module.exports.DecipherStream = DecipherStream;

module.exports.hmac = function(data, key){
    var hmac = crypto.createHmac("SHA256", key);
    hmac.update(data);
    return hmac.digest("hex");
};

module.exports.md5 = function(data){
    var hash = crypto.createHash("MD5");
    hash.update(data);
    return hash.digest("hex");
};

function CipherStream(password, algorithm){
    var self = this;

    Stream.call(this);

    algorithm = algorithm || "aes192";

    this.paused = false;
    this.destStream = null;
    this.writable = true;

    this.on("pipe", function(source) {
      source.on("drain", function() {
        self.resume();
      });
    });

    this.cipher = crypto.createCipher(algorithm, password);
}
utillib.inherits(CipherStream, Stream);

CipherStream.prototype.write = function(chunk){
    this.emit("data", new Buffer(this.cipher.update(chunk), "binary"));
    return(! this.paused);
}

CipherStream.prototype.end = function(){
    this.emit("data", new Buffer(this.cipher.final(), "binary"));
    this.emit("end");
}

CipherStream.prototype.pipe = function() {
    var self = this;
    this.destStream = arguments[0];
    this.destStream.on("drain", function() {
        self.emit("drain");
        self.resume();
    });
    Stream.prototype.pipe.apply(this, arguments);
}

CipherStream.prototype.pause = function() {
    this.paused = true;
    this.emit("pause");
}

CipherStream.prototype.resume = function() {
    this.paused = false;
}

function DecipherStream(password, algorithm){
    var self = this;

    Stream.call(this);

    algorithm = algorithm || "aes192";

    this.paused = false;
    this.destStream = null;
    this.writable = true;

    this.on("pipe", function(source) {
        source.on("drain", function() {
            self.resume();
        });
    });

    this.decipher = crypto.createDecipher(algorithm, password);
}
utillib.inherits(DecipherStream, Stream);

DecipherStream.prototype.write = function(chunk){
    this.emit("data", new Buffer(this.decipher.update(chunk), "binary"));
    return(! this.paused);
}

DecipherStream.prototype.end = function(){
    this.emit("data", new Buffer(this.decipher.final(), "binary"));
    this.emit("end");
}

DecipherStream.prototype.pipe = function() {
    var self = this;
    this.destStream = arguments[0];
    this.destStream.on("drain", function() {
        self.emit("drain");
        self.resume();
    });
    Stream.prototype.pipe.apply(this, arguments);
}

DecipherStream.prototype.pause = function() {
    this.paused = true;
    this.emit("pause");
}

DecipherStream.prototype.resume = function() {
    this.paused = false;
}

