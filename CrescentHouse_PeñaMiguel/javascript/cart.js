function deleteItem(id) {
    let cartInStorage = localStorage.getItem('cartItems');
    let cartDetailsInStorage = localStorage.getItem('cartDetailsItems');
    cartInStorage = JSON.parse(cartInStorage);
    cartDetailsInStorage = JSON.parse(cartDetailsInStorage);
    let index = cartInStorage.indexOf(id);
    let index2 = cartDetailsInStorage.indexOf(id);
    if (index > -1) {
        cartInStorage.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartInStorage));
    }
    for (i = 0; i < cartDetailsInStorage.length; i++) {
        if (index2 > -1) {
            cartDetailsInStorage.splice(index2, 1);
            localStorage.setItem('cartDetailsItems', JSON.stringify(cartDetailsInStorage));
        }
    }
    document.location.reload()
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

function emptyCart() {
    let cartInStorage = localStorage.getItem('cartItems');
    let cartDetailsInStorage = localStorage.getItem('cartDetailsItems');
    cartInStorage = JSON.parse(cartInStorage)
    cartDetailsInStorage = JSON.parse(cartDetailsInStorage)
    cartInStorage.splice(0,cartInStorage.length)
    cartDetailsInStorage.splice(0,cartDetailsInStorage.length)
    localStorage.setItem('cartItems', JSON.stringify(cartInStorage));
    localStorage.setItem('cartDetailsItems', JSON.stringify(cartDetailsInStorage))
    deleteQuantities()
    document.location.reload()
}

let itemPrices = [];
window.subtotal = 0;
window.totalWeight = 0;

function keepProductQty() {
    let cartArray = localStorage.getItem('cartItems')
    cartArray = JSON.parse(cartArray)
    if (cartArray != null) {
        for (var a = 0; a < cartArray.length; a++) {
            element = 'cartItemQtyFor'+cartArray[a]
            let selectBox = document.getElementById(element)
            let qty = localStorage.getItem('cartItemQtyFor'+cartArray[a])
            if (qty) {
                parseInt(qty)
                selectBox.value = qty
            }
        }
    }
}

function getCartItems() {
    let cartArray = localStorage.getItem("cartItems");
    cartArray = JSON.parse(cartArray);
    let cartDetailsArray = localStorage.getItem('cartDetailsItems')
    cartDetailsArray = JSON.parse(cartDetailsArray);

    if (cartArray.length == 0) {
        document.getElementById('cartBox').style.display = "none"
        document.getElementById("subtotalBox").style.display = "none"
    } else{
        document.getElementById('noProductsMsg').style.display = "none"
        document.getElementById('cartBox').style.display = "flex"
        document.getElementById("subtotalBox").style.display = "block"
    fetch('products.json')
        .then((res) => res.json())
        .then((data) => {
            let productInfo = '';
            for (var i = 0; i < data.products.length; i++) {
                let inCart = cartArray.includes(data.products[i].id)
                
                if (inCart == true) {
                    productInfo += `
                    <div class="cartItem">
                        <img class="cartItemImg" src=${data.products[i].image_url}>
                        <div class="cartItemInfo">
                            <div class="cartItemName">${data.products[i].name}</div>
                            <div class="cartItemPrice">$${data.products[i].price}</div>
                            <div class="cartItemSize">${data.products[i].size}</div>
                        </div>
                        <img class="cartItemTrash" src="../images/garbage.png" role="button" onclick="deleteItem(${data.products[i].id})">
                        <label for="cartItemQty${data.products[i].id}" class="cartItemQtyLabel">Quantity:</label>
                        <select name="quantity" id="cartItemQtyFor${data.products[i].id}" class="cartItemQtySelect" onchange="updateItemQty(${data.products[i].id})">
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </div>
                    `
                }
                for (var a = 0; a < cartDetailsArray.length; a++) {
                    if (cartDetailsArray[a] == data.products[i].id) {
                        let price = parseFloat(data.products[i].price)
                        itemPrices.push(price)
                        subtotal += price;
                    }
                }
            }
            localStorage.setItem('subtotal', subtotal);
            localStorage.setItem('product count', itemPrices.length);

            let div = document.createElement('div');
            div.id = 'emptyCartBtn';
            div.innerHTML = 'Empty Cart'
            document.getElementById('subtotalItemsQty').innerHTML = itemPrices.length + ' item(s)'
            document.getElementById('subtotal').innerHTML = '$'+ subtotal.toFixed(2)
            document.getElementById('cartBox').innerHTML = productInfo;
            document.getElementById('cartBox').appendChild(div)
            div.onclick = function() {
                emptyCart()
            }
        })
    }
    
}

function updateItemQty(id) {
    let selectElement = 'cartItemQtyFor'+id
    String(selectElement)
    let selectedQty = document.getElementById(selectElement).value;
    localStorage.setItem(selectElement, selectedQty);
    let cartDetailsInStorage = localStorage.getItem('cartDetailsItems');
    cartDetailsInStorage = JSON.parse(cartDetailsInStorage);

    //remove from array and add them again
    for (i = 0; i < cartDetailsInStorage.length; i++) {
        if (cartDetailsInStorage[i] == id) {
        cartDetailsInStorage.splice(cartDetailsInStorage.indexOf(id), 1);
        i--
        }
    }
    while (selectedQty > 0) {
        cartDetailsInStorage.push(id);
        selectedQty--
    }

    fetch('products.json')
    .then((res) => res.json())
    .then((data) => {
        let updatedSubtotal = 0
        for (var i = 0; i < data.products.length; i++) {
            for (var a = 0; a < cartDetailsInStorage.length; a++) {
                if (cartDetailsInStorage[a] == data.products[i].id) {
                    let price = parseFloat(data.products[i].price)
                    updatedSubtotal += price;
                }
            }
        }
        localStorage.setItem('subtotal', updatedSubtotal) // NEW CODE
        document.getElementById('subtotal').innerHTML = '$'+ updatedSubtotal.toFixed(2)
    })

    localStorage.setItem('cartDetailsItems', JSON.stringify(cartDetailsInStorage));
    localStorage.setItem('product count', cartDetailsInStorage.length);

    let itemsQty = localStorage.getItem('product count');
    document.getElementById('subtotalItemsQty').innerHTML = itemsQty + ' item(s)'
}



getCartItems()
setTimeout(keepProductQty, 100); // function needs to wait until cart products are fully loaded
