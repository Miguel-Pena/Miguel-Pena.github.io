let itemPrices = [];
window.subtotal = 0;
window.totalWeight = 0;

function getCartSummary() {
    let cartArray = localStorage.getItem("cartDetailsItems");
    cartArray = JSON.parse(cartArray);
    fetch('products.json')
        .then((res) => res.json())
        .then((data) => {
            let productInfo = '';
            for (var i = 0; i < data.products.length; i++) {
                let inCart = cartArray.includes(data.products[i].id)
                if (inCart == true) {
                    let qtyInStorage = localStorage.getItem("cartItemQtyFor"+data.products[i].id)

                    quantity = '1'
                    if (qtyInStorage != null) {
                        quantity = qtyInStorage
                    }

                    productInfo += `
                    <div class="cartSummaryItem">
                        <img class="cartSummaryImg" src=${data.products[i].image_url}>
                        <div class="cartSummaryName">${data.products[i].name}</div>
                        <div class="cartSummaryPrice">$${data.products[i].price}</div>
                        <div class="cartSummarySize">${data.products[i].size}</div>
                        <div class="cartSummaryQty">Qty: ` + quantity + `</div>
                    </div>
                    `
                }
                for (var a = 0; a < cartArray.length; a++) {
                    if (cartArray[a] == data.products[i].id) {
                        let weight = parseFloat(data.products[i].weight)
                        window.totalWeight += weight;
                    }
                }
            }
            let updatedSubtotal = localStorage.getItem('subtotal')
            updatedSubtotal = parseFloat(updatedSubtotal)
            document.getElementById('cartItemsBox').innerHTML = productInfo;
            document.getElementById('cartSummarySubtotal').innerHTML = '$'+ updatedSubtotal.toFixed(2)

            let productsWeight = document.getElementById('productsWeight')
            let weightCost = document.getElementById('weightCost')
            if (productsWeight) {
                window.totalWeightCost = window.totalWeight*0.008;
                productsWeight.innerHTML = window.totalWeight.toFixed(2) + 'gr';
                weightCost.innerHTML = '$'+window.totalWeightCost.toFixed(2);
            }  
        })
    
}

getCartSummary();

let shippingEmail = document.getElementById("shippingEmail");
let shippingAddress = document.getElementById("shippingAddress");
if (shippingEmail && localStorage.getItem('email') != null) {
    shippingEmail.innerHTML = localStorage.getItem('email')
    if (localStorage.getItem('address2') != null) {
        shippingAddress.innerHTML = localStorage.getItem('address1') + ', ' + localStorage.getItem('address2')
    } else {
        shippingAddress.innerHTML = localStorage.getItem('address1')
    }
}

let shippingMethod = document.getElementById("savedShippingMethod")
if (shippingMethod && localStorage.getItem("shipping method") != null) {
    shippingMethod.innerHTML = localStorage.getItem('shipping method');
}

let inputEmail= document.getElementById("formEmail");
let inputFisrtName = document.getElementById("fname");
let inputLastName = document.getElementById("lname");
let inputAddress1 = document.getElementById("address");
let inputAddress2 = document.getElementById("address2");
let inputCity = document.getElementById("city");
let inputCountry = document.getElementById("country");
let inputState = document.getElementById("state");
let inputZipCode = document.getElementById("zip");
let inputPhone = document.getElementById("phone");

function saveFormData() {
    localStorage.setItem("email", inputEmail.value);
    localStorage.setItem("first name", inputFisrtName.value);
    localStorage.setItem("last name", inputLastName.value);
    localStorage.setItem("address1", inputAddress1.value);
    localStorage.setItem("address2", inputAddress2.value);
    localStorage.setItem("city", inputCity.value);
    localStorage.setItem("country", inputCountry.value);
    localStorage.setItem("state", inputState.value);
    localStorage.setItem("zip code", inputZipCode.value);
    localStorage.setItem("phone", inputPhone.value);
}

if(localStorage.getItem('email') != null){
    inputEmail.value = localStorage.getItem('email');
    inputFisrtName.value = localStorage.getItem('first name');
    inputLastName.value = localStorage.getItem('last name');
    inputAddress1.value = localStorage.getItem('address1');
    inputAddress2.value = localStorage.getItem('address2');
    inputCity.value = localStorage.getItem('city');
    inputCountry.value = localStorage.getItem('country');
    inputState.value = localStorage.getItem('state');
    inputZipCode.value = localStorage.getItem('zip code');
    inputPhone.value = localStorage.getItem('phone');
}

