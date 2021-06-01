let newItems = [6, 16, 24, 29]
let bestItems = [2, 3, 10, 17, 28]
let editorItems = [1, 7, 15, 20, 25]
let saleItems = [5, 8, 10, 18, 21,]

function showJsonProducts(category) {
    fetch('products.json')
        .then((res) => res.json())
        .then((data) => {
            let output2;
            let productInfo;
            let productsArea = '';
            for (var i = 0; i < data.products.length; i++) {
                let inSale = saleItems.includes(data.products[i].id)
                if (data.products[i].category == category) {
                    if (inSale == true) {
                        output2 = `<div class="productPrice"><span class="origPrice">$${data.products[i].origPrice}</span><span class="salePrice">$${data.products[i].price}</span></div>
                        <button class="addProductBtn" onclick="addToCart(${data.products[i].id})">Add to Cart</button>
                        </div>
                        `;
                    }
                    else {
                        output2 = `<div class="productPrice">$${data.products[i].price}</div>
                        <button class="addProductBtn" onclick="addToCart(${data.products[i].id})">Add to Cart</button>
                        </div>
                        `;
                    }
                    productInfo = `
                    <div class="productInfo">
                    <img class="productImg" src=${data.products[i].image_url}>
                    <div class="productName">${data.products[i].name}</div>
                    ` + output2;
                    productsArea += productInfo;
                }
            }
            document.getElementById('productsArea').innerHTML = productsArea;
        })
}

function showSpecialProducts(page) {
    fetch('products.json')
        .then((res) => res.json())
        .then((data) => {
            let output2;
            let productInfo;
            let productsArea = '';
            for (var i = 0; i < data.products.length; i++) {
                let inSale = saleItems.includes(data.products[i].id)
                let inNew = newItems.includes(data.products[i].id)
                let inBest = bestItems.includes(data.products[i].id)
                let inEditor = editorItems.includes(data.products[i].id)
                if (page == "sale" && inSale == true) {
                    productsArea += `
                        <div class="productInfo">
                        <img class="productImg" src=${data.products[i].image_url}>
                        <div class="productName">${data.products[i].name}</div>
                        <div class="productPrice"><span class="origPrice">$${data.products[i].origPrice}</span><span class="salePrice">$${data.products[i].price}</span></div>
                        <button class="addProductBtn" onclick="addToCart(${data.products[i].id})">Add to Cart</button>
                        </div>
                        `;
                }
                if (page == "new" && inNew == true) {
                    productsArea += `
                        <div class="productInfo">
                        <img class="productImg" src=${data.products[i].image_url}>
                        <div class="productName">${data.products[i].name}</div>
                        <div class="productPrice">$${data.products[i].price}</div>
                        <button class="addProductBtn" onclick="addToCart(${data.products[i].id})">Add to Cart</button>
                        </div>
                        `;
                }
                if (page == "best" && inBest == true) {
                    if (inSale == true) {
                        output2 = `<div class="productPrice"><span class="origPrice">$${data.products[i].origPrice}</span><span class="salePrice">$${data.products[i].price}</span></div>
                            <button class="addProductBtn" onclick="addToCart(${data.products[i].id})">Add to Cart</button>
                            </div>
                            `;
                    }
                    else {
                        output2 = `<div class="productPrice">$${data.products[i].price}</div>
                            <button class="addProductBtn" onclick="addToCart(${data.products[i].id})">Add to Cart</button>
                            </div>
                            `;
                    }
                    productInfo = `
                        <div class="productInfo">
                        <img class="productImg" src=${data.products[i].image_url}>
                        <div class="productName">${data.products[i].name}</div>
                        ` + output2;
                    productsArea += productInfo;
                }
                if (page == "editor" && inEditor == true) {
                    productsArea += `
                        <div class="productInfo">
                        <img class="productImg" src=${data.products[i].image_url}>
                        <div class="productName">${data.products[i].name}</div>
                        <div class="productPrice">$${data.products[i].price}</div>
                        <button class="addProductBtn" onclick="addToCart(${data.products[i].id})">Add to Cart</button>
                        </div>
                        `;
                }
            }
            document.getElementById('productsArea').innerHTML = productsArea;
        })
}


if (localStorage.getItem('cartItems') == null) {
    window.cartArray = [];
    window.cartDetailsArray = [];
    localStorage.setItem('cartItems', JSON.stringify(window.cartArray));
    localStorage.setItem('cartDetailsItems', JSON.stringify(window.cartDetailsArray));

} else {
    cartArray = JSON.parse(localStorage.getItem('cartItems'));
    cartDetailsArray = JSON.parse(localStorage.getItem('cartDetailsItems'));

    let counter = document.getElementById('cartCounter');
    counter.innerHTML = cartDetailsArray.length
    //-----------^parse the item by getting---^--stored item
}

function addToCart(id) {
    let cartInStorage = localStorage.getItem('cartItems');
    let cartDetailsInStorage = localStorage.getItem('cartDetailsItems');
    cartInStorage = JSON.parse(cartInStorage)
    cartDetailsInStorage = JSON.parse(cartDetailsInStorage)
    let inCart = cartInStorage.includes(id)
    if (inCart == true) {
        alert('Product is already in cart. To update quantities, go to cart');
    } else {
        window.cartArray.push(id);
        window.cartDetailsArray.push(id);
        localStorage.setItem('cartItems', JSON.stringify(window.cartArray));
        localStorage.setItem('cartDetailsItems', JSON.stringify(window.cartDetailsArray));
        //------------^store the item by stringify--^

        let counter = document.getElementById('cartCounter');
        counter.innerHTML = cartDetailsArray.length
    }
}

const searchBar = document.getElementById('searchBar');
const query = document.getElementById('searchbarInput');
const google = 'https://www.google.com/search?q=site%3A+';
const url = 'pagedart.com';

function submitted(event) {
  event.preventDefault();
  const url = google + url + '+' + query.value;
  const win = window.open(url, '_blank');
  win.focus();
}

searchBar.addEventListener('submit', submitted);