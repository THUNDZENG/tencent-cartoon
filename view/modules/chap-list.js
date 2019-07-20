var t = {
    _data: {},
    _mapCid: {},
    reset: function() {
        this._data = {}, this._mapCid = {};
    },
    load: function(t) {
        var a = this._mapCid;
        this._data = t, t.forEach(function(t) {
            var i = t.chapter_id;
            a[i] = t;
        });
    },
    getChapBySeqNo: function(t) {
        return this._data[t - 1];
    },
    getChapByChapterId: function(t) {
        return this._mapCid[t];
    }
};

module.exports = t;