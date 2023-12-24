'use strict'

const categoryInput  = document.getElementById("input-category")
const pageSizeInput = document.getElementById("input-page-size")
const submitBtn = document.getElementById("btn-submit")

class Setting{
  constructor(owner, category, pageSize){
    this.owner = owner,
    this.category = category,
    this.pageSize = pageSize
  };


    
  //đẩy setting trước đó ra màn hình, 
  _renderSetting(){
    if(!setting){
      categoryInput.value = defaultValt.category
      pageSizeInput.value = defaultValt.pageSize
    }else{
      //9.4 hiển thị các tham số cài đặt trước đó ra cho người dùng xem
    categoryInput.value = setting.category
    pageSizeInput.value = setting.pageSize
  }};

}

//dùng cho mặc định
const defaultValt = new Setting("default", "General", 4)
// Lấy dữ liệu từ LocalStorage
const KEY = "setting_ARR"
const settingStorage =
  getFromStorage(KEY) === undefined
    ? []
    : JSON.parse(getFromStorage(KEY));

//dữ liệu người dùng hiện tại
let currentUser = "currentUser";
const userLogin = 
  getFromStorage(currentUser) === undefined
    ? alert("please login or register to create and see your todo list")
    : JSON.parse(getFromStorage(currentUser));
    
  const userSetting = settingStorage.filter(set => set.owner === userLogin.userName)
  const setting = userSetting[0]
  setting.__proto__ = Object.create(Setting.prototype)
  console.log(setting);
  setting._renderSetting()

// 9.2  Có validate dữ liệu nếu người dùng không nhập.
//kiểm tra dữ liệu trống 
function validateNumber(name){
  if (name.value === "") {
    //có trống không
    alert(`Xin mời nhập số lượng bài báo muốn hiển thị mỗi trang`);
  } else {
    //trả về true để tiến hành ghi vào class
    return true;
  }
}


//khi ấn submit
submitBtn.addEventListener('click', function(){
  if(!setting){
    const newSetting = new Setting(userLogin.userName, categoryInput.value, pageSizeInput.value)
    settingStorage.push(newSetting)
    saveToStorage(KEY, JSON.stringify(settingStorage));
  }
  if(validateNumber(pageSizeInput)){
    // 9.2  validate dữ liệu nếu người dùng không nhập.
    // #9 thay đổi thiết lập
    setting.category = categoryInput.value
    setting.pageSize = pageSizeInput.value
    saveToStorage(KEY, JSON.stringify(settingStorage));
  }
})