async function getModalDetail() {
    let modal = ``
    let productsResponse = await fetch(productsUrl)
    let products = await productsResponse.json();

    function getImagesForCarousel(prod) {
        let images = ``;
        prod.images.map((img) => {
            images += `<img src="${img.image}" alt="" class="elem__img zoom" data-element="${prod.id}" onclick="openZoomImages(${prod.id})">`
        })
        return images
    }

    function getImagesForCarouselDots(prod) {
        let images = ``;

        prod.images.map((img) => {
            let index = prod.images.indexOf(img)
            images += `<img src="${img.image}" alt="" class="elem__img_small dot" onclick="currentSlide(${index + 1})">`
        })
        return images
    }

    function getImageContainer(prod) {
        let imgContainer = ``;

        if (prod.product_name !== "Болты") {
            imgContainer += ` <div class="element-images__container d-flex flex_column flex-align_center">
                                <div class="image_carousel d-flex flex_column flex-align_center" data-zoom="${prod.id}">
                                    ${getImagesForCarousel(prod)}
                                    <a class="prev arrow cursor_pointer" onclick="plusSlides(-1)">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                                             fill="none">
                                            <path d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z"
                                                  fill="white"></path>
                                            <path d="M23.3388 12.1897L16.1957 19.5175C16.0702 19.6463 16 19.8189 16 19.9986C16 20.1784 16.0702 20.351 16.1957 20.4797L23.3388 27.8103C23.3973 27.8704 23.4672 27.9181 23.5443 27.9506C23.6215 27.9832 23.7044 28 23.7882 28C23.872 28 23.9549 27.9832 24.0321 27.9506C24.1093 27.9181 24.1792 27.8704 24.2376 27.8103C24.3578 27.6872 24.4251 27.522 24.4251 27.3499C24.4251 27.1779 24.3578 27.0126 24.2376 26.8895L17.5204 19.9986L24.2376 13.1091C24.3574 12.9861 24.4245 12.8211 24.4245 12.6494C24.4245 12.4776 24.3574 12.3127 24.2376 12.1897C24.1792 12.1296 24.1093 12.0819 24.0321 12.0494C23.9549 12.0168 23.872 12 23.7882 12C23.7044 12 23.6215 12.0168 23.5443 12.0494C23.4672 12.0819 23.3973 12.1296 23.3388 12.1897Z"
                                                  fill="#333333"></path>
                                        </svg>
                                    </a>
                                    <a class="next arrow cursor_pointer" onclick="plusSlides(1)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                                             fill="none">
                                            <path d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z"
                                                  fill="white"></path>
                                            <path d="M16.661 27.8103L23.8042 20.4825C23.9296 20.3537 23.9998 20.1811 23.9998 20.0014C23.9998 19.8216 23.9296 19.649 23.8042 19.5203L16.661 12.1897C16.6026 12.1296 16.5327 12.0819 16.4555 12.0494C16.3783 12.0168 16.2954 12 16.2116 12C16.1279 12 16.0449 12.0168 15.9678 12.0494C15.8906 12.0819 15.8207 12.1296 15.7623 12.1897C15.642 12.3128 15.5747 12.478 15.5747 12.6501C15.5747 12.8221 15.642 12.9874 15.7623 13.1105L22.4795 20.0014L15.7623 26.8909C15.6424 27.0139 15.5754 27.1789 15.5754 27.3506C15.5754 27.5224 15.6424 27.6873 15.7623 27.8103C15.8207 27.8704 15.8906 27.9181 15.9678 27.9506C16.0449 27.9832 16.1279 28 16.2116 28C16.2954 28 16.3783 27.9832 16.4555 27.9506C16.5327 27.9181 16.6026 27.8704 16.661 27.8103Z"
                                                  fill="#333333"></path>
                                        </svg>
                                    </a>
                                </div>
                                <div class="all-elem__images d-flex flex-justify_center">
                                       ${getImagesForCarouselDots(prod)}
                                 </div>
                            </div>`
        }
        return imgContainer
    }

    function getProdPrice(prod) {
        let price = ``;
        if (prod.price) {
            if (prod.product_name === 'Автомобильный номер | тип 1'
                || 'Автомобильный номер | тип 1 (без флага)'
                || 'Автомобильный номер | тип 1Б, 5, 10, 20') {
                price += `<div class="element-info__item font_xs mb_20 price"
                             data-price="${prod.id}"
                             data-value="${prod.price}">${prod.price} &#8381;
                       </div>`
            } else if (prod.product_name === 'Знаки ДОПОГ') {
                price += ` <div class="element-info__item font_xs mb_20 price">${prod.price} &#8381; <span
                                class="font_thin text_grey"></span> 1 шт
                           </div>`
            } else {
                price += `<div class="element-info__item font_xs mb_20 price">${prod.price} &#8381;
                                            </div>`
            }
        }
        return price
    }

    function getProdColor(prodColorsArray) {
        let numColor = ``;

        prodColorsArray.map((color) => {
            numColor += `<img data-tooltip="${color.color_name}"
                               class="color-radio elem__img_small cursor_pointer"
                               src="${color.color_image}" alt="">`
        })

        return numColor
    }

    function getImagesForBtn(prodName, prodImageObj) {
        let img = ``;
        if (prodName !== 'Болты'){
            img += prodImageObj.image
        } else {
             img += null
        }
        return img
    }

    function addToBasketBtn(prod) {
        let button = ``;
        if (prod.product_name === 'Автомобильный номер | тип 1' || 'Автомобильный номер | тип 1 (без флага)') {
            button += `<button type="button" data-basket="${prod.id}"
                              onclick="getProdToBasketFromDetail(${prod.id}, '${getImagesForBtn(prod.product_name, prod.images[0])}', '${prod.product_name}', '1 шт', 'без отверстий', null, null, ${prod.price}, 1 )"
                              class="element__btn font-small mb_30 font_bold button_border bg_accent rounded_10 btn_medium">
                              Добавить в корзину
                      </button>`
        } else if (prod.product_name === 'Автомобильный номер | тип 1Б, 5, 10, 20') {
            button += `<button type="button" data-basket="${prod.id}"
                               onclick="getProdToBasketFromDetail(${prod.id}, '${getImagesForBtn(prod.product_name, prod.images[1])}', '${prod.product_name}', '1 шт', null , 'желтый', null, ${prod.price}, 1)"
                               class="element__btn font-small mb_30 font_bold button_border bg_accent rounded_10 btn_medium">
                               Добавить в корзину
                       </button>`
        } else if (prod.product_name === 'Силиконовая рамка RCS') {
            button += `<button type="button" data-basket="${prod.id}"
                               onclick="getProdToBasketFromDetail(${prod.id}, '${getImagesForBtn(prod.product_name, prod.images[0])}', '${prod.product_name}', null, null , 'черный', null, ${prod.price}, 1)"
                               class="element__btn font-small mb_30 font_bold button_border bg_accent rounded_10 btn_medium">
                               Добавить в корзину
                       </button>`
        } else if (prod.product_name === 'Знаки опасности допог') {
            button += `<button type="button" data-basket="${prod.id}"
                               onclick="getProdToBasketFromDetail(${prod.id}, '${getImagesForBtn(prod.product_name, prod.images[1])}', '${prod.product_name}', null, null, null,'Огнеопасно', ${prod.price}, 1)"
                               class="element__btn font-small mb_30 font_bold button_border bg_accent rounded_10 btn_medium">
                               Добавить в корзину
                       </button>`
        } else if (prod.product_name === 'Болты') {
            button += `<button type="button" data-basket="${prod.id}"
                               onclick="getProdToBasketFromDetail(${prod.id}, null, '${prod.product_name}', null, null, null, null, null, 1)"
                               class="element__btn font-small mb_30 font_bold button_border bg_accent rounded_10 btn_medium">
                               Добавить в корзину
                       </button>`
        } else {
            button += `<button type="button" data-basket="${prod.id}"
                               onclick="getProdToBasketFromDetail(${prod.id}, '${getImagesForBtn(prod.product_name, prod.images[0])}', '${prod.product_name}', null, null, null, null, ${prod.price}, 1)"
                               class="element__btn font-small mb_30 font_bold button_border bg_accent rounded_10 btn_medium">
                               Добавить в корзину
                       </button>`
        }

        return button
    }

    function getAddText(prodDescription, prodName, prodAddText) {
        let addText = ``;
        if (prodDescription) {
            if (prodName === 'Знаки ДОПОГ') {
                addText += `<p class="element-info__item font-small text_grey font_thin">${prodAddText}</p>`
            } else {
                addText += `<p class="element-info__item font-small text_grey font_thin mb_20">${prodDescription}</p>`
            }
        }
        return addText
    }

    function getDescription(prodDescription, prodName) {
        let description = ``;
        if (prodDescription) {
            if (prodName === 'Знаки ДОПОГ') {
                description += `<p class="element-info__item font-small text_grey font_thin mb_20">${prodDescription}</p>`
            }
        }
        return description
    }

    function getSize(prodName, prodSize) {
        let size = ``;
        if (prodSize) {
            if (prodName === 'Знаки ДОПОГ') {
                size += `<p class="element-info__item font-small text_grey font_thin">
                            <b>Размер: ${prodSize}</b>
                         </p>`
            } else {
                size += `<p class="element-info__item font-small text_grey font_thin">
                            <b>Размер: </b>${prodSize}</p>`
            }
        }
        return size
    }

    function getNumberProperties(prodId, prodName, prodPrice, prodColors, prodImagesArray) {
        let property = ``;

        if (prodName === 'Автомобильный номер | тип 1' || prodName === 'Автомобильный номер | тип 1 (без флага)') {
            property += `<p class="set text_grey py_10 font_thin">Комплект</p>
                            <select name="set" data-inlet="без отверстий"
                                    onchange="changePriceData(${prodId}, this, '${prodName}', this.options[this.selectedIndex])"
                                                class="select cursor_pointer">
                                            <option selected data-val="1 шт" value="0" data-inlet-img="${prodImagesArray[2].image}"
                                                    data-set-img="${prodImagesArray[0].image}">1 шт
                                            </option>
                                            <option value="500" data-val="2 шт" data-inlet-img="${prodImagesArray[3].image}"
                                                    data-set-img="${prodImagesArray[1].image}">2 шт
                                            </option>
                                        </select>
                                        <p class="inlet text_grey py_10 font_thin">Отверстия</p>
                                        <select name="inlet" data-set="0" data-set-val="1 шт"
                                                onchange="changeImage(${prodId}, this, '${prodName}', this.options[this.selectedIndex])"
                                                class="mb_20 select cursor_pointer">
                                            <option selected value="без отверстий" data-inlet-img="${prodImagesArray.image}"
                                                    data-set-img="${prodImagesArray.image}">Без отверстий
                                            </option>
                                            <option value="с отверстиями" data-inlet-img="${prodImagesArray.image}"
                                                    data-set-img="${prodImagesArray.image}">С отверстиями
                                            </option>
                                        </select>`
        } else if (prodName === 'Автомобильный номер | тип 1Б, 5, 10, 20') {
            property += `<p class="set text_grey py_10 font_thin">Комплект</p>
                            <select name="set_type" data-color="желтый"
                                                data-prod-id="${prodId}" data-set-val="1 шт"
                                                data-set-type="0" data-current-price="${prodPrice}"
                                                data-name="${prodName}"
                                                onchange="changePriceDataType1B('${prodId}', this, '${prodName}', this.options[this.selectedIndex])"
                                                class="select cursor_pointer"
                                                data-yellow="${prodImagesArray[1].image}"
                                                data-black="${prodImagesArray[2].image}"
                                                data-red="${prodImagesArray[3].image}"
                                                data-blue="${prodImagesArray[4].image}">
                                            <option selected data-val="1 шт" value="0">1 шт</option>
                                            <option data-val="2 шт" value="700">2 шт</option>
                            </select>
                            <p class="color text_grey py_10 font_thin">Цвет</p>
                            <div class="mb_20 choose-colors__items d-flex" id="colorImageRadio">
                                ${getProdColor(prodColors)}
                            </div>`
        }
        return property
    }

    function getFrameColor(prodId, prodImage, prodName, prodPrice, prodColorsArray) {
        let frameColor = ``;

        prodColorsArray.map((color) => {
            frameColor += `<div data-tooltip="${color.color_name}"
                               onclick="chooseFrameColor(${prodId},'${prodImage}' , '${prodName}', '${color.color_name}', ${prodPrice})"
                               class="d-flex flex-align_center flex-justify_center color-radio elem__img_small cursor_pointer"
                               style="background-color: ${color.color_hex};border: 0.5px solid #333333; padding: 3px;margin:0 3px">
                         </div>`
        })

        return frameColor
    }

    function getFrameProperties(prodId, prodName, prodPrice, prodColors, prodImages) {

        let frameProperty = ``;
        if (prodName === 'Силиконовая рамка RCS') {
            // console.log(prodImages[0].image)
            frameProperty += `<p class="color text_grey py_10 font_thin">Цвет</p>
                                        <div class="mb_20 choose-colors__items d-flex" id="colorRadio">
                                            ${getFrameColor(prodId, prodImages[0].image, prodName, prodPrice, prodColors)}
                                        </div>`
        }
        return frameProperty
    }

    function getProdSign(prodId, prodName, prodPrice, prodSigns) {
        let signType = ``;
        prodSigns.map((sign) => {
            signType += `<img data-tooltip="${sign.sign_name}"
                              onclick="getSignType(${prodId},'${sign.sign_image}', '${prodName}', '${sign.sign_name}', ${prodPrice})"
                              class="color-radio elem__img_small cursor_pointer"
                              src="${sign.sign_image}" alt="" 
                              id="${sign.id}">`
        })
        return signType
    }

    function getSignProperties(prodId, prodName, prodPrice, prodSigns) {
        let signProp = ``;
        if (prodName === 'Знаки опасности допог') {
            signProp += `<p class="sign__type text_grey py_10 font_thin">Тип знака</p>
                         <div class="mb_20 choose-colors__items d-flex" id="signType">
                              ${getProdSign(prodId, prodName, prodPrice, prodSigns)}
                         </div>`
        }
        return signProp
    }

    products.map((prod) => {
        modal += `<div class="modal__detail d-flex flex-justify_center width_full block_hidden" id="${prod.id}">
                <div class="modal-detail__container d-flex flex_column width_full flex-align_center"
                     style="position: relative">
                    <div class="close-btn__container width_full close__modal d-flex flex-justify_end pr_20 pl_20 py_10 cursor_pointer"
                         onclick="closeModal(${prod.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" class="close-modal__icon" width="41" height="40"
                             viewBox="0 0 41 40" fill="none">
                            <path d="M39.056 6.0649C39.3904 5.74221 39.6572 5.35616 39.8409 4.92926C40.0245 4.50236 40.1212 4.04317 40.1255 3.57848C40.1297 3.11379 40.0414 2.6529 39.8656 2.22271C39.6899 1.79252 39.4302 1.40164 39.1018 1.07289C38.7733 0.744131 38.3827 0.48408 37.9527 0.307905C37.5226 0.131731 37.0618 0.0429646 36.5971 0.0467821C36.1324 0.0505996 35.6731 0.146926 35.2461 0.330141C34.819 0.513356 34.4327 0.77979 34.1097 1.1139L20.0826 15.1363L6.06023 1.1139C5.73983 0.770049 5.35346 0.494258 4.92416 0.302975C4.49485 0.111692 4.03142 0.00883576 3.56151 0.000544656C3.09159 -0.00774645 2.62482 0.0786972 2.18904 0.254717C1.75326 0.430737 1.35739 0.692727 1.02506 1.02506C0.692727 1.35739 0.430737 1.75325 0.254717 2.18904C0.0786972 2.62482 -0.00774645 3.09159 0.000544656 3.56151C0.00883576 4.03142 0.111692 4.49485 0.302975 4.92415C0.494258 5.35346 0.770049 5.73983 1.1139 6.06024L15.127 20.0873L1.10457 34.1097C0.486367 34.7731 0.149814 35.6506 0.165811 36.5573C0.181808 37.464 0.549108 38.3291 1.19033 38.9703C1.83154 39.6115 2.69661 39.9788 3.60329 39.9948C4.50997 40.0108 5.38746 39.6742 6.0509 39.056L20.0826 25.0336L34.105 39.0607C34.7685 39.6789 35.646 40.0155 36.5526 39.9995C37.4593 39.9835 38.3244 39.6162 38.9656 38.9749C39.6068 38.3337 39.9741 37.4686 39.9901 36.562C40.0061 35.6553 39.6696 34.7778 39.0514 34.1144L25.0383 20.0873L39.056 6.0649Z"
                                  fill="#FFCC00"></path>
                        </svg>
                        <svg class="close__cross" width="26px" height="26px"
                             viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink">
                            <path d="M10.4142136,5 L11.8284271,6.41421356 L5.829,12.414 L23.4142136,12.4142136 L23.4142136,14.4142136 L5.829,14.414 L11.8284271,20.4142136 L10.4142136,21.8284271 L2,13.4142136 L10.4142136,5 Z"
                                  fill="#ffcc00"></path>
                        </svg>
                    </div>
                    <div class="detail_container width_full bg_white d-flex flex_column">
                        <div class="element-info__container d-flex flex-justify_space-btw">
                            ${getImageContainer(prod)}
                            <div class="element-info__items d-flex flex_column">
                                <div class="element-info__item font_m font_bold mb_30">${prod.product_name}</div>
                                    ${getProdPrice(prod)}
               
                                ${getNumberProperties(prod.id, prod.product_name, prod.price, prod.colors, prod.images)}
                                ${getFrameProperties(prod.id, prod.product_name, prod.price, prod.colors, prod.images)}
                                ${getSignProperties(prod.id, prod.product_name, prod.price, prod.sign_type,)}
                                <div>
                                    ${addToBasketBtn(prod)}
                                </div>
                                ${getAddText(prod.description, prod.product_name, prod.additional_text)}
                                ${getSize(prod.product_name, prod.size)}
                                ${getDescription(prod.description, prod.product_name)}
                            </div>
                        </div>
                        <div class="look-also d-flex flex_column">
                            <p class="look-relevant__heading font_bold font_m">Смотрите также</p>
                            <div class="relevant-prods__items pr_20 pl_20 d-flex flex-justify_space-btw" data-random="${prod.id}"></div>
                        </div>
                    </div>
                </div>
            </div>`
    })
    document.body.insertAdjacentHTML("afterbegin", modal);

    let colorImageRadio = document.getElementById('colorImageRadio');

    colorImageRadio.addEventListener('click', (e) => {
        e.preventDefault();
        for (let i = 0; i < colorImageRadio.children.length; i++) {
            colorImageRadio.children[i].classList.remove("active");
        }
        let changePriceDataSet = document.querySelector('[name="set_type"]');
        console.log(changePriceDataSet.dataset.setType)
        let addToBasketBtn = document.querySelector(`[data-basket="${changePriceDataSet.dataset.prodId}"]`);
        e.target.classList.add('active')
        if (e.target.getAttribute('data-tooltip') === 'желтый') {
            currentSlide(2)
            changePriceDataSet.setAttribute('data-color', 'желтый');
            addToBasketBtn.setAttribute('onclick', `getProdToBasketFromDetail(${changePriceDataSet.dataset.prodId}, "${changePriceDataSet.dataset.yellow}",  "${changePriceDataSet.dataset.name}", "${changePriceDataSet.dataset.setVal}", null, "желтый", null, ${parseInt(changePriceDataSet.dataset.currentPrice) + parseInt(changePriceDataSet.dataset.setType)})`)
        } else if (e.target.getAttribute('data-tooltip') === 'черный') {
            currentSlide(3)
            changePriceDataSet.setAttribute('data-color', 'черный');
            addToBasketBtn.setAttribute('onclick', `getProdToBasketFromDetail(${changePriceDataSet.dataset.prodId}, "${changePriceDataSet.dataset.black}",  "${changePriceDataSet.dataset.name}", "${changePriceDataSet.dataset.setVal}", null, 'черный', null, ${parseInt(changePriceDataSet.dataset.currentPrice) + parseInt(changePriceDataSet.dataset.setType)})`)
        } else if (e.target.getAttribute('data-tooltip') === 'красный') {
            currentSlide(4)
            changePriceDataSet.setAttribute('data-color', 'красный');
            addToBasketBtn.setAttribute('onclick', `getProdToBasketFromDetail(${changePriceDataSet.dataset.prodId}, "${changePriceDataSet.dataset.red}",  "${changePriceDataSet.dataset.name}", "${changePriceDataSet.dataset.setVal}", null, 'красный', null, ${parseInt(changePriceDataSet.dataset.currentPrice) + parseInt(changePriceDataSet.dataset.setType)})`)
        } else if (e.target.getAttribute('data-tooltip') === 'синий') {
            currentSlide(5)
            changePriceDataSet.setAttribute('data-color', 'синий');
            addToBasketBtn.setAttribute('onclick', `getProdToBasketFromDetail(${changePriceDataSet.dataset.prodId}, "${changePriceDataSet.dataset.blue}",  "${changePriceDataSet.dataset.name}", "${changePriceDataSet.dataset.setVal}", null, 'синий', null, ${parseInt(changePriceDataSet.dataset.currentPrice) + parseInt(changePriceDataSet.dataset.setType)})`)
        }
    })
    let colorRadio = document.getElementById('colorRadio');

    colorRadio.addEventListener('click', (e) => {
        e.preventDefault();
        for (let i = 0; i < colorRadio.children.length; i++) {
            colorRadio.children[i].classList.remove("active");
            colorRadio.children[0].classList.remove("active");
        }
        e.target.classList.add('active')
    })

    let signType = document.getElementById('signType');

    signType.addEventListener('click', (e) => {
        e.preventDefault();
        for (let i = 0; i < signType.children.length; i++) {
            if (signType.children.length === 1) {
                signType.children[i].classList.add("active");
            } else {
                signType.children[i].classList.remove("active");
                signType.children[0].classList.add("active");
            }
        }
        e.target.classList.add('active')
        if (e.target.getAttribute('data-tooltip') === 'Огнеопасно') {
            currentSlide(2)
        }
    })

}

