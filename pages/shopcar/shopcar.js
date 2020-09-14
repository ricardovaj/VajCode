// pages/shopcar/shopcar.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isshowpersoninfo:"none",
    btntxt:"去结算",
    carfoodlist:[],
    sumprice:0,
    date:'',
    sname:'',
    stel:'',
    ptime:'',
    saddress:'',
    memo:'',
  },

  
  fnsaveorder:function(){
    var that=this;
    var currentusertruename = wx.getStorageSync("currentusertruename");
    var currentuserid = wx.getStorageSync("currentuserid");
    console.log(currentusertruename);
    if(currentusertruename.length<1)
    {
        wx.showToast({
          title: '你还没有登录',
          icon:'none'
        });
        setTimeout(function(){
          wx.navigateTo({
            url: '/pages/login/login'
          });
        },2000);         
    }
    else
    {
      wx.request({
        url: 'http://localhost:8000/dcapi/saveorder',
        method: 'POST',
        data: {
          sumprice: that.data.sumprice,//总价
          sname: that.data.sname,
          stel: that.data.stel,
          saddress: that.data.saddress,
          ptime: that.data.ptime,
          memo: that.data.memo,
          userid: currentuserid,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        dataType: 'json',
        success(cc) {
          wx.setStorageSync('sumprice',0);
          wx.redirectTo({
            url: '/pages/myorder/myorder',
          });
        }
      });

    } 
  },
  bindDateChange:function(e){
    this.setData({
      ptime: e.detail.value
    });
  },
  fnsname:function(e){
    this.setData({
      sname: e.detail.value
    });
  },
  fntel:function(e){
    this.setData({
      stel: e.detail.value
    });
  },
  fnaddress: function (e) {
    this.setData({
      saddress: e.detail.value
    });
  },
  fnmemo: function (e) {
    this.setData({
      memo: e.detail.value
    });
  },

  fnjia:function(e){
    var id=e.currentTarget.dataset.id;
    this.fnchangenum(id,1);
  },
  fnjian:function(e){
    var id=e.currentTarget.dataset.id;
    this.fnchangenum(id,0);
  },

  fnchangenum:function(id,typeid){
    var that=this;
    wx.request({
      url: 'http://localhost:8000/dcapi/changecarnum',
      method: 'POST',
      data: {
        id:id,
        typeid:typeid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
        that.fngetdata();
      }
    });
  },
  fndeleteitembyid:function(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    wx.request({
      url: 'http://localhost:8000/dcapi/deleteitembyid',
      method: 'POST',
      data: {
        id:id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
        that.fngetdata();
      }
    });
  },

  fntap:function(){
      var that=this;
      if(that.data.btntxt=="确定下单" )
      {
        console.log("1111111===============")
          if (this.data.carfoodlist!=0) {
            that.fnsaveorder();
          }else{
            wx.showToast({
              title: '订餐后再下结算',
            })
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/foodlist/foodlist'
              })
            },2000)
          }
      }
      else
      {
        that.setData({
        isshowpersoninfo:"block",
        btntxt:"确定下单"
      });      
      }
  },
  fnback:function(){
    var that=this;
    that.setData({
      isshowpersoninfo:"none",
      btntxt:"结算"
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

    var that=this;
    var currentuserid=wx.getStorageSync('currentuserid');
    console.log(currentuserid);
    if(currentuserid==undefined||currentuserid==null||currentuserid=="")
    {
      wx.redirectTo({
        url: '/pages/login/login',
      });
    }
    else
    {
      that.fngetdata();
    }
    
  },
  fngetdata:function()
  {
    var that=this;
    var currentuserid=wx.getStorageSync('currentuserid');
    wx.request({
      url: 'http://localhost:8000/dcapi/getcarlist',
      method: 'POST',
      data: {
        userid :currentuserid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
        console.log(cc.data);
        var sum=0;
        var proallcount=0;
        cc.data.forEach(element => {
          proallcount+=element.procount;
          sum+=parseFloat(element.price)*parseFloat(element.procount);
        });
        wx.setStorageSync('sumprice',sum); //将openid存入本地缓存
        wx.setStorageSync('proallcount',proallcount); 
        that.setData({
          sumprice:sum,
          carfoodlist:cc.data//把后端查询出来的菜品列表信息存放到foodlist数组中
        });
      }
    });
  }
  ,
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