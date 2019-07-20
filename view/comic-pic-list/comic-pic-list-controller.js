function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function a(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

var o = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var o = e[a];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, a, o) {
        return a && t(e.prototype, a), o && t(e, o), e;
    };
}(), i = require("../../public/base-controller.js"), r = function(r) {
    function n(a, o) {
        t(this, n);
        var i = e(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, a, o, n));
        return i.data = {}, i.firstLoadChap = null, i.lastLoadChap = null, i.lastChapSeqNo = null, 
        i.totalPicCount = 0, i.loadPicLimit = o.loadPicLimit || 100, i.isLoading = !1, i.isTouchPicLimit = !1, 
        i.isNextChapVipLimit = !1, i.lastChapState = "", i;
    }
    return a(n, i), o(n, [ {
        key: "addChapPics",
        value: function(t, e) {
            (null === this.firstLoadChap || t < this.firstLoadChap) && (this.firstLoadChap = parseInt(t)), 
            (null === this.lastLoadChap || t > this.lastLoadChap) && (this.lastLoadChap = parseInt(t)), 
            this.data[t] = e, this.totalPicCount += e.length, this.isTouchPicLimit = this.totalPicCount >= this.loadPicLimit, 
            this.update();
        }
    }, {
        key: "scrollToChapPic",
        value: function(t, e) {
            var a = this.data[parseInt(t)], o = a && a[parseInt(e)], i = o && o.pid, r = "pic_" + t + "_" + i;
            if (i) {
                var n = {};
                n[this.name + ".scrollToId"] = r, this._scope.setData(n);
            }
        }
    }, {
        key: "loadPics",
        value: function(t) {
            var e = this.data, a = !1;
            t.forEach(function(t) {
                var o = t.seqNo, i = t.index, r = e[o][i];
                a || (a = !r.showUrl), r.showUrl = r.url;
            }), a && this.update();
        }
    } ]), n;
}();

r.delegateFuncs = {
    typeName: "comicPicList",
    handlers: {
        onTap: function(t) {
            var e = t.target && t.target.dataset.btnName;
            e ? this.triggerTrueHandler("onTap" + e, t) : this.triggerTrueHandler("onTap", t);
        },
        onScroll: function(t) {
            this.triggerTrueHandler("onScroll", t);
        },
        onScrollLower: function(t) {
            this.triggerTrueHandler("onScrollLower", t);
        },
        onError: function(t) {
            var e = t.target && t.target.dataset, a = e.chapSeq, o = e.picCur, i = this.data[a][o];
            console.log("图片加载失败：", i), i.state = "failed";
        },
        onLoad: function(t) {
            var e = t.target && t.target.dataset, a = e.chapSeq, o = e.picCur;
            this.data[a][o].state = "complete";
        }
    }
}, module.exports = r;