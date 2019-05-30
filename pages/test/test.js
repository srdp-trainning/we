// pages/test/test.js
import Test from '../../utils/test'; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: getApp().globalData.ip,
    info_list:[
      {
        title:'first',
        author:'me',
        abstract_text:'123...',
        text:'12311111111111111111111111111111111111111111111111' ,
        open: 0
      },
      {
        title:'second',
        author:'you',
        abstract_text: '123...',
        text:'test2',
        open: 0
      },
      {
        title:'third',
        abstract_text: '123...',
        open: 0
      }
    ],
    now_open: -1
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
 

  open_tab:function(e){
      console.log(e.currentTarget.dataset.id);
      var id = e.currentTarget.dataset.id;
      var str = 'info_list[' + id + '].open'
      console.log(str)
      if(this.data.info_list[id].open == 1){
        this.setData({
          [str]: 0,
          now_open: id,
        })
      }
      else if(this.data.now_open != -1){
        var str2 = 'info_list[' + this.data.now_open + '].open'
        this.setData({
          [str2]: 0,
          [str]: 1,
          now_open: id
        });
      }
      else{
        this.setData({
          [str]: 1,
        });
      }
  
  },

  getInfoList: function(){
    wx.showLoading({
      title: '正在加载',
    })
    let that = this;
    wx.request({
      url: this.data.ip+'/xietan/info_manager/infoList',
      type:'get',
      success:function(res){
        that.setData({
          info_list: res.data.data,
        })
        wx.hideLoading();
      }
    })
  },
  // /**
  //  * 生命周期函数--监听页面加载
  //  */
  onLoad: function (options) {
     this.getInfoList();
  },

  // /**
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  // onReady: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  // onShow: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面隐藏
  //  */
  // onHide: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面卸载
  //  */
  // onUnload: function () {

  // },

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {

  // },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // }
})