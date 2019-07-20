var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../public/ac-page")), t = getApp(), o = t.util, a = require("../public/bookshelf-data.js"), l = (require("../public/comic-info-formatter.js"), 
require("../public/comic-list/comic-list-controller.js"));

(0, e.default)({
    data: {
        pageRoute: "bookshelf/bookshelf",
        currentTab: "history",
        currentMode: "normal",
        allSelected: !1,
        noSelected: !0,
        hasHistory: !1
    },
    onShareAppMessage: function() {
        return o.getShareData("偷偷安利给你，我平时躲在被窝里面看的那些漫bao画bei");
    },
    onUnload: function() {
        for (var e in this) this.hasOwnProperty(e) && this[e] && "function" == typeof this[e].unload && this[e].unload();
    },
    onLoad: function() {
        var e = this;
        console.log(this.data.pageRoute + " - onLoad"), (this.collectionCtrl = new l(this, {
            name: "collectionCtrl",
            style: "grid-column-3",
            canSelect: !0,
            showListState: !0,
            data: [],
            descFields: [ "desc_lated_seqno" ],
            onTap: function(t) {
                console.log("Tapped collection comic list! - ", t);
                var o = t.currentTarget.dataset.comicId;
                e.navigateTo("detail/detail", {
                    id: o
                });
            },
            onToggleSelect: function(t) {
                console.log("SelectToggled collection comic list! - ", t), e.checkAllSelected();
            },
            loadPage: function(e) {},
            comicHandler: function(e) {
                var t = e.read_seq;
                e.desc_lated_seqno = t + "话/" + e.lated_seqno + "话";
            }
        })).update();
        var t = this.historyCtrl = new l(this, {
            name: "historyCtrl",
            style: "plate",
            showContinueRead: !0,
            canSelect: !0,
            showListState: !0,
            data: [],
            descFields: [ "desc_artist", "desc_lated_seqno" ],
            onTap: function(t) {
                console.log("Tapped history comic list! - ", t);
                var o = t.currentTarget.dataset.comicId;
                "cover" == t.target.dataset.tapPart ? e.navigateTo("detail/detail", {
                    id: o
                }) : a.getHistory(o).then(function(t) {
                    var a = t.read_chapter || 0, l = t.read_seqno || 1;
                    e.navigateTo("view/view", {
                        id: o,
                        cid: a,
                        seqno: l
                    });
                });
            },
            onToggleSelect: function(t) {
                console.log("SelectToggled history comic list! - ", t), e.checkAllSelected();
            },
            loadPage: function(o, i) {
                var n = 30 * (o - 1);
                a.getHistoryList(n, 30).then(function(e) {
                    i(e), e && e.length < 30 && (t.state = l.STATES.OVER, t.update()), c(!(1 != o || e && e.length));
                }, function(e) {
                    c(1 == o);
                });
                var c = function(t) {
                    e.setData({
                        hasHistory: !t
                    });
                };
            },
            comicHandler: function(e) {
                var t = e.read_seqno;
                e.continue_read = t >= 1 ? "续看" + t : "开始阅读";
            }
        });
    },
    onShow: function(e) {
        var o = this;
        console.log(this.data.pageRoute + " - onShow:", e);
        var a = this.historyCtrl;
        a.setNormalMode(), a.prepareClear(), a.loadPage(), this.setData({
            currentMode: a.mode
        }), t.viewBackMessage.when("JumpToRecommendComicDetail", function(e) {
            var t = e.id;
            o.navigateTo("detail/detail", {
                id: t
            });
        });
    },
    getCurrentCtrl: function(e) {
        var t = this.data.currentTab;
        return {
            collection: this.collectionCtrl,
            history: this.historyCtrl
        }[e || t];
    },
    checkAllSelected: function() {
        var e = this.getCurrentCtrl();
        this.setData({
            allSelected: e.isAllSelected(),
            noSelected: e.isNoSelected()
        });
    },
    _changeComicListMode: function() {
        var e = this.getCurrentCtrl();
        e && e.switchMode(), this.setData({
            currentMode: e.mode
        });
    },
    _onTapTab: function(e) {
        var t = e.currentTarget.dataset.tabName, o = this.getCurrentCtrl();
        o.setNormalMode(), this.checkAllSelected(), this.setData({
            currentMode: o.mode,
            currentTab: t
        });
    },
    _toggleSelectAll: function() {
        var e = this.getCurrentCtrl();
        e.isAllSelected() ? e.unselectAll() : e.selectAll(), this.checkAllSelected();
    },
    _doDelete: function() {
        var e = this, t = this.getCurrentCtrl().getSelected();
        t.length < 1 || a.deleteHistoryList(t).then(function() {
            wx.showModal({
                showCancel: !1,
                title: "提示",
                content: "删除成功！"
            }), e.onShow();
        });
    }
});