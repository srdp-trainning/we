// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip:getApp().globalData.ip,
    studentNumber:'',
    password:''
  },
  
  /**
   * 同步学号
   */
  bindSNumberInput:function(e){
    this.setData({
      studentNumber: e.detail.value
    })
   
  },
  bindPwdInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  /**
   * 绑定按钮提交函数
   */
  handleBindButtonClick:function(){
   wx.showLoading({
     title: '登录中',
   })
    wx.request({
      url: this.data.ip + '/login',
      method:'POST',
      data:{
        username: this.data.studentNumber,
        password: this.data.password
      },
      success:function(res){
        if(res.data.message == "success"){
         
          //用户信息存到本地
          wx.setStorageSync("username",res.data.data.username);
          wx.setStorageSync("usertoken", res.data.data.usertoken);
          getApp().globalData.isUserLogin = true;
          // wx.setStorageSync("sessionid", res.header["Set-Cookie"]);

          // wx.navigateBack({
          //   delta: 1
          // })
          wx.hideLoading();
          wx.switchTab({
            url: '../../pages/index/index',
          })
        }else{
          wx.hideLoading();
          wx.showToast({
            title: '登录失败，请重试!',
            icon: 'none',
            duration: 2000
          })
        }
      }
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.handleBindButtonClick();
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