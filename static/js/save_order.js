let deliveryMethodsItems = document.getElementById('deliveryMethodsItems')
let orderForm = document.getElementById('form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let phoneNum = document.getElementById('phoneNum');
let number = document.getElementById('number');
let city = document.getElementById('city');
let address = document.getElementById('address');
let errorsItems = orderForm.querySelector('.input__errors');
let deliveryPoint = document.getElementById('deliveryPoint');
let deliveryPointInfo = document.getElementById('deliveryPointInfo');
let dadataToken = "0a851dd6db310b2e68e656ca8b9b13ef3401be63";
let ttlSum = document.getElementById('totalFormSum');
let sdekDelivery = document.getElementById('sdek');
let courierDelivery = document.getElementById('courier');
let selfDelivery = document.getElementById('selfDelivery');


window.intlTelInput(phone, {
    initialCountry: "ru",
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
});


// delivery methods

function deliveryMethodChoice(value, label) {

    let deliveryRadios = deliveryMethodsItems.querySelectorAll('[name="delivery"]')
    deliveryRadios.forEach((radio) => {
        radio.checked = false;
    })
    document.getElementById(value).checked = true;
    localStorage.setItem('deliveryMethod', label);
    deliveryMethodSelection();
}

function formBlockShow(selector) {
    orderForm.querySelector(selector).classList.remove('block_hidden')
}

function formBlockHide(selector) {
    orderForm.querySelector(selector).classList.add('block_hidden')
}


function deliveryMethodSelection() {
    if (sdekDelivery.checked) {
        if (orderForm.querySelector('.address__container').classList.contains('block_hidden')) {
            formBlockShow('.address__container')
        }
        formBlockHide('.delivery-points__container')
    } else if (courierDelivery.checked) {
        if (orderForm.querySelector('.address__container').classList.contains('block_hidden')) {
            formBlockShow('.address__container');
        }
        formBlockHide('.delivery-points__container')
    } else if (selfDelivery.checked) {
        showDeliveryPoints();
        if (!orderForm.querySelector('.address__container').classList.contains('block_hidden')) {
            formBlockHide('.address__container')
        }
    }
}

async function showDeliveryPoints() {
    let points = ``
    let deliveryPointsResponse = await fetch(window.location.href + 'location/')
    let deliveryPoints = await deliveryPointsResponse.json();

    deliveryPoints.map((point) => {
        points += `<label class="py_20" for="${point.address}" onclick="deliveryPointChoose(${point.id})">
                        <p class="font_m mb_10">${point.address}</p>
                        <p class="font-small mb_20 text_grey font_thin">${point.address}</p>
                        <input class="block_hidden" type="radio" value="${point.id}" data-point-id="${point.id}" id="${point.address}" name="points">
                  </label>`
    })

    document.getElementById('deliveryPoints').innerHTML = points;
    formBlockShow('.delivery-points__container')
}


deliveryPoint.onfocus = function () {
    formBlockShow('#deliveryPoints')
    isCleanDeliveryInput();
}

deliveryPoint.onchange = deliveryValidation;

function deliveryPointChoose(id) {
    orderForm.querySelectorAll('[name="points"]').forEach((point) => {
        point.checked = false
    })
    let point = orderForm.querySelector(`[data-point-id="${id}"]`);
    point.checked = true
    console.log(id)
    deliveryPoint.value = point.id
    orderForm.querySelector('.delivery-points__container').classList.add('block_hidden');
    document.getElementById('deliveryPoints').classList.remove('block_hidden')
    getSelectedLocation(id)
}

async function getSelectedLocation(id) {
    let deliveryPointResponse = await fetch(window.location.href + 'location/' + id)
    let deliveryPoint = await deliveryPointResponse.json();
    deliveryPointInfo.dataset.deliveryPoint = deliveryPoint.id;
    orderForm.querySelector('.point__address').textContent = deliveryPoint.address;
    orderForm.querySelector('.point__address-item').textContent = `Адрес: ${deliveryPoint.address}`;
    orderForm.querySelector('.point__direction').textContent = deliveryPoint.description;

    deliveryPointInfo.classList.remove('block_hidden')
    document.getElementById('totalCity').textContent = `Россия, г Хабаровск, ${deliveryPoint.address}`
}


function changeDeliveryPoint() {
    deliveryPointInfo.classList.add('block_hidden');
    formBlockShow('.delivery-points__container')
}

function invalidDelivery() {
    showInputError('.valid_delivery', '#deliveryPoint', 'empty__inputs')
    deliveryPoint.style.outline = 'none';
    deliveryPoint.style.borderBottom = '1px solid red'
}

function validDelivery() {
    hideInputError('.valid_delivery', '#deliveryPoint', 'empty__inputs')
    deliveryPoint.style.borderBottom = '1px solid #333333'
}

function isCleanDeliveryInput() {
    if (deliveryPoint.value.trim() !== '') {
        formBlockShow('.clean__delivery')
        formBlockHide('.delivery__search')
    } else {
        formBlockShow('.delivery__search')
        formBlockHide('.clean__delivery')
    }
}

function cleanDeliveryInput() {
    deliveryPoint.value = '';
    formBlockShow('.delivery__search')
    formBlockHide('.clean__delivery')
}

function deliveryValidation() {
    if (deliveryPoint.value.trim() !== "") {
        showCity()
        validDelivery()
    } else {
        invalidDelivery()
    }
}

// show inputs errors
function showInputError(inputClassName, inputId, inputErrorId) {
    orderForm.querySelector(inputClassName).classList.remove('block_hidden');
    orderForm.querySelector(inputId).style.outline = '1px solid red';
    errorsItems.classList.remove('block_hidden');
    document.getElementById(inputErrorId).classList.remove('block_hidden');
    document.getElementById('buy').disabled = true
}

function hideInputError(inputClassName, inputId, inputErrorId) {
    orderForm.querySelector(inputClassName).classList.add('block_hidden');
    orderForm.querySelector(inputId).style.outline = 'none';
    errorsItems.classList.add('block_hidden');
    document.getElementById(inputErrorId).classList.add('block_hidden');
    document.getElementById('buy').disabled = false
}

// name input
function inValidName() {
    showInputError('.valid_name', '#name', 'empty__inputs');
}

function validName() {
    hideInputError('.valid_name', '#name', 'empty__inputs');
}

function nameValidation() {
    name.value.trim() === ''
        ? inValidName()
        : validName()
}

// email input
function inValidEmail() {
    showInputError('.valid_email', '#email', 'empty__inputs')
}

function validEmail() {
    hideInputError('.valid_email', '#email', 'empty__inputs')
}

function emailValidation() {
    email.value.trim() === ''
        ? inValidEmail()
        : validEmail()
}

//phone input
function inValidPhone() {
    showInputError('.valid_phone', '.phone-input', 'invalidPhone')
}

function validPhone() {
    hideInputError('.valid_phone', '.phone-input', 'invalidPhone')
}

function inValidPhoneShort() {
    showInputError('.short_value', '.phone-input', 'tooShort')
}

function validPhoneShort() {
    hideInputError('.short_value', '.phone-input', 'tooShort')
}

function phoneValidation() {
    phoneNum.value.trim() === ''
        ? inValidPhone()
        : validPhone()

    phoneNum.value.length < 15
        ? inValidPhoneShort()
        : validPhoneShort()
}

name.onchange = nameValidation;
email.onchange = emailValidation;
phoneNum.onchange = phoneValidation;

let maskOptions = {
    mask: '(000) 000-00-00',
}
let mask = new IMask(phoneNum, maskOptions);

$("#city").suggestions({
    token: dadataToken,
    type: "ADDRESS",
    onSelect: function (suggestion) {
        console.log(suggestion.value)
        $("#city").attr('value', suggestion.value)
        showCity();
        isCleanCityInput();
        if (suggestion.data.country === "Россия" && suggestion.data.city === "Хабаровск") {
            formBlockShow('[data-delivery="sdek"]');
            formBlockShow('[data-delivery="courier"]');
            formBlockShow('[data-delivery="selfDelivery"]');

        } else if (suggestion.data.country === "Россия" && suggestion.data.city !== "Хабаровск") {
            formBlockShow('[data-delivery="sdek"]');
            formBlockHide('[data-delivery="courier"]');
            formBlockHide('[data-delivery="selfDelivery"]');
        } else if (suggestion.data.country !== "Россия") {
            formBlockHide('[data-delivery="sdek"]');
            formBlockHide('[data-delivery="courier"]');
            formBlockHide('[data-delivery="selfDelivery"]');
        }
    }
});

function showCity() {
    orderForm.querySelector('.city__copy').textContent = city.value;
    formBlockShow('.city__copy')
    document.getElementById('totalCity').textContent = city.value
}

function invalidCity() {
    showInputError('.valid_city', '#city', 'empty__inputs')
    city.style.outline = 'none';
    city.style.borderBottom = '1px solid red'
}

function validCity() {
    hideInputError('.valid_city', '#city', 'empty__inputs')
    city.style.borderBottom = '1px solid #333333'
}

function isCleanCityInput() {
    if (city.value.trim() !== '') {
        formBlockShow('.clean__city');
        formBlockHide('.city__search');
    } else {
        formBlockShow('.city__search');
        formBlockHide('.clean__city');
    }
}

function cleanCityInput() {
    city.value = '';
    isCleanCityInput();
    formBlockHide('[data-delivery="sdek"]');
    formBlockHide('[data-delivery="courier"]');
    formBlockHide('[data-delivery="selfDelivery"]');
}

function cityValidation() {
    if (city.value.trim() !== "") {
        showCity()
        validCity()
    } else {
        invalidCity()
        formBlockHide('[data-delivery="sdek"]');
        formBlockHide('[data-delivery="courier"]');
        formBlockHide('[data-delivery="selfDelivery"]');
    }
}

city.onchange = cityValidation;
city.onfocus = isCleanCityInput;

// address input
function invalidAddress() {
    showInputError('.valid_address', '#address', 'empty__inputs')
    address.style.outline = 'none';
    address.style.borderBottom = '1px solid red'
}

function validAddress() {
    hideInputError('.valid_address', '#address', 'empty__inputs')
    address.style.borderBottom = '1px solid #333333'
}

function addressValidation() {
    if (!orderForm.querySelector('.address__container').classList.contains('block_hidden')) {
        if (address.value.trim() !== "") {
            validAddress()
        } else {
            invalidAddress()
        }
    }
}

// function getClientIp() {
//     let foundIp = ''
//     fetch('https://ipapi.co/json/')
//         .then(function (response) {
//             response.json().then(jsonData => {
//                 // console.log(jsonData.ip);
//                 foundIp = jsonData.ip
//             });
//         })
//         .catch(function (error) {
//             // console.log(error)
//             foundIp = ''
//         });
//     return foundIp
// }
//
// function getLocation(ip) {
//     $.ajax({
//         method: 'GET',
//         contentType: 'application/json',
//         url: 'https://ipwho.is/' + ip + '?lang=ru',
//         dataType: 'json',
//         success: function (ipwhois) {
//             // console.log(ipwhois.city+', '+ ipwhois.country );
//             city.value = ipwhois.city + ', ' + ipwhois.country
//         }
//     });
// }
//
// getLocation(getClientIp())

async function makeOrder(e) {
    e.preventDefault()
    nameValidation();
    emailValidation();
    phoneValidation();
    cityValidation();
    addressValidation();
    let newOrder = {
        client_name: name.value,
        email: email.value,
        phone: '+7' + phoneNum.value,
        number: number.value,
        delivery: localStorage.deliveryMethod,
        delivery_point: deliveryPoint.value,
        address: city.value + address.value,
        total_sum: parseInt(ttlSum.textContent),
        products: JSON.parse(localStorage.prodIdsInDb)
    }
    try {
        let response = await fetch(window.location.href + 'order/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newOrder)
        });
        let result = await response.json();
        console.log(result, result.id)
        newOrder.id = result.id
        newOrder.products = JSON.parse(localStorage.order)
        try {
            let response = await fetch(window.location.href + 'send_tg/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newOrder)
            });
            let result = await response.json();
            localStorage.clear();
            SuccessfulOrder()
            // console.log(result, result.id)
        } catch (error) {
            console.error("Ошибка:", error);
        }
    } catch
        (error) {
        console.error("Ошибка:", error);
    }
}


document.getElementById('buy').addEventListener('click', makeOrder)

//при успешной отправки заявки
function SuccessfulOrder() {

    modalForm.classList.add('block_hidden');
    document.getElementById('successfulOrder').classList.remove('block_hidden');
    document.getElementById('successfulOrder').style.top = `${document.body.scrollTop}px`
}


function closeSuccessfulOrder() {
    document.getElementById('successfulOrder').classList.add('block_hidden')
    window.location.reload();
}
