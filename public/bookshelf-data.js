var t = {
    user: "guest",
    key: ""
}, i = null, r = require("./util.js"), e = require("./net-api.js"), n = require("./promise-pollyfill.min.js").Promise, o = {
    init: function() {
        this.load();
    },
    load: function() {
        i = (wx.getStorageSync("localBookshelfData") || {})["v1.0"] || {
            collection: [],
            history: []
        };
    },
    save: function() {
        var t = {};
        t["v1.0"] = i, wx.setStorageSync("localBookshelfData", t);
    },
    getLocalHistoryData: function() {
        if (!i) throw new Error("尚未加载书架数据，请检查是否已初始化！");
        var t = i.history;
        if (!r.isArray(t)) throw new Error("书架历史数据异常，请检查是否正常初始化！");
        return t.sort(function(t, i) {
            return i.record_time - t.record_time;
        }), t;
    },
    getLocalHistorySync: function(t) {
        var i = parseInt(new Date().getTime() / 1e3), r = {
            comic_id: t,
            read_chapter: null,
            read_seqno: null,
            pic_of_chap: null,
            record_time: i
        };
        return this.getLocalHistoryData().forEach(function(i) {
            i.comic_id == t && (r = i);
        }), r;
    },
    getHistory: function(i) {
        var o = this;
        return new n(function(n, a) {
            e.post({
                api: "User/history",
                data: r.mixin({
                    comic_id: i
                }, t)
            }, function(t) {
                var i = t.data || [];
                i.map(function(t) {
                    var i = o.getLocalHistorySync(t.comic_id);
                    r.mixin(t, i);
                }), n(i[0]);
            }, function(t, i) {
                a(t, i);
            });
        });
    },
    getHistoryList: function(i, o) {
        var a = this, c = [];
        return this.getLocalHistoryData().forEach(function(t) {
            return c.push(t.comic_id);
        }), i && (i = parseInt(i), o = parseInt(o || 30), c = c.splice(i, i + o)), new n(function(i, n) {
            e.post({
                api: "User/history",
                data: r.mixin({
                    comic_id: c
                }, t)
            }, function(t) {
                var e = t.data || [];
                e.map(function(t) {
                    var i = a.getLocalHistorySync(t.comic_id);
                    r.mixin(t, i);
                }), i(e);
            }, function(t, i) {
                n(t, i);
            });
        });
    },
    setHistory: function(t, r, e, n) {
        var o = parseInt(new Date().getTime() / 1e3), a = {
            comic_id: t,
            read_chapter: r || null,
            read_seqno: e || null,
            pic_of_chap: n || null,
            record_time: o
        }, c = this.getLocalHistoryData();
        (c = c.filter(function(i) {
            return i.comic_id != t;
        })).unshift(a), c.length > 30 && (c = c.slice(0, 30)), i.history = c, this.save();
    },
    deleteHistoryList: function(t) {
        var r = this;
        return new n(function(e, n) {
            setTimeout(function() {
                var n = r.getLocalHistoryData();
                t = t.map(function(t) {
                    return parseInt(t);
                }), n = n.filter(function(i) {
                    return t.indexOf(parseInt(i.comic_id)) < 0;
                }), i.history = n, r.save(), e({
                    status: 2,
                    msg: "删除成功！（本地）",
                    data: {
                        deleted: t
                    }
                });
            }, 0);
        });
    }
};

o.init(), module.exports = o;