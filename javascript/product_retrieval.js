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
                    let cartInStorage = localStorage.getItem('cartItems');
                    cartInStorage = JSON.parse(cartInStorage)
                    let inCart = cartInStorage.includes(data.products[i].id)
                    if (inSale == true) {
                        if (inCart == true) {
                            output2 = `<div class="productPrice"><span class="origPrice">$${data.products[i].origPrice}</span><span class="salePrice">$${data.products[i].price}</span></div>
                            <button id="addProductBtn${data.products[i].id}" class="addProductBtn" onclick="addToCart(${data.products[i].id})">Item Added</button>
                            </div>
                            `;
                        } else {
                            output2 = `<div class="productPrice"><span class="origPrice">$${data.products[i].origPrice}</span><span class="salePrice">$${data.products[i].price}</span></div>
                            <button id="addProductBtn${data.products[i].id}" class="addProductBtn" onclick="addToCart(${data.products[i].id})">Add to Cart</button>
                            </div>
                            `;}
                    }
                    else {
                        if (inCart == true) {
                            output2 = `<div class="productPrice">$${data.products[i].price}</div>
                            <button id="addProductBtn${data.products[i].id}" class="addProductBtn" onclick="addToCart(${data.products[i].id})">Item Added</button>
                            </div>
                            `;
                        } else {
                            output2 = `<div class="productPrice">$${data.products[i].price}</div>
                            <button id="addProductBtn${data.products[i].id}" class="addProductBtn" onclick="addToCart(${data.products[i].id})">Add to Cart</button>
                            </div>
                            `;}
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

                let cartInStorage = localStorage.getItem('cartItems');
                cartInStorage = JSON.parse(cartInStorage)
                let inCart = cartInStorage.includes(data.products[i].id)

                if (page == "sale" && inSale == true) {
                    if (inCart == true) {
                        productsArea += `
                            <div class="productInfo">
                            <img class="productImg" src=${data.products[i].image_url}>
                            <div class="productName">${data.products[i].name}</div>
                            <div class="productPrice"><span class="origPrice">$${data.products[i].origPrice}</span><span class="salePrice">$${data.products[i].price}</span></div>
                            <button id="addProductBtn${data.products[i].id}" class="addProductBtn" onclick="addToCart(${data.products[i].id})">Item Added</button>
                            </div>
                            `;
                    } else {
                        productsArea += `
                        <div class="productInfo">
                        <img class="productImg" src=${data.products[i].image_url}>
                        <div class="productName">${data.products[i].name}</div>
                        <div class="productPrice"><span class="origPrice">$${data.products[i].origPrice}</span><span class="salePrice">$${data.products[i].price}</span></div>
                        <button id="addProductBtn${data.products[i].id}" class="addProductBtn" onclick="addToCart(${data.products[i].id})">Add to Cart</button>
                        </div>
                        `;}
                }
                if (page == "new" && inNew == true) {
                    if (inCart == true) {
                        productsArea += `
                            <div class="productInfo">
                            <img class="productImg" src=${data.products[i].image_url}>
                            <div class="productName">${data.products[i].name}</div>
                            <div class="productPrice">$${data.products[i].price}</div>
                            <button id="addProductBtn${data.products[i].id}" class="addProductBtn" onclick="addToCart(${data.products[i].id})">Item Added</button>
                            </div>
                            `;
                    } else {
                        productsArea += `
                            <div class="productInfo">
                            <img class="productImg" src=${data.products[i].image_url}>
                            <div class="productName">${data.products[i].name}</div>
                            <div class="productPrice">$${data.products[i].price}</div>
                            <button id="addProductBtn${data.products[i].id}" class="addProductBtn" onclick="addToCart(${data.products[i].id})">Add to Cart</button>
                            </div>
                            `;}
                }
                if (page == "best" && inBest == true) {
                    if (inSale == true) {
                        if (inCart == true) {
                            output2 = `<div class="productPrice"><span class="origPrice">$${data.products[i].origPrice}</span><span class="salePrice">$${data.products[i].price}</span></div>
                                <button id="addProductBtn${data.products[i].id}" class="addProductBtn" onclick="addToCart(${data.products[i].id})">Item Added</button>
                                </div>
                                `;
                        } else {
                            output2 = `<div class="productPrice"><span class="origPrice">$${data.products[i].origPrice}</span><span class="salePrice">$${data.products[i].price}</span></div>
                            <button id="addProductBtn${data.products[i].id}" class="addProductBtn" onclick="addToCart(${data.products[i].id})">Add to Cart</button>
                            </div>
                            `;
                        }
                    }
                    else {
                        if (inCart == true) {
                            output2 = `<div class="productPrice">$${data.products[i].price}</div>
                                <button id="addProductBtn${data.products[i].id}" class="addProductBtn" onclick="addToCart(${data.products[i].id})">Item Added</button>
                                </div>
                                `;
                        } else {
                            output2 = `<div class="productPrice">$${data.products[i].price}</div>
                            <button id="addProductBtn${data.products[i].id}" class="addProductBtn" onclick="addToCart(${data.products[i].id})">Add to Cart</button>
                            </div>
                            `;
                        }
                    }
                    productInfo = `
                        <div class="productInfo">
                        <img class="productImg" src=${data.products[i].image_url}>
                        <div class="productName">${data.products[i].name}</div>
                        ` + output2;
                    productsArea += productInfo;
                }
                if (page == "editor" && inEditor == true) {
                    if (inCart == true) {
                        productsArea += `
                            <div class="productInfo">
                            <img class="productImg" src=${data.products[i].image_url}>
                            <div class="productName">${data.products[i].name}</div>
                            <div class="productPrice">$${data.products[i].price}</div>
                            <button id="addProductBtn${data.products[i].id}" class="addProductBtn" onclick="addToCart(${data.products[i].id})">Item Added</button>
                            </div>
                            `;
                    } else {
                        productsArea += `
                        <div class="productInfo">
                        <img class="productImg" src=${data.products[i].image_url}>
                        <div class="productName">${data.products[i].name}</div>
                        <div class="productPrice">$${data.products[i].price}</div>
                        <button id="addProductBtn${data.products[i].id}" class="addProductBtn" onclick="addToCart(${data.products[i].id})">Add to Cart</button>
                        </div>
                        `;
                    }
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
    document.getElementById("addProductBtn" + id).textContent="Item added";

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

/*
const searchBar = document.getElementById('searchbar');
const query = document.getElementById('searchbarInput');
const google = 'https://www.google.com/search?q=site%3A+';
const website = 'miguel-pena.github.io/';

function submitted(event) {
  event.preventDefault();
  const url = google + website + '+' + query.value;
  const win = window.open(url, '_blank');
  win.focus();
}

searchBar.addEventListener('submit', submitted);
*/


//================================================ S O R T  P R O D U C T S ===========================================

function sortProducts(category) {
    let sortValue = document.getElementById('sort').value

    fetch('products.json')
        .then((res) => res.json())
        .then((data) => {
            let output2;
            let productInfo;
            let productsArea = '';
            let productsArray = []

            for (var i = 0; i < data.products.length; i++) {      // For every JSON object...
                if (data.products[i].category == category) {      // Take the specified category only
                    productsArray.push(data.products[i])
                }
            }

            if (sortValue == 'New') {
                // ============= SORT PRODUCTS BY DATE (DESC) ===========
                let sortByDate = productsArray => {
                    let sorter = (a, b) => {
                        return new Date(b.date_added).getTime() - new Date(a.date_added).getTime();
                    }
                    productsArray.sort(sorter);
                };
                sortByDate(productsArray);
            }

            if (sortValue == 'LH') {
                // ============= SORT PRODUCTS BY PRICE (ASC) ===========
                let sortByPrice = productsArray => {
                    let sorter = (a, b) => {
                        return new Object(a.price) - new Object(b.price);
                    }
                    productsArray.sort(sorter);
                };
                sortByPrice(productsArray);
            }

            if (sortValue == 'HL') {
                // ============= SORT PRODUCTS BY PRICE (ASC) ===========
                let sortByPrice = productsArray => {
                    let sorter = (a, b) => {
                        return new Object(b.price) - new Object(a.price);
                    }
                    productsArray.sort(sorter);
                };
                sortByPrice(productsArray);
            }

            // SHOW PRODUCTS
            for (var i = 0; i < productsArray.length; i++) {
                let inSale = saleItems.includes(productsArray[i].id)
                if (inSale == true) {               // Display price differently if they are on sale
                    output2 = `<div class="productPrice"><span class="origPrice">$${productsArray[i].origPrice}</span><span class="salePrice">$${productsArray[i].price}</span></div>
                        <button id="addProductBtn${data.products[i].id}" class="addProductBtn" onclick="addToCart(${productsArray[i].id})">Add to Cart</button>
                        </div>
                        `;
                }
                else {
                    output2 = `<div class="productPrice">$${productsArray[i].price}</div>
                        <button id="addProductBtn${data.products[i].id}" class="addProductBtn" onclick="addToCart(${productsArray[i].id})">Add to Cart</button>
                        </div>
                        `;
                }
                productInfo = `
                    <div class="productInfo">
                    <img class="productImg" src=${productsArray[i].image_url}>
                    <div class="productName">${productsArray[i].name}</div>
                    ` + output2;
                productsArea += productInfo;
            }

            document.getElementById('productsArea').innerHTML = productsArea;
        })
}


function sortSpecialProducts(page) {
    let sortValue = document.getElementById('sort').value

    fetch('products.json')
        .then((res) => res.json())
        .then((data) => {
            let output3;
            let productInfo;
            let productsArea = '';
            let productsArray = []

            for (var i = 0; i < data.products.length; i++) {      // For every JSON object...
                let inSale = saleItems.includes(data.products[i].id)
                let inNew = newItems.includes(data.products[i].id)
                let inBest = bestItems.includes(data.products[i].id)
                let inEditor = editorItems.includes(data.products[i].id)

                if (page == "sale" && inSale == true) {      // Take the specified category only
                    productsArray.push(data.products[i])
                }

                if (page == "new" && inNew == true) {      // Take the specified category only
                    productsArray.push(data.products[i])
                }

                if (page == "best" && inBest == true) {      // Take the specified category only
                    productsArray.push(data.products[i])
                }

                if (page == "editor" && inEditor == true) {  // Take the specified category only
                    productsArray.push(data.products[i])
                }
            }

            if (sortValue == 'New') {
                // ============= SORT PRODUCTS BY DATE (DESC) ===========
                let sortByDate = productsArray => {
                    let sorter = (a, b) => {
                        return new Date(b.date_added).getTime() - new Date(a.date_added).getTime();
                    }
                    productsArray.sort(sorter);
                };
                sortByDate(productsArray);
            }

            if (sortValue == 'LH') {
                // ============= SORT PRODUCTS BY PRICE (ASC) ===========
                let sortByPrice = productsArray => {
                    let sorter = (a, b) => {
                        return new Object(a.price) - new Object(b.price);
                    }
                    productsArray.sort(sorter);
                };
                sortByPrice(productsArray);
            }

            if (sortValue == 'HL') {
                // ============= SORT PRODUCTS BY PRICE (ASC) ===========
                let sortByPrice = productsArray => {
                    let sorter = (a, b) => {
                        return new Object(b.price) - new Object(a.price);
                    }
                    productsArray.sort(sorter);
                };
                sortByPrice(productsArray);
            }

            // SHOW PRODUCTS
            for (var i = 0; i < productsArray.length; i++) {
                let inSale = saleItems.includes(productsArray[i].id)
                productInfo = `
                        <div class="productInfo">
                        <img class="productImg" src=${productsArray[i].image_url}>
                        <div class="productName">${productsArray[i].name}</div>
                        `;

                if (inSale == true) {
                    outputPrice = `
                        <div class="productPrice"><span class="origPrice">$${productsArray[i].origPrice}</span><span class="salePrice">$${productsArray[i].price}</span></div>
                        `;
                } else {
                    outputPrice = `
                    <div class="productPrice">$${productsArray[i].price}</div>
                        `;
                }

                output3 = ` 
                    <button id="addProductBtn${data.products[i].id}" class="addProductBtn" onclick="addToCart(${productsArray[i].id})">Add to Cart</button>
                    </div>
                    `;
                
                productsArea += productInfo + outputPrice + output3 

            }
            document.getElementById('productsArea').innerHTML = productsArea;
        })
}