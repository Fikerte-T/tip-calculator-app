const form = document.getElementById('form');
const bill = document.getElementById('bill')
const people = document.getElementById('people')
const customInput = document.getElementById('custom-input')
const radioButtons = document.querySelectorAll('input[type="radio"]')

const billError = document.getElementById('bill-error')
const peopleError = document.getElementById('people-error')
const curtomInputError = document.getElementById('custominput-error')

const tipAmount = document.getElementById('tip-amt')
const totalAmt = document.getElementById('total')

//Helpers
const uncheckRadio = () => {
  radioButtons.forEach((radio) => radio.checked = false)
}

const getCurrentPercent = () => {
  const checkedRadio = document.querySelector('input[type="radio"]:checked')
  if(checkedRadio) {
    customInput.value = ''
    return Number(checkedRadio.value)
  }
    return 0;
}

//validatioin  
const validateBill = () => {
  let billValue = parseFloat(bill.value)
  if(billValue > 0) {
    billError.classList.add('hidden')
    // billError.classList.remove('block')
    return billValue
  } else {
    billError.textContent = billValue === 0 ? "Can't be zero" : "Can't be negative"
    billError.classList.remove('hidden')
    return false
  }
}

  
const validatePeople = () => {
  let peopleValue = parseFloat(people.value)
  if(peopleValue > 0) {
    peopleError.classList.add('hidden')
    return peopleValue
  } else {
    peopleError.textContent = peopleValue === 0 ? "Can't be zero" : "Can't be negative"
    peopleError.classList.remove('hidden')
    return false
  }
}

const validateCustomValue = () => {
  let customValue = parseFloat(customInput.value)
  const percent = getCurrentPercent()
  if(percent > 0 || customValue > 0) {
    curtomInputError.classList.add('hidden')
    return customValue
  } else {
    curtomInputError.textContent = customValue === 0 ? "Can't be zero" : "Can't be negative"
    curtomInputError.classList.remove('hidden')
    return false
  }
}

//Calculations
const calculateTip = (bill, percent, custom, person) => {
  // let tip = 0
  console.log(bill)
  console.log(percent)
  console.log(person)
  console.log(custom)
  const rate = percent || custom
  console.log(rate)
  if(rate > 0 && person > 0) {
    const tip =  Number(((bill * (rate/100))/person).toFixed(2))
    console.log(tip)
    tipAmount.innerHTML = `$${tip.toFixed(2)}`
    return tip

  }
    tipAmount.innerHTML = '$0.00'
    return 0

}

const calculateTotal = (bill, tip, person) => {
  console.log('in total calc')
  if(person > 0) {
    const total = Number(((bill/person) + tip).toFixed(2))
    console.log(total)
    totalAmt.innerHTML = `$${total.toFixed(2)}`
  } else {
    totalAmt.innerHTML = '$0.00'
  }
}

// const handleSubmit = (e) => {
//   e.preventDefault()
//   form.reset()
// }

//Main validation and calc trigger
const validForm = () => {
  let bill = validateBill()
  let custom = validateCustomValue()
  let person = validatePeople()
  let percent = getCurrentPercent()

  if(bill && person && (percent || custom)){
    let tip = calculateTip(bill, percent, custom, person )
    calculateTotal(bill, tip, person)
  }
}


// bill.addEventListener('change', validateBill)
// people.addEventListener('change', validatePeople)
// customInput.addEventListener('change', validateCustomValue)
// form.onsubmit = handleSubmit;
// uncheck every radio button if custom input is selected
// customInput.addEventListener('focus', uncheckRadio)
// form.addEventListener('change', validForm)

// from inter
// Event Listeners 
bill.addEventListener('input', validForm);
people.addEventListener('input', validForm);
customInput.addEventListener('input', () => {
  uncheckRadio();
  validForm();
});

radioButtons.forEach((radio) => {
  radio.addEventListener('change', () => {
    customInput.value = '';
    validForm();
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  validForm();
  form.reset();
  // uncheckRadio();
  tipAmount.textContent = '$0.00';
  totalAmt.textContent = '$0.00';
});