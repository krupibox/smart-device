'use strict';

(function () {

  var body = document.querySelector('body');
  var header = body.querySelector('.inner');
  var overlay = header.querySelector('.overlay');
  var modal = header.querySelector('.modal');
  var buttonCallback = header.querySelector('.button');
  var close = modal.querySelector('img');
  var modalForm = header.querySelector('.modal__form');
  var form = body.querySelector('.form:not(.modal__form)');
  var modalFormName = modalForm.querySelector('#modal-form-name');
  var modalFormPhone = modalForm.querySelector('#modal-form-phone');
  var modalFormQuestions = modalForm.querySelector('#modal-form-questions');
  var formName = form.querySelector('#form-name');
  var formPhone = form.querySelector('#form-phone');
  var formQuestions = form.querySelector('#form-questions');
  var modalCheckbox = modalForm.querySelector('input[name=modal-acceptance]');
  var formCheckbox = form.querySelector('input[name=form-acceptance]');

  var maskOptions = {
    mask: '+{7} (000) 000-00-00'
  };

  /* eslint-disable */

  var maskModalFormPhone = IMask(modalFormPhone, maskOptions);
  var maskFormPhone = IMask(formPhone, maskOptions);

  /* eslint-enable */

  maskModalFormPhone.updateValue();
  maskFormPhone.updateValue();

  var isStorageSupport = true;

  try {
    modalFormName.value = localStorage.getItem('formName');

  } catch (err) {
    isStorageSupport = false;
  }

  var setItemForm = function () {
    localStorage.setItem('formName', formName.value);
    localStorage.setItem('formPhone', formPhone.value);
    localStorage.setItem('formQuestions', formQuestions.value);
  };

  var setItemModalForm = function () {
    localStorage.setItem('modalFormName', modalFormName.value);
    localStorage.setItem('modalFormPhone', modalFormPhone.value);
    localStorage.setItem('modalFormQuestions', modalFormQuestions.value);
  };

  var getItemForm = function () {
    formName.value = localStorage.getItem('formName');
    formPhone.value = localStorage.getItem('formPhone');
    formQuestions.value = localStorage.getItem('formQuestions');
  };

  var getItemModalForm = function () {
    modalFormName.value = localStorage.getItem('modalFormName');
    modalFormPhone.value = localStorage.getItem('modalFormPhone');
    modalFormQuestions.value = localStorage.getItem('modalFormQuestions');
  };

  var clearLocalStorage = function (forms) {
    Array.from(forms.querySelectorAll('input:not([type=checkbox]), textarea')).
    forEach(function (element) {
      element.value = '';
    });
    window.localStorage.clear();
    forms.reset();
  };

  if (isStorageSupport) {
    getItemForm();
  }

  buttonCallback.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (modal.classList.contains('modal--closed')) {
      modal.classList.remove('modal--closed');
      body.classList.add('noscroll');
      overlay.style.display = 'block';

      if (isStorageSupport) {
        getItemModalForm();
      }

      if (modalFormName.value) {
        modalFormPhone.focus();
      } else {
        modalFormName.focus();
      }

      if (modalFormName.value && modalFormPhone.value) {
        modalFormQuestions.focus();
      }
    }

    modalForm.addEventListener('change', function () {
      if (isStorageSupport) {
        setItemModalForm();
      }
    });

    modalFormPhone.addEventListener('change', function () {
      if (modalFormPhone.validity.patternMismatch) {
        modalFormPhone.setCustomValidity('Введите в формате +7 (ХХХ) ХХХ-ХХ-ХХ');
      } else {
        modalFormPhone.setCustomValidity('');
      }
    });

    modalCheckbox.addEventListener('change', function () {
      if (modalCheckbox.validity.valueMissing) {
        modalCheckbox.setCustomValidity('Согласитесь на обработку персональных данных');
      } else {
        modalCheckbox.setCustomValidity('');
      }
    });

    modalForm.addEventListener('submit', function () {
      clearLocalStorage(modalForm);
    });
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
    body.classList.remove('noscroll');
    modal.classList.add('modal--closed');
    overlay.style.display = 'none';
  }


  form.addEventListener('change', function () {
    if (isStorageSupport) {
      setItemForm();
    }
  });

  formPhone.addEventListener('change', function () {

    if (formPhone.validity.patternMismatch) {
      formPhone.setCustomValidity('Введите в формате +7 (ХХХ) ХХХ-ХХ-ХХ');
    } else {
      formPhone.setCustomValidity('');
    }
  });

  formCheckbox.addEventListener('change', function () {
    if (formCheckbox.validity.valueMissing) {
      formCheckbox.setCustomValidity('Согласитесь на обработку персональных данных');
    } else {
      formCheckbox.setCustomValidity('');
    }
  });

  form.addEventListener('submit', function () {
    clearLocalStorage(form);
  });

})();
