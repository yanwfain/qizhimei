var t = getApp(),
  e = t.requirejs("core");


Page({
  data: {
    loaded: !1,
    list: []
  },
  onLoad: function(e) {
    t.url(e);
    console.log(e)
  },
  onShow: function() {
    this.getList();
    var e = this,
      a = t.getCache("isIpx");
    console.error(a), a ? e.setData({
      isIpx: !0,
      iphonexnavbar: "fui-iphonex-navbar",
      paddingb: "padding-b"
    }) : e.setData({
      isIpx: !1,
      iphonexnavbar: "",
      paddingb: ""
    });
  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },
  bianjiFn: function(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../fapiao-ji/index?id=" + e.currentTarget.dataset.id
    })
  },
  addnewFn: function(e) {
    wx.navigateTo({
      url: "../fapiao-delits/index"
    })
  },
  select: function (x) {
    var i = e.pdata(x).index;
    console.log(this.data.list[i])
    t.setCache("opsfapiao", this.data.list[i], 30);
    console.log(t.getCache("opsfapiao"))
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      invoice_name: x.currentTarget.dataset.invoice_name,
      invoice_num: x.currentTarget.dataset.invoice_num,
      id: x.currentTarget.dataset.id,
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  deleFn: function(x) {
    console.log(x.currentTarget.dataset.id)
    var t = this
    wx.showModal({
      title: '提示',
      content: '确定要删除么？',
      success: function(res) {
        if (res.confirm) {
          // var t = this;
          e.get("member/invoice/delete", { id: x.currentTarget.dataset.id}, function (e) {
            console.log(e)
            t.getList()
          });
        } else {
          console.log(res);
        }
      },
      fail: function(res) {
        console.log(res);
      }
    })
  },
  getList: function() {
    var t = this;
    e.get("member/invoice/get_list", {}, function(e) {
      console.log(e)
      t.setData({
        loaded: !0,
        list: e.list,
        show: !0
      });
    });
  },
  setDefault: function(t) {
    var a = this,
      i = e.pdata(t).id;
    a.setData({
      loaded: !1
    }), e.get("member/address/set_default", {
      id: i
    }, function(t) {
      e.toast("设置成功"), a.getList();
    });
  },
  deleteItem: function(t) {
    var a = this,
      i = e.pdata(t).id;
    e.confirm("删除后无法恢复, 确认要删除吗 ?", function() {
      a.setData({
        loaded: !1
      }), e.get("member/address/delete", {
        id: i
      }, function(t) {
        e.toast("删除成功"), a.getList();
      });
    });
  }
});