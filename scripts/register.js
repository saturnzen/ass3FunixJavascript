'use strict'

const firstNameInput = document.getElementById('input-firstname')
const lastNameInput = document.getElementById('input-lastname')
const userNameInput = document.getElementById('input-username')
const passwordInput = document.getElementById('input-password')
const passwordConfirmInput = document.getElementById('input-password-confirm')
const submitBtn = document.getElementById('btn-submit')

// #1 Tạo Class User

class User{
  constructor(
    firstName, 
    lastName, 
    userName, 
    password){
  this.firstName = firstName;
  this.lastName = lastName;
  this.userName = userName;
  this.password = password
}}

// Lấy thông tin từ localStorage để validate
const KEY = "USER_ARRAY"
const userDataArr =
  getFromStorage(KEY) === undefined
    ? []
    : JSON.parse(getFromStorage(KEY));
const userDataID = [];
userDataArr.forEach((user) => userDataID.push(user.userName));

//  kiểm tra userName
function validateId(id){
  if (id.value === "") {
    //có trống hay không
    alert(`Vui lòng chọn ${id.getAttribute('placeholder').slice(6)}`);
    
    console.log(userDataID);
  } else if (userDataID.includes(id.value)) {
    //kiểm tra xem có trùng hay không
    alert(` ${id.getAttribute('placeholder').slice(6)} đã tồn tại, vui lòng chọn ${id.getAttribute('placeholder').slice(6)} khác!`);
    console.log(userDataID);
  } else {
    //trả về true để tiến hành ghi vào class
    return true;
  }
}

//kiểm tra tên đăng nhập 
function validateName(name){
  if (name.value === "") {
    //có trống không
    alert(`Xin mời nhập ${name.getAttribute('placeholder').slice(6)}`);
  } else {
    //trả về true để tiến hành ghi vào class
    return true;
  }
}

//kiểm tra Password
function validatePassword(pass, passConfirm){
  if (pass.value === ""){
    //đã nhập chưa
    alert(`Xin mời nhập ${pass.getAttribute('placeholder').slice(6)}`);
  
  }else if (pass.value.length < 8) {
    //phải nhiều hơn 8 ký tự
    alert(`${pass.getAttribute('placeholder').slice(6)} có ít hơn 8 ký tự`);
  }else if(passConfirm.value === ""){
    //nhập lại passWord trong confirm
    alert("Vui lòng nhập password một lần nữa")
  }else if( pass.value != passConfirm.value) {
    // kiểm tra xem 2 passWord có giống nhau chưa
    alert(`Password nhập lại không giống`)
  } else{
    //trả về true để tiến hành ghi vào class
    return true
  }
}

//Handler các sự kiện
submitBtn.addEventListener('click', function(){
  console.log('regigter');
  
  if(
    //#2.2 Validate thông tin người dùng nhập vào theo đúng yêu cầu.
     validateName(firstNameInput)&&
     validateName(lastNameInput) &&
     validatePassword(passwordInput, passwordConfirmInput)&&
     validateId(userNameInput)
  ){
    userDataID.push(userNameInput.value);
    const gotUser  = new User(firstNameInput.value,
      lastNameInput.value,
      userNameInput.value,
      passwordInput.value
      )
    userDataArr.push(gotUser)  
    // #2.2 Lưu dữ liệu xuống LocalStorage.
    saveToStorage(KEY, JSON.stringify(userDataArr));
    
      //chuyển sang trang đăng nhập
      window.location = window.location.href.slice(0,-13)+'login.html'
  }
})
