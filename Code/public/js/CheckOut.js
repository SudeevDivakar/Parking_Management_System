const button = document.querySelector('#remove-button');
let check_problem = 0;
button.addEventListener('click', () => {
    const srn = document.querySelector('#SRN');
    const regno = document.querySelector('#regno');
    if ((!(srn.value) || !(regno.value))) {
        errorMessage('Please Fill in All the Fields');
    }
    else if (srn.value.length !== 13 || regno.value.length !== 4) {
        errorMessage('Make Sure SRN and Reg_Number are of Proper Lengths');
    }
    else {
        axios.get(`http://localhost:3000/removeParkingLot?srn=${srn.value}&regno=${regno.value}`)
            .then((response) => {
                if (response.data === 'y') {
                    successMessage();
                }
                else if (response.data === 'n') {
                    errorMessage('User not in Database');
                }
            })
    }
})

function errorMessage(msg) {
    if (check_problem === 0) {
        let h4 = document.createElement('h4');
        h4.id = 'error';
        h4.classList.add("title");
        h4.classList.add("is-6");
        h4.classList.add("has-text-danger");
        h4.innerText = msg;
        const box = document.querySelector('#box');
        box.append(h4);
        check_problem = 1;
    }
    else if (check_problem === 1) {
        let h4 = document.querySelector('#error');
        h4.innerText = msg;
        check_problem = 1;
    }
    else if (check_problem === 2) {
        const box = document.querySelector('#box');
        box.removeChild(box.lastChild);
        let h4 = document.createElement('h4');
        h4.id = 'error';
        h4.classList.add("title");
        h4.classList.add("is-6");
        h4.classList.add("has-text-danger");
        h4.innerText = msg;
        box.append(h4);
        check_problem = 1;
    }
    document.querySelector('#SRN').value = '';
    document.querySelector('#regno').value = '';
}

function successMessage() {
    if (check_problem === 0) {
        let h4 = document.createElement('h4');
        h4.id = 'success';
        h4.classList.add("title");
        h4.classList.add("is-6");
        h4.classList.add("has-text-primary");
        h4.innerText = 'User Checked Out!';
        const box = document.querySelector('#box');
        box.append(h4);
        check_problem = 2;
    }
    else if (check_problem === 1) {
        const box = document.querySelector('#box');
        box.removeChild(box.lastChild);
        let h4 = document.createElement('h4');
        h4.id = 'success';
        h4.classList.add("title");
        h4.classList.add("is-6");
        h4.classList.add("has-text-primary");
        h4.innerText = 'User Checked Out!';
        box.append(h4);
        check_problem = 2;
    }
    document.querySelector('#SRN').value = '';
    document.querySelector('#regno').value = '';
}