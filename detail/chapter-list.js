var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../public/ac-page")), e = getApp(), a = e.util, i = e.netAPI, o = require("../public/bookshelf-data.js"), r = null;

(0, t.default)({
    data: {
        pageRoute: "detail/chapter-list",
        comicData: {},
        chapterList: [],
        chapterListRev: [],
        chapterOrder: "asc",
        scrollDirection: "down"
    },
    comicData: null,
    onShareAppMessage: function() {
        var t = r.id, e = this.comicData || {}, i = e.title && "我正在看炒鸡好看的《" + e.title + "》，果断推荐一起看！", o = e.brief_intrd;
        return a.getShareData(i, o, "/detail/detail?id=" + t);
    },
    onLoad: function(t) {
        console.log(this.data.pageRoute + " - onLoad"), r = t;
    },
    onReady: function() {
        var t = this, e = {
            id: r.id
        };
        i.get({
            api: "Detail/comic",
            data: e
        }, function(e) {
            var i = e.data, o = i.title;
            t.comicData = i, wx.setNavigationBarTitle({
                title: o
            }), i.desc_pgv_count = a.unifyNumber(i.pgv_count), i.month_ticket && (i.month_ticket.desc_month_total = a.unifyNumber(i.month_ticket.month_total)), 
            i.desc_coll_count = a.unifyNumber(i.coll_count), i.desc_comment_count = a.unifyNumber(i.comment_count) || "", 
            i.desc_update_time = a.formatTime(Number(i.update_time + "000"), "yyyy.MM.dd"), 
            i.catalog.forEach(function(t) {
                t.seq_no == i.lated_seqno && 2 != i.finish_state && (t.desc_update_time = i.desc_update_time);
            }), t.setData({
                comicData: i
            }), t.refreshHistory(), setTimeout(function() {
                t.refreshChapterList();
            }, 50);
        });
    },
    onShow: function() {
        this.refreshHistory();
    },
    refreshHistory: function() {
        var t = this, e = this.comicData;
        e && o.getHistory(r.id).then(function(a) {
            console.log("阅读历史记录：", a), e.read_chapter = a.read_chapter || 0, e.read_seqno = a.read_seqno || 0, 
            e.catalog.forEach(function(t) {
                t.is_read_history = t.seq_no == a.read_seqno || 1 == t.seq_no && 0 == e.read_seqno;
            }), t.setData({
                comicData: e
            }), setTimeout(function() {
                t.refreshChapterList();
            }, 50);
        });
    },
    refreshChapterList: function() {
        var t = this.comicData.catalog, e = t.slice(0).reverse();
        this.setData({
            chapterList: t,
            chapterListRev: e
        });
    },
    _onTapOrder: function() {
        var t = this.data.chapterOrder;
        this.setData({
            chapterOrder: t ? "" : "desc"
        });
    },
    _onScroll: function(t) {
        var e = this.data.scrollToId, a = t.detail.deltaY * (e ? 1 : -1) < 0 ? "up" : "down";
        this.setData({
            scrollDirection: a,
            scrollToId: null
        });
    },
    _navToCurrentChap: function() {
        var t = this.data.chapterOrder, e = this.data.comicData.read_seqno || 1, a = (t ? "rev_" : "") + "item_" + e;
        this.setData({
            scrollToId: a
        });
    },
    _navTopOrBottom: function(t) {
        var e = t.currentTarget.dataset.direction, a = this.data.chapterOrder, i = a && "up" == e || !a && "down" == e ? this.data.comicData.catalog.length : 1, o = (a ? "rev_" : "") + "item_" + i;
        this.setData({
            scrollToId: o
        });
    },
    _onTapChapter: function(t) {
        var a = this.data.comicData, i = t.currentTarget.dataset.chapterId, o = !1;
        a.catalog.forEach(function(t) {
            t.chapter_id == i && 2 == t.vip_state && (o = !0);
        }), o ? wx.showModal({
            showCancel: !1,
            title: "提示",
            content: "免费章节已经结束了哦，后续剧情在腾讯动漫app等你呦"
        }) : (e.viewBackMessage.push("JumpToViewChap", {
            cid: i
        }), wx.navigateBack());
    }
});