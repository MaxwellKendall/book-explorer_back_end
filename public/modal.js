'use strict';

const createHTML = (element = 'div', classAttribute = null, idAttribute = null, value = null) => {
    const rtrn = document.createElement(element);
    classAttribute !== null ? rtrn.classList.add(classAttribute) : null;
    idAttribute !== null ? rtrn.setAttribute('id', idAttribute) : null; 
    value !== null ? rtrn.innerHTML = value : null;
    return rtrn;
};

const removeNotification = () => {
    document.querySelector('ui').classList.add('hidden')
}

const showNotification = (err, data) => {
    const notification = document.createElement('div');
    const icon = document.createElement('i');
    const header = document.createElement('div');
    const msg = document.createElement('p');
    
    msg.innerHTML = 'nice work, now just go ahead and sign in you kook';
    
    notification.classList.add('ui', 'message');
    icon.classList.add('close', 'icon');
    header.classList.add('header');
    header.addEventListener('click', removeNotification);

    notification.appendChild(icon);
    notification.appendChild(header);
    header.appendChild(msg);
    document.querySelector('.container').appendChild(notification);
}

const register = (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
    const data = {
        username,
        password,
    }
    fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((res) => {
        showNotification(null, data);
    }).catch((err) => {
        console.log('error on posting for registration: ', err);
        showNotification(err, data);
    });
}

const appendModal = () => {
    // creating html elements
    let modal, exitButton, modalHeader, modalTitle, registrationForm, emailLabel, emailInput, passwordLabel, passwordInput, submitButton;
    modal = createHTML('div', 'modal');
    exitButton = createHTML('p', 'exit', null, 'x');
    modalHeader = createHTML('div', 'modal__header');
    modalTitle = createHTML('h1', 'modal__header--title', null, 'Register with a valid email');
    registrationForm = createHTML('form', 'registration-form', 'form__register');
    registrationForm.setAttribute('action', '/auth/register');
    registrationForm.setAttribute('method', 'POST');
    registrationForm.addEventListener('submit', register);
    emailLabel = createHTML('label', 'registration-form__email-label', null, 'Email: ');
    emailInput = createHTML('input', 'registration-form__email-input');
    emailInput.setAttribute('name', 'username');
    passwordLabel = createHTML('label', 'registration-form__password-label', null, 'Password: ');
    passwordInput = createHTML('input', 'registration-form__password-input');
    passwordInput.setAttribute('name', 'password');
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
document.getElementById('form').addEventListener('submit', () => {
    console.log('sign in performed');
});
document.getElementById('form__sign-in').addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('sign in performed');
});
