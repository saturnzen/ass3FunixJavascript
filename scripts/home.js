'use strict'
const loginModal = document.getElementById("login-modal")
const welcomeMessage = document.getElementById("welcome-message")
const mainContent = document.getElementById("main-content") 
const logOutBtn = document.getElementById("btn-logout") 

// #4 lấy dữ liệu từ LocalStorage
let currentUser = "currentUser"
if (getFromStorage(currentUser) === undefined){
  // #4.1 người dùng chưa đăng nhập, 
  // cần hiển thị màn hình gồm nút đăng nhập và đăng ký.
  mainContent.classList.add("d-none")
}else{
  // #4.2 người dùng đã đăng nhập, 
  const userLogin = getUserLogin()
  //hiển thị thông điệp chào mừng như sau: "Welcome + firstname" và nút Logout
  loginModal.classList.add('d-none')
  welcomeMessage.textContent = `Welcome ${userLogin.firstName}`
}

// #5 logout ứng dụng
logOutBtn.addEventListener('click',function(){
  // xóa người dùng hiện tại khỏi thông tin đăng nhập trong local
  localStorage.removeItem('currentUser')
  //hiển thị giao diện
  mainContent.classList.add("d-none")
  loginModal.classList.remove('d-none')

})
    