const button = document.querySelector('#update-button');
let check_problem = 0;
button.addEventListener('click', () => {
    const srn = document.querySelector('#srn').value;
    const adminPswd = document.querySelector('#adminPswd').value;
    const regno = document.querySelector('#regno').value;
    if(!(srn) || !(adminPswd) || !(regno)){
        errorMessage('Please Fill in All Fields');
    }
    else if(srn.length !== 13 || regno.length !== 4){
        errorMessage('Make Sure SRN and Registration Number are of Proper Length');
    }
    else{
        axios.get(`http://localhost:3000/updatePass?srn=${srn}&adminPswd=${adminPswd}&regno=${regno}`)
        .then((response) => {
            if(response.data === 'y'){
                successMessage();
            }
            else if(response.data === 'n1'){
                errorMessage('Enter Correct Administrator Password');
            }
            else if(response.data === 'n2'){
                errorMessage('User Does not have a MonthlyPass');
            }
            else if(response.data === 'n3'){
                errorMessage('User Already has a Pass for Car and Bike');
            }
            else if(response.data === 'n4'){
                errorMessage('Registration Number Already has a Monthly Pass');
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
        h4.innerText = 'Monthly Pass Updated!';
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
        h4.innerText = 'Monthly Pass Updated!';
        box.append(h4);
        check_problem = 2;
    }
    reset();
}

function reset(){
    document.querySelector('#srn').value = '';
    document.querySelector('#adminPswd').value = '';
    document.querySelector('#regno').value = '';
}