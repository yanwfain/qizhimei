var t = getApp().requirejs("core");

Page({
    data: {
        level: 1,
        page: 1,
        list: []
    },
    onLoad: function() {
        this.getSet(), this.getList();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getSet: function() {
        var e = this;
        t.get("commission/down/get_set", {}, function(t) {
            wx.setNavigationBarTitle({
                title: t.textdown + "(" + t.total + ")"
            }), delete t.error, t.show = !0, e.setData(t);
        });
    },
    getList: function() {
        var e = this;
        t.get("commission/down/get_list", {
            page: e.data.page,
            level: e.data.level
        }, function(t) {
          console.log(t)
          e.setData({
            openid: t.list[0].openid
          })
            var a = {

                total: t.total,
                pagesize: t.pagesize
            };
            t.list.length > 0 && (a.page = e.data.page + 1, a.list = e.data.list.concat(t.list), 
            t.list.length < t.pagesize && (a.loaded = !0)), e.setData(a);
        }, this.data.show);
    },
    myTab: function(e) {
        var a = this, i = t.pdata(e).level;
        a.setData({
            level: i,
            page: 1,
            list: []
        }), a.getList();
    },
  fuiFn:function(e){
    console
    wx.navigateTo({
      url: "../downliao/index?title_name=" + e.currentTarget.dataset.name + "&openids=" + e.currentTarget.dataset.openids + "&avatar=" + e.currentTarget.dataset.avatar ,
    });
      // pages / commission / downliao / index
  }
});