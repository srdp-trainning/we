// pages/bookList/bookList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: getApp().globalData.ip,
    page:1,
    totalPage:1,
    searchTypes:["任意词","作者","isbn"],
    corresSearchTypes:["any","author","isbn"],
    searchTypesIndex:0,
    IsSearchData: true,
    inputdata: '',
    booklists: [
     
    ]
  },
  //点击书本
  bookClick:function(e){
    let index = e.currentTarget.dataset.id;
    let temp = this.data.booklists[index];
    let obj = {
      author: temp.author,
      callNo: temp.callNo,
      docTypeName: temp.docTypeName,
      isbn: temp.isbn,
      marcRecNo: temp.marcRecNo,
      num: temp.num,
      pubYear: temp.pubYear,
      publisher: temp.publisher,
      title: temp.title
    }
    let data = JSON.stringify(obj);
    console.log(data)
    wx.navigateTo({
    

      url: '../bookContent/bookContent?data=' + data
    })
  },
  //输入搜索词
  bindKeyInput(e) {
    this.setData({
      inputdata: e.detail.value
    })
  },
  bindTypesPickerChange:function(e){
  
    this.setData({
      searchTypesIndex: e.detail.value
    })
    this.getBookList();
  },
  //搜索功能触发
  searchClick: function (e) {
    //获得结果
    this.setData({
      page: 0,
      booklists:[]
    })
    this.getBookList();

  },
  //获取搜索结果列表
  getBookList:function(){
    wx.showLoading({
      title: '玩命加载中',
      duration: 2000
    })
    let that = this;
    let ip = this.data.ip;
    wx.request({
      url: ip + '/library/search?',
      method:"POST",

      data: {
        type: this.data.corresSearchTypes[this.data.searchTypesIndex] ,
        keyword: this.data.inputdata,
        page: this.data.page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.message == "success") {

          let obj;
          let len;
          let array_list = [];

          if (that.data.page == 1){
            
            that.setData({
              totalPage: Math.ceil((res.data.data.total - 0) / 10 )
            })
         
            for (let i = 0, len = res.data.data.content.length; i < len; i++) {
              let temp = res.data.data.content[i];
              obj = {
                id: i,
                author: temp.author,
                callNo: temp.callNo,
                docTypeName: temp.docTypeName,
                isbn: temp.isbn,
                marcRecNo: temp.marcRecNo,
                num: temp.num,
                pubYear: temp.pubYear,
                publisher: temp.publisher,
                title: temp.title,
                lendAvl:''
              }
              
              array_list.push(obj);
            }

              for (let i = 0, len = res.data.data.content.length; i < len; i++) {
                let temp = res.data.data.content[i];
                wx.request({
                  url: ip + '/library/info?' +
                    'marcRecNo=' + temp.marcRecNo +
                    '&isbn=' + temp.isbn
                  ,
                  success(res) {
                    if (res.data.message == "success") {
                      array_list[i].lendAvl = res.data.data.lendAvl
                    }
                    
                  }

                })
               
        
              }
             
            
          }else{
            //在现有数据上添加
            array_list = that.data.booklists;
            for (let i = 0, len = res.data.data.content.length; i < len; i++) {
              let temp = res.data.data.content[i];
              obj = {
                id: i,
                author: temp.author,
                callNo: temp.callNo,
                docTypeName: temp.docTypeName,
                isbn: temp.isbn,
                marcRecNo: temp.marcRecNo,
                num: temp.num,
                pubYear: temp.pubYear,
                publisher: temp.publisher,
                title: temp.title
              }
              array_list.push(obj);
            }
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
    if((this.data.page - 0) <= (this.data.totalPage - 0)){
      this.setData({
        page:this.data.page+1
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