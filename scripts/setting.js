'use strict'

const categoryInput  = document.getElementById("input-category")
const pageSizeInput = document.getElementById("input-page-size")
const submitBtn = document.getElementById("btn-submit")
//dùng cho mặc định
// Lấy dữ liệu từ LocalStorage
const KEY = "setting_ARR"
const settingStorage =
  getFromStorage(KEY) === undefined
    ? []
    : JSON.parse(getFromStorage(KEY));

const currentUserSetting = getUserSetting()

//khi ấn submit
submitBtn.addEventListener('click', currentUserSetting._saveSetting.bind(currentUserSetting))