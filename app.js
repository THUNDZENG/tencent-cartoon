var e = require("./public/util.js"), i = require("./public/net-api.js"), n = require("./public/view-back-message.js");

App({
    util: e,
    netAPI: i,
    viewBackMessage: n,
    pages: [ "index/index", "bookshelf/bookshelf", "category/category", "search/search", "list-simple/list-simple", "list-rank/list-rank", "detail/detail", "view/view", "detail/chapter-list" ],
    onLaunch: function() {},
    getScreenSize: function(e) {
        var i = this, n = this.globalData.screenSize;
        n ? "function" == typeof e && e(n) : wx.getSystemInfo({
            success: function(t) {
                n = i.globalData.screenSize = {
                    width: t.windowWidth,
                    height: t.windowHeight
                }, "function" == typeof e && e(n);
            }
        });
    },
    getUserInfo: function(e) {
        var i = this, n = this.globalData.userInfo;
        n ? "function" == typeof e && e(n) : wx.login({
            success: function(t) {
                console.log("loginInfo:", t), wx.getUserInfo({
                    success: function(t) {
                        console.log("userInfo:", t), n = i.globalData.userInfo = t.userInfo, "function" == typeof e && e(n);
                    }
                });
            }
        });
    },
    globalData: {
        userInfo: null,
        screenSize: null
    }
});