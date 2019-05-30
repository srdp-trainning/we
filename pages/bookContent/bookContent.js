// pages/bookContent/bookContent.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    ip: getApp().globalData.ip,
    collectionList:[
      
    ],
    imgsrc:'',
    book:{

    }
  },
  //获取相关xinxi
  getBookInfo: function ({ marcRecNo: marcRecNo, isbn: isbn}){
    let that = this;
    let ip = this.data.ip;
    wx.request({
      url: ip + '/library/info?' +
        'marcRecNo=' + marcRecNo +
        '&isbn=' + isbn
      ,
      success(res) {
        if (res.data.message == "success") {
          that.setData({
            imgsrc:res.data.data.image
          })
        }

      }

    })
  },
 //获取搜索结果列表
  getBookList: function ({ marcRecNo: marcRecNo}){
    wx.showLoading({
      title: '玩命加载中',
      duration: 2000
    })
    let that = this;
    let ip = this.data.ip;
    wx.request({
      url: ip + '/library/storeinfo?marcRecNo=' + marcRecNo,
      method:"GET",

      data: {
       
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.message == "success") {

          let obj;
          let len;
          let array_list = [];
          
       
         
            for (let i = 0, len = res.data.data.length; i < len; i++) {
              let temp = res.data.data[i];
              obj = {
                id:i,
                bookNum: temp.bookNum,
                barCode: temp.barCode,
                adderss: temp.address,
                status: temp.status
              }
              
              array_list.push(obj);
            }

             
      console.log(array_list)
          // 设置数据
          that.setData({
            collectionList: array_list
          })
      
          // 隐藏加载框
          wx.hideLoading();


        
      }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = JSON.parse(options.data)
 

    this.setData({
      book:data
    })
    let obj = {
      marcRecNo: data.marcRecNo,
      isbn: data.isbn
    }
    this.getBookList(obj);
    this.getBookInfo(obj);
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