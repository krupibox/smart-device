'use strict';
(function () {

  var header = document.querySelector('.header__container');
  var open = header.querySelector('.button--callback');
  var overlay = header.querySelector('.overlay');
  var modal = header.querySelector('.modal');
  var close = modal.querySelector('img');
  var form = header.querySelector('.modal__form');
  var formName = form.querySelector('[name=user-callback-name]');
  var formPhone = form.querySelector('[name=user-callback-phone]');
  var formQuestion = form.querySelector('[name=user-callback-question]');

  var isStorageSupport = true;

  try {
    formName.value = localStorage.getItem('Name');

  } catch (err) {
    isStorageSupport = false;
  }

  open.addEventListener('click', function (evt) {
    if (modal.classList.contains('modal--closed')) {
      evt.preventDefault();
      modal.classList.remove('modal--closed');
      overlay.style.display = 'block';

      if (isStorageSupport) {
        formName.value = localStorage.getItem('Name');
        formPhone.value = localStorage.getItem('Phone');
        formQuestion.value = localStorage.getItem('Question');
      }

      if (formName.value) {
        formPhone.focus();
      } else {
        formName.focus();
      }

      if (formName.value && formPhone.value) {
        formQuestion.focus();
      }
    }
  });

  form.addEventListener('submit', function () {
    if (isStorageSupport) {
      localStorage.setItem('Name', formName.value);
      localStorage.setItem('Phone', formPhone.value);
      localStorage.setItem('Question', formQuestion.value);
    }
  });

  close.addEventListener('click', function (evt) {
    if (!modal.classList.contains('modal--closed')) {
      closeModal(evt);
    }
  });

  overlay.addEventListener('click', function (evt) {
    if (!modal.classList.contains('modal--closed') && evt.target === overlay) {
      closeModal(evt);
    }
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27 && !modal.classList.contains('modal--closed')) {
      closeModal(evt);
    }
  });

  function closeModal(event) {
    event.preventDefault();
    modal.classList.add('modal--closed');
    overlay.style.display = 'none';
  }
})();
