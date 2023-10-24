navLinks = document.querySelectorAll('.navbar-item');
for(let i of navLinks){
i.addEventListener('click',function(evt){
    evt.preventDefault();
    alert('Please LogIn');
    evt.stopPropagation();
});
}