const button = document.querySelector('#add-button');
let check_problem = 0;
button.addEventListener('click', () => {
    const adminId = document.querySelector('#adminId');
    const name = document.querySelector('#name');
    const pswd = document.querySelector('#pswd');
    const mobno = document.querySelector('#mobno');
    const adminPswd = document.querySelector('#adminPswd');
    console.log('hi');
    if(!(adminId.value) || !(name.value) || !(pswd.value) || !(mobno.value) || !(adminPswd.value)){
        errorMessage('Please Fill in All Fields');
    }
    else if(mobno.value.length !== 10){
        errorMessage('Make Sure Mobile Number is of Correct Length');
    }
    else{
        axios.get(`http://localhost:3000/insertAdmin?adminId=${adminId.value}&name=${name.value}&pswd=${pswd.value}&mobno=${mobno.value}&adminPswd=${adminPswd.value}`)
        .then((response) => {
            if(response.data === 'y'){
                successMessage();
            }
            else if(response.data === 'n1'){
                errorMessage(`Granter Admin's Password is Incorrect`);
            }
            else if(response.data === 'n2'){
                errorMessage('Admin Already in Database');
            }
        })
    }
})

function errorMessage(msg) {
    if (check_problem === 0) {
        let h4 = document.createElement('h4');
        h4.id = 'error';
        h4.classList.add('title');
        h4.classList.add('is-6');
        h4.classList.add('has-text-danger');
        h4.innerText = msg;
        const box = document.querySelector('#box');
        box.append(h4);
        check_problem = 1;
    }
    else if (check_problem === 1) {
        let h4 = document.querySelector('#error');
        h4.innerText = msg;
    }
    else if (check_problem === 2) {
        const box = document.querySelector('#box');
        box.removeChild(box.lastChild);
        let h4 = document.createElement('h4');
        h4.id = 'error';
        h4.classList.add('title');
        h4.classList.add('is-6');
        h4.classList.add('has-text-danger');
        h4.innerText = msg;
        box.append(h4);
        check_problem = 1;
    }
    reset();
}


function successMessage() {
    if (check_problem === 0) {
        let h4 = document.createElement('h4');
        h4.id = 'success';
        h4.classList.add("title");
        h4.classList.add("is-6");
        h4.classList.add("has-text-primary");
        h4.innerText = 'Admin Added into Database';
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
        h4.innerText = 'Admin Added into Database';
        box.append(h4);
        check_problem = 2;
    }
    reset();
}

function reset(){
    document.querySelector('#adminId').value = '';
    document.querySelector('#name').value = '';
    document.querySelector('#pswd').value = '';
    document.querySelector('#mobno').value = '';
    document.querySelector('#adminPswd').value = '';
}