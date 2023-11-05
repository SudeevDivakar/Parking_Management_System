function openModal() {
  document.getElementById("modal1").classList.add("is-active");
}

function closeModal() {
  document.getElementById("modal1").classList.remove("is-active");
}

document.querySelectorAll(".modal-background, .modal-close,.modal-card-head.delete, .modal-card-foot.button").forEach(($el) => {
  const $modal = $el.closest(".modal");
  $el.addEventListener("click", () => {

    $modal.classList.remove("is-active");
  });
});

document.addEventListener("keydown", (event) => {
  const e = event || window.event;
  if (e.keyCode === 27) {

    closeModal();
  }
});

const button = document.querySelector('#checkinbutton');
let check_problem = 0;
button.addEventListener('click', () => {
  const srn = document.querySelector('#SRN');
  const name = document.querySelector('#name');
  const regno = document.querySelector('#regno');
  const vehTypeInput = document.querySelector('input[name="vehicle_type"]:checked');
  const vehType = vehTypeInput ? vehTypeInput.value : '';
  if ((!(srn.value) || !(name.value) || !(regno.value) || !(vehType))) {
    errorMessage('Please Fill in All Fields');
  }
  else if (srn.value.length !== 13 || regno.value.length !== 4) {
    errorMessage('Make Sure SRN and Reg_Number are of Proper Lengths');
  }
  else {
    axios.get(`http://localhost:3000/insertParkingLot?srn=${srn.value}&name=${name.value}&regno=${regno.value}&vehType=${vehType}`)
    .then((response) => {
        if (response.data === 'n'){
          errorMessage('User Already In Parking Lot');
        }
        else if (response.data === 'y'){
          successMessage();
          srn.value = '';
          name.value = '';
          regno.value = '';
          try{
            document.querySelector('input[name="vehicle_type"]:checked').checked = false;
          }
          catch{
            return;
          }
        }
    })
  }
});

function errorMessage(msg){
  if(check_problem === 0){
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
  else if(check_problem === 1){
    let h4 = document.querySelector('#error');
    h4.innerText = msg;
    check_problem = 1;
  }
  else if(check_problem === 2){
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
  document.querySelector('#name').value = '';
  document.querySelector('#regno').value = '';
  try{
    document.querySelector('input[name="vehicle_type"]:checked').checked = false;
  }
  catch{
    return;
  }
}

function successMessage(){
  if(check_problem === 0){
    let h4 = document.createElement('h4');
    h4.id = 'success';
    h4.classList.add("title");
    h4.classList.add("is-6");
    h4.classList.add("has-text-primary");
    h4.innerText = 'User Added!';
    const box = document.querySelector('#box');
    box.append(h4);
    check_problem = 2;
  }
  else if(check_problem === 1){
    const box = document.querySelector('#box');
    box.removeChild(box.lastChild);
    let h4 = document.createElement('h4');
    h4.id = 'success';
    h4.classList.add("title");
    h4.classList.add("is-6");
    h4.classList.add("has-text-primary");
    h4.innerText = 'User Added!';
    box.append(h4);
    check_problem = 2;
  }
}


