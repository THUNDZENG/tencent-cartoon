function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function a(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, i = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, a, n) {
        return a && e(t.prototype, a), n && e(t, n), t;
    };
}(), o = require("../comic-info-formatter.js"), r = require("../base-controller.js"), s = function(s) {
    function c(a, n) {
        e(this, c);
        var i = t(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, a, n, c));
        return i.style = n.style, i.data = n.data, i.descFields = n.descFields || [ "short_desc" ], 
        i.showContinueRead = n.showContinueRead, i.canSelect = n.canSelect, i.itemStartIndex = n.itemStartIndex, 
        i.showListState = n.showListState, i.mode = c.parseEnum("MODES", n.mode), i.state = c.STATES.WAITING, 
        i.pageIndex = 1, i._loadPage = n.loadPage, i._comicHandler = n.comicHandler, i._initialSum = n.initialSum, 
        i.selected = {}, i.tryInitial(), i;
    }
    return a(c, r), i(c, [ {
        key: "tryInitial",
        value: function() {
            var e = this._initialSum;
            e && (void 0 === e ? "undefined" : n(e)) && (this.data = new Array(e).fill({}));
        }
    }, {
        key: "setNormalMode",
        value: function() {
            this.mode = c.MODES.NORMAL, this.update();
        }
    }, {
        key: "setSelectMode",
        value: function() {
            this.mode = c.MODES.SELECT, this.selected = {}, this.update();
        }
    }, {
        key: "switchMode",
        value: function() {
            this.mode == c.MODES.NORMAL ? this.setSelectMode() : this.setNormalMode();
        }
    }, {
        key: "getSelected",
        value: function() {
            var e = [], t = this.selected;
            if (this.mode != c.MODES.SELECT) return e;
            for (var a in t) t.hasOwnProperty(a) && t[a] && e.push(a);
            return e;
        }
    }, {
        key: "toggleSelect",
        value: function(e) {
            this.selected[e] = !this.selected[e], this.update();
        }
    }, {
        key: "selectAll",
        value: function() {
            var e = this.selected;
            this.data.forEach(function(t) {
                e[t.comic_id] = !0;
            }), this.update();
        }
    }, {
        key: "unselectAll",
        value: function() {
            var e = this.selected;
            this.data.forEach(function(t) {
                e[t.comic_id] = !1;
            }), this.update();
        }
    }, {
        key: "isAllSelected",
        value: function() {
            return this.getSelected().length == this.data.length;
        }
    }, {
        key: "isNoSelected",
        value: function() {
            return 0 == this.getSelected().length;
        }
    }, {
        key: "scrollTo",
        value: function(e) {
            var t = {};
            t[this.name + ".scrollTop"] = e, this._scope.setData(t);
        }
    }, {
        key: "appendData",
        value: function(e) {
            e.forEach(o.commonComicHandler), this._comicHandler && e.forEach(this._comicHandler), 
            this.data = this.data.concat(e), this.update();
        }
    }, {
        key: "setData",
        value: function(e) {
            e.forEach(o.commonComicHandler), this._comicHandler && e.forEach(this._comicHandler), 
            this.data = e, this.update();
        }
    }, {
        key: "loadPage",
        value: function() {
            var e = this;
            if (this._canClear && (this.pageIndex = 1, this.state = c.STATES.WAITING), this.state == c.STATES.WAITING) {
                if ("function" != typeof this._loadPage) return this.state = c.STATES.OVER, void this.update();
                this.state = c.STATES.LOADING, this.update(), this._loadPage(this.pageIndex, function(t) {
                    if (!(t = t || []).length) return e.state = c.STATES.OVER, void e.update();
                    e.pageIndex++, e._canClear && (e._canClear = !1, e.data = []), e.state = c.STATES.WAITING, 
                    e.appendData(t);
                });
            }
        }
    }, {
        key: "clearList",
        value: function() {
            this.pageIndex = 1, this.data = [], this.state = c.STATES.WAITING, this.update();
        }
    }, {
        key: "prepareClear",
        value: function() {
            this._canClear = !0;
        }
    } ]), c;
}();

s.MODES = {
    NORMAL: "normal",
    SELECT: "select"
}, s.STATES = {
    WAITING: "loading",
    LOADING: "loading",
    OVER: "over"
}, s.delegateFuncs = {
    typeName: "comicList",
    handlers: {
        onTap: function(e) {
            if (this.mode == s.MODES.SELECT) {
                var t = e.currentTarget.dataset.comicId;
                this.toggleSelect(t), this.triggerTrueHandler("onToggleSelect", e);
            } else this.triggerTrueHandler("onTap", e);
        },
        onScrollLower: function(e) {
            this.loadPage();
        }
    }
}, module.exports = s;