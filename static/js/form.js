let basket = document.getElementById('basket');
let prodCounter = document.getElementById('prodCounter');
let basketTotalSum = document.getElementById('basketTotalSum');
let modalForm = document.getElementById('modalForm');
let prodItems = document.getElementById('prodItems');
let formTotalSum = document.getElementById('totalFormSum');
let formSum = document.querySelectorAll('[data-sum="formSum"]');
let form = document.getElementById('form');
let prodIds = [];

let url = window.location.href + `order_product/`;


if (localStorage.order
    && localStorage.prodIdsInDb
    && localStorage.prodIds
) {
    if (JSON.parse(localStorage.order).length > 0
        && JSON.parse(localStorage.prodIdsInDb).length > 0
        && JSON.parse(localStorage.prodIds).length > 0
    ) {
        console.log(JSON.parse(localStorage.order))
        JSON.parse(localStorage.order).map((item) => {
            addProdIntoForm(item.prodId, item.img, item.name, item.set, item.inlet,
                item.prodColor, item.sign, item.prodPrice, item.quantity)
        })
        console.log(JSON.parse(localStorage.prodIdsInDb))
    }
} else {
    localStorage.setItem('order', JSON.stringify([]));
    localStorage.setItem('prodIds', JSON.stringify([]));
    localStorage.setItem('prodIdsInDb', JSON.stringify([]))
}


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


basket.addEventListener('mouseenter', () => {
    basketTotalSum.style.opacity = '1';
});

basket.addEventListener('mouseleave', () => {
    basketTotalSum.style.opacity = '0';
})


function openForm() {
    modalForm.classList.remove('block_hidden')
}

function closeForm() {
    modalForm.classList.add('block_hidden');
}

function showBasket() {
    if (prodItems.children.length > 0) {
        basket.classList.remove('block_hidden');
    } else {
        basket.classList.add('block_hidden');
        modalForm.classList.add('block_hidden')
    }
}

showBasket()


