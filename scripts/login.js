'use strict'
const userNameInput = document.getElementById('input-username')
const passwordInput = document.getElementById('input-password')
const submitBtn = document.getElementById('btn-submit')

// 3.1 Lấy dữ liệu từ Storage
const KEY = "USER_ARRAY"
const userDataArr =
  getFromStorage(KEY) === undefined
    ? []
    : JSON.parse(getFromStorage(KEY));
const userDataID = [];
//lấy danh sách username có trong hệ thống
userDataArr.forEach((user) => userDataID.push(user.userName));
//người dùng hiện tại đang đăng nhập
let currentUser;

//3.2 Validate dữ liệu nhập vào
// passWord
function validatePassword(pass, passConfirm){
  if (pass.value === ""){
    //không để trống
    alert(`Xin mời nhập ${pass.getAttribute('placeholder').slice(6)}`);
  }else if(passwordInput.value !== userDataArr[userDataID.indexOf(userNameInput.value)].password){
    //giống như trong User
    alert(`mật khẩu bạn nhập không đúng`)
    console.log(passwordInput.value);
    console.log(userDataArr[userDataID.indexOf(userNameInput.value)].password);
  }
  else{
    return true
  }
}
//validate nhập username
function validateId(id){
  if (id.value === "") {
    //không để trống
    alert(`Bạn chưa nhập ${id.getAttribute('placeholder').slice(6)}`);
  } else if (!userDataID.includes(id.value)) {
    //kiểm tra trong danh sách 
    alert(`username không tồn tại`);
  }else if(validatePassword(passwordInput)){
    return true
  }
}

// Handler các sự kiện

submitBtn.addEventListener('click', function(){
  if(validateId(userNameInput)){
    const userLogin = userDataArr[userDataID.indexOf(userNameInput.value)]
    //người dùng đăng nhập thành công, 
    //lưu thông tin người dùng hiện tại xuống dưới LocalStorage.
    if (getFromStorage(currentUser) === undefined)
      {saveToStorage(currentUser, JSON.stringify(userLogin))}
    
    window.location = window.location.href.slice(0,-16)+'index.html'
  };
})