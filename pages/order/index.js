var t = getApp(), a = t.requirejs("core"), e = t.requirejs("biz/order"),s = (t.requirejs("jquery"), t.requirejs("core"));


Page({
    data: {
        icons: t.requirejs("icons"),
        status: "",
        list: [],
        page: 1,
        code: !1,
        cancel: e.cancelArray,
        cancelindex: 0
    },
    onLoad: function(a) {
        this.setData({
            options: a,
            status: a.status || ""
        }), t.url(a), this.get_list();
    },
    get_list: function() {
        var t = this;
        t.setData({
            loading: !0
        }), a.get("order/get_list", {
            page: t.data.page,
            status: t.data.status,
            merchid: 0
        }, function(e) {
          console.log(e)
            0 == e.error ? (t.setData({
                loading: !1,
                show: !0,
                total: e.total,
                empty: !0
            }), e.list.length > 0 && t.setData({
                page: t.data.page + 1,
                list: t.data.list.concat(e.list)
            }), e.list.length < e.pagesize && t.setData({
                loaded: !0
            })) : a.toast(e.message, "loading");
        }, this.data.show);
    },
    selected: function(t) {
        var e = a.data(t).type;
        this.setData({
            list: [],
            page: 1,
            status: e,
            empty: !1
        }), this.get_list();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.get_list();
    },
    repurchase:function(t){
      console.log(t.currentTarget.dataset.goods)
      console.log(t)
      var e = this;
      console.log(e)
      for (var g = 0; g< t.currentTarget.dataset.goods.length;g++){
        console.log(t.currentTarget.dataset.goods[g].goodsid)
       s.post("member/cart/add", {
         id: t.currentTarget.dataset.goods[g].goodsid,
         total: t.currentTarget.dataset.goods[g].total,
          optionid: false
        }, function (t) {
          console.log(t)
        wx.showToast({
          title: '加入购物车成功',
          icon:'none'
        })
        
        });
      }
      wx.switchTab({
        url: '../member/cart/index',
      })
     
    },
    code: function(t) {
        var e = this, s = a.data(t).orderid;
        a.post("verify/qrcode", {
            id: s
        }, function(t) {
            0 == t.error ? e.setData({
                code: !0,
                qrcode: t.url
            }) : a.alert(t.message);
        }, !0);
    },
    close: function() {
        this.setData({
            code: !1
        });
    },
    cancel: function(t) {
        var s = a.data(t).orderid;
        e.cancel(s, t.detail.value, "/pages/order/index?status=" + this.data.status);
    },
    delete: function(t) {
        var s = a.data(t).type, i = a.data(t).orderid;
        e.delete(i, s, "/pages/order/index", this);
    },
    finish: function(t) {
        a.data(t).type;
        var s = a.data(t).orderid;
        e.finish(s, "/pages/order/index");
    },
    onShareAppMessage: function() {
        return a.onShareAppMessage();
    }
});