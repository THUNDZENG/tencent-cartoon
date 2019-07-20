var t = {
    _data: {},
    _allData: [],
    totalHeight: 0,
    windowWidth: 0,
    windowHeight: 0,
    reset: function() {
        this._data = {}, this._allData = [], this.totalHeight = 0;
    },
    addChapPics: function(t, a) {
        var i = this._data, n = this.totalHeight, r = i[t] = [], h = this.windowWidth, e = 0;
        a.forEach(function(a) {
            var i = a.height * h / a.width;
            n += i, r.push({
                pos: n,
                seqNo: t,
                index: e++
            });
        }), this.totalHeight = n;
        var o = [];
        for (var l in i) if (i.hasOwnProperty(l)) {
            var s = i[l];
            o = o.concat(s);
        }
        this._allData = o;
    },
    getPicOfPos: function(t) {
        var a = this._data;
        for (var i in a) if (a.hasOwnProperty(i)) for (var n = a[i], r = 0, h = n.length; r < h; r++) {
            var e = n[r];
            if (e.pos > t) return e;
        }
        return null;
    },
    getPosOfPic: function(t, a) {
        for (var i = this._data[t], n = 0, r = i.length; n < r; n++) {
            var h = i[n];
            if (h.index == a) return h;
        }
        return null;
    },
    getPicsInRange: function(t, a, i) {
        for (var n = this._data, r = this._allData, h = n[t][a], e = null, o = 0, l = r.length; o < l; o++) r[o] === h && (e = o);
        if (null === e) return null;
        var s = e + i[0], u = e + i[1];
        return r.slice(Math.max(0, s), Math.min(u, r.length));
    }
};

module.exports = t;