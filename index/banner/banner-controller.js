function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
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

var r = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), o = require("../../public/base-controller.js"), a = function(a) {
    function i(n, r) {
        e(this, i);
        var o = t(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, n, r, i));
        return o.data = r.data, o.currentIndex = parseInt(r.initIndex) || 0, o;
    }
    return n(i, o), r(i, [ {
        key: "setData",
        value: function(e) {
            this.data = e, this.update();
        }
    } ]), i;
}();

a.delegateFuncs = {
    typeName: "banner",
    handlers: {
        onTap: function(e) {
            this.triggerTrueHandler("onTap", e);
        },
        onCurrentChange: function(e) {
            this.currentIndex = e.detail.current, this.triggerTrueHandler("onCurrentChange", e), 
            this.update();
        }
    }
}, module.exports = a;