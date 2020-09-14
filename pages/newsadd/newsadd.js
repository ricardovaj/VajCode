// pages/newslist/newslist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    news: "" 
  },
  fninputnews:function(e){
    var that=this;
    that.setData({
      news:e.detail.value
    });
  },
  refer: function(){
    var that=this;
    wx.request({
      url: 'http://localhost:8000/dcapi/news',
      method: 'POST',
      data: {
        username: that.data.username,
        news: that.data.news,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
        if(cc.data.length>0)
        {
          wx.showToast({
            title: '留言成功'
          });
          setTimeout(function () {
              wx.switchTab({
                url: '/pages/users/users',
              })
          }, 1000);
          that.setData({
            msg: ""
          });
        }
        else
        {
          that.setData({
            msg:"提交失败"
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentusertruename=wx.getStorageSync('currentusertruename');
    this.setData({
      username:currentusertruename,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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