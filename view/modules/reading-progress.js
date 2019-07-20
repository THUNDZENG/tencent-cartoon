var s = {
    _listeners: [],
    _progress: {
        chapterId: null,
        seqNo: null,
        curPic: null,
        totalPic: null
    },
    reset: function() {
        this._listeners = [];
        for (var s in this._progress) this._progress.hasOwnProperty(s) && (this._progress[s] = null);
    },
    onChange: function(s) {
        this._listeners.push(s);
    },
    set: function(s) {
        var r = this, t = !1;
        for (var e in this._progress) this._progress.hasOwnProperty(e) && (t || (t = this._progress[e] != s[e]), 
        this._progress[e] = s[e]);
        t && this._listeners.forEach(function(s) {
            "function" == typeof s && s.call(r, r._progress);
        });
    },
    get: function() {
        return this._progress;
    }
};

module.exports = s;