function addProdIntoForm(id, idDb, img_link = null, prod_name, prod_set = null, prod_inlet = null,
                         color = null, sign_type = null, price = null, quantity) {
    let prodItem = document.createElement('div');
    prodItem.className = "prod__item d-flex py_10 flex-align_center flex-justify_space-btw";
    prodItem.dataset.product = id;
    prodItem.dataset.db = idDb;


    let prodImg;
    if (img_link) {
        prodImg = document.createElement('img');
        prodImg.src = img_link;
        prodImg.className = 'prod__img mr_10';
        prodImg.alt = '';
        prodImg.dataset.image = id
    } else {
        prodImg = document.createElement('div');
        prodImg.style.backgroundColor = '#eeeeee';
        prodImg.className = 'prod__img mr_10';
        prodImg.alt = '';
        prodImg.dataset.image = id
    }

    let prodInfo = document.createElement('div');
    prodInfo.className = 'prod__info font_bold d-flex flex_column';
    prodInfo.dataset.info = id

    let prodSet = document.createElement('div');
    let prodInlet = document.createElement('div');
    let prodColor = document.createElement('div');
    let prodSign = document.createElement('div');


    let prodName = document.createElement('div');
    prodName.className = 'prod__name font_bold';
    prodName.textContent = prod_name;

    if (prod_set !== null) {
        prodSet.className = 'prod__set font_extra-small';
        prodSet.textContent = `Комплект: ${prod_set}`
    } else {
        prodSet.className = 'prod__set font_extra-small block_hidden';
    }

    if (prod_inlet !== null) {
        prodInlet.className = 'prod__inlet font_extra-small';
        prodInlet.textContent = `Отверстия: ${prod_inlet}`
    } else {
        prodInlet.className = 'prod__inlet font_extra-small block_hidden';
    }
    if (color !== null) {
        prodColor.className = 'prod__color font_extra-small';
        prodColor.textContent = `Цвет: ${color}`
    } else {
        prodColor.className = 'prod__color font_extra-small block_hidden';
    }
    if (sign_type !== null) {
        prodSign.className = 'prod__sign-type font_extra-small';
        prodSign.textContent = `Тип знака: ${sign_type}`
    } else {
        prodSign.className = 'prod__sign-type font_extra-small block_hidden';
    }

    let quantityBlock = document.createElement('div');
    quantityBlock.className = 'quantity-block d-flex flex-align_center';
    quantityBlock.dataset.prod = id;


    let btnMinus = document.createElement('button');
    btnMinus.className = 'quantity-arrow-minus text_grey d-flex flex-align_center flex-justify_center bg_white cursor_pointer'
    btnMinus.dataset.minus = id;
    btnMinus.textContent = '-';
    if (price) {
        btnMinus.setAttribute('onclick', `minusPrice(${id},${idDb}, ${price}, null)`)
    } else {
        prod_name === 'Болты'
            ? btnMinus.setAttribute('onclick', `minusPrice(${id},${idDb}, ${0}, 'Болты')`)
            : btnMinus.setAttribute('onclick', `minusPrice(${id},${idDb}, null, null)`)
    }


    let quantityInput = document.createElement('input');
    quantityInput.className = 'quantity-num__input bg_white text_grey';
    quantityInput.type = "number";
    quantityInput.value = `${quantity}`;
    quantityInput.dataset.quantity = id;
    quantityInput.min = '0';
    if (price) {
        quantityInput.setAttribute('onchange', `changeProdQuantity(${id},${idDb}, ${price})`)
    } else {
        prod_name === "Болты"
            ? quantityInput.setAttribute('onchange', `changeProdQuantity(${id},${idDb}, ${0})`)
            : quantityInput.setAttribute('onchange', `changeProdQuantity(${id},${idDb}, null)`)
    }


    let btnPlus = document.createElement('button');
    btnPlus.className = 'quantity-arrow-plus text_grey d-flex flex-align_center flex-justify_center bg_white cursor_pointer';
    btnPlus.dataset.plus = id;
    btnPlus.textContent = '+';
    if (price) {
        btnPlus.setAttribute('onclick', `plusPrice(${id},${idDb}, ${price}, null)`)
    } else {
        prod_name === "Болты"
            ? btnPlus.setAttribute('onclick', `plusPrice(${id},${idDb}, ${0}, Болты)`)
            : btnPlus.setAttribute('onclick', `plusPrice(${id},${idDb}, null)`)
    }

    let prodPriceCntr = document.createElement('div');
    prodPriceCntr.className = 'prod__price font_thin';
    prodPriceCntr.dataset.priceBlock = id;

    let prodPrice = document.createElement('span');

    if (price) {
        prodPriceCntr.textContent = '₽';
        prodPrice.dataset.id = id;
        prodPrice.dataset.price = price;
        prodPrice.textContent = price;
    } else if (prod_name === "Болты") {
        console.log(price)
        prodPrice.dataset.id = id;
        prodPrice.dataset.price = '0';
        prodPrice.textContent = '0';
        prodPrice.style.opacity = '0'
        prodPrice.dataset.exception = 'Болты'
    }
    prodPriceCntr.prepend(prodPrice)

    let deleteProd = document.createElement('img');
    deleteProd.className = 'delete__btn cursor_pointer';
    deleteProd.src = 'http://127.0.0.1:8000/static/img/delete.png';
    deleteProd.alt = '';
    deleteProd.style.width = '20px';
    deleteProd.style.height = '20px';
    deleteProd.dataset.cancel = id;
    deleteProd.setAttribute('onclick', `deleteItem(${id}, ${idDb})`)

    let prodTimer = document.createElement('div');
    prodTimer.className = 'prod__timer d-flex flex-justify_center flex-align_center block_hidden';
    prodTimer.dataset.timer = id;
    prodTimer.dataset.countDown = '5';

    let prodDeletionText = document.createElement('div');
    prodDeletionText.className = 'cancel__text text_grey font_thin block_hidden';
    prodDeletionText.textContent = `Вы удалили "${prod_name}"`;
    prodDeletionText.dataset.text = id

    let prodReturn = document.createElement('div');
    prodReturn.className = 'prod__return cursor_pointer text_grey font_thin block_hidden';
    prodReturn.textContent = 'Вернуть'
    prodReturn.dataset.return = id;
    prodReturn.setAttribute('onclick', `returnProduct(${id}, ${idDb})`)


    let prodInfoQuantityPrice = document.createElement('div');
    prodInfoQuantityPrice.className = 'prod-info__items d-flex flex-justify_space-btw  flex-align_center mr_10';


    prodInfo.append(prodName, prodSet, prodInlet, prodColor, prodSign);
    quantityBlock.append(btnMinus, quantityInput, btnPlus);
    prodInfoQuantityPrice.append(prodInfo, quantityBlock, prodPriceCntr)
    prodItem.append(
        prodImg,
        prodInfoQuantityPrice,
        deleteProd,
        prodTimer,
        prodDeletionText,
        prodReturn
    );
    prodItems.append(prodItem);
    getNumber();
    showBasket();
    getTotalSum()
}


