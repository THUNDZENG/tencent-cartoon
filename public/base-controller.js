function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, r, n) {
        return r && t(e.prototype, r), n && t(e, n), e;
    };
}(), r = function() {
    function r(e, n, a) {
        t(this, r);
        var i = n.name, o = a.findInstance(i, this);
        return o.name = i, o._scope = e, o.registerDelegates(n, a), o;
    }
    return e(r, [ {
        key: "registerDelegates",
        value: function(t, e) {
            var r = this, n = e.delegateFuncs, a = n.typeName, i = n.handlers;
            for (var o in i) {
                (function(t) {
                    if (!i.hasOwnProperty(t)) return "continue";
                    var n = "_delegate_" + a + "_" + t, o = i[t];
                    r[t] = n, r._scope[n] = function(t) {
                        var r = e.getInstanceOfEvent(t.currentTarget);
                        r && o.call(r, t);
                    };
                })(o);
            }
            for (var c in t) if (t.hasOwnProperty(c) && "o" == c[0] && "n" == c[1]) {
                var s = t[c];
                this["_" + c] = s;
            }
        }
    }, {
        key: "triggerTrueHandler",
        value: function(t, e) {
            var r = this["_" + t];
            r && r.call(this, e);
        }
    }, {
        key: "unload",
        value: function() {
            for (var t in this) this.hasOwnProperty(t) && "function" != typeof this[t] && delete this[t];
        }
    }, {
        key: "getData",
        value: function() {
            var t = this._data || (this._data = {});
            for (var e in this) this.hasOwnProperty(e) && "_" != e[0] && "function" != typeof this[e] && (t[e] = this[e]);
            return t;
        }
    }, {
        key: "update",
        value: function(t) {
            var e = this._scope;
            if (e) {
                if (t) for (var r in t) t.hasOwnProperty(r) && "_" != r[0] && "function" != typeof this[r] && (this[r] = t[r]);
                var n = {};
                n[this.name] = this.getData(), e.setData(n);
            } else console.warn("update 失败：当前 controller 可能已回收");
        }
    }, {
        key: "_differDataChange",
        value: function(t, e, r, n) {
            var a = n || {};
            for (var i in t) if (t.hasOwnProperty(i)) {
                var o = t[i], c = Object.prototype.toString.call(o), s = e[i];
                "[object Array]" == c ? (s = s || (e[i] = []), this._compareArray(o, s) && (a[r + "." + i] = o)) : "[object Object]" == c ? (s = s || (e[i] = {}), 
                this._differDataChange(o, s, r + "." + i, a)) : o != s && (e[i] = o, a[r + "." + i] = o);
            }
            return a;
        }
    }, {
        key: "_compareArray",
        value: function(t, e) {
            for (var r = !1, n = 0, a = t.length; n < a; n++) {
                var i = t[n], o = Object.prototype.toString.call(i), c = e[n];
                "[object Array]" == o ? (c = c || (e[n] = []), this._compareArray(i, c) && (r = !0)) : "[object Object]" == o ? (c = c || (e[n] = {}), 
                this._compareObject(i, c) && (r = !0)) : i != c && (e[n] = i, r = !0);
            }
            return r;
        }
    }, {
        key: "_compareObject",
        value: function(t, e) {
            var r = !1;
            for (var n in t) if (t.hasOwnProperty(n)) {
                var a = t[n], i = Object.prototype.toString.call(a), o = e[n];
                "[object Array]" == i ? (o = o || (e[n] = []), this._compareArray(a, o) && (r = !0)) : "[object Object]" == i ? (o = o || (e[n] = {}), 
                this._compareObject(a, o) && (r = !0)) : a != o && (e[n] = a, r = !0);
            }
            return r;
        }
    } ], [ {
        key: "findInstance",
        value: function(t, e) {
            var r = this._instances || (this._instances = {});
            return r[t] || (r[t] = e);
        }
    }, {
        key: "getInstanceOfEvent",
        value: function(t) {
            var e = t.dataset.name;
            if (!e) throw new Error("是否忘记设置 Controller 里事件目标 currentTarget 的 data-name 属性了？");
            return this.findInstance(e, this);
        }
    }, {
        key: "parseEnum",
        value: function(t, e, r) {
            var n = this[t], a = r;
            for (var i in n) if (n.hasOwnProperty(i) && (void 0 === a && (a = n[i]), e === n[i])) return e;
            return a;
        }
    } ]), r;
}();

module.exports = r;