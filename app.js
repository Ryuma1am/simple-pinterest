const main = document.querySelector("main");
const imgHover = document.querySelector(".box");
const modal = document.querySelector(".box__modal");
const openFavorites = document.querySelector(".open__favorites");
const favoritesContainer = document.querySelector(".favorites__container");
const containerPinterest = document.querySelector(".container");
const modalAddFav = document.querySelector(".modal__fav");
const imageToAddModal = document.querySelector(".modal__fav__add");
const cancelButton = document.querySelector(".modal__fav__button");
const form = document.querySelector(".group");
let imgFavs = [];
let url = "https://api.waifu.pics/sfw/waifu";

form.addEventListener("submit",(e)=>{
  e.preventDefault()
  if(document.querySelector(".input").value.length > 0){
    if (document.querySelector(".input").value == "waifu" || document.querySelector(".input").value == "neko" ||document.querySelector(".input").value == "shinobu" || document.querySelector(".input").value == "megumin" || document.querySelector(".input").value == "dance" || document.querySelector(".input").value == "smile" || document.querySelector(".input").value == "cry" ){
      url = `https://api.waifu.pics/sfw/${document.querySelector(".input").value}`;
      containerPinterest.textContent = ""
      printSection(url);
    }else{
      alert("Please, select one of the autocomplete options")
    }}
  else{
      alert("Please, select one of the autocomplete options")
    }
});


printSection(url);
function printLocalStorage(buttonfav){
  if(window.localStorage.getItem('imgFavsLocal') != null){
    favoritesContainer.textContent = ""
    let imgFavsLocale = window.localStorage.getItem('imgFavsLocal')
    imgFavsSplit = imgFavsLocale.split(",")
    for (let index = 0; index < imgFavsSplit.length; index++) {
      if (imgFavsSplit[0] == 0){
        return
      }
        printImageFav(imgFavsSplit[index], buttonfav);
        imgFavs[index] = imgFavsSplit[index];
  }
}}

printLocalStorage()
window.addEventListener('scroll', ()=>{
  const {scrollHeight, clientHeight, scrollTop} = document.documentElement
  scrollTop + clientHeight > scrollHeight - 3 && printSection(url)
})
openFavorites.addEventListener('click', ()=>{
  favoritesContainer.classList.toggle("favorites__container__off");
})

function printSection(link) {
  for (let index = 0; index < 10; index++) {
    fetch(link)
      .then((response) => response.json())
      .then((json) => printImage(json))
      .catch((err) => console.log(err));
  }
}
function getStorage(key){
    const value = window.localStorage.getItem(key);
    if(!(value)){
      return [];
    }
    return value;
}
function printImage(imgPic) {
  const figure = document.createElement("figure");
  figure.classList.add("fav__img");
  const img = document.createElement("img");
  img.src = imgPic.url;
  const div = document.createElement("div");
  div.classList.add("box__modal");
  div.classList.add("box__modal__off");
  const figureModal = document.createElement("figure");
  figureModal.classList.add("modal__figure");
  figureModal.classList.add("add__favorites");
  const imgAddFav = document.createElement("img");
  imgAddFav.src = "images/heart.svg";
  imgAddFav.alt = "Clik me to add this image of favorites";
  imgAddFav.classList.add("modal__figure__img");
  const linkDownload = document.createElement("a");
  linkDownload.target = "_blank";
  linkDownload.href = imgPic.url;
  linkDownload.download = (toString(imgPic.url).slice(10,20));
  const figureModalDownload = document.createElement("figure");
  const imgDownload = document.createElement("img");
  imgDownload.src = "images/file-arrow-down.svg";
  imgDownload.alt = "Clik me to download this image";
  imgDownload.classList.add("modal__figure__img");
  figureModal.appendChild(imgAddFav);
  figureModalDownload.appendChild(imgDownload);
  figureModalDownload.classList.add("modal__figure");
  linkDownload.appendChild(figureModalDownload);
  div.append(figureModal, linkDownload);
  figure.append(img, div);
  containerPinterest.append(figure)
  figure.addEventListener("mouseover", () => {
    div.classList.remove("box__modal__off");
  });
  figure.addEventListener("mouseout", () => {
    div.classList.add("box__modal__off");
  });
  imgAddFav.addEventListener("click", () => {
    if(imgAddFav.getAttribute("src") == "images/heart.svg"){
      imgAddFav.src = "images/heart-fill.svg";
      imgFavs.push(imgPic.url)
      window.localStorage.setItem('imgFavsLocal', imgFavs)
      printLocalStorage(imgAddFav)
      modalAddFav.classList.remove("modal__fav__off");
      imageToAddModal.src = imgPic.url;
      cancelButton.value = imgPic.url
      imgAddFav.id = imgPic.url
      setTimeout(()=>{
        modalAddFav.classList.add("modal__fav__off");
        imageToAddModal.src = "";
        cancelButton.value = "";
      },3000)
    }else{
        imgAddFav.src = "images/heart.svg";
        imgFavs = imgFavs.filter(imagefav => imagefav != imgPic.url)
        window.localStorage.setItem('imgFavsLocal', imgFavs)
        printLocalStorage(imgAddFav)
        modalAddFav.classList.add("modal__fav__off");
        imgAddFav.src = "images/heart.svg";
    }
  });
}
cancelButton.addEventListener("click",()=>{
  imgFavs = imgFavs.filter(imagefav => imagefav != cancelButton.value)
  window.localStorage.setItem('imgFavsLocal', imgFavs);
  let iconFav = document.getElementById(cancelButton.value);
  iconFav.src = "images/heart.svg";
  printLocalStorage();
  modalAddFav.classList.add("modal__fav__off");
  imageToAddModal.src = "";
  cancelButton.value = "";
})
function printImageFav(imgLink, buttonfavReset){
  const figure = document.createElement("figure");
  figure.classList.add("fav__img");
  const img = document.createElement("img");
  img.src = imgLink;
  const div = document.createElement("div");
  div.classList.add("box__modal");
  div.classList.add("box__modal__off");
  const figureModal = document.createElement("figure");
  figureModal.classList.add("modal__figure");
  figureModal.classList.add("add__favorites");
  const imgAddFav = document.createElement("img");
  imgAddFav.src = "images/heart-fill.svg";
  imgAddFav.alt = "Clik me to add this image of favorites";
  imgAddFav.classList.add("modal__figure__img");
  const linkDownload = document.createElement("a");
  linkDownload.href = imgLink;
  linkDownload.target = "_blank";
  linkDownload.download = (toString(imgLink).slice(10,20));
  const figureModalDownload = document.createElement("figure");
  const imgDownload = document.createElement("img");
  imgDownload.src = "images/file-arrow-down.svg";
  imgDownload.alt = "Clik me to download this image";
  imgDownload.classList.add("modal__figure__img");
  figureModal.appendChild(imgAddFav);
  figureModalDownload.appendChild(imgDownload);
  figureModalDownload.classList.add("modal__figure");
  linkDownload.appendChild(figureModalDownload);
  div.append(figureModal, linkDownload);
  figure.append(img, div);
  favoritesContainer.append(figure)
  figure.addEventListener("mouseover", () => {
    div.classList.remove("box__modal__off");
  });
  figure.addEventListener("mouseout", () => {
    div.classList.add("box__modal__off");
  });
  imgAddFav.addEventListener("click", () => {
    if(buttonfavReset != undefined){
      buttonfavReset.src = "images/heart.svg"
    }
    imgFavs = imgFavs.filter(imagefav => imagefav != imgLink)
    window.localStorage.setItem('imgFavsLocal', imgFavs)
    printLocalStorage()
  });
}