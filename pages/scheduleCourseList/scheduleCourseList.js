// pages/scheduleCourseList/scheduleCourseList.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })
const app = getApp()
let page = 1;
Page({
  data: {
    ip:getApp().globalData.ip,
    IsSearchData: true,
    array: [
      
    ],
    id: '',
    inputdata: '',
    nowTeacherIndex: -1,    //当前处于选中状态的老师
    nowCourseTimeIndex: -1,    //当前选中课程时间
    courselists: [
      {
        id: 1,
        name: '计算机组成原理'
      },
      {
        id: 2,
        name: '离散数学'
      }
    ],
    coursetimelists: [
      {
        time: '1,2'
      }
    ],
    teacherlists: [
      {
        id: 1,
        name: 'cui',
        time: [
          '1-2'
        ],
        addclass: ''
      },
      {
        id: 2,
        name: 'chen',
        time: [
          '3-4'
        ],
        addclass: ''
      }
    ]
  },
  //课程列表点击事件
  courselistClick: function (e) {
    //方案一：跳到另一页
    // let index = e.currentTarget.dataset.index;
    // let id = e.currentTarget.dataset.id;
    // wx.navigateTo({
    //   url: '../courselist?id='+id,
    // })


  },
  //点击对于老师，显示这个老师当前的课程情况
  teacherlistChoose: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      nowTeacherIndex: index
    })

    //给选中的添加对应样式，先全部清零
    for (let i = 0, m = this.data.teacherlists.length; i < m; i++) {
      let temp = 'teacherlists[' + i + '].addclass';
      this.setData({
        [temp]: ''
      })

    }
    //addclass，增加对应样式
    let temp = 'teacherlists[' + index + '].addclass';
    this.setData({
      [temp]: 'chosen-style1'
    })
    //寻找这个老师对应的时间并给数组赋值
    let temparray = [];
    for (let i = 0, m = this.data.teacherlists[index].time.length; i < m; i++) {
      let temp1 = this.data.teacherlists[index].time[i];
      let temp2 = {
        time: temp1,
        addclass: ''
      }
      temparray.push(temp2);

    }

    this.setData({
      coursetimelists: temparray
    })

  },
  coursetimeChoose: function () {

  },
  //点击弹出新窗口
  toSearchPage: function (e) {
    wx.navigateTo({
      url: '../search/search?inputName=' + this.data.inputdata
    })

    //有可能需要把现在输入框的内容再传递到搜索页

  },
  //事件处理函数
  labClick: function (e) {
    let id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../instruwithid/instruwithid?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //搜索功能触发
  searchClick: function (e) {
    //获得结果
   
    this.getCourseList();

  },

  //获取课程默认列表
  getCourseList: function () {
    let that = this;
    let content = this.data.inputdata;
    let ip = this.data.ip;
    wx.request({
      url: ip + '/find_classes/classNameList?name=' + content, // 仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.statu == 1) {
          let array_list = [];
          let obj;
          let len;
          wx.showLoading({
            title: '玩命加载中',
            duration: 2000
          })
          for (let i = 0, len = res.data.data.length; i < len; i++) {
            obj = {
              title: res.data.data[i]
            }
            array_list.push(obj);
          }
          // 设置数据
          that.setData({
            array: array_list
          })
          // 隐藏加载框
          wx.hideLoading();

        }
      }
    })
  },
  onLoad: function () {


    //初始化实验室情况

    this.getCourseList();





  },
  /**
* 生命周期函数--监听页面隐藏
*/
  onHide: function () {


  },
  onReachBottom: function () {
    page = page + 1;


    //初始化实验室情况
    let obj = {
      page: page
    }
    this.getLabList(obj);

  },

  onPullDownRefresh: function () {
    page = 1;


  
  }
})
