//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
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
        imageurl : '../../images/studyroom.png'
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
    duration: 1000

    
  },
  //事件处理函数
  //banner
  
 
  onLoad: function () {
  }
  
})
