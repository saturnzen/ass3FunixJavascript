'use strict'
class User{
  #password;
  #passConfirm;
  _password;
  constructor( 
    userName, 
    password,
    firstName, 
    lastName, 
    passConfirm,
    _password){
      this.userName = userName;
      this.#password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.#passConfirm = passConfirm;
      this._password = this.#password + "abcd"
    };
  
  // dùng so sánh pass trong phần login
  // vì password ở đây chỉ có thể truy cập từ trong class
  passValidate(pass){
    return this.password === pass
  };

  //  kiểm tra đăng ký
  _validateRegister(){
    if (
      this._validateName('firstName') &&
      this._validateName('lastName') &&
      this._validatePassword() &&
      this._validateId() 
    ) return this
  };

  _validateId(){
    if (this.userName === "") {
      //có trống hay không
      alert(`Vui lòng chọn uername`);
    } else if (userDataID.includes(this.userName)) {
      //kiểm tra xem có trùng hay không
      alert(`username đã tồn tại, vui lòng chọn username khác!`);
    } else {
      //trả về true để tiến hành ghi vào class
      return true;
    }
  };

  _validateName(name){
    if (this['name'] === "") {
      //có trống không
      alert(`Xin mời nhập ${name}`);
    } else {
      //trả về true để tiến hành ghi vào class
      return true;
    }
  };

  _validatePassword(){
    if (this.password === ""){
      //đã nhập chưa
      alert(`Xin mời nhập password`);
    }else if (this.password < 8) {
      //phải nhiều hơn 8 ký tự
      alert(`password có ít hơn 8 ký tự`);
    }else if(this.passConfirm === ""){
      //nhập lại passWord trong confirm
      alert("Vui lòng nhập password một lần nữa")
    }else if( this.password !== this.passConfirm) {
      // kiểm tra xem 2 passWord có giống nhau chưa
      alert(`Password nhập lại không giống`)
    } else{
      //trả về true để tiến hành ghi vào class
      return true
    }
  };

  // Kiểm tra đăng nhập
  _validateLogin(){
    
    const {userDataArr, userDataID} = getLocalStorage();
    if (this._validateIdLogin()) 
      return userDataArr.find(user => user.userName === this.userName)
  };

  _validateIdLogin(){
    if (this.userName === "") {
      //không để trống
      alert(`Bạn chưa nhập username`);
    } else if (!userDataID.includes(this.userName)) {
      //kiểm tra trong danh sách 
      alert(`username không tồn tại`);
    }else if(this._validatePasswordLogin()){
      return true
    }
  };

  _validatePasswordLogin(){
    if (this._password === ""){
      //không để trống
      alert(`Xin mời nhập password`);
    }else if(this._password !== userDataArr.find(user => user.userName === this.userName)._password){
      //giống như trong User
      alert(`mật khẩu bạn nhập không đúng`)
      console.log(this);
    }
    else{
      return true
    }
  };

};