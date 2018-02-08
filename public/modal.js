'use strict';

const createHTML = (element = 'div', classAttribute = null, idAttribute = null, value = null) => {
    const rtrn = document.createElement(element);
    idAttribute !== null ? rtrn.setAttribute('id', id) : null; 
    classAttribute !== null ? rtrn.classList.add(classAttribute) : null;
    value !== null ? rtrn.innerHTML = value : null;
    return rtrn;
};

const appendModal = () => {
    // creating html elements
    let modal, exitButton, modalHeader, modalTitle, registrationForm, emailLabel, emailInput, passwordLabel, passwordInput, submitButton;
    modal = createHTML('div', 'modal');
    exitButton = createHTML('p', 'exit', null, 'x');
    modalHeader = createHTML('div', 'modal__header');
    modalTitle = createHTML('h1', 'modal__header--title', null, 'Register with a valid email');
    registrationForm = createHTML('form', 'registration-form');
    registrationForm.setAttribute('action', '/auth/register');
    registrationForm.setAttribute('method', 'POST');
    emailLabel = createHTML('label', 'registration-form__email-label', null, 'Email: ');
    emailInput = createHTML('input', 'registration-form__email-input');
    passwordLabel = createHTML('label', 'registration-form__password-label', null, 'Password: ');
    passwordInput = createHTML('input', 'registration-form__password-input');
    submitButton = createHTML('button', 'submit', null, 'Register');
    // adding events
    exitButton.addEventListener('click', () => {
        document.querySelector('.modal').classList.add('hidden');
    });

    // appending elements to DOM
    modalHeader.appendChild(modalTitle);
    registrationForm.appendChild(emailLabel);
    registrationForm.appendChild(emailInput);
    registrationForm.appendChild(passwordLabel);
    registrationForm.appendChild(passwordInput);
    registrationForm.appendChild(submitButton);
    // appending child items to modal

    modal.appendChild(modalHeader);
    modal.appendChild(registrationForm);
    modal.appendChild(exitButton);
    // appending modal to body
    document.body.appendChild(modal);
}

const showModal = () => {
    if (document.querySelectorAll('.modal').length === 0) {
        appendModal();
    } else {
        document.querySelector('.modal').classList.remove('hidden');
    }
}


document.getElementById('register').addEventListener('click', showModal);