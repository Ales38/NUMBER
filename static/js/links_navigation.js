const headerNavLinksCntr = document.querySelector('.header-nav__links');
const burgerNavLinksCntr = document.querySelector('.burger-nav__links');
const footerNavLinks = document.querySelectorAll('.footer_nav');
const closeBurgerBtn = document.getElementById('closeBurgerBtn');
const burgerMenu = document.getElementById('burgerMenu');
const burgerMenuMedia = document.getElementById('burgerMenuMedia');
let popup = document.querySelector('.cookie-popup');
let videoModal = document.getElementById('videoModal');
const closeVideoBtn = document.getElementById('closeVideo');
const openVideo = document.getElementById('openVideo');
const burgerMenuSection = document.getElementById('burgerMenuSection');

burgerMenu.addEventListener('click', openBurgerMenu);
burgerMenuMedia.addEventListener('click', openBurgerMenu);
closeBurgerBtn.addEventListener('click', closeBurgerMenu);

headerNavLinksCntr.addEventListener('click', (e) => {
    e.preventDefault();
    for (let i = 0; i < headerNavLinksCntr.children.length; i++) {
        headerNavLinksCntr.children[i].classList.remove('link_active');
    }
    e.target.classList.add('link_active');
    document.getElementById(e.target.getAttribute("data-link")).scrollIntoView({behavior: "smooth"});
})

burgerNavLinksCntr.addEventListener('click', (e)=>{
    e.preventDefault();
    for (let i = 0; i < burgerNavLinksCntr.children.length; i++) {
        console.log(burgerNavLinksCntr.children[i])
        burgerNavLinksCntr.children[i].classList.remove('link_active');
    }
    e.target.classList.add('link_active');
    document.getElementById(e.target.getAttribute("data-link")).scrollIntoView({behavior: "smooth"});
    if (burgerMenuSection.style.width !== '0'){
        closeBurgerMenu(e)
    }
})

for (let i = 0; i < footerNavLinks.length; i++) {
    footerNavLinks[i].onclick = function () {
        document.getElementById(footerNavLinks[i].getAttribute("data-link")).scrollIntoView({behavior: "smooth"});
    }
}

function buttonNavigation(section) {
    document.getElementById(section).scrollIntoView({behavior: "smooth"});
}

openVideo.onclick = function (e){
    e.preventDefault();
    videoModal.classList.remove('block_hidden');
    videoModal.style.height = `${document.body.clientHeight + 50}`;
    videoModal.style.top = `${document.body.scrollTop - 100}`;
}

closeVideoBtn.onclick = function (e){
    e.preventDefault();
    videoModal.classList.add('block_hidden');
    document.body.style.overflow = 'auto'
}

function closeCookiePopup() {
    popup.style.display = 'none';
}

function openBurgerMenu(e){
    e.preventDefault();
    burgerMenuSection.style.width = '100%';
    document.querySelector('.burger-menu__container').style.display = 'flex';
    document.body.style.overflowY = 'hidden'
}

function closeBurgerMenu(e){
    e.preventDefault()
    burgerMenuSection.style.width = '0%';
    document.querySelector('.burger-menu__container').style.display = 'none'
    document.body.style.overflowY = 'auto'
}