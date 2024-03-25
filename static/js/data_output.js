const catalogueInlaysContainer = document.querySelector('.catalogue-inlays__items');
const modalDetailBlocks = document.querySelectorAll('.modal__detail');
const sectionAllProds = document.getElementById('all');
let prodsElems = [];
const productsUrl = window.location.href + 'products';
const allProdsSection = document.getElementById('all');
const numbersProdsSection = document.getElementById('numbers');
const framesProdsSection = document.getElementById('frames');
const accessoriesProdsSection = document.getElementById('accessories');
const signsProdsSection = document.getElementById('signs');
let dataForRandom = [];

function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}


catalogueInlaysContainer.onclick = function (e) {
    e.preventDefault();
    for (let i = 0; i < catalogueInlaysContainer.children.length; i++) {
        catalogueInlaysContainer.children[i].classList.remove("active_inline");
        document.getElementById(catalogueInlaysContainer.children[i].getAttribute("data-container")).classList.add("block_hidden");
    }
    e.target.classList.add('active_inline');
    document.getElementById(e.target.getAttribute("data-container")).classList.remove('block_hidden')
}


async function getProducts() {
    let all = ``;
    let numbers = ``;
    let frames = ``;
    let accessories = ``;
    let signs = ``;

    let numsProds = [];
    let framesProds = [];
    let accessoriesProds = [];
    let signsProds = [];

    let productsResponse = await fetch(productsUrl)
    let products = await productsResponse.json();


    function getImages(prodImages) {
        let imgContainer = ``;
        if (prodImages.length > 1) {
            imgContainer += `<img src="${prodImages[0].image}" alt=""
                                                 class="element__img rounded_10 first_img width_full mb_20">
                                                <img src="${prodImages[1].image}" alt=""
                                                 class="element__img rounded_10 second_img width_full mb_20 block_hidden">`
        } else if (prodImages.length === 1) {
            imgContainer += `<img src="${prodImages[0].image}" alt=""
                                                 class="element__img rounded_10 first_img width_full mb_20">`
        }

        return imgContainer
    }

    function getProdToBasketBtn(prod) {
        let btn = ``;
        if (prod.product_name === 'Автомобильный номер | тип 1' || prod.product_name === 'Автомобильный номер | тип 1 (без флага)') {
            btn += `<button type="button"
                                    onclick="getProdToBasket(${prod.id}, '${prod.images[0].image}', '${prod.product_name}', '1 шт', 'без отверстий', null, null, ${prod.price}, 1)"
                                    class="element__btn font-smaller mr_5 text_black font_bold button_border bg_accent rounded_10 btn_extra-small">
                                            В корзину
                                 </button>`
        } else if (prod.product_name === 'Автомобильный номер | тип 1Б, 5, 10, 20') {
            btn += `<button type="button"
                                        onclick="getProdToBasket(${prod.id}, '${prod.images[0].image}', '${prod.product_name}','1 шт', null, 'желтый', null, ${prod.price}, 1)"
                                        class="element__btn font-smaller mr_5 text_black font_bold button_border bg_accent rounded_10 btn_extra-small">
                                            В корзину
                                        </button>`
        } else if (prod.product_name === 'Силиконовая рамка RCS') {
            btn += `<button type="button"
                                        onclick="getProdToBasket(${prod.id}, '${prod.images[0].image}', '${prod.product_name}', null, null, 'черный', null, ${prod.price}, 1)"
                                        class="element__btn font-smaller mr_5 text_black font_bold button_border bg_accent rounded_10 btn_extra-small">
                                            В корзину
                                        </button>`
        } else if (prod.product_name === 'Знаки опасности допог') {
            btn += `<button type="button"
                                        onclick="getProdToBasket(${prod.id}, '${prod.images[0].image}', '${prod.product_name}', null, null, null, 'Огнеопасно', ${prod.price}, 1)"
                                        class="element__btn font-smaller mr_5 text_black font_bold button_border bg_accent rounded_10 btn_extra-small">
                                            В корзину
                                        </button>`
        } else if (prod.product_name === 'Болты') {
            btn += `<button type="button"
                                        onclick="getProdToBasket(${prod.id}, null, '${prod.product_name}', null, null, null, null, null, 1)"
                                        class="element__btn font-smaller mr_5 text_black font_bold button_border bg_accent rounded_10 btn_extra-small">
                                            В корзину
                                        </button>`
        } else {
            btn += `<button type="button"
                                        onclick="getProdToBasket(${prod.id}, '${prod.images[0].image}', '${prod.product_name}', null, null, null, null, ${prod.price}, 1)"
                                        class="element__btn font-smaller mr_5 text_black font_bold button_border bg_accent rounded_10 btn_extra-small">
                                            В корзину
                                        </button>`
        }
        return btn
    }

    function getProdPrice(prodPrice) {
        let price = ``;
        if (prodPrice !== null) {
            price += `<p class="element__price font-small mb_20"> ${prodPrice} &#8381;</p>`
        }
        return price
    }

    function getProdCardText(prodCardText) {
        let cardText = ``;
        if (prodCardText.trim() !== '') {
            cardText += `<p class="element__text font_thin mb_20 text_grey">${prodCardText}</p>`
        }
        return cardText
    }

    products.map((prod) => {
        all += `
                <div class="element cursor_pointer ml_20 mr_20 mb_20 d-flex flex_column cursor_pointer"
                                 id="${prod.product_name}" data-modal="${prod.id}">
                                <div class="elem-info__cntr" onclick="openModal(${prod.id})">
                                    <div class="element_images">${getImages(prod.images)}</div>
                                    <div class="element__heading font_xs font_bold mb_10">${prod.product_name}
                                    </div>
                                    ${getProdCardText(prod.card_text)}
                                    ${getProdPrice(prod.price)}
                                </div>
                                <div class="buttons_container d-flex">
                                    <button type="button" data-modal="${prod.id}"
                                            onclick="openModal(${prod.id})"
                                            class="element__btn font-smaller mr_5 font_bold button_border bg_accent rounded_10 btn_extra-small">
                                        Подробнее
                                    </button>
                                    ${getProdToBasketBtn(prod)}
                                </div>
                            </div>`

        allProdsSection.innerHTML = all;

        if (prod.category.name === 'Номера') {
            numsProds.push(prod)
        } else if (prod.category.name === 'Рамки') {
            framesProds.push(prod)
        } else if (prod.category.name === 'Аксессуары') {
            accessoriesProds.push(prod)
        } else if (prod.category.name === 'Знаки') {
            signsProds.push(prod)
        }

        dataForRandom.push(`${prod.id}`)
    });


    numsProds.length >= 1
        ? numsProds.map((prod) => {
            numbers += `<div class="element cursor_pointer ml_20 mr_20 mb_20 d-flex flex_column cursor_pointer"
                                 id="${prod.product_name}" data-modal="${prod.id}">
                                <div class="elem-info__cntr" onclick="openModal(${prod.id})">
                                    <div class="element_images">${getImages(prod.images)}</div>
                                    <div class="element__heading font_xs font_bold mb_10">${prod.product_name}
                                    </div>
                                    ${getProdCardText(prod.card_text)}
                                    ${getProdPrice(prod.price)}
                                </div>
                                <div class="buttons_container d-flex">
                                    <button type="button" data-modal="${prod.id}"
                                            onclick="openModal(${prod.id})"
                                            class="element__btn font-smaller mr_5 font_bold button_border bg_accent rounded_10 btn_extra-small">
                                        Подробнее
                                    </button>
                                    ${getProdToBasketBtn(prod)}
                                </div>
                            </div>`
        })
        : numbers += `<div class="empty__container width_full d-flex flex-align_center flex-justify_center">Ничего не
                                найдено</div>`

    numbersProdsSection.innerHTML = numbers;


    framesProds.length >= 1
        ? framesProds.map((prod) => {
            frames += `<div class="element cursor_pointer ml_20 mr_20 mb_20 d-flex flex_column cursor_pointer"
                                 id="${prod.product_name}" data-modal="${prod.id}">
                                <div class="elem-info__cntr" onclick="openModal(${prod.id})">
                                    <div class="element_images">${getImages(prod.images)}</div>
                                    <div class="element__heading font_xs font_bold mb_10">${prod.product_name}
                                    </div>
                                    ${getProdCardText(prod.card_text)}
                                    ${getProdPrice(prod.price)}
                                </div>
                                <div class="buttons_container d-flex">
                                    <button type="button" data-modal="${prod.id}"
                                            onclick="openModal(${prod.id})"
                                            class="element__btn font-smaller mr_5 font_bold button_border bg_accent rounded_10 btn_extra-small">
                                        Подробнее
                                    </button>
                                    ${getProdToBasketBtn(prod)}
                                </div>
                            </div>`
        })
        : frames += `<div class="empty__container width_full d-flex flex-align_center flex-justify_center">Ничего не
                                найдено</div>`

    framesProdsSection.innerHTML = frames;

    accessoriesProds >= 1
        ? accessoriesProds.map((prod) => {
            accessories += `<div class="element cursor_pointer ml_20 mr_20 mb_20 d-flex flex_column cursor_pointer"
                                     id="${prod.product_name}" data-modal="${prod.id}">
                                    <div class="elem-info__cntr" onclick="openModal(${prod.id})">
                                        <div class="element_images">${getImages(prod.images)}</div>
                                        <div class="element__heading font_xs font_bold mb_10">${prod.product_name}
                                        </div>
                                        ${getProdCardText(prod.card_text)}
                                        ${getProdPrice(prod.price)}
                                    </div>
                                    <div class="buttons_container d-flex">
                                        <button type="button" data-modal="${prod.id}"
                                                onclick="openModal(${prod.id})"
                                                class="element__btn font-smaller mr_5 font_bold button_border bg_accent rounded_10 btn_extra-small">
                                            Подробнее
                                        </button>
                                        ${getProdToBasketBtn(prod)}
                                    </div>`
        })
        : accessories += `<div class="empty__container width_full d-flex flex-align_center flex-justify_center">Ничего не
                                  найдено</div>`

    accessoriesProdsSection.innerHTML = accessories;

    signsProds.length >= 1
        ? signsProds.map((prod) => {
            signs += `<div class="element cursor_pointer ml_20 mr_20 mb_20 d-flex flex_column cursor_pointer"
                                 id="${prod.product_name}" data-modal="${prod.id}">
                                <div class="elem-info__cntr" onclick="openModal(${prod.id})">
                                    <div class="element_images">${getImages(prod.images)}</div>
                                    <div class="element__heading font_xs font_bold mb_10">${prod.product_name}
                                    </div>
                                    ${getProdCardText(prod.card_text)}
                                    ${getProdPrice(prod.price)}
                                </div>
                                <div class="buttons_container d-flex">
                                    <button type="button" data-modal="${prod.id}"
                                            onclick="openModal(${prod.id})"
                                            class="element__btn font-smaller mr_5 font_bold button_border bg_accent rounded_10 btn_extra-small">
                                        Подробнее
                                    </button>
                                    ${getProdToBasketBtn(prod)}
                                </div>
                            </div>`
        })
        : signs += `<div class="empty__container width_full d-flex flex-align_center flex-justify_center">Ничего не
                            найдено</div>`

    signsProdsSection.innerHTML = signs;


    let elementContainers = document.querySelectorAll('.element');

    for (let i = 0; i < elementContainers.length; i++) {

        if (elementContainers[i].getAttribute('id') === 'Автомобильный номер | тип 1'
            || elementContainers[i].getAttribute('id') === 'Автомобильный номер | тип 1 (без флага)'
            || elementContainers[i].getAttribute('id') === 'Автомобильный номер | тип 1Б, 5, 10, 20'
            || elementContainers[i].getAttribute('id') === 'Знаки опасности допог') {
            let imagesContainer = elementContainers[i].children[0].children[0];
            imagesContainer.addEventListener('mouseover', () => {
                imagesContainer.querySelector('.first_img').classList.add('block_hidden');
                imagesContainer.querySelector('.second_img').classList.remove('block_hidden');
            })
            imagesContainer.addEventListener('mouseout', () => {
                imagesContainer.querySelector('.second_img').classList.add('block_hidden');
                imagesContainer.querySelector('.first_img').classList.remove('block_hidden');
            })
        }
    }

    const prodElements = sectionAllProds.querySelectorAll('.element');
    prodElements.forEach((elem) => {
        if (getMultipleRandom(dataForRandom, 4).includes((elem.getAttribute('data-modal')))) {
            prodsElems.push(elem.cloneNode(true))
        }
    })

}

