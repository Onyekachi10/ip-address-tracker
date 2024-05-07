 
"use strict"

const arrow = document.querySelector(".arrow")
const ipAddress = document.querySelector(".value")
const locate = document.querySelector(".locate")
const time = document.querySelector(".time")
const isp = document.querySelector('.isp')
arrow.addEventListener("click", getData)
 


 function getData() {
  const fetchPromise = fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_h96pBu4X08dHOnYYdaGbfR1tBK75w&ipAddress=`)
  const result = document.querySelector("input")

        fetchPromise.then( response => {
            return response.json()
        }).then( data => {
            ipAddress.innerHTML = result.value
            ipAddress.innerHTML = data.ip
          locate.innerHTML = `${data.location.region}`
          time.innerHTML = ` UTC ${data.location.timezone}`
          isp.innerHTML = `${data.isp}`
          
   
        })

    
    }
  

