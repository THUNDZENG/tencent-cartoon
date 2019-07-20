function t(t) {
    return t.id && (t.comic_id = t.id, delete t.id), t;
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, s = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../public/ac-page")), o = getApp(), r = o.util, i = o.netAPI, a = (require("../public/comic-info-formatter.js"), 
require("../public/comic-list/comic-list-controller.js"));

(0, s.default)({
    data: {
        pageRoute: "search/search",
        hotWords: [],
        historyWords: [],
        relateWords: [],
        resetText: "",
        searchText: "",
        showRecommend: !0,
        showResult: !1,
        showResultEmpty: !1,
        resultListCtrl: {
            data: []
        }
    },
    allHotWords: [],
    hotWordsOffset: 0,
    hotWordsPageSize: 6,
    historyStorageKey: "searchHistoryWords",
    searchWord: null,
    resultPageSize: 10,
    onShareAppMessage: function() {
        return r.getShareData("偷偷安利给你，我平时躲在被窝里面看的那些漫bao画bei");
    },
    onUnload: function() {
        for (var t in this) this.hasOwnProperty(t) && this[t] && "function" == typeof this[t].unload && this[t].unload();
    },
    onLoad: function() {
        var e = this;
        console.log(this.data.pageRoute + " - onLoad"), this.refreshHistory(), i.get("Search/recommend", function(o) {
            var r = o.data.map(t);
            e.allHotWords = r, e.hotWordsOffset = 0, e.refreshHotWords(), s.setData(r);
        });
        var s = this.recommendListCtrl = new a(this, {
            name: "recommendListCtrl",
            style: "simple",
            data: [],
            descFields: [ "desc_artist", "desc_lated_seqno", "brief_intrd" ],
            onTap: function(t) {
                console.log("Tapped search recommend list! - ", t);
                var s = t.currentTarget.dataset.comicId;
                e.navigateTo("detail/detail", {
                    id: s
                });
            }
        }), o = this.resultListCtrl = new a(this, {
            name: "resultListCtrl",
            style: "simple",
            data: [],
            showListState: !0,
            descFields: [ "desc_artist", "desc_lated_seqno", "brief_intrd" ],
            onTap: function(t) {
                console.log("Tapped search result list! - ", t);
                var s = t.currentTarget.dataset.comicId, r = o.data.filter(function(t) {
                    return t.comic_id == s;
                })[0], i = r && r.title;
                i && (e.addHistory({
                    comic_id: s,
                    title: i
                }), e.refreshHistory()), e.navigateTo("detail/detail", {
                    id: s
                });
            },
            loadPage: function(t, s) {
                wx.showToast({
                    title: "搜索中",
                    icon: "loading",
                    duration: 1e4
                }), e.loadResultPage(t, function(r) {
                    wx.hideToast();
                    var i = r && r.length;
                    s(r || []), 1 == t && i && r.length < e.resultPageSize && o.loadPage();
                    var a = 1 != t || i;
                    e.setData({
                        showRecommend: !1,
                        showResult: a,
                        showResultEmpty: !a
                    });
                });
            }
        });
    },
    refreshHistory: function() {
        this.setData({
            historyWords: this.getHistory()
        });
    },
    getHistory: function() {
        return (wx.getStorageSync(this.historyStorageKey) || []).map(t);
    },
    addHistory: function(t) {
        var s = this.getHistory();
        "object" != (void 0 === t ? "undefined" : e(t)) && (t = {
            comic_id: "-" + new Date().getTime(),
            title: String(t)
        }), (s = s.filter(function(e) {
            return e.comic_id != t.comic_id && e.title != t.title;
        })).unshift(t), wx.setStorageSync(this.historyStorageKey, s);
    },
    clearHistory: function() {
        wx.clearStorageSync(this.historyStorageKey);
    },
    refreshHotWords: function() {
        var t = this.hotWordsPageSize, e = this.allHotWords, s = (e.length, this.hotWordsOffset), o = e.slice(s, s + t);
        o.length < t && (o = o.concat(0, t - o.length)), this.setData({
            hotWords: o
        });
    },
    showSearchList: function(t) {
        this.searchWord = t, this.resultListCtrl.clearList(), this.resultListCtrl.loadPage();
    },
    loadResultPage: function(t, e) {
        var s = {
            word: this.searchWord,
            page: t
        };
        i.get({
            api: "Search/result",
            data: s
        }, function(t) {
            e(t.data);
        }, function(t) {
            console.log("Got search result error: ", t), e(null);
        });
    },
    _clearSearchText: function() {
        this.setData({
            resetText: ""
        }), this._onTextChange({
            detail: {
                value: ""
            }
        });
    },
    _onTextChange: function(e) {
        var s = this;
        console.log("change: ", e.detail.value);
        var o = e.detail.value.replace(/(^\s+|\s+$)/, "");
        if (o.length < 2) this.setData({
            showRecommend: !0,
            showResult: !1,
            showResultEmpty: !1,
            searchText: o,
            relateWords: []
        }); else {
            this.setData({
                showRecommend: !0,
                showResult: !1,
                showResultEmpty: !1,
                searchText: o
            });
            var r = {
                word: o
            };
            i.get({
                api: "Search/relate",
                data: r
            }, function(e) {
                var o = e.data.map(t);
                s.setData({
                    relateWords: o
                });
            });
        }
    },
    _doSearch: function() {
        console.log("do search: ", this.data.searchText);
        var t = this.data.searchText;
        t.length < 1 || (this.addHistory(t), this.refreshHistory(), this.showSearchList(t));
    },
    _changeHotWordsOffset: function() {
        var t = this.hotWordsPageSize, e = this.allHotWords.length, s = this.hotWordsOffset;
        this.hotWordsOffset = (s + t) % e, this.refreshHotWords();
    },
    _goComicDetail: function(t) {
        var e = t.currentTarget.dataset.comicId, s = t.currentTarget.dataset.comicTitle;
        "-" != String(e)[0] ? (this.addHistory({
            comic_id: e,
            title: s
        }), this.refreshHistory(), this.navigateTo("detail/detail", {
            id: e
        })) : (this.setData({
            resetText: s,
            searchText: s
        }), this.addHistory(s), this.refreshHistory(), this.showSearchList(s));
    },
    _clearSearchHistory: function() {
        this.clearHistory(), this.refreshHistory();
    }
});