const button = document.querySelector('#register-button');
let check_problem = 0;
button.addEventListener('click', () => {
    const srn = document.querySelector('#SRN');
    const name = document.querySelector('#name');
    const mobno = document.querySelector('#mobno');
    const regnobike = document.querySelector('#regnobike');
    const regnocar = document.querySelector('#regnocar');
    let sum = 0;
    const ch1 = document.querySelector('#twowheel');
    const ch2 = document.querySelector('#fourwheel');
    if(ch1.checked){
        sum += 150;
    }
    if(ch2.checked){
        sum += 250;
    }
    const checkTwoWheeler = (!(regnobike.value) && ch1.checked) || (!(ch1.checked) && regnobike.value);
    const checkFourWheeler = (!(regnocar.value) && ch2.checked) || (!(ch2.checked) && regnocar.value);
    if(!(srn.value) || !(name.value) || !(mobno.value) || (!(ch1.checked) && !(ch2.checked))){
        errorMessage('Please Enter All Fields Accurately');
    }
    else if(checkFourWheeler || checkTwoWheeler){
        errorMessage('Please Enter Registration Numbers Accurately');
    }
    else if(srn.value.length !== 13 || mobno.value.length !== 10 || (ch1.checked && regnobike.value.length !== 4) || (ch2.checked && regnocar.value.length !== 4)){
        errorMessage('Please Enter Valid Credentials');
    }
    else{
        axios.get(`http://localhost:3000/insertMonthlyPass?srn=${srn.value}&name=${name.value}&mobno=${mobno.value}&regnobike=${regnobike.value}&regnocar=${regnocar.value}`)
        .then((response) => {
            if(response.data === 'y'){
                successMessage(sum);
            }
            else if(response.data === 'n1'){
                errorMessage('User Already Has a Monthly Pass');
            }
            else if(response.data === 'n2'){
                errorMessage('Car Already has a Monthly Pass');
            }
            else if(response.data === 'n3'){
                errorMessage('Bike Already has a Monthly Pass');
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

function successMessage(amt) {
    if (check_problem === 0) {
        let h4 = document.createElement('h4');
        h4.id = 'success';
        h4.classList.add("title");
        h4.classList.add("is-6");
        h4.classList.add("has-text-primary");
        h4.innerText = `User Administered into Database. Total to be Paid: ${amt}`;
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
        h4.innerText = 'User Administered into Database';
        box.append(h4);
        check_problem = 2;
    }
    reset();
}

function reset(){
    document.querySelector('#SRN').value = '';
    document.querySelector('#name').value = '';
    document.querySelector('#mobno').value = '';
    document.querySelector('#regnobike').value = '';
    document.querySelector('#regnocar').value = '';
    document.querySelector('#twowheel').checked = false;
    document.querySelector('#fourwheel').checked = false;
}