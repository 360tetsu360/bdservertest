(function () {
    module.exports = {
        NumtoBuf: function (num) {
            if (typeof num === 'number' && !Number.isNaN(num)) {
                return new Buffer.from([num]);
            }
            else return false;
        },
        NumtoBuf: function (num, length) {
            if (typeof num === 'number' && !Number.isNaN(num) && Number.isInteger(num)) {
                if (length == 4) {
                    return (this.NumtoBuf(num));
                }
                else if (length == 1) {
                    if (num <= 0xFF) {
                        return new Buffer.from([num]);
                    }
                    else return false;
                }
                else if (length == 2) {
                    if (num <= 0xFF) {
                        return new Buffer.from([0x00, num]);
                    }
                    else if (num <= 0xFFFF) {
                        return new Buffer.from([Math.floor(num / 0xFF), num - Math.floor(num / 0xFF)]);
                    }
                    else return false;
                }
                else return false;
            } else return false;
        },
        StrtoBuf: function (str) {
            if (typeof str == "string") {
                return (new TextEncoder).encode(str);
            }
            else {
                return (new TextEncoder).encode(String(str));
            }
        },
        MakeGUID: function () {
            return Math.floor(Math.random() * 0xffffffff);
        },
        MakeGUIDBuffer: function () {
            const buf = Buffer.alloc(0);
            buf.writeUInt8(BigInt(this.MakeGUID()));
            return buf;
        },
        MakeIpv4Buffer: function (remote) {//for string
            var ips = remote.address.split('.').map(str => 0xFF - (parseInt(str, 10)));
            var portShort = this.NumtoBuf(remote.port, 2);
            var out = Buffer.from([
                0x04, ...ips, ...portShort
            ]);
            return out;
        },
        MakeDataArray: function () {//todo
            var unknown1 = new Buffer.from([0xf5, 0xff, 0xff, 0xf5]);
            var unknown2 = new Buffer.from([0xff, 0xff, 0xff, 0xff]);
        }
    }
})();
