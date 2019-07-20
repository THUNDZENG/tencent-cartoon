var s = {
    _data: [],
    push: function(s, t) {
        this._data.push({
            message: s || "*",
            args: t || {}
        });
    },
    check: function(s) {
        for (var t = this._data, a = t.length, e = 0; e < a; e++) {
            var r = t[e];
            if (r.message == s) return t.splice(e, 1), r;
        }
        return null;
    },
    when: function(s, t) {
        var a = this.check(s);
        a && t && t(a.args);
    }
};

module.exports = s;