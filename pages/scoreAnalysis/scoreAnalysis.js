// pages/scoreAnalysis/scoreAnalysis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: getApp().globalData.ip,
    schoolname:'阿玉',
    weightAverage: 0,    //记录加权平均分,
    array:[
     
    ],
    scorelist: [

    ],
    semester:[

    ]

  },
  /**
   * 获取成绩列表
   */

  getScoreListWithCookie: function (args) {
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
        let arraytemp = [];
        if (data.message == "success") {
          let scoretemp = data.data.class;
          for (let i = 0, m = data.data.length; i < m; i++) {

            let obj = {
              id: i,
              className: data.data[i].className,
              credit: data.data[i].credit,
              classType: data.data[i].classType,
              studyType: data.data[i].credit,
              examMethod: data.data[i].credit,
              score: data.data[i].score,
              obtainMethod: data.data[i].credit,
              remark: data.data[i].credit,
              semester: data.data[i].semester,
              isChecked: true,
              ses:0
            }
            //加入学期
            if (that.data.semester.length == 0){
              that.data.semester.push(data.data[i].semester);
              obj.ses = 1;
            }else{
             
              let flag = 1;
              for (let j = 0, m = that.data.semester.length; j < m; j++) {
                if (that.data.semester[j] == data.data[i].semester) {
                  flag = 0;
                  obj.ses = j+1;
                }
              }
              if (flag) {
                that.data.semester.push(data.data[i].semester);
                obj.ses = that.data.semester.length;
              }
             
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
  calAll:function() {
    let len = this.data.semester.length;
    let credit2 = 0;
    let credits = [];
    let totals = [];
    let averscores = [];
    let averscore = 0;
    let total = 0;
    let i = 0,m,ses;
    //初始化
    for(let j = 0; j < len; j++){
      totals[j] = 0;
      averscores[j] = 0;
      credits[j] = 0;
    }
    //赋值
    for (i = 0,  m = this.data.scorelist.length; i < m; i++) {
      ses = this.data.scorelist[i].ses-1;
      if(ses == 1){
        console.log("fond")
      }
      if (!isNaN(this.data.scorelist[i].score)) {
        total += (this.data.scorelist[i].credit - 0) * (this.data.scorelist[i].score - 0);
        credit2 += (this.data.scorelist[i].credit - 0);
        totals[ses] += (this.data.scorelist[i].credit - 0) * (this.data.scorelist[i].score - 0);
        credits[ses] += (this.data.scorelist[i].credit - 0);
        
      }
    }
    averscore = total / (credit2 - 0);
   
    this.setData({
      weightAverage: averscore.toFixed(3),
    })
    let arraytemp = [];
    for(let j = 0; j < this.data.semester.length; j++){
      averscores[j] = totals[j] / (credits[j] - 0);
      let obj ={

        title: this.data.semester[j],
        score: averscores[j].toFixed(3)

      }
      arraytemp.push(obj);
    }
    this.setData({
      array:arraytemp
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScoreListWithCookie({
      url: '/score'
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