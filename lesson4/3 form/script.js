const init = () => {

    //NAME

    let firstName = document.querySelector('.firstName');
    
    firstName.addEventListener('input', updateName);
    function updateName(e) {
      firstName.textContent = e.target.value;
      if (!regExpName.test(firstName.value)) {
          firstName.style.border = '5px solid red';
      } else {
        firstName.style.border = '5px solid green';
      }
    }
    
    //SURNAME

    let surName = document.querySelector('.surName');

    surName.addEventListener('input', updateSurName);
    function updateSurName(e) {
      surName.textContent = e.target.value;
      if (!regExpName.test(surName.value)) {
          surName.style.border = '5px solid red';
      } else {
        surName.style.border = '5px solid green';
      }
    }
   
    //EMAIL

    let userEmail = document.querySelector('.email');

    userEmail.addEventListener('input', updateEmail);
    function updateEmail(e) {
      userEmail.textContent = e.target.value;
      if (!regExpEmail.test(userEmail.value)) {
          userEmail.style.border = '5px solid red';
      } else {
        userEmail.style.border = '5px solid green';
      }
    }
    
    //PHONE

    let userPhone = document.querySelector('.phone');

    userPhone.addEventListener('input', updatePhone);
    function updatePhone(e) {
      userPhone.textContent = e.target.value;
      if (!regExpPhone.test(userPhone.value)) {
          userPhone.style.border = '5px solid red';
      } else {
        userPhone.style.border = '5px solid green';
      }
    }
    
    
    function resetForm() {
        document.getElementById("myForm").reset();
    }


    let regExpName = /([a-zA-Zа-яА-Я]{3,30}\s*)+/;
    let regExpPhone = /^\+?[0-9]{3}-?[0-9]{6,12}$/;
    let regExpEmail = /[A-Z0-9_-]+@([A-Z0-9-]+\.){1,2}[A-Z]{2,4}/iu;
   

   


}

window.onload = init;