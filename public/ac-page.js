Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e) {
    return console.log("opts:", e), Object.assign(e, n), Page(e);
};

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./util")), t = getApp(), n = {
    navigateTo: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = this.getRouteDepth(), r = this.getRouteDepth(e), o = "/" + e + "?" + this.joinParams(t);
        this.checkIfComicDetail(e, t).then(function() {
            if (n < r) wx.navigateTo({
                url: o
            }); else if (n == r) wx.redirectTo({
                url: o
            }); else {
                if (!wx.reLaunch) return void wx.showModal({
                    title: "提示",
                    content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
                });
                wx.reLaunch({
                    url: o
                });
            }
        }).catch(function(e) {
            console.warn("ACPage.navigateTo 异常:", e);
        });
    },
    getRouteDepth: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.route, n = t.pages;
        return e || (e = this.data.pageRoute), n.indexOf(e);
    },
    getHistoryDist: function(e) {
        var t = getCurrentPages(), n = t.length - 1, r = -1;
        return t.forEach(function(t, n) {
            var o = t.route;
            o || (o = t.data.pageRoute), o == e && (r = n);
        }), r < 0 ? 0 : n - r;
    },
    joinParams: function(e) {
        var t = [];
        for (var n in e) if (e.hasOwnProperty(n)) {
            var r = e[n];
            t.push(n + "=" + encodeURIComponent(r));
        }
        return t.join("&");
    },
    checkIfComicDetail: function(t, n) {
        if ("detail/detail" == t) {
            var r = n.id;
            return e.default.getComicDetialData(r).then(function(e) {
                if (e) return e;
                throw new Error("获取漫画详情失败");
            });
        }
        return new Promise(function(e) {
            setTimeout(function() {
                return e();
            }, 0);
        });
    }
};