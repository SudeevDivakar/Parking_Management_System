const button = document.querySelector('#add-button');
let check_problem = 0;
button.addEventListener('click', () => {
    const securityId = document.querySelector('#secId').value;
    const name = document.querySelector('#name').value;
    const mobno = document.querySelector('#mobno').value;
    const stime = document.querySelector('#stime').value;
    const etime = document.querySelector('#etime').value;
    if(!(securityId) || !(name) || !(mobno) || !(stime) || !(etime)){
        errorMessage('Please Fill in All Fields');
    }
    else if(mobno.length !== 10){
        errorMessage('Make sure Mobile Number is of Correct Length');
    }
    else{
        axios.get(`http://localhost:3000/insertSecurity?securityId=${securityId}&name=${name}&mobno=${mobno}&stime=${stime}&etime=${etime}`)
        .then((response) => {
            if(response.data === 'y'){
                successMessage();
            }
            else if(response.data === 'n1'){
                errorMessage('Security Already in Database');
            }
            else if(response.data === 'n2'){
                errorMessage('Please Enter Valid Time Values')
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
        h4.innerText = 'Security Added into Database';
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
        h4.innerText = 'Security Added into Database';
        box.append(h4);
        check_problem = 2;
    }
    reset();
}

function reset(){
    document.querySelector('#secId').value = '';
    document.querySelector('#name').value = '';
    document.querySelector('#mobno').value = '';
    document.querySelector('#stime').value = '';
    document.querySelector('#etime').value = '';
}