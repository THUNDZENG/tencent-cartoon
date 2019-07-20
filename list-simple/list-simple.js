var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../public/ac-page")), e = getApp(), i = e.util, a = e.netAPI, o = (require("../public/comic-info-formatter.js"), 
require("../public/comic-list/comic-list-controller.js")), l = {}, n = "", s = "", r = null;

(0, t.default)({
    data: {
        pageRoute: "list-simple/list-simple"
    },
    onShareAppMessage: function() {
        return i.getShareData("安利个看漫画的宝贝~漫画福利超多，日漫国漫韩漫统统都有哦！");
    },
    onUnload: function() {
        for (var t in this) this.hasOwnProperty(t) && this[t] && "function" == typeof this[t].unload && this[t].unload();
    },
    onLoad: function(t) {
        var e = this;
        console.log(this.data.pageRoute + " - onLoad (query:", t, ")");
        var i = decodeURIComponent(t.params);
        l = JSON.parse(i), n = l.api, s = l.title || "腾讯动漫", r = l.descFields || [ "desc_pgv_count", "desc_lated_seqno", "brief_intrd" ], 
        delete l.api, delete l.title, delete l.descFields;
        var c = this.listCtrl = new o(this, {
            name: "simpleListCtrl",
            style: "plate",
            data: [],
            showListState: !0,
            descFields: r,
            onTap: function(t) {
                console.log("Tapped comic list! - ", t);
                var i = t.currentTarget.dataset.comicId;
                e.navigateTo("detail/detail", {
                    id: i
                });
            },
            loadPage: function(t, e) {
                l.page = t, a.get({
                    api: n,
                    data: l
                }, function(t) {
                    var i = t.data;
                    e(i);
                }, function(t) {
                    console.log("Got comic list error: ", t), e(null);
                });
            }
        });
        c.loadPage(), this.listCtrl = c;
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: s
        });
    }
});