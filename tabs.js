const data_internet=document.getElementById("content-internet")
const data_duo=document.getElementById("content-duo")
const data_l1=document.getElementById("content-l1")



const internet=document.getElementById("internet").addEventListener("click",()=>{
    data_internet.style.display="flex"

    data_duo.style.display="none"
    data_l1.style.display="none"

})

const duo=document.getElementById("duo").addEventListener("click",()=>{
    data_duo.style.display="flex"
    
    data_internet.style.display="none"
    data_l1.style.display="none"

})

const l1=document.getElementById("l1").addEventListener("click",()=>{
    data_l1.style.display="flex"

    data_duo.style.display="none"
    data_internet.style.display="none"
})