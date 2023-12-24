'use strict'
const submitBtn = document.getElementById('btn-submit')
const userNameInput = document.getElementById('input-username')
const passwordInput = document.getElementById('input-password')
// 3.1 Lấy dữ liệu từ Storage
//người dùng hiện tại đang đăng nhập
let currentUser;
class UserLogin extends User{
  constructor(userName, password){
    super(userName, password);
  }
};

const {userDataArr, userDataID} = getLocalStorage()
console.log(userDataArr);  
// Handler các sự kiện
const a = new UserLogin("nguyenne", "12345678");
submitBtn.addEventListener('click', function(){
  currentUser = new User(userNameInput.value, passwordInput.value);
  const userLogin = currentUser._validateLogin();
    // ? userDataArr.find(user => user.userName === currentUser.userName);
  
    //người dùng đăng nhập thành công, 
    //lưu thông tin người dùng hiện tại xuống dưới LocalStorage.
    if (getFromStorage("currentUser") === undefined)
      {saveToStorage("currentUser", JSON.stringify(userLogin))};

    window.location = window.location.href.slice(0,-16)+'index.html'
  
});



//  thêm tính năng hiển thị password?

