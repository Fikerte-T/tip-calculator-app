const btn = document.getElementById('btn')
const inputWrapper = document.querySelectorAll('input-wrapper')
const errormsg = document.querySelectorAll('.error-msg')
const customInput = document.getElementById('custom-input')
const radioButtons = document.querySelectorAll('input[type="radio"]')
const error = document.getElementById('error')
// console.log(errormsg)

  // const formData = Object.fromEntries(new FormData(e.target))

  // console.log(formData.bill)
  const validations = {
    'bill': (value) => (value > 0),
    'person': (value) => (value > 0),
    'percent': value => value > 0,
    'custompercent': (value) => (value > 0),
  }

  const uncheckRadio = () => {
    radioButtons.forEach((radio) => radio.checked = false)
  }
  radioButtons.forEach((radio) => {
    radio.addEventListener('click', () => {
      if(radio.checked = true){
        customInput.value = ''
        console.log('checked')
      }
    })
  })
  customInput.addEventListener('focus', uncheckRadio)
  //
  
  const renderSuccess = (message) => {
    console.log(message)
    errormsg.forEach((span) => {
      span.classList.remove('block')
      span.classList.add('hidden')
    })
  }
  const renderError = (m) => {
    // assign an error message to the form
      console.log(m)
      // errormsg.forEach((span) => {
      //   span.classList.remove('hidden')
      //   span.classList.add('block')
      // })
    
  }

  // const validTip = () => {
  //   if(validations['custompercent'](value)){

  //   }
  // }

  const dataIsValid = (key, value, validations) => {
    // console.log(validations[key])
    // console.log(validations['custompercent'] )
    if(!validations[key]) return true
    console.log(validations[key](value))
    return validations[key](value)
  }
  const formIsValid = (form, validations) => {
    let isValid = []
    // console.log(validations)
    
    const formData = Object.fromEntries(new FormData(form))
    console.log(formData)
    if(formData.percent) {
      formData.custompercent = true
      error.style.display = 'none'
      // error.style.display = 'block'
    } else if(!formData.percent && !formData.custompercent) {
      error.innerHTML = `Select Tip`
      error.style.display = 'block'
    } else if(formData.percent || formData.custompercent){
      error.classList.remove('hidden')
      error.style.display = 'none'

    }
    Object.keys(formData).forEach((name) => {
      if(!dataIsValid(name, formData[name], validations)){
        // valid = false
        isValid.push('false')
      } else isValid.push('true')
      // if(validations[person] && validations['custom-input'] === ''){
      //   isValid = true
      // }
    })
   
    console.log(isValid)
    return isValid
  }


const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(e)
    // if(e.percent){
    //   // e.custompercent = true
    //   // error.classList.add('hidden')
    // }
  //   if(formIsValid(e.target, validations)) {
  //     renderSuccess('success')
  //   } else {
  //     renderError()
  // }
    const valid = formIsValid(e.target, validations)
    const allTrue = valid.every(element => element === 'true');
    // console.log(allTrue)

    if(allTrue){
      // renderSuccess('success')
      console.log('success')
    } else {
      valid.forEach(v => {
        if(v === 'false'){
        renderError('m')
      }})
    }
}