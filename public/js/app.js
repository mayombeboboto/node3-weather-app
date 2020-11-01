console.log('Client side JavaScript is loading!')

const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
messageOne.textContent = ''
messageTwo.textContent = ''

const search = document.querySelector('input')
weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const location = search.value
  messageOne.textContent = 'Loading....'
  messageTwo.textContent = ''

  fetch('http://localhost:3000/weather?address='+ location).then((response) => {
    response.json().then((data) => {
      if(data.error) {
        messageTwo.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })
})