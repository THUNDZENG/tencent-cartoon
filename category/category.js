var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../public/ac-page")), t = getApp(), e = t.util, n = t.netAPI;

(0, a.default)({
    data: {
        pageRoute: "category/category"
    },
    onShareAppMessage: function() {
        return e.getShareData("安利个看漫画的宝贝~漫画福利超多，日漫国漫韩漫统统都有哦！");
    },
    onLoad: function() {
        var a = this;
        console.log(this.data.pageRoute + " - onLoad"), this.setData({
            rank: new Array(4).fill({}),
            classify: new Array(6).fill({})
        }), n.get("Rank/conf", function(t) {
            console.log("Rank/conf:", t), a.setData({
                rank: t.data
            });
        }), n.get("Classify/conf", function(t) {
            console.log("Classify/conf:", t), a.setData({
                classify: t.data
            });
        });
    },
    _onTapRank: function(a) {
        var t = a.currentTarget.dataset.name, e = a.currentTarget.dataset.id, n = JSON.stringify({
            title: t,
            api: "Rank/list",
            id: e
        }), s = encodeURIComponent(n);
        wx.navigateTo({
            url: "/list-rank/list-rank?params=" + s
        });
    },
    _onTapClassify: function(a) {
        var t = a.currentTarget.dataset.name, e = a.currentTarget.dataset.id, n = JSON.stringify({
            title: t,
            api: "Classify/list",
            id: e,
            descFields: [ "日漫" == t ? "desc_update" : "desc_pgv_count", "desc_lated_seqno", "brief_intrd" ]
        }), s = encodeURIComponent(n);
        wx.navigateTo({
            url: "/list-simple/list-simple?params=" + s
        });
    }
});