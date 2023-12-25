"use strict";
// 2. Lưu dữ liệu dưới dạng LocalStorage
// saveToStorage: Hàm nhận hai tham số là Key và Value,
//sau đó sẽ thực hiện việc lưu xuống LocalStorage.
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//getFromStorage: Hàm nhận vào tham số là Key,
// sau đó sẽ lấy dữ liệu từ LocalStorage theo Key tương ứng.

function getFromStorage(key, defaultVal) {
  return localStorage.getItem(key) ?? defaultVal;
}



// Lấy thông tin từ localStorage để validate

function getLocalStorage(KEY = "USER_ARRAY"){
  const userDataArr =
    getFromStorage(KEY) === undefined
      ? []
     : JSON.parse(getFromStorage(KEY));
  
  const userDataID = [];

  userDataArr.forEach((user) => {
    userDataID.push(user.userName);
    user.__proto__ = Object.create(User.prototype);
  });

  return {userDataArr, userDataID}
};


//dữ liệu người dùng hiện tại
function getUserLogin(){
  let currentUser = "currentUser";
  const userLogin = 
  getFromStorage(currentUser) === undefined
    ? alert("please login or register to create and see your todo list")
    : JSON.parse(getFromStorage(currentUser));

  return userLogin;
  
};

function getUserSetting(){
  let userLogin = getUserLogin()
  let setting = settingStorage.filter(set => set.owner === userLogin.userName)[0]
  if (!setting) {
    setting = new Setting(userLogin.userName, "General", 4);
    settingStorage.push(setting)
  }else{
    setting.__proto__ = Object.create(Setting.prototype);
  }
  setting._renderSetting()
  return setting
}
