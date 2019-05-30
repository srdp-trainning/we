// pages/bookperson/bookperson.js
Page({

  /**
   * 页面的初始数据
   */

  /**
   * 页面的初始数据
   */
  data: {
    // isUserLogin: '',
    studentNumber: '',
    switch1: false
  },
  switch1Change(e) {
    this.setData({
      switch1: e.detail.value
    })
    // console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },

  removeBinding: function () {
    wx.showLoading({
      title: '解除绑定中',
    })
    wx.clearStorageSync("username");
    wx.clearStorageSync("usertoken");
    getApp().globalData.isUserLogin = false;
    this.setData({
      isUserLogin: false
    })

    setTimeout(() => {
      wx.switchTab({
        url: '../../pages/index/index',
      })
      wx.hideLoading();
    }, 1000)


  },
  handleBorrowList:function(){
    wx.navigateTo({
      url: '../../pages/bookBorrowList/bookBorrowList',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  handleHistoryList:function(e){
    wx.navigateTo({
      url: '../../pages/bookHistoryList/bookHistoryList',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isUserLogin: getApp().globalData.isUserLogin,
      studentNumber: wx.getStorageSync("username")
    })
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
    this.onLoad();
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