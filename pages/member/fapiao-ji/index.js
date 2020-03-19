// pages/member/fapiao-ji/index.js
var t = getApp(), e = t.requirejs("core"), a = t.requirejs("foxui"), i = t.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    var that = this
    that.getDetail()
  },
  getDetail: function () {
    var that = this
    var t = this, a = t.data.id;
    e.get("member/invoice/get_detail", {
      id: a
    }, function (res) {
      console.log(res)
      that.setData({
        name: res.invoice_name,
        num: res.invoice_num,
        address: res.address,
        bank: res.bank,
        bank_num: res.bank_num,
        mobile: res.mobile,
      })
        var r = e.detail.province + " " + e.detail.city + " " + e.detail.area, s = t.getIndex(r, t.data.areas);
        a.pval = s, a.pvalOld = s, a.detail = e.detail;
      // }
      t.setData(a), e.openstreet && s && t.getStreet(t.data.areas, s);
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  inpt:function(e){
    this.setData({
      name:e.detail.value
    })
    console.log(this.data.name)
  },
  inpts:function(e){
    this.setData({
      num: e.detail.value
    })
    console.log(this.data.num)
  },
  inpts1: function (e) {
    this.setData({
      address: e.detail.value
    })
    console.log(this.data.address)
  },
  inpts2: function (e) {
    this.setData({
      mobile: e.detail.value
    })
    console.log(this.data.mobile)
  },
  inpts3: function (e) {
    this.setData({
      bank: e.detail.value
    })
    console.log(this.data.bank)
  },
  inpts4: function (e) {
    this.setData({
      bank_num: e.detail.value
    })
    console.log(this.data.bank_num)
  },
  btnFn:function(){
    var that = this
    var t = this, a = t.data.id;
    e.get("member/invoice/submit", {
      id: t.data.id,
      invoice_name:t.data.name,
      invoice_num:t.data.num,
      address:t.data.address,
      mobile: t.data.mobile,
      bank: t.data.bank,
      bank_num: t.data.bank_num
    }, function (res) {
      console.log(res)
      wx.navigateBack({
        delta: 1,
      })
      // wx.reLanch({
      //   url: "../fapiao/index"
      // })
      wx.showToast({
        title: '修改成功',
      })
      // var r = e.detail.province + " " + e.detail.city + " " + e.detail.area, s = t.getIndex(r, t.data.areas);
      // a.pval = s, a.pvalOld = s, a.detail = e.detail;
      // // }
      // t.setData(a), e.openstreet && s && t.getStreet(t.data.areas, s);
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})