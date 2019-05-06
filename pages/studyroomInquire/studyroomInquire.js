// pages/studyroomInquire/studyroomInquire.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentLocation:'当前地点',
    currentDay:'当前时间',
    locationList:[],
    dayList:[],
    titlexList:["教室","1-2节","3-4节","5-6节","7-9节","10-12节"],
  
    studyroomList:[
      {
        room:'7001',
        course:[
          "Y",
          "Y",
          "N",
          "N",
          "Y"
        ]
      },
      {
        room: '7001',
        course: [
          "Y",
          "Y",
          "N",
          "N",
          "Y"
        ]
      }
    ],
    currentArray:[
      ["今天","明天","后天"],
      ["鱼山新教", "鱼山旧教", "崂山二区", "崂山三区", "崂山四区", "崂山五区", "崂山六区", "崂山七区", "崂山八区"]
    ],
    currentIndex:[0,0,0] //记录选项，要考虑用缓存
  },
  /**
   * 记录发生改变的地点时间
   */
  currentPickerChange(e) {
    
    this.setData({
      currentIndex: e.detail.value
    })
    //触发后应该再触发请求
  },
  /**
   * 获取空教室列表
   */
  getStudyroomList(){

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