getModalDetail();

function changePriceData(id, selectedObject, name, option) {
    let price = document.querySelector(`[data-price="${id}"]`);
    let addToBasketBtn = document.querySelector(`[data-basket="${id}"]`);
    let defaultPrice = parseInt(price.getAttribute('data-value'))
    let selectedInlet = selectedObject.dataset.inlet
    price.innerHTML = `${defaultPrice + parseInt(selectedObject.value)} &#8381`
    let changeImageValue = document.querySelector('[name="inlet"]');
    changeImageValue.setAttribute('data-set', selectedObject.value);
    changeImageValue.setAttribute('data-set-val', option.dataset.val);
    addToBasketBtn.setAttribute('onclick', `getProdToBasketFromDetail(${id}, "${option.dataset.setImg}",  "${name}", "${option.dataset.val}", "${selectedInlet}", null, null, ${defaultPrice + parseInt(selectedObject.value)})`)
    if (changeImageValue.value === 'без отверстий' && selectedInlet === 'без отверстий' && selectedObject.value === '0') {
        currentSlide(1)
    } else if (changeImageValue.value === 'без отверстий' && selectedInlet === 'без отверстий' && selectedObject.value === '500') {
        currentSlide(2)
    } else if (changeImageValue.value === 'с отверстиями' && selectedInlet === 'с отверстиями' && selectedObject.value === '0') {
        currentSlide(3)
    } else if (changeImageValue.value === 'с отверстиями' && selectedInlet === 'с отверстиями' && selectedObject.value === '500') {
        currentSlide(4)
    }
}

