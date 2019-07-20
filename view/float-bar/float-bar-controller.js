function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function o(t, e) {
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

var n = function() {
    function t(t, e) {
        for (var o = 0; o < e.length; o++) {
            var n = e[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, o, n) {
        return o && t(e.prototype, o), n && t(e, n), e;
    };
}(), r = function t(e, o, n) {
    null === e && (e = Function.prototype);
    var r = Object.getOwnPropertyDescriptor(e, o);
    if (void 0 === r) {
        var i = Object.getPrototypeOf(e);
        return null === i ? void 0 : t(i, o, n);
    }
    if ("value" in r) return r.value;
    var a = r.get;
    if (void 0 !== a) return a.call(n);
}, i = require("../../public/base-controller.js"), a = function(a) {
    function u(o, n) {
        t(this, u);
        var r = e(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this, o, n, u));
        return r.autoHide = parseInt(n.autoHide), r.title = n.title || "", r.state = u.parseEnum("STATES", n.state), 
        r;
    }
    return o(u, i), n(u, [ {
        key: "hide",
        value: function() {
            this.state = u.STATES.HIDDEN, this.update();
        }
    }, {
        key: "show",
        value: function() {
            this.state = u.STATES.NORMAL, this.update();
        }
    }, {
        key: "toggle",
        value: function() {
            this.state = this.state == u.STATES.NORMAL ? u.STATES.HIDDEN : u.STATES.NORMAL, 
            this.update();
        }
    }, {
        key: "_checkAutoHide",
        value: function() {
            var t = this, e = this.state == u.STATES.NORMAL, o = this.autoHide;
            this._cancelHideTimeout(), this._hideTimeout = e && o && setTimeout(function() {
                t.hide();
            }, o);
        }
    }, {
        key: "_cancelHideTimeout",
        value: function() {
            var t = this._hideTimeout;
            t && clearTimeout(t), this._hideTimeout = null;
        }
    }, {
        key: "update",
        value: function() {
            r(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "update", this).call(this), 
            this._checkAutoHide();
        }
    } ]), u;
}();

a.STATES = {
    NORMAL: "normal",
    HIDDEN: "hidden"
}, a.delegateFuncs = {
    typeName: "floatBar",
    handlers: {
        onTap: function(t) {
            var e = t.target && t.target.dataset.btnName;
            e ? this.triggerTrueHandler("onTap" + e, t) : this.triggerTrueHandler("onTap", t);
        }
    }
}, module.exports = a;