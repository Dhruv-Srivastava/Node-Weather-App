const input=document.querySelector("input")
const form=document.querySelector("form")
const loader=document.querySelector(".loader")
const results=document.querySelector(".results")

async function fetchData(address){
    const res= await fetch(`http://localhost:8080/weather?address=${address}`)
    const data=await res.json()
    return data
}


form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    const address=input.value
    input.value=""
    results.textContent=""
    if(!address){
        results.textContent="Please provide a location!"
        return;
    }

    loader.style.display="block"

    const data=await fetchData(address)

    loader.style.display="none"
    
    results.textContent=data.forecast
})