async function saveProductInDB(id, img_link = null, prod_name, prod_set = null, prod_inlet = null,
                               color = null, sign_type = null, price = null, quantity) {
    let newProd = {
        product_id: id,
        product: prod_name,
        quantity: quantity,
        colour: color,
        set: prod_set,
        inlet: prod_inlet,
        sign: sign_type,
        price_for_one: price
    }

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newProd)
    });
    let result = await response.json();
    console.log(result, result.id)
    let locStorArrayDb = JSON.parse(localStorage.prodIdsInDb)
    locStorArrayDb.push(result.id)
    localStorage.setItem('prodIdsInDb', JSON.stringify(locStorArrayDb))
    console.log(JSON.parse(localStorage.prodIdsInDb))

    let locStorArray = JSON.parse(localStorage.prodIds)
    locStorArray.push(id)
    localStorage.setItem('prodIds', JSON.stringify(locStorArray))
    console.log(JSON.parse(localStorage.prodIds))

    let newProdForOrder = {
        idInDb: result.id,
        prodId: id,
        img: img_link,
        name: prod_name,
        set: prod_set,
        inlet: prod_inlet,
        quantity: quantity,
        prodColor: color,
        sign: sign_type,
        prodPrice: price
    }


    let locStorArrayOrder = JSON.parse(localStorage.order)
    locStorArrayOrder.push(newProdForOrder)
    localStorage.setItem('order', JSON.stringify(locStorArrayOrder))

    addProdIntoForm(id, newProdForOrder.idInDb, img_link, prod_name, prod_set, prod_inlet,
        color, sign_type, price, 1);
    openFormWithProds(id)
}

async function changeSavedProduct(id, idInDB, img_link = null, prod_name, prod_set = null, prod_inlet = null,
                                  color = null, sign_type = null, price = null, quantity) {


    let existedProd = prodItems.querySelector(`[data-db="${idInDB}"]`)


    let currentQuantityVal = existedProd.querySelector(`[data-quantity="${id}"]`)

    currentQuantityVal.value = parseInt(currentQuantityVal.value) + 1
    let savedProds = JSON.parse(localStorage.order);

    savedProds.map(async (prod) => {

        prod.quantity = prod.quantity + 1;
        // console.log(savedProds)
        localStorage.setItem('order', JSON.stringify(savedProds))
        let response = await fetch(url + `${prod.idInDb}/`, {
            method: 'patch',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({quantity: prod.quantity})
        });
        let result = await response.json();
        console.log(result, result.id)

    })
    openFormWithProds(id)
    getNumber();
    showBasket();
    prod_name === "Болты"
        ? await changeProdQuantity(id, 0)
        : await changeProdQuantity(id, price)

}


