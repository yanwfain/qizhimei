// pages/commission/list/index.js
var t = getApp(),
  e = t.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:"https://hcc.baike360.cn/kefu.png",
    titopst:'客服'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showToast({
    //   title: '亲亲，现在留言较多，非常抱歉未能第一时间回复您，请将您的问题留下，客服稍后会加快处理哈！请耐心等候哦！！！感谢感谢',
    //   icon:'none',
    //   duration:2500
    // })
    wx.showModal({
      title: '提示',
      content: '亲亲，现在留言较多，如未能第一时间回复您，真的万分抱歉，恳请您将问题留下，稍后客服会为您加快处理的！恳请您耐心等候哦！！！感谢感谢！！！',
      showCancel: false,
    })
    var opsl = this;
    e.get("member/sms/getSmsList", {
     
    }, function (data) {
      console.log(data)
      // var mm = this;
      opsl.setData({
        delit: data.list,
        custodelit: data.customer.is_read
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  lsit:function(e){
    console.log(e.currentTarget.dataset.title_name)
    console.log(e.currentTarget.dataset.openids)
    console.log(e.currentTarget.dataset.to_avatar)
    wx.navigateTo({
      url: "../downliao/index?title_name=" + e.currentTarget.dataset.title_name + "&openids=" + e.currentTarget.dataset.openids + '&avatar=' + e.currentTarget.dataset.to_avatar ,
    });
  },
  lsitFn:function(e){
    console.log(e.currentTarget.dataset.to_avatar)
    wx.navigateTo({
      url: "../downliao/index?title_name=" + this.data.titopst + "&openids=" + e.currentTarget.dataset.openids + '&avatar=' + this.data.img + "&kefu=" + "0",
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var opsl = this;
    e.get("member/sms/getSmsList", {

    }, function (data) {
      console.log(data)
      // var mm = this;
      opsl.setData({
        delit: data.list,
        custodelit: data.customer.is_read
      })
    });
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