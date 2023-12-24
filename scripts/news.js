'use strict'
// lấy dữ liệu từ Settings

const settingStorage =
  getFromStorage("setting_ARR") === undefined
    ? []
    : JSON.parse(getFromStorage("setting_ARR"));
//dữ liệu người dùng hiện tại
let currentUser = "currentUser";
const userLogin = 
  getFromStorage(currentUser) === undefined
    ? alert("please login or register to create and see your settings")
    : JSON.parse(getFromStorage(currentUser));
    
const userSetting = settingStorage.filter(set => set.owner === userLogin.userName)
const setting = userSetting[0]
console.log(setting);
let country = "us"
let category = !setting ? "business": setting.category
let pageSize = 23
let page = 3
let newsPerPage = !setting ? 4 : setting.pageSize
const apiKey = "307d50eabb124a98b5d4594bfc0dcf08"

//Các đối số
const newsContainer = document.getElementById("news-container")
const prevBtn = document.getElementById("btn-prev")
const nextBtn = document.getElementById("btn-next")
const pageLink = document.querySelectorAll(".page-link")
const liPageNum = document.querySelector("li#page-num.page-item.disabled")
const pagination = document.querySelector(".pagination")
const pageNum = document.getElementById("page--num")
let pageItem
let pageNumByItem

// #6.0 tạo class để lưu trữ các bài viết
class newspaperClass{
  constructor(author, content, description, publishedAt, source,title, url, urlToImage)
  {this.author = author, 
   this.content = content, 
   this.description = description, 
   this.publishedAt = publishedAt, 
   this.source = source, 
   this.title = title, 
   this.url = url, 
   this.urlToImage = urlToImage
  }};
let test
let newsKey= []
const newsArr = []
let pageCount


// Các function
// 6.1 Sử dụng news API để lấy dữ liệu về các bài viết hiển thị ra cho người dùng
async function getNews(){
  const request = fetch(`
  https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`)
  
  // const request = fetch(`
  // https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`);
  
  await request
  .then(res => res.json())
  .then (async (data) =>{
    console.log(data);
    // lưu trữ key để tiện iterate
    newsKey = Object.keys(data.articles[0])
    test = data.articles[0]
    data.articles.forEach((title) => {
      // tạo class mới
      const newspaper = new newspaperClass
      //iterate qua key
      newsKey.forEach((key) =>{
        // lưu theo key
        newspaper[key] = title[key] 
      })
      // push user vào newsArr
      newsArr.push(newspaper)
    })
    await newsArr
  })
  //số bài viết trong data.articles ít hơn giá trị của totalResults,
  //nên đặt theo thông số nào?
  pageCount = Math.round(newsArr.length/newsPerPage)
  
  // chia lại các bài viết theo trang
  adjustNumberOfPage(pageCount)
  //push các bài viết vào trang
  newsArr.forEach((page,index) =>{
    console.log(Math.floor((index)/newsPerPage)+1);
    renderNewspaper(Math.floor(index/newsPerPage)+1,page)
  })

}


// Ẩn nút Previous
function hidePreviousButton(){prevBtn.classList.add('d-none')}

// Ẩn nút Next
function hideNextButton(){nextBtn.classList.add('d-none')}

//Hiển thị nút Previous
function showPreviousButton(){prevBtn.classList.remove('d-none')}

//Hiển thị nút Next
function showNextButton(){nextBtn.classList.remove('d-none')}


// Dùng khi bấm nút Previous hoặc Next
function showPaperWithBtn(){
  //thêm hệ số hiệu chỉnh để chuyển page theo index
  let kOne = this.textContent.includes("Next") ? 1 : -1
  let kTwo = this.textContent.includes("Next") ? 1 : -1

  // querySelector cho trang đang sử dụng
  let disabledPage = document.querySelector(".disabled")
  //indexPag tương ứng với index trong array disabledPage, là page đang hiển thị
  let indexPag = Number(disabledPage.textContent) -1;
  
  //ẩn tất cả các trang
  const newspaperContainers = document.querySelectorAll(".newspapers-containers")
  newspaperContainers.forEach(newspaper => newspaper.classList.add('d-none'))
  
  //hiển thị trang tương ứng
  const newsPaperEls = document.querySelectorAll(`.newspaper-in--${Number(disabledPage.textContent) + kOne}`)
  newsPaperEls.forEach(newspaper => newspaper.classList.remove('d-none'))
  
  //hiển thị lại trang đang ở trên pagination
  pageNumByItem[indexPag + kTwo].classList.add('disabled')
  console.log(Number(disabledPage.textContent)+kOne, indexPag, indexPag + kTwo);
  pageNumByItem[indexPag].classList.remove('disabled')


  //xử lý các sự kiện khi ấn nút Next và Previous 
  if(indexPag != pageCount){
    // hiển thị nút nextBtn khi ấn Previous khi ở trang cuối
    showNextButton()
  } 
  
  if(indexPag === 0 && this.textContent.includes("Next")){
    //hiển thị nút Previous khi bấm Next để chuyển trang 1 sang trang 2
    showPreviousButton()
  }

  if(indexPag -1 === 0 && !this.textContent.includes("Next")){
    //7.3 Khi đang ở Page số 1 thì nút "Previous" sẽ bị ẩn đi.
    //ẩn nút Previous khi chuyển từ trang 2 về trang 1
    hidePreviousButton()
  }else if (indexPag + 2 === pageCount && this.textContent.includes("Next")){
    //7.4 Nếu như không thể lấy thêm các bài viết nữa, nút "Next" sẽ bị ẩn đi.
    //ẩn nút Next để chuyển từ sang trang cuối
    hideNextButton()
  }

}


