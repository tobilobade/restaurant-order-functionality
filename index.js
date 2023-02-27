

import {menuArray} from "./data.js"

const checkoutArrangement = document.getElementById("checkout-arrangement")
const checkoutBtn = document.getElementById("checkout-btn")
const checkoutSection = document.getElementById("checkout-section")
const closeModal = document.getElementById("close-modal")

const inputName = document.getElementById('input-name')
const inputNumber = document.getElementById('input-number')
const inputCvv = document.getElementById('input-cvv')
const modalContainer= document.getElementById("modal-container")
const orders = document.getElementById("orders")
const submitBtn= document.getElementById("submit-btn")
const successfulMessage= document.getElementById("successful-message")
const totalPrice = document.getElementById("total-price")

let total =0
let orderArray = []


// EVENT LISTENERS

document.addEventListener('click', function(e){

  
    if (e.target.dataset.button) {
        addButton(e.target.dataset.button)
        checkoutSection.style.display = 'block'  
    } 
    else if (e.target.dataset.remove) {
        removeButton(e.target.dataset.remove, e.target.dataset.index)
    } 

   
    
})

submitBtn.addEventListener('click', function(e){
    e.preventDefault()
    
    if(inputName.value && inputNumber.value && inputCvv.value){
        checkoutSection.style.display = 'none'
        modalContainer.style.display = 'none'
        successfulMessage.style.display="block"
        
        
        
        inputCvv.value = ''
        inputName.value = ''
        inputNumber.value = ''
        orderArray = []
        total = 0
    }
   
 })


checkoutBtn.addEventListener('click', function completeOrderBtn(){
    modalContainer.style.display = 'block'
})

closeModal.addEventListener('click', function(){
    modalContainer.style.display = 'none'
})



function addButton(itemId) {
   
    const itemToAdd = menuArray.filter(function (item){ 
        return item.id.toString() === itemId
})[0]

        orderArray.push(itemToAdd)
        console.log(orderArray)

        total += itemToAdd.price
        totalPrice.innerHTML= `$ ${total}`

        render()

} 


function removeButton(itemId, index) {
    const itemToRemove = menuArray.filter(function(item) {
        return itemId === item.id.toString()
    })[0]
    
    orderArray.splice(index, 1)
    
    
    
    total -= itemToRemove.price
    
    totalPrice.innerHTML = "$" +  total
    
    render()
    
    if (total === 0) {
        checkoutSection.style.display = 'none'
    }
    
}


function showOrder(){

    let showOrders=" "
    orderArray.forEach(function(item, index){
        
        showOrders+= 
        ` 
        <div class="checkout" id="checkout">
             <p>${item.name} <span class="remove-order" data-remove="${item.id}" data-index="${index}"> remove</span> </p>
             <p>${item.price}</p>   
        </div>
       `

        
    })
    return showOrders
}


function getOrders(){
    let renderOrders =" "
    menuArray.forEach(function(menu){

        renderOrders+=  `
                            <div id="containers">
                            <p class="emoji" id="emoji"> ${menu.emoji} </p> 
                            <div class="order-text">
                                <h2 class="meal-name" id="meal-name">${menu.name}</h2>
                                <p class="ingredients grey" id="ingredients">${menu.ingredients}</p>
                                <p class="price" id="price">$${menu.price}</p>
                            </div>
                            <p class="add" data-button="${menu.id}">+</p>
                            </div>
                            <hr> `
                            
    })
    return renderOrders 

}


function successfulOrder(){
    
    let renderMessage =""
     
    renderMessage+=`<p> Thanks for Ordering! Your order is on its Way</p>`
    

    return renderMessage
}



function render(){
    orders.innerHTML= getOrders()
    checkoutArrangement.innerHTML= showOrder()
    successfulMessage.innerHTML=successfulOrder()
}

render()



