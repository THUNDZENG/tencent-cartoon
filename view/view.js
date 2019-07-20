var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../public/ac-page")), e = getApp(), i = e.util, a = e.netAPI, o = require("../public/bookshelf-data.js"), c = require("./modules/reading-progress.js"), n = require("./modules/chap-list.js"), r = require("./modules/pic-pos-cache.js"), l = require("./comic-pic-list/comic-pic-list-controller.js"), s = require("./float-bar/float-bar-controller.js"), d = {};

(0, t.default)({
    data: {
        pageRoute: "view/view",
        comicPicListCtrl: {
            data: []
        },
        floatBarCtrl: {
            data: []
        }
    },
    nearByPicRange: [ -2, 3 ],
    comicData: null,
    onShareAppMessage: function() {
        var t = d.id, e = d.cid || "", a = d.seqno || "", o = this.comicData || {}, c = o.title && "我正在看炒鸡好看的《" + o.title + "》，果断推荐一起看！", n = o.brief_intrd;
        return i.getShareData(c, n, "/view/view?id=" + t + "&cid=" + e + "&seqno=" + a);
    },
    onUnload: function() {
        for (var t in this) this.hasOwnProperty(t) && this[t] && "function" == typeof this[t].unload && this[t].unload();
    },
    onLoad: function(t) {
        var e = this;
        console.log(this.data.pageRoute + " - onLoad (query:", t, ")"), d = t, parseInt(d.cid) ? delete d.seqno : delete d.cid, 
        c.reset(), n.reset(), r.reset();
        var i = this.comicPicListCtrl = new l(this, {
            name: "comicPicListCtrl",
            onTap: function() {
                a.toggle();
            },
            onTapPrevChap: function() {
                console.log("点击加载上一话"), e.redirectChap(-1);
            },
            onTapNextChap: function() {
                console.log("点击加载下一话"), e.redirectChap(1);
            },
            onScroll: function(t) {
                a.hide();
                var e = t.detail.scrollTop, i = r.getPicOfPos(e);
                if (i) {
                    var o = n.getChapBySeqNo(i.seqNo);
                    c.set({
                        chapterId: o.chapter_id,
                        seqNo: o.seq_no,
                        curPic: i.index,
                        totalPic: o.total_pic
                    });
                }
            },
            onScrollLower: function() {
                console.log("Reach comic pic list bottom."), e.loadNextChap();
            }
        });
        i.update(), c.onChange(function(t) {
            var a = r.getPicsInRange(t.seqNo, t.curPic, e.nearByPicRange);
            console.log("(" + t.seqNo + ", " + t.curPic + ") - nearPics:", a && a.map(function(t) {
                return t.index;
            })), a && i.loadPics(a);
        });
        var a = this.floatBarCtrl = new s(this, {
            name: "floatBarCtrl",
            autoHide: 3e3,
            onTapChapterList: function() {
                console.log("Click float bar btn: ChapterList");
                var t = d.id;
                e.navigateTo("detail/chapter-list", {
                    id: t
                });
            },
            onTapDetail: function() {
                var t = d.id;
                e.navigateTo("detail/detail", {
                    id: t
                });
            },
            onTapHome: function() {
                e.navigateTo("index/index");
            },
            onTapPrevChap: function(t) {
                console.log("Click float bar btn: PrevChap"), e.redirectChap(-1);
            },
            onTapNextChap: function(t) {
                console.log("Click float bar btn: NextChap"), e.redirectChap(1);
            }
        });
        a.update(), c.onChange(function(t) {
            a.title = "第" + t.seqNo + "话 - " + (t.curPic + 1) + "/" + t.totalPic, a.update();
        });
        var p = null;
        c.onChange(function(t) {
            var e = t.seqNo;
            if (o.setHistory(d.id, t.chapterId, t.seqNo, t.curPic), p != e) {
                p = e;
                var i = n.getChapBySeqNo(e).title;
                wx.setNavigationBarTitle({
                    title: i
                });
            }
        });
    },
    onReady: function() {
        var t = this;
        console.log(this.data.pageRoute + " - onReady"), e.getScreenSize(function(e) {
            r.windowWidth = e.width, r.windowHeight = e.height, d.detail = 1, t.loadChap(d, function(e) {
                var i = e.data.chapter.seq_no;
                o.getHistory(d.id).then(function(e) {
                    var a = e.read_seqno == i && e.pic_of_chap || 0;
                    t.comicPicListCtrl.scrollToChapPic(i, a);
                    var o = n.getChapBySeqNo(i);
                    c.set({
                        chapterId: o.chapter_id,
                        seqNo: o.seq_no,
                        curPic: a,
                        totalPic: o.total_pic
                    });
                });
            });
        });
    },
    onShow: function() {
        var t = d.id;
        e.viewBackMessage.when("JumpToViewChap", function(e) {
            var i = e.cid;
            console.log("检测到切换章节：", i), i != d.cid && wx.redirectTo({
                url: "/view/view?id=" + t + "&cid=" + i
            });
        });
    },
    loadNextChap: function() {
        var t = this.comicPicListCtrl, e = t.lastLoadChap, i = n.getChapBySeqNo(e + 1), a = !!i;
        t.isTouchPicLimit || t.isNextChapVipLimit || !a || this.loadChap({
            id: d.id,
            cid: i.chapter_id
        });
    },
    loadChap: function(t, e) {
        var i = this, o = this.comicPicListCtrl;
        o.loading || (o.loading = !0, a.get({
            api: "View/comic",
            data: t
        }, function(a) {
            o.loading = !1;
            var c = a.data;
            t.detail && (i.comicData = c, n.load(c.catalog), o.lastChapSeqNo = c.catalog.length);
            var l = c.picture;
            l.forEach(function(t) {
                return t.pid = t.picture_id, delete t.picture_id, t;
            });
            var s = c.chapter, d = parseInt(s.seq_no), p = n.getChapBySeqNo(d), h = n.getChapBySeqNo(d + 1);
            p.total_pic = l.length, (2 != s.vip_state || o.totalPicCount < 1) && (o.addChapPics(d, l), 
            r.addChapPics(d, l)), (2 == p.vip_state || h && 2 == h.vip_state) && (o.isNextChapVipLimit = !0, 
            o.update()), d == o.lastChapSeqNo ? (o.lastChapState = 2 == i.comicData.finish_state ? "finished" : "updating", 
            o.update(), o.recommendList = {
                data: i.comicData.recommend,
                style: "grid-column-3",
                descFields: [],
                onTap: "_onTapRecommendList"
            }) : (o.lastChapState = "", o.update()), e && e(a), r.totalHeight < r.windowHeight && i.loadNextChap();
        }, function() {
            i.loadingChap = !1;
        }));
    },
    redirectChap: function(t) {
        var e = c.get().seqNo, i = d.id, a = n.getChapBySeqNo(parseInt(e) + t);
        if (a) if (t > 0 && this.comicPicListCtrl.isNextChapVipLimit) wx.showModal({
            showCancel: !1,
            title: "提示",
            content: "免费章节已经结束了哦，\n后续剧情鹅娘在【腾讯动漫APP】\n等你呦(/≥▽≤/)"
        }); else if (t < 0 && 2 == a.vip_state) wx.showModal({
            showCancel: !1,
            title: "提示",
            content: "前面不是免费章节哦，\n后续剧情鹅娘在【腾讯动漫APP】\n等你呦(/≥▽≤/)"
        }); else {
            var o = a.chapter_id;
            wx.redirectTo({
                url: "/view/view?id=" + i + "&cid=" + o
            });
        } else {
            var r = t < 0 ? "前面" : "后面";
            wx.showToast({
                title: r + "没有更多了~",
                duration: 2e3
            });
        }
    },
    _onTapRecommendList: function(t) {
        console.log("Tap recommend list: ", t);
        var i = t.currentTarget.dataset.comicId;
        e.viewBackMessage.push("JumpToRecommendComicDetail", {
            id: i
        }), wx.navigateBack({
            delta: 1
        });
    }
});