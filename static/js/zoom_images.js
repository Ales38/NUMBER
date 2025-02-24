async function getModalZoom() {
    let modalZoom = ``;
    let productsResponse = await fetch(productsUrl);
    let products = await productsResponse.json();

    function getZoomImages(prod) {
        let zoomImages = ``;

        prod.images.map((img) => {
            zoomImages += `<img src="${img.image}" alt="" class="zoom__image elem__img" data-zoom-element="${prod.id}">`
        })
        return zoomImages
    }

    products.map((prod) => {
        if (prod.product_name !== 'Болты') {
            modalZoom += `<div class="modal__zoom bg_white pxy_20 d-flex flex_column block_hidden"
                 data-modal-zoom="${prod.id}">
                <div class="close__zoom-modal width_full py_20 d-flex flex-justify_end pr_20 pl_20 py_10 cursor_pointer"
                     data-zoom-close="${prod.id}" onclick="closeZoom(${prod.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" class="close-zoom-modal__icon" width="21" height="20"
                         viewBox="0 0 41 40" fill="none">
                        <path d="M39.056 6.0649C39.3904 5.74221 39.6572 5.35616 39.8409 4.92926C40.0245 4.50236 40.1212 4.04317 40.1255 3.57848C40.1297 3.11379 40.0414 2.6529 39.8656 2.22271C39.6899 1.79252 39.4302 1.40164 39.1018 1.07289C38.7733 0.744131 38.3827 0.48408 37.9527 0.307905C37.5226 0.131731 37.0618 0.0429646 36.5971 0.0467821C36.1324 0.0505996 35.6731 0.146926 35.2461 0.330141C34.819 0.513356 34.4327 0.77979 34.1097 1.1139L20.0826 15.1363L6.06023 1.1139C5.73983 0.770049 5.35346 0.494258 4.92416 0.302975C4.49485 0.111692 4.03142 0.00883576 3.56151 0.000544656C3.09159 -0.00774645 2.62482 0.0786972 2.18904 0.254717C1.75326 0.430737 1.35739 0.692727 1.02506 1.02506C0.692727 1.35739 0.430737 1.75325 0.254717 2.18904C0.0786972 2.62482 -0.00774645 3.09159 0.000544656 3.56151C0.00883576 4.03142 0.111692 4.49485 0.302975 4.92415C0.494258 5.35346 0.770049 5.73983 1.1139 6.06024L15.127 20.0873L1.10457 34.1097C0.486367 34.7731 0.149814 35.6506 0.165811 36.5573C0.181808 37.464 0.549108 38.3291 1.19033 38.9703C1.83154 39.6115 2.69661 39.9788 3.60329 39.9948C4.50997 40.0108 5.38746 39.6742 6.0509 39.056L20.0826 25.0336L34.105 39.0607C34.7685 39.6789 35.646 40.0155 36.5526 39.9995C37.4593 39.9835 38.3244 39.6162 38.9656 38.9749C39.6068 38.3337 39.9741 37.4686 39.9901 36.562C40.0061 35.6553 39.6696 34.7778 39.0514 34.1144L25.0383 20.0873L39.056 6.0649Z"
                              fill="#333333"></path>
                    </svg>
                </div>
                <div class="zoom_container d-flex flex_column width_full flex-align_center" style="position: relative">
                    ${getZoomImages(prod)}
                    <a class="zoom-prev arrow cursor_pointer" onclick="plusZoomSlides(-1)">

                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                             fill="none">
                            <path d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z"
                                  fill="white"></path>
                            <path d="M23.3388 12.1897L16.1957 19.5175C16.0702 19.6463 16 19.8189 16 19.9986C16 20.1784 16.0702 20.351 16.1957 20.4797L23.3388 27.8103C23.3973 27.8704 23.4672 27.9181 23.5443 27.9506C23.6215 27.9832 23.7044 28 23.7882 28C23.872 28 23.9549 27.9832 24.0321 27.9506C24.1093 27.9181 24.1792 27.8704 24.2376 27.8103C24.3578 27.6872 24.4251 27.522 24.4251 27.3499C24.4251 27.1779 24.3578 27.0126 24.2376 26.8895L17.5204 19.9986L24.2376 13.1091C24.3574 12.9861 24.4245 12.8211 24.4245 12.6494C24.4245 12.4776 24.3574 12.3127 24.2376 12.1897C24.1792 12.1296 24.1093 12.0819 24.0321 12.0494C23.9549 12.0168 23.872 12 23.7882 12C23.7044 12 23.6215 12.0168 23.5443 12.0494C23.4672 12.0819 23.3973 12.1296 23.3388 12.1897Z"
                                  fill="#333333"></path>
                        </svg>
                    </a>
                    <a class="zoom-next arrow cursor_pointer" onclick="plusZoomSlides(1)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                             fill="none">
                            <path d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z"
                                  fill="white"></path>
                            <path d="M16.661 27.8103L23.8042 20.4825C23.9296 20.3537 23.9998 20.1811 23.9998 20.0014C23.9998 19.8216 23.9296 19.649 23.8042 19.5203L16.661 12.1897C16.6026 12.1296 16.5327 12.0819 16.4555 12.0494C16.3783 12.0168 16.2954 12 16.2116 12C16.1279 12 16.0449 12.0168 15.9678 12.0494C15.8906 12.0819 15.8207 12.1296 15.7623 12.1897C15.642 12.3128 15.5747 12.478 15.5747 12.6501C15.5747 12.8221 15.642 12.9874 15.7623 13.1105L22.4795 20.0014L15.7623 26.8909C15.6424 27.0139 15.5754 27.1789 15.5754 27.3506C15.5754 27.5224 15.6424 27.6873 15.7623 27.8103C15.8207 27.8704 15.8906 27.9181 15.9678 27.9506C16.0449 27.9832 16.1279 28 16.2116 28C16.2954 28 16.3783 27.9832 16.4555 27.9506C16.5327 27.9181 16.6026 27.8704 16.661 27.8103Z"
                                  fill="#333333"></path>
                        </svg>
                    </a>
                </div>
            </div>`
        }
    })

    document.body.insertAdjacentHTML("afterbegin", modalZoom);
}


