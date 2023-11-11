const button = document.querySelector('#remove-button');
let check_problem = 0;
button.addEventListener('click', () => {
    const securityId = document.querySelector('#secId').value;
    const adminPswd = document.querySelector('#adminPswd').value;
    if(!(securityId) || !(adminPswd)){
        errorMessage('Please Fill in All Fields');
    }
    else{
        axios.get(`http://localhost:3000/deleteSecurity?secId=${securityId}&adminPswd=${adminPswd}`)
        .then((response) => {
            if(response.data === 'y'){
                successMessage();
            }
            else if(response.data === 'n1'){
                errorMessage('Incorrect Administrator Password');
            }
            else if(response.data === 'n2'){
                errorMessage('Security not in Database');
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
        h4.innerText = 'Security Removed from Database!';
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
        h4.innerText = 'Security Removed from Database!';
        box.append(h4);
        check_problem = 2;
    }
    reset();
}

function reset(){
    document.querySelector('#secId').value = '';
    document.querySelector('#adminPswd').value = '';
}