function keepSelection() {
    let selectedShippingMethod = localStorage.getItem('shipping method')
    if (selectedShippingMethod != null) {
        if (selectedShippingMethod == 'Standard Shipping') {
            document.getElementById("standard").checked = true;
        } else {
            document.getElementById("expedited").checked = true;
        }
        let shippingCost = localStorage.getItem('shippingCost')
        let totalCost = localStorage.getItem('totalCost')
        shippingCost = parseFloat(shippingCost)
        totalCost = parseFloat(totalCost)
        let elShippingCost = document.getElementById('shippingCost');
        let elTotalCost = document.getElementById('totalCost');
        elShippingCost.innerHTML = '$'+shippingCost.toFixed(2)
        elTotalCost.innerHTML = '$' + totalCost.toFixed(2);
    }
}

window.shippingCost = 0;

function standardShipping() {
    weightCost = window.totalWeightCost
    window.shippingCost = 4.99 + weightCost
    let shippingCostText = document.getElementById('shippingCost');
    shippingCostText.innerHTML = '$'+window.shippingCost.toFixed(2)

    let updatedSubtotal = localStorage.getItem('subtotal');
    updatedSubtotal = parseFloat(updatedSubtotal)
    window.totalCost = updatedSubtotal + window.shippingCost
    let totalCostText = document.getElementById('totalCost');
    totalCostText.innerHTML = '$' + window.totalCost.toFixed(2);

    localStorage.setItem("shippingCost", window.shippingCost)
    localStorage.setItem("totalCost", window.totalCost);

    localStorage.setItem("shipping method", "Standard Shipping");
}

function expeditedShipping() {
    weightCost = window.totalWeightCost
    window.shippingCost = 9.99 + weightCost
    let shippingCostText = document.getElementById('shippingCost');
    shippingCostText.innerHTML = '$'+window.shippingCost.toFixed(2)

    let updatedSubtotal = localStorage.getItem('subtotal')
    updatedSubtotal = parseFloat(updatedSubtotal)
    window.totalCost = updatedSubtotal + window.shippingCost
    let totalCostText = document.getElementById('totalCost');
    totalCostText.innerHTML = '$' + window.totalCost.toFixed(2);

    localStorage.setItem("shippingCost", window.shippingCost)
    localStorage.setItem("totalCost", window.totalCost)

    localStorage.setItem("shipping method", "Expedited Shipping");
}

function updateCartSummary() {
    let elFinalSubtotal = document.getElementById('finalShipping')
    let elFinalTotal = document.getElementById('finalTotal')

    let finalSubtotal = parseFloat(localStorage.getItem("shippingCost"))
    let finalTotal = parseFloat(localStorage.getItem("totalCost"))
    elFinalSubtotal.innerHTML = '$'+finalSubtotal.toFixed(2)
    elFinalTotal.innerHTML = '$'+finalTotal.toFixed(2)
}

function orderCompleted() {
    let area = document.getElementById('paymentArea')
    document.getElementById("checkoutHeading").style.display = "none";
    area.style.display = "none"
    document.getElementById("thanksMsg").style.display = "block";
    emptyCart()
    localStorage.removeItem("address2");
    localStorage.removeItem("address1");
    localStorage.removeItem("totalCost");
    localStorage.removeItem("email");
    localStorage.removeItem("last name");
    localStorage.removeItem("first name");
    localStorage.removeItem("country");
    localStorage.removeItem("city");
    //localStorage.removeItem("names");
    localStorage.removeItem("zip code");
    localStorage.removeItem("shipping method");
    localStorage.removeItem("shippingCost");
    localStorage.removeItem("product count");
    localStorage.removeItem("state");
    localStorage.removeItem("phone");
    localStorage.removeItem("subtotal");
    deleteQuantities()
}

function emptyCart() {
    let cartInStorage = localStorage.getItem('cartItems');
    let cartDetailsInStorage = localStorage.getItem('cartDetailsItems');
    cartInStorage = JSON.parse(cartInStorage)
    cartDetailsInStorage = JSON.parse(cartDetailsInStorage)
    cartInStorage.splice(0,cartInStorage.length)
    cartDetailsInStorage.splice(0,cartDetailsInStorage.length)
    localStorage.setItem('cartItems', JSON.stringify(cartInStorage));
    localStorage.setItem('cartDetailsItems', JSON.stringify(cartDetailsInStorage))
}

function deleteQuantities() {
    let limit = 1
    while (limit <= 30) {
        item = localStorage.getItem('cartItemQtyFor'+limit)
        if (item) {
            localStorage.removeItem('cartItemQtyFor'+limit)
        }
        limit += 1
    }
}
