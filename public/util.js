var t = require("./net-api.js"), e = require("./promise-pollyfill.min.js").Promise, n = {}, r = !1, o = function(o) {
    var i = setTimeout(function() {
        i = null, wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 1e4
        });
    }, 500);
    return new e(function(e, i) {
        if (r) throw new Error("已经在打开漫画中，不能重复打开");
        r = !0;
        var a = {
            id: o
        };
        t.get({
            api: "Detail/comic",
            data: a
        }, function(t) {
            var r = t.data;
            r ? (n[o] = r, e(r)) : onError();
        }, function(t) {
            throw wx.showModal({
                showCancel: !1,
                title: "提示",
                content: "由于版权或者政策原因，该作品暂不支持阅读"
            }), t;
        });
    }).then(null, function(t) {
        console.warn(t);
    }).then(function(t) {
        return setTimeout(function() {
            r = !1;
        }, 500), i && clearTimeout(i), wx.hideToast(), t;
    });
};

module.exports = {
    isArray: function(t) {
        return "[object Array]" == Object.prototype.toString.call(t);
    },
    mixin: function(t) {
        t = t || {};
        for (var e = [].slice.call(arguments, 1), n = 0, r = e.length; n < r; n++) {
            var o = e[n];
            for (var i in o) o.hasOwnProperty(i) && (t[i] = o[i]);
        }
        return t;
    },
    formatTime: function(t, e) {
        t = t instanceof Date ? t : new Date(t), e = "string" == typeof e ? e : "yyyy/MM/dd HH:mm:ss.fff";
        var n = {
            y: t.getFullYear(),
            M: t.getMonth() + 1,
            d: t.getDate(),
            H: t.getHours(),
            h: t.getHours() % 12,
            m: t.getMinutes(),
            s: t.getSeconds(),
            f: t.getMilliseconds()
        }, r = e;
        for (var o in n) if (n.hasOwnProperty(o)) {
            var i = n[o], a = new RegExp(o + "+"), u = r.match(a);
            if (u) {
                var c = "y" == o ? 4 : "f" == o ? 3 : 2, s = u[0] || new Array(c + 1).join(o);
                r = r.replace(s, ("00" + i).substr(-s.length));
            }
        }
        return r;
    },
    unifyNumber: function(t) {
        return (t = Number(t) || 0) < 1e4 ? t : t < 1e8 ? parseInt(t / 1e4) + "万" : parseFloat((t / 1e8).toFixed(2)) + "亿";
    },
    encodeAPIData: function(t) {
        var e = [];
        for (var n in t) t.hasOwnProperty(n) && e.push(n + "/" + t[n]);
        return e.join("/");
    },
    getComicDetialData: function(t) {
        return new e(function(e, r) {
            var i = n[t];
            void 0 === i ? o(t).then(function(t) {
                e(t);
            }) : setTimeout(function() {
                e(i);
            }, 0);
        });
    },
    getShareData: function(t, e, n) {
        return t = t || "想看漫画但不知道看什么？这里有超多超有趣的故事安利给你~", e = e || "嗷呜~萌出天际的腾讯动漫企鹅娘邀你一起看漫画喽，宇宙最全漫画神器，抢先阅读火影、海贼、尸兄、王牌御史等漫画哦~", 
        n = n || "/index/index", {
            title: t,
            desc: e,
            path: n
        };
    }
};