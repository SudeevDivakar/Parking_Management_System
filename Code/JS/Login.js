const navLinks = document.querySelectorAll('.navbar-item');
for(let i of navLinks){
    i.addEventListener('click',function(evt){
        evt.preventDefault();
        alert('Please LogIn');
        evt.stopPropagation();
    });
}

const loginButton = document.querySelector('#loginbutton');
loginButton.addEventListener('click',function() {
    username = document.querySelector('#AdminId');
    pswd = document.querySelector('#AdminPswd');
    console.log(pswd.value);
    if(!(username.value) || !(pswd.value)){
        console.log(username.value);
    }
    else{
        sendReq(`localhost:3000/OneTimeCheckIn?uname=${username.value}&pswd=${pswd.value}`)
    }
})

async function sendReq (req) {
    try{
        let obj = await axios.get(req);

    }
    catch{

    }

}  