async function getProdToBasket(id, img_link = null, prod_name, prod_set = null, prod_inlet = null,
                               color = null, sign_type = null, price = null, quantity) {

    if (JSON.parse(localStorage.order).length === 0 || !JSON.parse(localStorage.prodIds).includes(id)) {
        saveProductInDB(id, img_link, prod_name, prod_set, prod_inlet, color, sign_type, price, quantity)
    } else if (JSON.parse(localStorage.prodIds).includes(id)) {
        let prodsArray = [];
        if (id === 1) {
            prodsArray = JSON.parse(localStorage.order).filter((p) => p.prodId === 1)
            prodsArray.map((p) => {
                if (prod_set === p.set && prod_inlet === p.inlet) {
                    changeSavedProduct(id, p.idInDb, img_link, prod_name, prod_set, prod_inlet, color, sign_type, price, quantity);
                } else {
                    saveProductInDB(id, img_link, prod_name, prod_set, prod_inlet, color, sign_type, price, quantity);
                }
            })
        } else if (id === 2) {
            prodsArray = JSON.parse(localStorage.order).filter((p) => p.prodId === 2);
            prodsArray.map((p) => {
                if (prod_set === p.set && prod_inlet === p.inlet) {
                    changeSavedProduct(id, p.idInDb, img_link, prod_name, prod_set, prod_inlet, color, sign_type, price, quantity);
                } else {
                    saveProductInDB(id, img_link, prod_name, prod_set, prod_inlet, color, sign_type, price, quantity);
                }
            })
        } else if (id === 4) {
            prodsArray = JSON.parse(localStorage.order).filter((p) => p.prodId === 4);
            prodsArray.map((p) => {
                if (prod_set === p.set && color === p.prodColor) {
                    changeSavedProduct(id, p.idInDb, img_link, prod_name, prod_set, prod_inlet, color, sign_type, price, quantity);
                } else {
                    saveProductInDB(id, img_link, prod_name, prod_set, prod_inlet, color, sign_type, price, quantity);
                }
            })
        } else if (id === 7) {
            prodsArray = JSON.parse(localStorage.order).filter((p) => p.prodId === 7);
            prodsArray.map((p) => {
                if (color === p.prodColor) {
                    changeSavedProduct(id, p.idInDb, img_link, prod_name, prod_set, prod_inlet, color, sign_type, price, quantity);
                } else {
                    saveProductInDB(id, img_link, prod_name, prod_set, prod_inlet, color, sign_type, price, quantity);
                }
            })
        } else {
            prodsArray = JSON.parse(localStorage.order).filter((p) => p.prodId === id);
            prodsArray.map((p) => {
                changeSavedProduct(id, p.idInDb, img_link, prod_name, prod_set, prod_inlet, color, sign_type, price, quantity);
            })

        }
    }
}

function openFormWithProds(id) {
    document.getElementById(id).classList.add('block_hidden')
    modalForm.classList.remove('block_hidden');
    modalForm.style.height = `${form.clientHeight + document.body.clientHeight + 1000} px`;
    modalForm.style.top = `${document.body.scrollTop - 100}px`;
}

function getNumber() {
    let quantity = 0;
    if (prodItems.children.length !== 0) {
        let quantityInputs = document.querySelectorAll('.quantity-num__input');
        quantityInputs.forEach((input) => {
            let num = parseInt(input.value)
            quantity += num
        })
    } else {
        quantity = 0;
    }
    prodCounter.textContent = quantity
    return quantity
}


