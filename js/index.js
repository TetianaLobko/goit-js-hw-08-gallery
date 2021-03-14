import images from './gallery-items.js';

const galleryContainerRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const overlayRef = document.querySelector('.lightbox__overlay');
const modalImgRef = document.querySelector('.lightbox__image');
const closeModalBtnRef = document.querySelector('.lightbox__button');

let activeIndex = 0;
const galleryElement = createGalleryElement(images);

function createGalleryElement(images) {
  return images.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
        <a
        class="gallery__link"
        href="${original}"
        >
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </li>
  `;
  });
}

const arrOfOriginalImages = images.map(image => image.original);

galleryContainerRef.insertAdjacentHTML('beforeend', galleryElement.join(''));

galleryContainerRef.addEventListener('click', onOpenModal);

function onPressArrow(event) {
  if (event.key === 'ArrowLeft' && activeIndex > 0) {
    activeIndex -= 1;
    modalImgRef.src = arrOfOriginalImages[activeIndex];
  }

  // if (event.key === 'ArrowLeft' && activeIndex === 0) {
  //   activeIndex === arrOfOriginalImages.length - 1;
  //   modalImgRef.src = `${arrOfOriginalImages[activeIndex]}`;
  // }

  if (event.key === 'ArrowRight' && activeIndex < images.length - 1) {
    activeIndex += 1;
    modalImgRef.src = arrOfOriginalImages[activeIndex];
  }

  // if (event.key === 'ArrowRight' && activeIndex > images.length) {
  //   activeIndex === 0;
  //   modalImgRef.src = `${arrOfOriginalImages[activeIndex]}`;
  // }
}

function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    window.addEventListener('keydown', onEscKeyPress);
    window.addEventListener('keydown', onPressArrow);
    closeModalBtnRef.addEventListener('click', onCloseModal);
    overlayRef.addEventListener('click', onCloseModal);
    modalRef.classList.add('is-open');
    modalImgRef.src = event.target.dataset.source;
    modalImgRef.alt = event.target.alt;
  }
  for (let elem of arrOfOriginalImages) {
    if (elem === event.target.dataset.source) {
      activeIndex = arrOfOriginalImages.indexOf(elem);
    }
  }
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  closeModalBtnRef.removeEventListener('click', onCloseModal);
  overlayRef.removeEventListener('click', onCloseModal);
  modalRef.classList.remove('is-open');
  modalImgRef.removeAttribute('src');
  modalImgRef.removeAttribute('alt');
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
