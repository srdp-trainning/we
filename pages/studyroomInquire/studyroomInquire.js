// pages/studyroomInquire/studyroomInquire.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip:getApp().globalData.ip,
    currentLocation:'当前地点',
    currentDay:'当前时间',
    locationList:[],
    dayList:[],
    titlexList:["教室","1-2节","3-4节","5-6节","7-9节","10-12节"],
  
    studyroomList:[

    ],
    currentArray:[
      ["今天","明天","后天"],
      ["鱼山旧教", "鱼山新教", "崂山二区", "崂山三区", "崂山四区", "崂山五区", "崂山六区", "崂山七区", "崂山八区"]
    ],
    currentIndex:[0,0,0], //记录选项，要考虑用缓存
    scrollHeight:0    //scroll区域高度
  },
  /**
   * 计算json长度
   */
  calJsonLen:function(obj){
    let size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  },
  /**
   * 记录发生改变的地点时间
   */
  currentPickerChange(e) {
    
    this.setData({
      currentIndex: e.detail.value
    })
    //触发后应该再触发请求
    this.getStudyroomList();
  },
  /**
   * 获取空教室列表
   */
  getStudyroomList(){
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    wx.request({
      url: this.data.ip + '/class_info/GetBlankClassRoom?'
                            +'delta_day='+ this.data.currentIndex[0] + '&'
                            +'area_code=' + this.data.currentIndex[1] ,
      type:'get',
      success:function(res){
        
        //这是用的key value的方式
        let key, obj = res.data;
        let array = [];
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            let temp = {
              room: key,
              course: [
                obj[key][0],
                obj[key][2],
                obj[key][4],
                obj[key][6],
                obj[key][9]
              ]
            }
            array.push(temp);
          }
        }
        that.setData({
          studyroomList:array
        })
        wx.hideLoading();  
        
      },
      fail:function(){
        //失败了怎么操作
        wx.hideLoading();  
      }
    })
  },
  /**
   * 获取scroll区域的高度
   */
  getScrollHeight:function(){
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let ratio = 750 / clientWidth;
        let height = clientHeight * ratio;
        let temp = height - 295;
        that.setData({
          scrollHeight:temp
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStudyroomList();
    this.getScrollHeight();
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