function changeImage(id, selectedObject, name, option) {
    let price = document.querySelector(`[data-price="${id}"]`);
    let defaultPrice = parseInt(price.getAttribute('data-value'))
    let addToBasketBtn = document.querySelector(`[data-basket="${id}"]`);
    price.innerHTML = `${defaultPrice + parseInt(selectedObject.dataset.set)} &#8381`
    let changePriceDataValue = document.querySelector('[name="set"]');
    let dataFromSet = changePriceDataValue.dataset.inlet;
    changePriceDataValue.setAttribute('data-inlet', selectedObject.value)
    addToBasketBtn.setAttribute('onclick', `getProdToBasketFromDetail(${id}, "${option.dataset.inletImg}",  "${name}", "${selectedObject.dataset.setVal}", "${selectedObject.value}", null, null, ${defaultPrice + parseInt(selectedObject.dataset.set)})`)
    if (selectedObject.value === 'без отверстий' && changePriceDataValue.value === '0' && dataFromSet === '0') {
        currentSlide(1)
    } else if (selectedObject.value === 'без отверстий' && changePriceDataValue.value === '500' && dataFromSet === '500') {
        currentSlide(2)
    } else if (selectedObject.value === 'с отверстиями' && changePriceDataValue.value === '0' && dataFromSet === '0') {
        currentSlide(3)
    } else if (selectedObject.value === 'с отверстиями' && changePriceDataValue.value === '500' && dataFromSet === '500') {
        currentSlide(4)
    }
}


