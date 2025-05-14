const errormsg = document.querySelectorAll('.error-msg')
const customInput = document.getElementById('custom-input')
const radioButtons = document.querySelectorAll('input[type="radio"]')
const bill = document.getElementById('bill')
const billError = document.getElementById('bill-error')
const people = document.getElementById('people')
const peopleError = document.getElementById('people-error')
const curtomInputError = document.getElementById('custominput-error')
const tipAmount = document.getElementById('tip-amt')
const totalAmt = document.getElementById('total')
const form = document.getElementById('form');

  const validations = {
    'bill': (value) => (value > 0),
    'person': (value) => (value > 0),
    'percent': value => value > 0,
    'custompercent': (value) => (value >= 0),
  }

  const uncheckRadio = () => {
    radioButtons.forEach((radio) => radio.checked = false)
  }

  const getCurrentPercent = () => {
    const checkedRadio = document.querySelector('input[type="radio"]:checked')
    if(checkedRadio) {
      customInput.value = ''
      return checkedRadio.value
    }
      return null;
  }
  
  const validateBillValue = () => {
    let billValue = bill.value
    if(billValue > 0) {
      billError.classList.add('hidden')
      billError.classList.remove('block')
      return billValue
    } else if(billValue == 0) {
      billError.classList.remove('hidden')
      billError.classList.add('block')
      billError.innerHTML = `Can't be Zero`
      return false
    } else if(billValue < 0) {
      billError.classList.remove('hidden')
      billError.classList.add('block')
      billError.innerHTML = `Can't be negative`
      return false
    }
  }

    
  const validatePeopleValue = () => {
    let peopleValue = people.value
    if(peopleValue > 0) {
      peopleError.classList.add('hidden')
      peopleError.classList.remove('block')
      return peopleValue
    } else if(peopleValue == 0) {
      peopleError.classList.remove('hidden')
      peopleError.classList.add('block')
      peopleError.innerHTML = `Can't be Zero`
      return false
    } else if(peopleValue < 0) {
      console.log('error' + peopleValue)
      peopleError.classList.remove('hidden')
      peopleError.classList.add('block')
      peopleError.innerHTML = `Can't be negative`
      return false
    }
  }

  const validateCustomValue = () => {
    let customValue = customInput.value
    if(customValue > 0) {
      curtomInputError.classList.add('hidden')
      curtomInputError.classList.remove('block')
      return customValue
    } else if(!getCurrentPercent() && customValue == 0) {
      curtomInputError.classList.remove('hidden')
      curtomInputError.classList.add('block')
      curtomInputError.innerHTML = `Can't be Zero`
      return false
    } else if(!getCurrentPercent() && customValue < 0) {
      curtomInputError.classList.remove('hidden')
      curtomInputError.classList.add('block')
      curtomInputError.innerHTML = `Can't be negative`
      return false
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    form.reset()
  }
  
  const formData = Object.fromEntries(new FormData(form))
  let percent = formData.percent
  bill.addEventListener('change', validateBillValue)
  people.addEventListener('change', validatePeopleValue)
  customInput.addEventListener('change', validateCustomValue)
  form.onsubmit = handleSubmit;
  // uncheck every radio button if custom input is selected
  customInput.addEventListener('focus', uncheckRadio)



  const tipAmountCalc = (bill, percent, custom, person) => {
    let tip = 0
    if(person > 0) {
      tip =  Number(((bill * ((percent || custom)/100))/person).toFixed(2))
      tipAmount.innerHTML = `$${tip}`
      return tip

    }
      tipAmount.innerHTML = `$${tip.toFixed(2)}`

  }

  const totalCalc = (bill, tip, person) => {
    let total = 0
    console.log(bill)
    if(tip > 0) {
      total = Number(((bill/person) + tip).toFixed(2))
      totalAmt.innerHTML = `$${total}`
    }
    totalAmt.innerHTML = `$${total.toFixed(2)}`
  }

  const validForm = () => {
    let bill = validateBillValue()
    let custom = validateCustomValue()
    let person = validatePeopleValue()
    let percent = getCurrentPercent()

    if(bill &&  (percent || custom)){
      let tip = tipAmountCalc(bill, percent, custom, person )
      totalCalc(bill, tip, person)
    }
  }
  form.addEventListener('change', validForm)