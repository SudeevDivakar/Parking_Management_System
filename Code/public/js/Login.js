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
    username = document.querySelector('#AdminId').value;
    pswd = document.querySelector('#AdminPswd').value;
    if((!(username) || !(pswd)) && check_problem === 0){
        check_problem = 1;
        const h4 = document.createElement('h4');
        h4.classList.add("title");
        h4.classList.add("is-6");
        h4.classList.add("has-text-danger");
        h4.innerText = 'Please Fill In All Credentials';
        const box = document.querySelector('#box');
        box.append(h4);
    }
    else{
        axios.get(`http://localhost:3000/OneTimeCheckIn?uname=${username}&pswd=${pswd}`)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
    }
})