getProducts();

for (let i = 0; i < modalDetailBlocks.length; i++) {
    document.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target === modalDetailBlocks[i]) {
            e.target.classList.add('block_hidden');
        }
    })
}

function openModal(id) {
    let modalDetail = document.getElementById(id);
    modalDetail.classList.remove('block_hidden')
    modalDetail.style.top = `${document.body.scrollTop - 100}px`
    // let closeBtn = modalDetail.querySelector('.close__modal');
    // let detailContainer = modalDetail.querySelector('.detail_container')
    showSlides(1);
    let relevantProdBlock = modalDetail.querySelector(`[data-random="${id}"]`)
    prodsElems.slice(0, 4).forEach((elem) => {
        relevantProdBlock.append(elem)
    })

}

function closeModal(id) {
    let modal = document.getElementById(id);
    modal.classList.add('block_hidden')
}


function chooseFrameColor(id, image, name, color, price) {
    let addToBasketBtn = document.querySelector(`[data-basket="${id}"]`);
    addToBasketBtn.setAttribute('onclick', `getProdToBasketFromDetail(${id}, "${image}",  "${name}", null, null, "${color}", null, ${parseInt(price)}, 1)`)
}


function getSignType(id, image, name, sign, price) {
    let addToBasketBtn = document.querySelector(`[data-basket="${id}"]`);
    addToBasketBtn.setAttribute('onclick', `getProdToBasketFromDetail(${id}, "${image}",  "${name}", null, null,  null,"${sign}", ${parseInt(price)}, 1)`)
}