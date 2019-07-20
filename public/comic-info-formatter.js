var e = require("./util.js"), t = module.exports = {
    joinComicTags: function(t, i) {
        var n = [], r = t.theme || [];
        if (e.isArray(r)) n = r; else for (var o in r) r.hasOwnProperty(o) && n.push(r[o]);
        return t.desc_tags = n.join(i || " | "), t;
    },
    getFirstComicTag: function(t) {
        var i = "其它", n = t.theme || [];
        if (e.isArray(n)) i = n[0]; else for (var r in n) if (n.hasOwnProperty(r)) {
            i = n[r];
            break;
        }
        return t.desc_tag = i, t;
    },
    formatComicUpdateTime: function(t) {
        t.desc_update = t.update_time ? e.formatTime(1e3 * t.update_time, "yyyy-MM-dd") + " 更新" : "近期更新";
    },
    getComicSeqNo: function(e) {
        e.desc_lated_seqno = "更新到" + (e.lated_seqno || "??") + "话";
    },
    getArtistName: function(e) {
        e.desc_artist = "作者：" + (e.artist_name || "佚名");
    },
    getPgvCount: function(t) {
        var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        t.desc_pgv_count = i + (t.pgv_count ? e.unifyNumber(t.pgv_count) : "人气爆表");
    },
    handleIntro: function(e) {
        e.brief_intrd = (e.brief_intrd || "").replace(/[\r\n]/g, " ");
    },
    commonComicHandler: function(e) {
        return t.handleIntro(e), t.getPgvCount(e, "人气："), t.joinComicTags(e, " "), t.formatComicUpdateTime(e), 
        t.getComicSeqNo(e), t.getArtistName(e), e;
    }
};