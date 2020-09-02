// pages/foodlist/foodlist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carfoodlist:[],
    foodlist:[],
    key:'',
    foodid:"",
    buynum:1,  //数量计数
    sunprice:"",//总价
    FoodLength:0,
    foodid:'',
    sumprice:"",
    proallcount:0
  },
// 加操作
  fnjia:function(e){
    // this.getid();
    
    var foodData = e.currentTarget.dataset.food;
    var has = this.data.carfoodlist.findIndex(item => item.id == foodData.id)
    if(has == -1){
      this.data.carfoodlist.push(foodData)
    } else{
      this.data.carfoodlist[has].buynum += 1
    }
    console.log(this.data.carfoodlist)
    this.setData({
      carfoodlist: this.data.carfoodlist
    })
    app.globalData.cartList = this.data.carfoodlist
   


    
    // var oldnum = this.data.buynum;
    // oldnum++;
    // // var sum = oldnum * price;
    // this.setData({
    //   buynum:oldnum,
    // })
  },
  //获取id
  getid:function (e) {
    e.target.dataset.id;
    var that=this;
     console.log(options.id);
     var id=options.id;
     wx.request({
      url: 'http://localhost:8000/dcapi/getfoodbyid',
      method: 'POST',
      data: {
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
        console.log(cc.data);
        that.setData({
          foodid:cc.data[0].id,
          // foodprice:cc.data[0].price,
          // sumprice:cc.data[0].price,
          // proname: cc.data[0].proname,
          // brief: cc.data[0].brief,
          // descriptions: cc.data[0].descriptions,
          imgurl:"http://localhost:8000/static/uploadimg/"+cc.data[0].imgurl
        });
      }
    });

  },
//减值操作
fnjian:function () {
  var oldnum = this.data.buynum;
  if(oldnum>1){
    oldnum--
    // var sum = oldnum *price;
    this.setData({
      buynum:oldnum
    })
  }
},

  fngotofoodview:function(ex){
    var id=ex.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/foodview/foodview?id='+id,
    })
  },

  GoPay:function () {
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
    }else{
      wx.navigateTo({
        url: '/pages/shopcar/shopcar',
      })
    }



    
     
  },


  fnsearchinputchange:function(e){
    var that = this;
    var curvalue = e.detail.value;
    getApp().globalData.key=curvalue;
    console.log(curvalue);
    that.fngetdata();
  },

  
  fngetdata:function()
  {
    var that=this;
    var key=getApp().globalData.key;
    if(key==undefined||key==null||key=="undefined")
    {
      key="";
    }
    wx.request({
      url: 'http://localhost:8000/dcapi/getfoodlist',
      method: 'POST',
      data: {
        key:key
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


  fndianwo:function(){
   
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
    var sumprice = wx.getStorageSync('sumprice');
    var proallcount=wx.getStorageSync('proallcount');
    if(sumprice==null||sumprice==undefined||sumprice==""||sumprice=="undefined")
    {
      this.setData({
        sumprice:0        
      });
    }
    else
    {
      this.setData({
        sumprice:sumprice
      });
    }

    if(proallcount==null||proallcount==undefined||proallcount==""||proallcount=="undefined")
    {
      this.setData({
        proallcount:0        
      });
    }
    else
    {
      this.setData({
        proallcount:proallcount      
      });
    }
  
    
    this.data.carfoodlist = app.globalData.cartList;
    // console.log("onshow")
    console.log(app.globalData.cartList)
    this.setData({
      carfoodlist:this.data.carfoodlist
    })


    var v=getApp().globalData.key;
    console.log(v);
    this.setData({
      key:v
    });
    this.fngetdata();

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