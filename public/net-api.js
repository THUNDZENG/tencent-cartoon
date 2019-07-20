var t = {
    _useHttp: !1,
    apiDomain: "https://wx.ac.qq.com",
    apiVersion: "1.0.0",
    _init: function() {
        this._loadCache();
    },
    _cacheKey: "NET_API_CACHE",
    _cacheVer: "1.0",
    _cacheData: {},
    CACHE_TYPE: {
        NO_CACHE: "no_cache",
        JUST_CACHE: "just_cache",
        ADVANCE_CACHE: "advance_cache"
    },
    _loadCache: function() {
        this._cacheData = (wx.getStorageSync(this._cacheKey) || {})[this._cacheVer] || {};
    },
    _saveCache: function() {
        var t = {};
        t[this._cacheVer] = this._cacheData, wx.setStorageSync(this._cacheKey, t);
    },
    _clearExpiredCache: function() {},
    _getCache: function(t) {},
    _setCache: function(t, e, a) {},
    _getCacheKey: function(t, e, a) {
        return t + "_" + e + "_" + (a ? JSON.stringify(a) : "");
    },
    request: function(t, e, a) {
        "string" == typeof arguments[0] && (t = {
            api: arguments[0]
        });
        var c = t.api, s = t.method, i = t.header, n = t.data, o = (t.cacheType || this.CACHE_TYPE.NO_CACHE, 
        [ this.apiDomain, this.apiVersion, c ].join("/")), r = s || "GET", h = {
            "content-type": "application/x-www-form-urlencoded"
        }, u = {};
        this._useHttp && (o = o.replace(/^https:/, "http:"));
        for (var _ in n) n.hasOwnProperty(_) && (u[_] = n[_]);
        for (var p in i) i.hasOwnProperty(p) && (h[p] = i[p]);
        wx.request({
            url: o,
            method: r,
            header: h,
            data: u,
            success: function(t) {
                var c = t.data;
                c.status;
                console.log("Request 请求成功！", {
                    url: o,
                    status: c.status,
                    msg: c.msg
                }), 2 == c.status ? e && e(c) : a && a(c.status, c);
            },
            fail: function(t, e) {
                console.warn("Request 请求失败：", t), a && a(-1e3, e, t);
            }
        });
    },
    get: function(t, e, a) {
        return "string" == typeof arguments[0] && (t = {
            api: arguments[0]
        }), t.method = "GET", this.request(t, e, a);
    },
    post: function(t, e, a) {
        return "string" == typeof arguments[0] && (t = {
            api: arguments[0]
        }), t.method = "POST", this.request(t, e, a);
    }
};

t._init(), module.exports = t;