
//page scroll progress bar
const progress = document.querySelector('.progress')

window.addEventListener('scroll', progressBar)

function progressBar(e) {
    let winScroll = document.body.scrollTop;
    let height = document.body.scrollHeight - document.body.clientHeight;

    let scrolled = (winScroll / height) * 100;
    progress.style.width = scrolled + "%";
}


//image carousel
let modalDetailContainers = document.querySelectorAll('.modal__detail')
let slideIndex = 1;
showSlides(slideIndex);


function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    for (i = 0; i < modalDetailContainers.length; i++) {
        if (!modalDetailContainers[i].classList.contains('block_hidden')) {
            let slides = modalDetailContainers[i].querySelectorAll(`[data-element="${modalDetailContainers[i].getAttribute('id')}"]`);
            if (slides){
                let dots = document.getElementsByClassName("dot");
                if (n > slides.length) {
                    slideIndex = 1
                }
                if (n < 1) {
                    slideIndex = slides.length
                }
                if (slides.length === 1) {
                    document.querySelector('.next').style.display = 'none';
                    document.querySelector('.prev').style.display = 'none';
                } else {
                    document.querySelector('.next').style.display = 'block';
                    document.querySelector('.prev').style.display = 'block';
                }
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = 'none'
                }
                for (i = 0; i < dots.length; i++) {
                    dots[i].className = dots[i].className.replace(" active", "");
                }

                slides[slideIndex - 1].style.display = "block"
                dots[slideIndex - 1].className += " active";
            }

        }
    }

}



