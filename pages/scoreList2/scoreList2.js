// pages/scoreList2/scoreList2.js
Page({

  /**
   * 页面的初始数据
   */
 
  data: {
    ip: getApp().globalData.ip,
    schoolname: '三好学生',
    studentNumber:'',
    isAllchecked:true,   //是否全部的成绩被选中
    haveCredit:0,   //记录已修学分,
    weightAverage:0,    //记录加权平均分
    gpaAverage:0,   //记录平均绩点
    scorelist:[
      
    ],
    scrollHeight:0

  },
  /**
 * 获取scroll区域的高度
 */
  getScrollHeight: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let ratio = 750 / clientWidth;
        let height = clientHeight * ratio;
        let temp = height - 370;
        that.setData({
          scrollHeight: temp
        })
      }
    });
  },
  calAll(){
    let credit = 0;
    let credit2 = 0;
    let gpa = 0;
    let averscore = 0;
    let total = 0;
    for (let i = 0, m = this.data.scorelist.length; i < m; i++) {
      if (!isNaN(this.data.scorelist[i].score)) {
        total += (this.data.scorelist[i].credit - 0) * (this.data.scorelist[i].score - 0);
        credit2 += (this.data.scorelist[i].credit - 0);
      }

      credit += (this.data.scorelist[i].credit - 0);
      gpa += (this.data.scorelist[i].gpa - 0)
      let temp = "scorelist[" + i + "].isChecked";
      this.setData({
        [temp]: true
      })
    }
    averscore = total / (credit2 - 0);


    this.setData({
      haveCredit: credit,
      weightAverage: averscore.toFixed(3),
      gpaAverage: gpa
    })
  },
  /**
   * 判断是否选中了全部
   * 
   */
  checkIsAll(e) {
    this.setData({
      isAllchecked: !this.data.isAllchecked
    })


    if(this.data.isAllchecked){
      this.calAll();

    }else if(!this.data.isAllchecked){
      for (let i = 0, m = this.data.scorelist.length; i < m; i++) {

        let temp = "scorelist[" + i + "].isChecked";
        this.setData({
          [temp]: false
        })
      }
      this.setData({
        haveCredit: 0,
        weightAverage: 0,
        gpaAverage: 0
      })
    }

   
  },
  /**
   * 选中列表的一项发生
   */
  scorelistChange(e){

    
     

    
    

    let credit = 0;
    let credit2 = 0;
    let gpa = 0;
    let averscore = 0;
    let total = 0;
    let arrCheck = e.detail.value;
    for(let i = 0; i < arrCheck.length; i++){
      let index = arrCheck[i];
      if (!isNaN(this.data.scorelist[index].score)) {
        total += (this.data.scorelist[index].credit - 0) * (this.data.scorelist[index].score - 0);
        credit2 += (this.data.scorelist[index].credit - 0);
      }

      credit += (this.data.scorelist[index].credit - 0);
      gpa += (this.data.scorelist[index].gpa - 0)
      
      let temp = "scorelist[" + index +"].isChecked";
      this.setData({
        [temp] : true
      })
    }

    averscore = total / (credit2 - 0);
    this.setData({
      haveCredit: credit,
      weightAverage: averscore.toFixed(3),
      gpaAverage: gpa
    })
  },
  /**
   * 获取成绩列表
   */

  getScoreListWithCookie: function (args) {

    let that = this;
    let header = {
      'content-type': 'application/json; charset=utf-8',
      'cookie': "username=" + wx.getStorageSync("username") + ";usertoken=" + wx.getStorageSync("usertoken")
    };
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: this.data.ip + args.url,
      method: "GET",
      header: header,
      data: JSON.stringify(args.data),
      success(res) {
       
        let data = res.data;
        let arraytemp = [];
        if (data.message == "success") {
          let scoretemp = data.data.class;
          for (let i = 0, m = data.data.length; i < m; i++) {

              let obj = {
                id:i,
                className: data.data[i].className,
                credit: data.data[i].credit,
                classType: data.data[i].classType,
                studyType: data.data[i].credit,
                examMethod: data.data[i].credit,
                score: data.data[i].score,
                obtainMethod: data.data[i].credit,
                remark: data.data[i].credit,
                semester: data.data[i].credit,
                isChecked:true
              }
              arraytemp.push(obj);



            
          }
          
          that.setData({
            scorelist: arraytemp
          })
          wx.hideLoading();
          that.calAll();
         
          
        }

      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScrollHeight();
    this.setData({
      isUserLogin: getApp().globalData.isUserLogin,
      studentNumber:wx.getStorageSync("username")
    })
    this.getScoreListWithCookie({
      url:'/score'
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