//我們運用 JavaScript 做到了以下幾個功能：
//搜尋電影
//收藏電影 / 移除收藏
//分頁
//視個人情況或喜好來挑選自己想嘗試的功能，選擇上述 3 個功能裡的至少 1 個。

//分頁器
//切割頁數 總數/ 一頁顯示數量
//點擊該頁數事件 並刷新該頁顯示內容
// 我的最愛也要有分頁


const BASE_URL = 'https://user-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/users/'
const USERS_PER_PAGE = 16



const userList = JSON.parse(localStorage.getItem("myFavorite"))
console.log(userList)

const dataPanel = document.querySelector('#data-panel')
const paginator = document.querySelector('#paginator')


function renderUserList(data) {
  let rawHTML = ''
  data.forEach((item) => {
    rawHTML +=
      `<div class="col-sm-3">
        <div class ="mb-2" >
          <div class="card" style="width: 18rem;">
            <img src="${item.av}" class="card-img-top" data-bs-toggle="modal" data-bs-target="#userModal" data-id="${item.id}" alt="Avatar">
            <div class="card-footer data-bs-toggle="modal" data-bs-target="#userModal" data-id="${item.id} text-center">
              <h5 class="card-title" data-bs-toggle="modal" data-bs-target="#userModal" data-id="${item.id}">${item.name} ${item.surname}</h5>  
               <div class="d-grid justify-content-end">
                 <button class="btn btn-danger card-like-button" data-id= "${item.id}" type="button">♥</button>
               </div>  
            </div>
          </div>
        </div> 
      </div>`
  })

  dataPanel.innerHTML = rawHTML
}




//處理Modal內容 
function showModal(id) {
  const modalName = document.querySelector('#user-name')
  const modalGender = document.querySelector('#user-gender')
  const modalRegion = document.querySelector('#user-region')
  const modalBirthday = document.querySelector('#user-bd')
  const modalEmail = document.querySelector('#user-email')

  axios.get(INDEX_URL + id).then((response) => {

    modalName.innerText = 'Name：' + response.data.name + ' ' + response.data.surname
    modalGender.innerText = 'Gender：' + response.data.gender
    modalRegion.innerText = 'Region：' + response.data.region
    modalBirthday.innerText = 'Birthday：' + response.data.birthday
    modalEmail.innerText = 'Email：' + response.data.email
  })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

}

//處理分頁數量 (切割頁數總數/ 一頁顯示數量)
function getUsersByPage(page) {
  // page 1 → movies 0 - 16
  // page 2 → movies 12 - 28
  // page 3 → movies 28 - 44
  // ...

  const data = userList
  const startIndex = (page - 1) * USERS_PER_PAGE
  return data.slice(startIndex, startIndex + USERS_PER_PAGE)
}



//渲染分頁器
function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / USERS_PER_PAGE)

  let rowHTML = ``

  for (let p = 1; p <= numberOfPages; p++) {
    rowHTML += `<li class="page-item"><a class="page-link" data-page="${p}" href="#${p}">${p}</a></li>`
  }
  paginator.innerHTML = rowHTML

}



//取出點擊牌卡事件的id 
dataPanel.addEventListener('click', function onPanelClick(event) {
  const target = event.target.dataset.id
  if (event.target.matches('.card-img-top')) {
    showModal(Number(target))
    console.log(event.target)
  } else if (event.target.matches(".card-title")) {
    showModal(Number(target))
  } else if (event.target.matches(".card-like-button")) {
    addToMyFavorite(Number(target))
  }
})



renderUserList(userList)
