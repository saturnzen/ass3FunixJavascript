'use strict'

const firstNameInput = document.getElementById('input-firstname')
const lastNameInput = document.getElementById('input-lastname')
const userNameInput = document.getElementById('input-username')
const passwordInput = document.getElementById('input-password')
const passwordConfirmInput = document.getElementById('input-password-confirm')
const submitBtn = document.getElementById('btn-submit')

// #1 Tạo Class User

const KEY = "USER_ARRAY"

const {userDataArr, userDataID} = getLocalStorage();
// console.log(userDataID);
// const KEY = "USER_ARRAY"

//Handler các sự kiện
submitBtn.addEventListener('click', function(){
  console.log('regigter');
  const gotUser  = new User(
    userNameInput.value,
    passwordInput.value,
    firstNameInput.value,
    lastNameInput.value,
    passwordConfirmInput.value
    )
  if(gotUser._validateRegister()){
    console.log(gotUser);
    userDataID.push(gotUser.userName);
    userDataArr.push(gotUser)  
    // #2.2 Lưu dữ liệu xuống LocalStorage.
    saveToStorage(KEY, JSON.stringify(userDataArr));
    
      //chuyển sang trang đăng nhập
      window.location = window.location.href.slice(0,-13)+'login.html'
    }
  })

//export class to file

//  thêm tính năng hiển thị password?