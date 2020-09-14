// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: "",
    register: "",
    username:'',
    password:'',
    msg:'',
    _username: "",
    _password: "",
    tel: "",
    dre: "",
    truename: ""
  },
  enroll:function(){
    this.setData({
      login: "none",
      register: "block",
    });
  },
  login:function(){
    this.setData({
      login: "block",
      register: "none",
    });
  },
  fninputeditusername:function(e){
    var that=this;
    that.setData({
      username:e.detail.value
    });
  },
  fninputeditpassword:function(e){
    var that=this;
    that.setData({
      password:e.detail.value
    });
  },
  fnlogin:function(){
    var that=this;
    wx.request({
      url: 'http://localhost:8000/dcapi/login',
      method: 'POST',
      data: {
        username: that.data.username,
        password: that.data.password,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
          console.log(cc);

        if(cc.data.length>0)
        {
          console.log(cc.data[0].truename);
          wx.setStorageSync("currentuserid", cc.data[0].id);
          wx.setStorageSync("currentusertruename", cc.data[0].truename);
          wx.setStorageSync("currentusertruetel", cc.data[0].tel);
          wx.setStorageSync("currentusertrueaddress", cc.data[0].address);
          // wx.setStorageSync("username","tangyan")
          wx.showToast({
            title: '登录成功'
          });
          setTimeout(function () {
              wx.switchTab({
                url: '/pages/foodlist/foodlist',
              })
          }, 1000);
          that.setData({
            msg: ""
          });
        }
        else
        {
          that.setData({
            msg:"用户名或密码错误"
          });
        }
        
      }
    });
  },
  fninputusername:function(e){
    var that=this;
    that.setData({
      _username:e.detail.value
    });
  },
  fninputpassword:function(e){
    var that=this;
    that.setData({
      _password:e.detail.value
    });
  },
  fninputtel:function(e){
    var that=this;
    that.setData({
      tel:e.detail.value
    });
  },
  fninputdre:function(e){
    var that=this;
    that.setData({
      dre:e.detail.value
    });
  },
  fninputtruenames:function(e){
    var that=this;
    that.setData({
      truename:e.detail.value
    });
  },
  register:function(){
    var that=this;

    wx.request({
      url: 'http://localhost:8000/dcapi/reg',
      method: 'POST',
      data: {
        _username: that.data._username,
        _password: that.data._password,
        tel: this.data.tel,
        dre: this.data.dre,
        truename: this.data.truename,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
          console.log(cc);

        if(cc.data.length>0)
        {
          wx.showToast({
            title: '注册成功'
          });
          setTimeout(function () {
              wx.switchTab({
                url: '/pages/login/login',
              })
          }, 1000);
          that.setData({
            msg: ""
          });
        }
        else
        {
          that.setData({
            msg:"输入错误，请重新输入"
          });
        }
        
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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