function getTotalSum() {
    let total = 0;
    if (prodItems.children.length !== 0) {
        let priceDivs = document.querySelectorAll('.prod__price');
        priceDivs.forEach((price) => {
            let num = parseInt(price.textContent)
            total += num
        })
    } else {
        total = 0;
    }
    basketTotalSum.textContent = ` = ${total} ₽`;
    formSum.forEach((sum) => {
        sum.textContent = total;
    })
    formTotalSum.textContent = total;
    return total
}

document.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target === document.querySelector('.form__container') || e.target === modalForm) {
        modalForm.classList.add('block_hidden');
    }
})

async function minusPrice(id,idDB, defPrice = null, exp = null) {
    let prodItem = prodItems.querySelector(`[data-db="${idDB}"]`)
    let currentInput = prodItem.querySelector(`[data-quantity="${id}"]`)
    let currentPrice = prodItem.querySelector(`[data-id="${id}"]`)
    currentInput.value = parseInt(currentInput.value) - 1;
    let savedProds = JSON.parse(localStorage.getItem(`order`))
    savedProds.map(async (prod) => {
        if (prod.prodId === id) {
            prod.quantity = prod.quantity - 1;
            localStorage.setItem('order', JSON.stringify(savedProds))
            let response = await fetch(url + `${prod.idInDb}/`, {
                method: 'patch',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({quantity: prod.quantity})
            });
            let result = await response.json();
            console.log(result, result.id, result.quantity)
        }
    })
    if (defPrice && currentPrice) {
        console.log(defPrice)
        currentPrice.textContent = `${defPrice * parseInt(currentInput.value)}`;
        getTotalSum();
    }
}

async function plusPrice(id,idDB, defPrice = null, exp = null) {
    let prodItem = prodItems.querySelector(`[data-db="${idDB}"]`)
    let currentInput = prodItem.querySelector(`[data-quantity="${id}"]`)
    let currentPrice = prodItem.querySelector(`[data-id="${id}"]`)
    currentInput.value = parseInt(currentInput.value) + 1;
    let savedProds = JSON.parse(localStorage.order);
    savedProds.map(async (prod) => {
        if (prod.prodId === id) {
            prod.quantity = prod.quantity + 1;
            localStorage.setItem('order', JSON.stringify(savedProds))
            let response = await fetch(url + `${prod.idInDb}/`, {
                method: 'patch',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({quantity: prod.quantity})
            });
            let result = await response.json();
            console.log(result, result.id, result.quantity)
        }
    })


    if (defPrice && currentPrice) {
        currentPrice.textContent = `${defPrice * parseInt(currentInput.value)}`;
        getTotalSum();
    }
}

async function changeProdQuantity(id,idDB, defPrice = null) {
    let prodItem = prodItems.querySelector(`[data-db="${idDB}"]`)
    let quantityInput = prodItem.querySelector(`[data-quantity="${id}"]`)
    let price = prodItem.querySelector(`[data-id="${id}"`)
    let savedProds = JSON.parse(localStorage.order)
    savedProds.map(async (prod) => {
        if (prod.prodId === id) {
            prod.quantity = parseInt(quantityInput.value);
            localStorage.setItem('order', JSON.stringify(savedProds))
            let response = await fetch(url + `${prod.idInDb}/`, {
                method: 'patch',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({quantity: prod.quantity})
            });
            let result = await response.json();
            console.log(result, result.id, prod.quantity)
        }
    })
    if (defPrice) {
        price.textContent = `${defPrice * parseInt(quantityInput.value)}`;
        getTotalSum();
    }
}

let isActive = false

function deleteItem(id, idDB) {
    let prodItem = prodItems.querySelector(`[data-db="${idDB}"]`);
    let prodTimer = prodItem.querySelector(`[data-timer="${id}"]`);
    isActive = true

    prodItem.querySelector(`[data-image="${id}"]`).classList.add('block_hidden');
    prodItem.querySelector(`[data-info="${id}"]`).classList.add('block_hidden');
    prodItem.querySelector(`[data-prod="${id}"]`).classList.add('block_hidden');
    prodItem.querySelector(`[data-price-block="${id}"]`).classList.add('block_hidden');
    prodItem.querySelector(`[data-cancel="${id}"]`).classList.add('block_hidden');
    prodTimer.classList.remove('block_hidden');
    prodItem.querySelector(`[data-text="${id}"]`).classList.remove('block_hidden');
    prodItem.querySelector(`[data-return="${id}"]`).classList.remove('block_hidden');
    deleteProdTimer(id, idDB)
}

