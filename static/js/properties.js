// open and close properties modal window
let propertiesLink = document.querySelector('[data-action="properties"]');
let propertiesContainer = document.getElementById('propertiesContainer');

propertiesLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById(propertiesLink.getAttribute('data-action')).classList.remove('block_hidden');
    // document.querySelector('body').style.overflow = 'hidden';
    console.log(window.scrollX, window.scrollY)
    document.getElementById(propertiesLink.getAttribute('data-action')).children[0].style.right = '20px';
    document.getElementById(propertiesLink.getAttribute('data-action')).children[0].style.bottom = `${420 + propertiesContainer.clientHeight}`;
})

document.getElementById('closeProperties').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('properties').classList.add('block_hidden');
    document.querySelector('body').style.overflow = 'auto';
})

document.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target === document.getElementById('properties')) {
        document.getElementById('properties').classList.add('block_hidden');
        document.querySelector('body').style.overflow = 'auto';
    }
})