function changePriceDataType1B(id, selectedObject, name, option) {
    let price = document.querySelector(`[data-price="${id}"]`);
    let selectedOption = selectedObject.value
    let addToBasketBtn = document.querySelector(`[data-basket="${id}"]`);
    let defaultPrice = parseInt(price.getAttribute('data-value'))
    price.innerHTML = `${defaultPrice + parseInt(selectedOption)} &#8381`
    selectedObject.dataset.setType = selectedOption
    selectedObject.dataset.setVal = option.dataset.val
    if (selectedObject.dataset.color === 'желтый') {
        addToBasketBtn.setAttribute('onclick', `getProdToBasketFromDetail(${selectedObject.dataset.prodId}, "${selectedObject.dataset.yellow}",  "${name}", '${option.dataset.val}', null, 'желтый', null, ${parseInt(selectedObject.dataset.currentPrice) + parseInt(selectedOption)})`)
    } else if (selectedObject.dataset.color === 'черный') {
        addToBasketBtn.setAttribute('onclick', `getProdToBasketFromDetail(${selectedObject.dataset.prodId}, "${selectedObject.dataset.black}",  "${name}", '${option.dataset.val}', null, 'черный', null, ${parseInt(selectedObject.dataset.currentPrice) + parseInt(selectedOption)})`)
    } else if (selectedObject.dataset.color === 'красный') {
        addToBasketBtn.setAttribute('onclick', `getProdToBasketFromDetail(${selectedObject.dataset.prodId}, "${selectedObject.dataset.red}",  "${name}", '${option.dataset.val}', null, 'красный', null, ${parseInt(selectedObject.dataset.currentPrice) + parseInt(selectedOption)})`)
    } else if (selectedObject.dataset.color === 'синий') {
        addToBasketBtn.setAttribute('onclick', `getProdToBasketFromDetail(${selectedObject.dataset.prodId}, "${selectedObject.dataset.blue}",  "${name}", '${option.dataset.val}', null, 'синий', null, ${parseInt(selectedObject.dataset.currentPrice) + parseInt(selectedOption)})`)
    }
}