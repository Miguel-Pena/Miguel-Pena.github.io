if (localStorage.getItem('cartItems') != null) {
    
    cartDetailsArray = JSON.parse(localStorage.getItem('cartDetailsItems'));
    let counter = document.getElementById('cartCounter');
    counter.innerHTML = cartDetailsArray.length
}