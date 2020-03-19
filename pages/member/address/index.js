var t = getApp(), e = t.requirejs("core");

Page({
    data: {
        loaded: !1,
        list: []
    },
    onLoad: function(e) {
        t.url(e);
        wx.showModal({
          title: '提示',
          content: '亲亲，为保障您的账户安全，您账户可设置5个常用联系地址，每个地址系统最多可以修改一次，超出将不能修改，请一定准确提交地址，谨慎修改哦！',
          showCancel: false
        })
    },
    onShow: function() {
        this.getList();
        var e = this, a = t.getCache("isIpx");
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
    getList: function() {
        var t = this;
        e.get("member/address/get_list", {}, function(e) {
          console.log(e)
            t.setData({
                loaded: !0,
                list: e.list,
                show: !0
            });
        });
    },
  addersFn:function(e){
    console.log(this.data.list.length)
    if (this.data.list.length>=5){
      wx.showToast({
        title: '最多添加5个地址',
        icon:'none',
        duration:1500
      })
    }else{
      wx.navigateTo({
        url: 'post?type=member',
      })
    }
  },
    setDefault: function(t) {
        var a = this, i = e.pdata(t).id;
        a.setData({
            loaded: !1
        }), e.get("member/address/set_default", {
            id: i
        }, function(t) {
            e.toast("设置成功"), a.getList();
        });
    },
    deleteItem: function(t) {
        var a = this, i = e.pdata(t).id;
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