var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../public/ac-page")), e = getApp(), a = e.util, i = e.netAPI, o = (require("../public/comic-info-formatter.js"), 
require("../public/comic-list/comic-list-controller.js")), n = {}, l = "", s = "", r = null;

(0, t.default)({
    data: {
        pageRoute: "list-rank/list-rank",
        scrollTop: 0,
        onScrollLower: "_onComicListScrollLower"
    },
    onShareAppMessage: function() {
        return a.getShareData();
    },
    onUnload: function() {
        for (var t in this) this.hasOwnProperty(t) && this[t] && "function" == typeof this[t].unload && this[t].unload();
    },
    onLoad: function(t) {
        var e = this;
        console.log(this.data.pageRoute + " - onLoad (query:", t, ")");
        var a = decodeURIComponent(t.params);
        n = JSON.parse(a), l = n.api, s = n.title || "腾讯动漫", r = n.descFields || [ "desc_lated_seqno", "desc_tags", "brief_intrd" ], 
        delete n.api, delete n.title, delete n.descFields;
        var c = this.listCtrl = new o(this, {
            name: "rankListCtrl",
            style: "plate",
            data: [],
            showListState: !0,
            itemStartIndex: 4,
            descFields: r,
            onTap: function(t) {
                e._onTapComic(t);
            },
            loadPage: function(t, a) {
                var o = n;
                o.page = t, i.get({
                    api: l,
                    data: n
                }, function(t) {
                    var i = t.data;
                    1 == o.page && (e.setData({
                        listHead: i.slice(0, 3)
                    }), i.splice(0, 3)), a(i);
                }, function() {
                    a(null);
                });
            }
        });
        c.loadPage(), this.listCtrl = c;
    },
    _onTapComic: function(t) {
        console.log("Tapped rank comic list! - ", t);
        var e = t.currentTarget.dataset.comicId;
        this.navigateTo("detail/detail", {
            id: e
        });
    },
    _onComicListScrollLower: function() {
        this.listCtrl.loadPage();
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: s
        });
    }
});