const introHeaderAddressItems = document.getElementById('introHeaderAddressItems');
const contactAddressItems = document.getElementById('contactAddressItems');
let staticMapApi = '&apikey=f0f92879-d13c-40f2-9928-5988d74f4a08';
let mapUrl = `https://static-maps.yandex.ru/v1?lang=ru_RU&ll=135.135953,48.474339&size=600,450&z=13pt=135.135953,48.474339`
let newmapUrl =``
let locationUrl = window.location.href + 'location/';




async function getLocations() {
    let introHeaderAddresses = ``;
    let contactAddresses = ``;

    let marker =``

    let locationsResponse = await fetch(locationUrl)
    let locations = await locationsResponse.json();

    locations.map((location) => {
        if (location.geo_lon === null || '' && location.geo_lat === null || '') {
            getGeoData(location.id, location.address)
        }else {
            marker+=`~${parseFloat(location.geo_lon)},${parseFloat(location.geo_lat)},pm2orgl100`
        }

        location.description.indexOf(',') !== -1
            ? introHeaderAddresses += `
                <div class="address_item font_extra-small text_grey">
                     <b>${location.address}</b> (${location.description.slice(0, location.description.indexOf(',') + 1)} <br> ${location.description.slice(location.description.indexOf(',') + 1,)})
                </div>`
            : introHeaderAddresses += `
                <div class="address_item font_extra-small text_grey">
                     <b>${location.address}</b> (${location.description})
                </div>`

        contactAddresses += `
                <div class="contact-address__item font_xs font_thin text_grey"><b>${location.address}</b> (${location.description})
                </div>`
    })

    // console.log(newmapUrl)
    let link = document.createElement('link');
    link.href = `${mapUrl}${marker}${staticMapApi}`
    document.head.append(link)
    introHeaderAddressItems.innerHTML = introHeaderAddresses;
    contactAddressItems.innerHTML = contactAddresses;
}

getLocations();

async function getGeoData(id, address) {
    let geo = {id: id, geo_lon: '', geo_lat: ''}
    let url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    let token = "0a851dd6db310b2e68e656ca8b9b13ef3401be63";
    let query = address + " г Хабаровск";

    let options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: query})
    }
    let geoResponse = await fetch(url, options)
    let geoData = await geoResponse.json()

    geo.geo_lon = geoData.suggestions[0].data.geo_lon
    geo.geo_lat = geoData.suggestions[0].data.geo_lat
    editLocationGeoData(geo)
}

async function editLocationGeoData(data) {
    console.log(data)
    try {
        let response = await fetch(window.location.href + `location/${data.id}/`, {
            method: 'PATCH',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        let result = await response.json();
    } catch (error) {
        console.error("Ошибка:", error);
    }
}