let slideZoomIndex = 1;
showZoomSlides(slideZoomIndex);


function plusZoomSlides(n) {
    showZoomSlides(slideZoomIndex += n);
}


function showZoomSlides(n) {
    let i;
    let modalZoomContainers = document.querySelectorAll('.modal__zoom')
    for (i = 0; i < modalZoomContainers.length; i++) {
        if (!modalZoomContainers[i].classList.contains('block_hidden')) {
            let zoomSlides = modalZoomContainers[i].querySelectorAll(`[data-zoom-element="${modalZoomContainers[i].getAttribute('data-modal-zoom')}"]`);

            if (n > zoomSlides.length) {
                slideZoomIndex = 1
            }
            if (n < 1) {
                slideZoomIndex = zoomSlides.length
            }
            if (zoomSlides.length === 1) {
                document.querySelector('.zoom-next').style.display = 'none';
                document.querySelector('.zoom-prev').style.display = 'none';
            } else {
                document.querySelector('.zoom-next').style.display = 'block';
                document.querySelector('.zoom-prev').style.display = 'block';
            }
            for (i = 0; i < zoomSlides.length; i++) {
                zoomSlides[i].style.display = 'none'
            }
            zoomSlides[slideZoomIndex - 1].style.display = "block"
        }
    }
}

getModalZoom()


function openZoomImages(id) {
    let modalZoom = document.querySelector(`[data-modal-zoom="${id}"]`);
    modalZoom.classList.remove('block_hidden');

    modalZoom.style.top = `${document.body.scrollTop-90}px`;
    modalZoom.style.height = `${document.body.clientHeight + 100}px`;
    modalZoom.style.width = `100%`;
    document.body.style.overflow = 'hidden'
    document.querySelector('.zoom-next').style.right = '0';
    document.querySelector('.zoom-prev').style.left = '0';
    let closeZoomModal = modalZoom.querySelector('.close-zoom-modal__icon');
    closeZoomModal.style.top = document.body.scrollTop;
    showZoomSlides(1)
}

function closeZoom(id){
    document.querySelector(`[data-modal-zoom="${id}"]`).classList.add('block_hidden');
}

