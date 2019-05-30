// pages/timetable/timetable.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isUserLogin:'',
    ip:getApp().globalData.ip,
    pickerIndex:0,
    currentArray: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    weekList:[
      {
        week:"周一",
        date:22
      },
      {
        week: "周二",
        date: 22
      },
      {
        week: "周三",
        date: 22
      },
      {
        week: "周四",
        date: 22
      },
      {
        week: "周五",
        date: 22
      },
      {
        week: "周六",
        date: 22
      },
      {
        week: "周日",
        date: 22
      }
      
    ],
    axisyList:[1,2,3,4,5,6,7,8,9,10,11,12],
    courseList:[
      
    ]

  },

  //需要获取当前周数
  currentPickerChange(e) {
    this.setData({
      pickerIndex: e.detail.value
    })
    this.getCourseListWithCookie({
      url: '/timetable?week='+this.data.currentArray[this.data.pickerIndex]

    })

  },

  /**
   * 获取课程表列表
   */

  getCourseListWithCookie:function(args){
      wx.showLoading({
        title: '加载中',
      })
      let that = this;
      let header = {
        'content-type': 'application/json; charset=utf-8',
        'cookie': "username=" + wx.getStorageSync("username") + ";usertoken=" + wx.getStorageSync("usertoken")
      };
       wx.request({
        url: this.data.ip + args.url,
        method: "GET",
        header: header,
        data: JSON.stringify(args.data),
        success(res) {
          let data = res.data;
          
          if(data.message == "success"){
            let classtemp = data.data.class;
            let arraytemp = [];
            //设置当前周
            if (args.url == '/timetable'){
              that.setData({
                pickerIndex: data.data.nowWeek - 1
              })
            }
           
            for(let i = 0, m = classtemp.length; i < m; i++){
              let obj = {
                className: classtemp[i].className,
                address: classtemp[i].address,
                teachers: classtemp[i].teachers,
                day: classtemp[i].day,
                skjc: classtemp[i].skjc,
                skcd: classtemp[i].skcd
              }
              arraytemp.push(obj);

            }
            that.setData({
              courseList:arraytemp
            })
            wx.hideLoading();
          }
          
        }
      })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (getApp().globalData.isUserLogin == false){
      wx.showModal({
        title: '',
        content: '请先登录!',
      })
    }else{
      this.getCourseListWithCookie({
        isUserLogin: getApp().globalData.isUserLogin,
        url: '/timetable'

      })
    }
    
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