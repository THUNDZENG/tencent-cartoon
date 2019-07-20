function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../public/ac-page")), e = t(require("../public/bookshelf-data")), o = getApp(), i = o.util, c = (o.netAPI, 
require("../public/comic-list/comic-list-controller.js")), n = null;

(0, a.default)({
    data: {
        pageRoute: "detail/detail",
        tabState: {
            currentTab: "chapter",
            chapterOrder: "asc",
            commentCount: 0,
            showFloatTab: !1
        },
        recommendListCtrl: {
            data: []
        },
        scrollDirection: "down",
        scrollToId: null,
        isCollected: !1,
        comicData: {},
        chapterList: [],
        chapterListRev: []
    },
    comicData: null,
    onShareAppMessage: function() {
        var t = n.id, a = this.comicData || {}, e = a.title && "我正在看炒鸡好看的《" + a.title + "》，果断推荐一起看！", o = a.brief_intrd;
        return i.getShareData(e, o, "/detail/detail?id=" + t);
    },
    onUnload: function() {
        for (var t in this) this.hasOwnProperty(t) && this[t] && "function" == typeof this[t].unload && this[t].unload();
    },
    onLoad: function(t) {
        var a = this;
        console.log(this.data.pageRoute + " - onLoad"), n = t;
        var e = this.recommendListCtrl = new c(this, {
            name: "recommendListCtrl",
            style: "grid-column-3",
            data: [],
            descFields: [],
            onTap: function(t) {
                var e = t.currentTarget.dataset.comicId;
                a.navigateTo("detail/detail", {
                    id: e
                });
            }
        });
        i.getComicDetialData(n.id).then(function(t) {
            a.comicData = t, t.desc_pgv_count = i.unifyNumber(t.pgv_count), t.month_ticket && (t.month_ticket.desc_month_total = i.unifyNumber(t.month_ticket.month_total)), 
            t.desc_coll_count = i.unifyNumber(t.coll_count), t.desc_comment_count = i.unifyNumber(t.comment_count) || "", 
            t.desc_update_time = i.formatTime(Number(t.update_time + "000"), "yyyy.MM.dd"), 
            t.catalog.forEach(function(a) {
                a.seq_no == t.lated_seqno && 2 != t.finish_state ? a.desc_update_time = t.desc_update_time : delete a.desc_update_time;
            }), a.setData({
                comicData: t
            }), a.refreshHistory(), setTimeout(function() {
                a.refreshChapterList();
            }, 50), e.setData(t.recommend);
        });
    },
    onReady: function() {
        i.getComicDetialData(n.id).then(function(t) {
            var a = t && t.title;
            wx.setNavigationBarTitle({
                title: a || "腾讯动漫"
            });
        });
    },
    onShow: function() {
        var t = this;
        this.refreshHistory(), o.viewBackMessage.when("JumpToRecommendComicDetail", function(a) {
            var e = a.id;
            t.navigateTo("detail/detail", {
                id: e
            });
        });
    },
    refreshHistory: function() {
        var t = this, a = this.comicData;
        a && e.default.getHistory(n.id).then(function(e) {
            console.log("阅读历史记录：", e), a.read_chapter = e.read_chapter || 0, a.read_seqno = e.read_seqno || 0, 
            a.catalog.forEach(function(t) {
                t.is_read_history = t.seq_no == e.read_seqno || 1 == t.seq_no && 0 == a.read_seqno;
            }), t.setData({
                comicData: a
            }), setTimeout(function() {
                t.refreshChapterList();
            }, 50);
        });
    },
    refreshChapterList: function() {
        var t = this.comicData.catalog, a = t.slice(0).reverse();
        this.setData({
            chapterList: t,
            chapterListRev: a
        });
    },
    _onTapTab: function(t) {
        var a = t.currentTarget.dataset.tabName, e = this.data.tabState, o = e.currentTab, i = e.chapterOrder;
        "chapter" == a && o == a && (i = i ? "" : "desc"), this.setData({
            "tabState.currentTab": a,
            "tabState.chapterOrder": i
        });
    },
    _onScroll: function(t) {
        var a = this.data.scrollToId, e = t.detail.deltaY * (a ? 1 : -1) < 0 ? "up" : "down";
        this.setData({
            scrollDirection: e,
            scrollToId: null,
            "tabState.showFloatTab": t.detail.scrollTop > 260
        });
    },
    _onScrollToUpper: function() {
        this.setData({
            "tabState.showFloatTab": !1
        });
    },
    _onTouch: function() {
        this.setData({
            "tabState.showFloatTab": !1
        });
    },
    _onTapChapter: function(t) {
        var a = t.currentTarget.dataset.chapterId;
        this.goViewChap(a);
    },
    _onTapBtnRead: function() {
        var t = this.data.comicData.read_chapter || 0, a = this.data.comicData.read_seqno || 1;
        this.goViewChap(t, a);
    },
    _navToCurrentChap: function() {
        var t = this.data.tabState.chapterOrder, a = this.data.comicData.read_seqno || 1, e = ("desc" === t ? "rev_" : "") + "item_" + a;
        this.setData({
            scrollToId: e
        });
    },
    _navTopOrBottom: function(t) {
        var a = t.currentTarget.dataset.direction, e = this.data.tabState.chapterOrder, o = "desc" === e && "up" == a || "desc" !== e && "down" == a ? this.data.comicData.catalog.length : 1, i = ("desc" === e ? "rev_" : "") + "item_" + o;
        this.setData({
            scrollToId: i
        });
    },
    goViewChap: function(t) {
        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, e = this.data.comicData, o = e.comic_id, i = !1;
        e.catalog.forEach(function(a) {
            a.chapter_id == t && 2 == a.vip_state && (i = !0);
        }), i ? wx.showModal({
            showCancel: !1,
            title: "提示",
            content: "免费章节已经结束了哦，后续剧情在腾讯动漫app等你呦"
        }) : wx.navigateTo({
            url: "/view/view?id=" + o + "&cid=" + t + "&seqno=" + a
        });
    }
});