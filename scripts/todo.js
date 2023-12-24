'use strict'
// - Tạo được chức năng Todo List cho ứng dụng.
// - Lưu dữ liệu vào LocalStorage.
// - Hiển thị các Task của owner hiện tại.
// - Khi click vào một Task thì bạn có thể đánh dấu là Task đó đã hoàn thành hoặc chưa hoàn thành, dữ liệu này cũng được cập nhật vào LocalStorage tương ứng.
// - Khi click vào nút Delete ở bên cạnh các Task, xóa task tương ứng ra khỏi danh sách.

const taskInput = document.getElementById("input-task")
const addBtn = document.getElementById("btn-add")
const todoListContainer = document.getElementById("todo-list")

//dùng  nút close để xóa task hoặc toogle sự kiện click vào một task
let closeBtn = document.querySelector('.close')


// 8.a.1 tạo Class Task
class Task{
  constructor(task, owner, isDone){
    this.task = task;
    this.owner = owner;
    this.isDone = isDone
  }
}

//lấy dữ liệu từ local nếu có hoặc tạo mới nếu chưa
const KEY = "todo_ARR"
const todoArr =
  getFromStorage(KEY) === undefined
    ? []
    : JSON.parse(getFromStorage(KEY));

// Lấy thông tin người dùng, nếu chưa đăng nhập thì dùng như local
let currentUser = "currentUser"
const userLogin = 
  getFromStorage(currentUser) === undefined
  ? alert("please login or register to create and see your todo list")
  : JSON.parse(getFromStorage(currentUser));


// Các function
// function kiểm tra đã nhập task chưa
function validateTask(task){
  if (task.value === "") {
    //có trống không
    alert(`Xin mời nhập task`);
  } else {
    //trả về true để tiến hành ghi vào class
    return true;
  }
}
// function hiển thị các Task lên màn hình
// 8b Hiển thị các Task
async function renderTodo(todo){
  let html = ``
  //xóa trường để ghi lại
  console.log(todoListContainer.innerHTML = "")
  let todoList = todoArr.filter(task => task.owner === userLogin.userName)
  
  //ghi vào html với index và dữ liệu
  todoList.forEach((taskEl, index) => 
  
    html = html + `<li class="${taskEl.isDone === true ? "checked" : ""}" index="${index}">
      ${taskEl.task}<span class="close" >×</span></li>`
  )

//sau khi thêm danh sách vào màn hình 
  await todoListContainer.insertAdjacentHTML("beforeend", html)
// thì ghi lại các html close
closeBtn  = document.querySelector('.close')
}
// 8b: hiển thị các task
renderTodo()
// Các sự kiện

// 8a.2: thêm vào array
addBtn.addEventListener('click',function(){
  if(validateTask(taskInput.value)){
    const newTask = new Task(taskInput.value, userLogin.userName, false)

    //thêm vào todoArr
    todoArr.push(newTask)
    taskInput.value  = ""
    // lưu xuống LocalStorage
    saveToStorage(KEY, JSON.stringify(todoArr));
  }
  renderTodo()
})



//khi click vào một task
todoListContainer.addEventListener('click', function(e){
  const clicked = e.target
  let todoList = todoArr.filter(task => task.owner === userLogin.userName)
  //xử lý sự kiện bấm vào ô chứa nhưng không phải x
  //8c Toogle Task
  if(clicked.nodeName === "LI"){
  clicked.classList.toggle("checked")
  // lấy index của task để hiệu chỉnh trong storage
  let currentTaskIndex = todoArr.indexOf(todoList[clicked.getAttribute("index")])
  
  // chuyển trạng thái trong array 
  todoArr[currentTaskIndex].isDone = !todoArr[currentTaskIndex].isDone

  //lưu lại vào LocalStorage
  saveToStorage(KEY, JSON.stringify(todoArr));}
    //bấm vào ô chứa x
    //8d: Delete Task
  if(clicked.nodeName === "SPAN"){
    
    // lấy index của task để hiệu chỉnh trong storage
    let currentTaskIndex = todoArr.indexOf(todoList[clicked.parentNode.getAttribute("index")])
    
    // xóa trong array gốc 
    todoArr.splice(currentTaskIndex, 1)
    saveToStorage(KEY, JSON.stringify(todoArr))
    //khởi tạo lại
    renderTodo()
  }

})
