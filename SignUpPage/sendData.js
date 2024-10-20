const url = 'https://6709508caf1a3998baa11eb3.mockapi.io/api/v1/login'

const form = document.querySelector('form')
const formArr = Array.from(form)
const validFormArr = [];
const button = document.querySelector('button')
const firstPasswordInput = form.children[1].querySelector('input')
const secondPasswordInput = form.children[2].querySelector('input')



async function sendData() {

    let userMail = document.getElementById("email-input")
    let userPassword = document.getElementById("password-input")

    let userData = {
        email: userMail.value,
        password: userPassword.value
    }

    let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userData)
      });

}

formArr.forEach((elem) => {
    if(elem.hasAttribute("data-reg")) {
        elem.setAttribute("is-valid", "0");
        validFormArr.push(elem);
    }
})

function inputHandler({ target }) {
    if(target.hasAttribute("data-reg")) {
        inputCheck(target);
    }
}

function inputCheck(elem) {
    const inputValue = elem.value;
    const inputRegExp = elem.getAttribute("data-reg");
    const regex = new RegExp(inputRegExp);

    if (regex.test(inputValue)) {
        elem.setAttribute("is-valid", '1');
        elem.closest('div').style.color = 'green';
    } else {
        elem.setAttribute("is-valid", '0');
        elem.closest('div').style.color = 'red';
    }

}

let passwordBoolean = false;
function passwordCompare() {
    if(firstPasswordInput.value !== secondPasswordInput.value) {
        document.getElementById('alert').innerHTML = 'Passwords do not match';
        document.getElementById('alert').style.color = 'red';
        passwordBoolean = false;
    } else {
        document.getElementById('alert').innerHTML = 'Passwords matches';
        document.getElementById('alert').style.color = 'green';
        passwordBoolean = true;
    }
}

function handleClick(e) {
    const allValid = []

    validFormArr.forEach((elem) => {
        allValid.push(elem.getAttribute("is-valid"));
    });

    const isAllValid = allValid.reduce((acc, current) => {
        return acc && current;
    });

    if (!Boolean(Number(isAllValid)) || passwordBoolean === false) {
        e.preventDefault();
    } else {
        sendData()
    }

}


secondPasswordInput.addEventListener('input', passwordCompare);
firstPasswordInput.addEventListener('input', passwordCompare);
form.addEventListener("input", inputHandler);
button.addEventListener("click", handleClick);



