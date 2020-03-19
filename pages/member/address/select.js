var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        loaded: !1,
        list: []
    },
    onLoad: function(a) {
        t.url(a);
    },
    onShow: function() {
        this.getList();
        var a = this;
        t.getCache("isIpx") ? a.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar",
            paddingb: "padding-b"
        }) : a.setData({
            isIpx: !1,
            iphonexnavbar: "",
            paddingb: ""
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getList: function() {
        var t = this;
        a.get("member/address/get_list", {}, function(a) {
            t.setData({
                loaded: !0,
                list: a.list,
                show: !0
            });
        });
    },
  addersFn: function (e) {
    console.log(this.data.list.length)
    if (this.data.list.length >= 5) {
      wx.showToast({
        title: '最多添加5个地址',
        icon: 'none',
        duration: 1500
      })
    } else {
      wx.navigateTo({
        url: 'post?type=member',
      })
    }
  },
    select: function(e) {
        var i = a.pdata(e).index;
        t.setCache("orderAddress", this.data.list[i], 30), wx.navigateBack();
    }
});