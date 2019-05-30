// pages/bookBorrowList/bookBorrowList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: getApp().globalData.ip,
    page: 1,
    totalPage: 1,
    searchTypes: ["任意词", "作者", "isbn"],
    corresSearchTypes: ["any", "author", "isbn"],
    searchTypesIndex: 0,
    IsSearchData: true,
    inputdata: '',
    booklists: [
      

    ]
  },
  //点击书本
  bookClick: function (e) {
   
    let that = this;
    let ip = this.data.ip;

    let data = {
      barCode: e.currentTarget.dataset.barcode 
    }
    let header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': "username=" + wx.getStorageSync("username") + ";usertoken=" + wx.getStorageSync("usertoken")
    };
   
    wx.request({
      url: ip + '/library/relend?',
      method: "POST",

      header: header,
      // data: JSON.stringify(data),
      data:{
        barCode: e.currentTarget.dataset.barcode 
      },

      success(res) {

        if (res.data.message == "success") {
            wx.showModal({
              title: '提醒',
              content: res.data.data.msg,
            })



      

        }
      }
    })
  },


  //获取搜索结果列表
  getBookBorrowList: function () {
    wx.showLoading({
      title: '玩命加载中',
      duration: 2000
    })
    let that = this;
    let ip = this.data.ip;
    let header = {
      'content-type': 'application/json; charset=utf-8',
      'cookie': "username=" + wx.getStorageSync("username") + ";usertoken=" + wx.getStorageSync("usertoken")
    };
  
    wx.request({
      url: ip + '/library/lendlist?',
      method: "GET",

      header: header,
      data: JSON.stringify(),

      success(res) {
        
        if (res.data.message == "success") {

          let obj;
          let len;
          let array_list = [];

          

            for (let i = 0, len = res.data.data.length; i < len; i++) {
              let temp = res.data.data[i];
              obj = {
                id: i,
                num:temp.num,
                bookLendFlag:temp.bookLendFlag,
                normRetData:temp.normRetData,
                renewTimes:temp.renewTimes,
                mTitle:temp.mTitle,
                barCode:temp.barCode,
                today:temp.today,
                locationName:temp.locationName,
                lendDate:temp.lendDate,
                marcRecNo: temp.marcRecNo,
                mCallNo:temp.mCallNo,
                mAuthor:temp.mAuthor
  
              }

              array_list.push(obj);
            



            }
          // 设置数据
          that.setData({
            booklists: array_list
          })
          // 隐藏加载框
          wx.hideLoading();

        }
      }
    })
  },
  //点击弹出新窗口
  toSearchPage: function (e) {
    let marcRecNo = options.marcRecNo;
    let isbn = options.isbn;
    wx.navigateTo({
      url: '../search/search?inputName=' + this.data.inputdata
    })

    //有可能需要把现在输入框的内容再传递到搜索页

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBookBorrowList();
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
    console.log(this.data.page + 'ss' + this.data.totalPage)
    if ((this.data.page - 0) <= (this.data.totalPage - 0)) {
      this.setData({
        page: this.data.page + 1
      })
      this.getBookList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})