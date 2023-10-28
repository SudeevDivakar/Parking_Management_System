const navLinks = document.querySelectorAll('.navbar-item');
for(let i of navLinks){
    i.addEventListener('click',function(evt){
        evt.preventDefault();
        alert('Please LogIn');
        evt.stopPropagation();
    });
}

const loginButton = document.querySelector('#loginbutton');
let check_problem = 0;

loginButton.addEventListener('click',function() {
    userId = document.querySelector('#AdminId').value;
    pswd = document.querySelector('#AdminPswd').value;
    if((!(userId) || !(pswd)) && check_problem === 0){
        errorMessage();
    }
    else{
        axios.get(`http://localhost:3000/verifyUser?id=${userId}&pswd=${pswd}`)
        .then((response) => {
            if(response.data === 'y'){
                axios.get(`http://localhost:3000/OneTimeCheckIn`)
                .then((res) => {
                    console.log(res.data);
                })
            }
            else if(response.data === 'n' && check_problem === 0){
                errorMessage();
                document.querySelector('#AdminId').value = '';
                document.querySelector('#AdminPswd').value = '';
            }
            else{
                document.querySelector('#AdminId').value = '';
                document.querySelector('#AdminPswd').value = '';
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
})

function errorMessage() {
    check_problem = 1;
    const h4 = document.createElement('h4');
    h4.classList.add("title");
    h4.classList.add("is-6");
    h4.classList.add("has-text-danger");
    h4.innerText = 'Please Enter Valid Credentials';
    const box = document.querySelector('#box');
    box.append(h4);
}


