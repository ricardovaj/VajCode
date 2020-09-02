// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodlist:[],
    cookerlist:[],
    viewpagerlist:[]
  },

// icon功能跳转
iconwaimai:function () {
  wx.switchTab({
    url: '/pages/foodlist/foodlist',
  })
},
icondiancan:function (){
  wx.switchTab({
    url: '/pages/foodlist/foodlist',
  })
},

  
fngotocookerview:function(id,name){
  //通过点击事件里面的事件对象e获取组件上面绑定的属性值，这些属性属于自定义属性，必须以data-开头。
  var that = this
  var id=ex.currentTarget.dataset.id;
  wx.navigateTo({
    url: '/pages/cookerview/cookerview?id='+id,
  })
},

fngotofoodview:function(ex){
  //通过点击事件里面的事件对象e获取组件上面绑定的属性值，这些属性属于自定义属性，必须以data-开头。
  var id=ex.currentTarget.dataset.id;
  wx.navigateTo({
    url: '/pages/foodview/foodview?id='+id,
  })
},

fncookerview:function (){
  wx.navigateTo({
    url: '../cookerview/cookerview',
  })
},

// 事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../../pages/logs/'
    })
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
    this.getviewpagerlistbyrandom();
    setTimeout(() => {that.getcookerlist();}, 100);
    setTimeout(() => {that.getfoodlist();}, 200);
    // setTimeout(that.getcookerlist(),100);
  },

  //pptlist
  getviewpagerlistbyrandom:function () {
    var that=this;
    //在此处编写请求首页菜品数据的逻辑代码
  wx.request({
    url: 'http://localhost:8000/dcapi/getviewpagerlistbyrandom',
    method: 'POST',
    data: {
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    dataType: 'json',
    success(cc) {
      console.log(cc.data);
      that.setData({
        viewpagerlist:cc.data//把后端查询出来的菜品列表信息存放到foodlist数组中
      });
    }
  });
  },

  //cookerlis请求
  getcookerlist:function(){
    var that=this;
      //在此处编写请求首页菜品数据的逻辑代码
    wx.request({
      url: 'http://localhost:8000/dcapi/getcookerlistbyrandom',
      method: 'POST',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
        console.log(cc.data);
        that.setData({
          cookerlist:cc.data//把后端查询出来的菜品列表信息存放到foodlist数组中
        });
      }
    });
  },

  getfoodlist:function(){
    var that=this;
      //在此处编写请求首页菜品数据的逻辑代码
    wx.request({
      url: 'http://localhost:8000/dcapi/getfoodlistbyrandom',
      method: 'POST',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
        console.log(cc.data);
        that.setData({
          foodlist:cc.data//把后端查询出来的菜品列表信息存放到foodlist数组中
        });
      }
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