// render trang lên màn hình
//dùng class để chia bài và chia trang
function renderNewspaper(pageCount, news){
  const html = `
  <div class= "newspaper-in--${pageCount} newspapers-containers" >
  <div class="card flex-row flex-wrap">
					<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src="${news.urlToImage}" class="card-img"
									alt="${news.title}">
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${news.title}</h5>
									<p class="card-text">${news.content}</p>
									<a href="${news.url}"
										class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>
				</div>
  </div>
  `
  newsContainer.insertAdjacentHTML("beforeend",html)
}

// function điều chỉnh số trang 
async function adjustNumberOfPage(pageCount){

  //chia lại số trang theo số lượng bài và số lượng bài mỗi trang
  const indexForIterate = []
  console.log(pageCount);
  for (let i =2; i<=pageCount; i++){
    indexForIterate.push(i)
  }
  let html = ``
  indexForIterate.forEach(num =>{html = html + `<li class="page-item disabled" id ="page--num">
    <a class="page-link" href="#" id="page-num">${num}</a></li>
    `})

  await pageNum.insertAdjacentHTML("afterend", html)

  
  // #7.2 Khi nhấn vào nút, số page hiện tại được cập nhật tương ứng.
  //điều chỉnh hiệu ứng ở các nút hiển thị vị trí trang đang xem
  //chỉ thực thi khi đã có hết các số trang
  pageItem = document.querySelector(".page-item")
  // lấy danh sách dựa trên số
  pageNumByItem = document.querySelectorAll("#page--num.page-item")

  //xóa hiệu ứng trên tất cả, sau đó thêm vào page hiện hành (page 1)
  pageNumByItem.forEach(page =>page.classList.remove('disabled'))
  pageNumByItem[0].classList.add('disabled')

  //ẩn nút Previous khi ở trang 1
  //7.3 Khi đang ở Page số 1 thì nút "Previous" sẽ bị ẩn đi.
  hidePreviousButton()

  //ẩn các bài viết 
  const newspaperContainers = document.querySelectorAll(".newspapers-containers")
  newspaperContainers.forEach(newspaper => newspaper.classList.add('d-none'))
  // và hiển thị lại
  const newsPaperEls = document.querySelectorAll(`.newspaper-in--1`)
  newsPaperEls.forEach(newspaper => newspaper.classList.remove('d-none'))

};

getNews().catch(err => console.log(err, "lỗi không tải anh"))


//Các sự kiện

// #7.1 Xử lý được việc chuyển trang để xem các bài viết tiếp theo.
pagination.addEventListener("click", function(e){
  const clicked = e.target.closest('#page--num.page-item');
  const newspaperContainers = document.querySelectorAll(".newspapers-containers")
  if(!clicked) return
  if(clicked){
    // đưa trạng thái của các bài viết và số trang về không hiển thị
    pageNumByItem.forEach(page =>{
      page.classList.remove('disabled')
      newspaperContainers.forEach(newspaper => newspaper.classList.add('d-none'))
    })

    //đưa trang hiện hành và số trang về trạng thái hiển thị
    clicked.classList.add('disabled')

    //dựa trên số trên thanh pagination
    const newsPaperEls = document.querySelectorAll(`.newspaper-in--${Number(clicked.textContent)}`)
    newsPaperEls.forEach(newspaper => newspaper.classList.remove('d-none'))

    console.log(clicked.textContent)
    //xử lý khi chọn trang đầu hoặc trang cuối
    if(clicked.textContent == pageCount){

      //7.4 Nếu như không thể lấy thêm các bài viết nữa, nút "Next" sẽ bị ẩn đi.
      //ẩn nút Next và hiển thị lại nút Previous
      hideNextButton()
      showPreviousButton()
    }else if(clicked.textContent == 1){
      // 7.3 Khi đang ở Page số 1 thì nút "Previous" sẽ bị ẩn đi.
      //ẩn nút Previous và hiển thị lại nút Next
      showNextButton()
      hidePreviousButton()
    }else{
      //hiển thị cả hai nút
      showNextButton()
      showPreviousButton()
    }
  }
})


nextBtn.addEventListener('click',showPaperWithBtn)

prevBtn.addEventListener('click',showPaperWithBtn)