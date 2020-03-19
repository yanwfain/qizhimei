// pages/commission/downliao/index.js
var t = getApp(),
  e = t.requirejs("core"),
  tp = t.requirejs("jquery"),
  n = t.requirejs("foxui");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    countPic:999999,//上传图片最大数量
    showImgUrl: "", //路径拼接，一般上传返回的都是文件名，
    uploadImgUrl: '',//图片的上传的路径
    images: [],
    imgs: [],
    images_img:[]
  },
  myEventListener: function (e) {
    console.log("上传的图片结果集合")
    console.log(e.detail.picsList)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.pageScrollToBottom()
    var query = wx.createSelectorQuery();
    //选择id

    console.log(options)
    this.setData({
      title_name: options.title_name,
      openids: options.openids,
      openid: t.getCache("userinfo_openid"),
      user: t.getCache("userinfo").avatarUrl,
      avatar: options.avatar,
      kefu:options.kefu
    })
    console.log(t.getCache("userinfo"))
    console.log(this.data.openid)
    console.log(this.data.title_name)
    wx.setNavigationBarTitle({
      title: options.title_name
    })
    var opsl = this
   if(opsl.data.kefu == "0"){
     e.get("member/sms/addCustomer", {
      //  to_openid: opsl.data.openids,
       // content: opsl.data.input_firm
     }, function (data) {
       console.log(data)
       e.get("member/sms/getCustomerContent", {
         id: data.id
       }, function (data) {
         console.log(data)
         // var mm = this;
         opsl.setData({
           last: data.content.last_time,
           delit: data.content.result,
           openidst: data.content.result[0].fire_openid
         })
         if (opsl.data.openidst == opsl.data.openid) {
           console.log('Y')
         } else {
           console.log('N')
         }
         console.log(data.content.result[0].fire_openid)
       });
     });
   }else{
     e.get("member/sms/addmemberSms", {
       to_openid: opsl.data.openids,
       // content: opsl.data.input_firm
     }, function (data) {
       console.log(data)
       e.get("member/sms/getMemberContent", {
         id: data.id
       }, function (data) {
         console.log(data)
         // var mm = this;
         opsl.setData({
           last: data.content.last_time,
           delit: data.content.result,
           openidst: data.content.result[0].fire_openid
         })
         if (opsl.data.openidst == opsl.data.openid) {
           console.log('Y')
         } else {
           console.log('N')
         }
         console.log(data.content.result[0].fire_openid)
       });
     });
   }

    var that = this;
    
    this.onReady
  },
  topic_preview: function (e) {
    console.log(e)
    
    var that = this;
    console.log(that.data.reg)
    var img = e.currentTarget.dataset.img;
    // that.setData({
    //   images_img: img
    // })
    that.data.images_img.push(img)
    console.log(that.data.images_img)
    // var url = e.currentTarget.dataset.url;
    // var previewImgArr = [];
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    // var data = that.data.topic_recomData;
    // for (var i in data) {
    //   if (id == data[i].id) {
    //     previewImgArr = data[i].pic;
    //   }
    // }
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: that.data.images_img// 需要预览的图片http链接列表
    })
  },
  upload: function (t) {
    // console.log(t)
    var that = this, s = e.data(t), i = s.type, o =that.data.images, n = that.data.imgs, r = s.index;
    "image" == i ? e.upload(function (t) {
      console.log(t)
      if (that.data.kefu == "0") {
        e.get("member/sms/addCustomer", {
          //  to_openid: opsl.data.openids,
          content:t.url,
          is_img:2
        }, function (data) {
          console.log(data)
          e.get("member/sms/getCustomerContent", {
            id: data.id
          }, function (data) {
            console.log(data)
            // var mm = this;
            that.setData({
              last: data.content.last_time,
              delit: data.content.result,
              openidst: data.content.result[0].fire_openid
            })
            if (that.data.openidst == that.data.openid) {
              console.log('Y')
            } else {
              console.log('N')
            }
            console.log(data.content.result[0].fire_openid)
          });
        });
      } else {
        e.get("member/sms/addmemberSms", {
          to_openid: that.data.openids,
          content: t.url,
           is_img: 2
        }, function (data) {
          console.log(data)
          e.get("member/sms/getMemberContent", {
            id: data.id
          }, function (data) {
            console.log(data)
            // var mm = this;
            that.setData({
              last: data.content.last_time,
              delit: data.content.result,
              openidst: data.content.result[0].fire_openid
            })
            if (that.data.openidst == that.data.openid) {
              console.log('Y')
            } else {
              console.log('N')
            }
            console.log(data.content.result[0].fire_openid)
          });
        });
      }
      console.log(that.data.reg);
      o.push(t.filename), n.push(t.url), that.setData({
        images: o,
        imgs: n,
        'reg.img_url': o
      });
      console.log(that.data.imgpush)
      if (that.data.imgpush || that.data.imgpush != undefined) {
        // o.push(that.data.imgpush)
        for (i = 0; i < that.data.imgpush.length; i++) {
          o.push(that.data.imgpush[i])
        }
        that.setData({
          'reg.img_url': o
        })
        console.log(that.data.reg)
      }
      // r.push(this)
    }) : "image-remove" == i ? (o.splice(r, 1), n.splice(r, 1),that.setData({
      images: o,
      imgs: n
    })) : "image-preview" == i && wx.previewImage({
      current: n[r],
      urls: n
    });
    console.log(this.data.images)
    console.log(this.data.imgs)
    console.log(this.data.reg);
    this.onReady()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // bindconfirm:function(e){
  //   console.log(111)
  //   var ops =event.detail = { value: value }
  //   alert(ops)
  //   console.log(ops)
  // },
  getTextareaInput: function (e) {
    console.log(e.detail.value)
    var that = this;
    // var discountName = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value
    // console.log('e.detail.value', discountName)
    this.setData({
      input_firm: e.detail.value
    })
    console.log(this.data.input_firm)
  },
  pageScrollToBottom: function () {
    wx.createSelectorQuery().select('#ops').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      console.log(rect)
      wx.pageScrollTo({
        scrollTop:999999
      })
    }).exec()
  },
  faFn: function () {
    this.pageScrollToBottom()
    wx.createSelectorQuery().select('#ops').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      console.log(rect)
      wx.pageScrollTo({
        scrollTop: 999999
      })
    }).exec()
    console.log(t.userInfo)
    console.log(t.getCache("userinfo_openid"))
    var opsl = this
    // this.data.input_firm
    if (this.data.input_firm == ""){
      wx.showToast({
        title: '不能发送空白消息',
      })
    }else{
      this.onReady()
      var opsl = this
      if (opsl.data.kefu == "0") {
      
    
            e.get("member/sms/addCustomer", {
              // to_openid: opsl.data.openids,
              content: opsl.data.input_firm
            }, function (data) {
              console.log(data)
              e.get("member/sms/getCustomerContent", {
                id: data.id
              }, function (data) {
                console.log(data)
                // var mm = this;
                opsl.setData({
                  last: data.content.last_time,
                  delit: data.content.result
                })
              });
            });
        
       
      } else {
      
            e.get("member/sms/addmemberSms", {
              to_openid: opsl.data.openids,
              content: opsl.data.input_firm
            }, function (data) {
              console.log(data)
              e.get("member/sms/getMemberContent", {
                id: data.id
              }, function (data) {
                console.log(data)
                // var mm = this;
                opsl.setData({
                  last: data.content.last_time,
                  delit: data.content.result
                })
              });
            });
      
      }
  
      // e.get("member/sms/addmemberSms", {
      //   to_openid: this.data.openids,
      //   content: this.data.input_firm
      // }, function (data) {
      //   console.log(data)
      //   e.get("member/sms/getMemberContent", {
      //     id: data.id
      //   }, function (data) {
      //     console.log(data)
      //     // var mm = this;
      //     opsl.setData({
      //       last: data.content.last_time,
      //       delit: data.content.result
      //     })
      //     // var lsi = {view:}
      //     // var listopst = opsl.data.delit
      //     // var ops =null
      //     // listopst.push(ops)
      //     // opsl.setData({
      //     //   delit: listopst
      //     // })
        
      //   });
      // });
    }
    // e.get("member/sms/addmemberSms", {
    //   to_openid: this.data.openids,
    //   content: this.data.input_firm
    // }, function (data) {
    //   console.log(data)
    //   e.get("member/sms/getMemberContent", {
    //     id: data.id
    //   }, function (data) {
    //     console.log(data)
    //     // var mm = this;
    //     opsl.setData({
    //       last:data.content.last_time,
    //       delit: data.content.result
    //     })
        
    //   });
    // });
    this.setData({
      input_firm:""
    })
    console.log(this.data.delit)
  },
  onReady: function () {
    wx.createSelectorQuery().select('#ops').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      console.log(rect)
      wx.pageScrollTo({
        scrollTop: 99999
      })
    }).exec()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // wx.createSelectorQuery().select('.cont').boundingClientRect(function (rect) {
    //   console.log(rect)
    //   that.setData({
    //     height: rect.height
    //   })
    // }).exec();
    var opsl = this
    if(opsl.data.kefu=="0"){
      opsl.setData({
        timm: setInterval(function () {
          e.get("member/sms/addCustomer", {
            // to_openid: opsl.data.openids,
            // content: opsl.data.input_firm
          }, function (data) {
            console.log(data)
            e.get("member/sms/getCustomerContent", {
              id: data.id
            }, function (data) {
              console.log(data)
              // var mm = this;
              if (opsl.data.last_time != data.content.last_time){
                wx.createSelectorQuery().select('#ops').boundingClientRect(function (rect) {
                  // 使页面滚动到底部
                  console.log(rect)
                  wx.pageScrollTo({
                    scrollTop: 99999
                  })
                }).exec()
                opsl.setData({
                  last_time: data.content.last_time
                })
              }
              opsl.setData({
                last: data.content.last_time,
                delit: data.content.result
              })
            });
          });
        }, 3000)
        
      })
    }else{
      opsl.setData({
        timm: setInterval(function () {
          e.get("member/sms/addmemberSms", {
            to_openid: opsl.data.openids,
            // content: opsl.data.input_firm
          }, function (data) {
            console.log(data)
            e.get("member/sms/getMemberContent", {
              id: data.id
            }, function (data) {
              console.log(data)
              // var mm = this;
              if (opsl.data.last_time != data.content.last_time) {
                wx.createSelectorQuery().select('#ops').boundingClientRect(function (rect) {
                  // 使页面滚动到底部
                  console.log(rect)
                  wx.pageScrollTo({
                    scrollTop: 99999
                  })
                }).exec()
                opsl.setData({
                  last_time: data.content.last_time
                })
              }
              opsl.setData({
                last: data.content.last_time,
                delit: data.content.result
              })
            });
          });
        }, 3000)
      })
    }

    
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
    clearInterval(this.data.timm)
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