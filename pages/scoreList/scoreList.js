// pages/scoreList/scoreList.js

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    ip: getApp().globalData.ip,
    info_list:
      [
        {
          "className": "课程名1",
          "credit": "3.0",
          "classType": "限选课/学科基础",
          "studyType": "初修",
          "examMethod": "闭卷",
          "score": "100.0",
          "obtainMethod": "初修取得",
          "remark": null,
          "semester": "2018年秋季学期"
        },
        {
          "className": "课程名2",
          "credit": "4.0",
          "classType": "必修课/学科基础",
          "studyType": "初修",
          "examMethod": "闭卷",
          "score": "60.0",
          "obtainMethod": "初修取得",
          "remark": null,
          "semester": "2018年秋季学期"
        }
      ],
      now_open: -1,
      color:[
        'rgba(187,255,255,1)',
        'rgba(255,218,185,1)',
        'rbga(84,255,159, 1)',
      ],
      title_color:[
        'rgba(177,245,245,1)',
        'rgba(245,208,175,1)',
        'rbga(74,245,149, 1)',
      ]

  },

  getScoreData: function(){
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    let header = {
      'content-type': 'application/json; charset=utf-8',
      'cookie': "username=" + wx.getStorageSync("username") + ";usertoken=" + wx.getStorageSync("usertoken")
    };
    wx.request({
      url: this.data.ip + '/score',
      type: 'get',
      header: header,
      success: function (res) {
        that.setData({
          info_list: res.data.data,
        })
        wx.hideLoading();
      }
    })
  },
  open_tab: function (e) {
    console.log(e.currentTarget.dataset.id);
    var id = e.currentTarget.dataset.id;
    var str = 'info_list[' + id + '].open';
    
    if(this.data.now_open == -1){
      this.setData({
        [str]: 1,
        now_open: id,
      })
    }
    else{
      var str2 = 'info_list[' + this.data.now_open + '].open'
      if(this.data.now_open == id){
        this.setData({
          now_open: -1,
            [str2]:0
        })
      }
      else{
        this.setData({
          [str]: 1,
          [str2]: 0,
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (getApp().globalData.isUserLogin == false) {
      wx.showModal({
        title: '',
        content: '请先登录!',
        success: function(res){
          if(!res.cancel){
            wx.switchTab({
              url: '../../pages/person/person',
            })
          }
        }
      })
      
    } else {
      this.getScoreData();
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