//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isUserLogin:'',
    ip: 'https://uclass.ktchen.cn:442/uclass',
    array:[
      {
        text: "成绩查询",
        imageurl:'../../images/score.png'
      },
      {
        text: "考场查询",
        imageurl:'../../images/examine.png'
      },
      {
        text:"自习室",
        imageurl : '../../images/studyroom.png',
        url:'../../pages/studyroomInquire/studyroomInquire'
      },
      {
        text:'蹭课',
        imageurl:'../../images/auditclass.png'
      },
      {
        text:'成绩分析',
        imageurl:'../../images/analysis.png'
      },
      {
        text:'自动排课',
        imageurl:'../../images/autoschedule.png'
      }

    ],
    imgUrls: [
      '../../images/banner1.png',
      '../../images/banner2.png',
      '../../images/banner3.png'
    ],
    interval: 5000,
    duration: 1000,
    courseList:[
      
    ]

    
  },
  //事件处理函数
  //banner

  /**
   * 获取课程表列表
   */

  getCourseListWithCookie: function (args) {

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

        if (data.message == "success") {
          let classtemp = data.data.class;
          let arraytemp = [1,1,1,1,1,1];
          

          for (let i = 0, m = classtemp.length; i < m; i++) {
            
            if(data.data.today == classtemp[i].day){
              let obj = {
                className: classtemp[i].className,
                address: classtemp[i].address,
                teachers: classtemp[i].teachers,
                day: classtemp[i].day,
                skjc: classtemp[i].skjc,
                skcd: classtemp[i].skcd,
                noClass:false
              }
              
              switch (classtemp[i].skjc){
                case 1:;
                case 2: arraytemp[0] = obj;break;
                case 3:;
                case 4:arraytemp[1] = obj;break;
                case 5:;
                case 6:arraytemp[2] = obj;break;
                case 7:;
                case 8:arraytemp[3] = obj;break;
                case 9:;
                case 10: arraytemp[4] = obj; break;
                case 11:;
                case 12:arraytemp[5] = obj;break;
              }
              

            }
          }
          for(let i = 0; i < arraytemp.length; i++){
              if(arraytemp[i] == 1){
                arraytemp[i] = {
                  noClass:true
                }
              }
          }
            that.setData({
              courseList: arraytemp
            })
            
            
            

        }

      }
    })

  },
 
  onLoad: function () {
    this.setData({
      isUserLogin: getApp().globalData.isUserLogin
    })
    this.getCourseListWithCookie({
      url: '/timetable?'

    })
  },
  onShow:function(){
    this.onLoad();
  }
  
})
