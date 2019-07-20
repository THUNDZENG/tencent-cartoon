var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../public/ac-page")), e = getApp(), a = e.util, i = e.netAPI, n = require("../public/comic-info-formatter.js"), o = require("../public/bookshelf-data.js"), r = require("../public/comic-list/comic-list-controller.js"), s = require("./banner/banner-controller.js");

(0, t.default)({
    data: {
        pageRoute: "index/index",
        bannerCtrl: {
            data: []
        },
        bannerHistory: null,
        lastCloseHistory: 0,
        lightComicCtrl: {
            data: []
        },
        "riseComicCtrls.top2": {
            data: []
        },
        top5Ctrl: {
            data: []
        }
    },
    onShareAppMessage: function() {
        return a.getShareData();
    },
    LAST_CLOSE_HISTORY: "index_lastCloseHistory",
    onUnload: function() {
        for (var t in this) this.hasOwnProperty(t) && this[t] && "function" == typeof this[t].unload && (this[t].unload(), 
        delete this[t]);
    },
    onLoad: function() {
        function t(t) {
            t.cover_url = t.pic;
        }
        var a = this;
        console.log(this.data.pageRoute + " - onLoad"), e.getUserInfo();
        var o = function(t) {
            var e = t.currentTarget.dataset.comicId;
            a.navigateTo("detail/detail", {
                id: e
            });
        }, l = this.bannerCtrl = new s(this, {
            name: "bannerCtrl",
            data: [],
            onTap: o
        }), c = this.recommendCtrl = new r(this, {
            name: "recommendCtrl",
            style: "grid-column-2",
            data: [],
            initialSum: 4,
            onTap: o,
            comicHandler: t
        }), d = this.hotCtrl = new r(this, {
            name: "hotCtrl",
            style: "grid-column-3",
            data: [],
            initialSum: 6,
            onTap: o
        }), m = this.todayCtrl = new r(this, {
            name: "todayCtrl",
            style: "grid-column-3",
            data: [],
            initialSum: 6,
            descFields: [ "desc_lated_seqno" ],
            onTap: o
        }), u = this.lightComicCtrl = new r(this, {
            name: "lightComicCtrl",
            style: "light-comic",
            data: [],
            initialSum: 3,
            onTap: o,
            comicHandler: t
        }), C = {
            top2: new r(this, {
                name: "riseComicCtrls.top2",
                style: "rise-top2",
                data: [],
                initialSum: 2,
                onTap: o,
                comicHandler: function(t) {
                    n.joinComicTags(t, "|");
                }
            }),
            behind2: new r(this, {
                name: "riseComicCtrls.behind2",
                style: "grid-column-3",
                data: [],
                initialSum: 3,
                onTap: o
            })
        };
        this["riseComicCtrls.top2"] = C.top2, this["riseComicCtrls.behind2"] = C.behind2;
        var h = this.japanCtrl = new r(this, {
            name: "japanCtrl",
            style: "grid-column-3",
            data: [],
            initialSum: 6,
            descFields: [ "desc_tags" ],
            onTap: o
        }), g = this.newCtrl = new r(this, {
            name: "newCtrl",
            style: "grid-column-3",
            data: [],
            initialSum: 6,
            descFields: [ "desc_tags" ],
            onTap: o
        }), p = this.top5Ctrl = new r(this, {
            name: "top5Ctrl",
            style: "top5",
            data: [],
            initialSum: 5,
            onTap: o,
            comicHandler: function(e) {
                n.getPgvCount(e), t(e);
            }
        });
        this.setData({
            bannerCtrl: l.getData(),
            recommendCtrl: c.getData(),
            hotCtrl: d.getData(),
            todayCtrl: m.getData(),
            lightComicCtrl: u.getData(),
            "riseComicCtrls.top2": C.top2.getData(),
            "riseComicCtrls.behind2": C.behind2.getData(),
            japanCtrl: h.getData(),
            newCtrl: g.getData(),
            top5Ctrl: p.getData()
        }), wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 1e4
        }), i.get("Index/all", function(t) {
            console.log("net API - Index/all:", t);
            var e = t.data;
            l.setData(e.banner), c.setData(e.recommend), d.setData(e.hotComic), m.setData(e.todayUpdate), 
            u.setData(e.lightComic), C.top2.setData(e.riseFastComic.slice(0, 2)), C.behind2.setData(e.riseFastComic.slice(2)), 
            h.setData(e.japanComic), g.setData(e.riseFastNewComic), p.setData(e.topZone), wx.hideToast();
        }, function(t) {
            console.error("首页数据加载异常:", t), wx.hideToast();
        });
    },
    onShow: function() {
        var t = this, a = o.getLocalHistoryData()[0];
        a && o.getHistory(a.comic_id).then(function(e) {
            var a = parseInt(wx.getStorageSync(t.LAST_CLOSE_HISTORY)) || 0;
            t.setData({
                lastCloseHistory: a,
                bannerHistory: a < e.record_time ? e : null
            });
        }), e.viewBackMessage.when("JumpToRecommendComicDetail", function(e) {
            var a = e.id;
            t.navigateTo("detail/detail", {
                id: a
            });
        });
    },
    _onTapMore: function(t) {
        var e = t.currentTarget.dataset.title, a = t.currentTarget.dataset.name, i = JSON.stringify({
            title: e,
            api: "Index/more",
            filter: a,
            descFields: [ "desc_lated_seqno", "lightComic" == a ? "desc_pgv_count" : "desc_tags", "brief_intrd" ]
        }), n = encodeURIComponent(i);
        wx.navigateTo({
            url: "/list-simple/list-simple?params=" + n
        });
    },
    _onTapHistory: function(t) {
        var e = t.target.dataset.btnName, a = this.data.bannerHistory, i = a.comic_id, n = a.read_chapter || 0, o = a.read_seqno || 1;
        if ("CloseHistory" == e) {
            var r = parseInt(new Date().getTime() / 1e3);
            return wx.setStorageSync(this.LAST_CLOSE_HISTORY, r), void this.setData({
                lastCloseHistory: r
            });
        }
        wx.navigateTo({
            url: "/view/view?id=" + i + "&cid=" + n + "&seqno=" + o
        });
    }
});