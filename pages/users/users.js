// pages/users/users.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentusertruename: "",
  },

  fnlogout: function () {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },

  toNews: function () {
    wx.navigateTo({
      url: '/pages/newsadd/newsadd',
    })
  },
  newcar: function () {
    wx.navigateTo({
      url: '/pages/newcar/newcar',
    })
  },
  toNone: function () {
    wx: wx.navigateTo({
      url: '/pages/myorder/myorder',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentusertruename = wx.getStorageSync('currentusertruename');
    this.setData({
      currentusertruename: currentusertruename,
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
    // var that = this;
    // that.setData({
    //   currentusertruename:"请登录"
    // })
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