function deleteProdTimer(id, idDB) {
    let prodItem = prodItems.querySelector(`[data-db="${idDB}"]`);
    let prodTimer = prodItem.querySelector(`[data-timer="${id}"]`);
    prodTimer.innerText = prodTimer.countValue = +prodTimer.getAttribute("data-count-down");
    prodTimer.countRatio = 360 / prodTimer.countValue;
    prodTimer.countLight = prodTimer.countValue / 10;
    let startTimer
    isActive
        ? startTimer = setInterval(fCountdown.bind(prodTimer), 1000)
        : clearInterval(startTimer)


    function fCountdown() {
        let nCount = this.countValue;
        if (nCount > 0) {
            nCount--;
            this.innerText = this.countValue = nCount;
            this.style.setProperty("--deg", 360 - nCount * this.countRatio);
        } else {
            clearInterval(startTimer);
            if (isActive) {
                deleteProdItemAfterTimer(id, idDB)
                getNumber();
                getTotalSum();
                showBasket();
            }


        }
    }
}

async function deleteProdItemAfterTimer(id, idDB) {
    let prodItem = prodItems.querySelector(`[data-db="${idDB}"]`);
    let savedProds = JSON.parse(localStorage.order)
    savedProds.map(async (prod) => {
        if (prod.prodId === id) {
            let response = await fetch(url + `${prod.idInDb}/`, {
                method: 'DELETE',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json;charset=utf-8'
                },
            });
            // let result = await response.json();
            let locStorArrayDb = JSON.parse(localStorage.prodIdsInDb)
            locStorArrayDb = locStorArrayDb.filter((p) => p !== prod.idInDb)
            localStorage.setItem('prodIdsInDb', JSON.stringify(locStorArrayDb))
            console.log(JSON.parse(localStorage.prodIdsInDb))

            savedProds = savedProds.filter((p) => p !== prod);
            localStorage.setItem('order', JSON.stringify(savedProds));
        }
    })
    let savedProdIds = JSON.parse(localStorage.prodIds)
    savedProdIds = savedProdIds.filter((i) => i !== id)
    localStorage.setItem('prodIds', JSON.stringify(savedProdIds))
    prodItem.remove()
}

function getProdToBasketFromDetail(id, img_link = null, name, set = null, inlet = null, color = null, sign = null, price = null, quantity) {
    getProdToBasket(id, img_link, name, set, inlet, color, sign, price, quantity);
    document.getElementById(`${id}`).classList.add('block_hidden')
}

function returnProduct(id, idDB) {
    let prodItem = prodItems.querySelector(`[data-db="${idDB}"]`);
    let prodTimer = prodItem.querySelector(`[data-timer="${id}"]`);
    isActive = false
    prodItem.querySelector(`[data-image="${id}"]`).classList.remove('block_hidden');
    prodItem.querySelector(`[data-info="${id}"]`).classList.remove('block_hidden');
    prodItem.querySelector(`[data-prod="${id}"]`).classList.remove('block_hidden');
    prodItem.querySelector(`[data-price-block="${id}"]`).classList.remove('block_hidden');
    prodItem.querySelector(`[data-cancel="${id}"]`).classList.remove('block_hidden');
    prodTimer.classList.add('block_hidden');
    prodItem.querySelector(`[data-text="${id}"]`).classList.add('block_hidden');
    prodItem.querySelector(`[data-return="${id}"]`).classList.add('block_hidden');
}


