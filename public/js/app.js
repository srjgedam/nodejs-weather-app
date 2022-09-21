const weatherform=document.querySelector('form')
const search=document.querySelector("input")
const messageOne=document.getElementById("message-1")
const messageTwo=document.getElementById("message-2")

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent="Loading..."
    messageTwo.textContent=""
    try{
        fetchweatherinfo(location)

    }catch(error){
        console.log(error)
    }
 
   
})

async function fetchweatherinfo(location){
    let response= await fetch(`/weather?address=${location}`)
    let json1=await response.json()
    if (json1.error){
        messageOne.textContent=json1.error
    }else {
        messageOne.textContent=json1.forecast
        messageTwo.textContent=json1.location
        
    }
    
}
