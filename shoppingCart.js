var cart = {};

window.onload = function () {  
    loadCart();
}

function loadCart(){    
    cart = JSON.parse(localStorage.getItem('cart'));       
    if (isEmpty(cart)) {
        return false;
    } else {      
        getGoods();
        return true;
    }
}

function getGoods() {
    var request = new XMLHttpRequest ();
    request.open ('GET', 'goods.json');
    request.send (null);
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var goods = JSON.parse (this.responseText);           
                showShoppingCart(goods);
                return goods;                
            } else {
                console.log ('Some error has happend');
                return false;
            }
        }
    }    
}

function showShoppingCart(goods){
    if (isEmpty(cart)){
        return false;
    } else {
        var result = '';
        for (var key in cart) {
            result += `<p>`;
            result += `<button data-id="${key}" style="color: red">x</button>`;
            result += `<img src="${goods[key].img}" alt="${goods[key].name}">`;
            result += `<span>${goods[key].name}</span>`;
            result += `<button name="minus" data-id="${key}" style="color: blue">-</button>`;
            result += `<span>${cart[key]}</span>`;
            result += `<button name="plus" data-id="${key}" style="color: blue">+</button>`;
            result += `</p>`;
        }
    }

    showResult(result, '.shoppingCart');
    showResult('<a href="main.html">Continue shopping</a>', 'header');

    addListener();// наблюдаем за кнопками
    
    return result;
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {            
            return false;
        }
    }
    showResult('The shopping cart is empty.<br><a href="main.html">Go shopping!</a>', '.shoppingCart');
    showResult('', 'header');
    return true;    
}

function addListener () {
    var shoppingBag = document.querySelector('.shoppingCart');
    shoppingBag.onclick = function(event){
        var target = event.target;
        if(target.tagName != 'BUTTON'){
            return;
        }
        getClick(target);               
    };
}

function getClick(button){    
    if (button.name == 'minus') {
        reduceItems(button);
    } else if (button.name == 'plus'){
        increaseItems(button);
    } else deleteItem(button);
}

function reduceItems(button) {
    var id = button.getAttribute('data-id');
    if (cart[id] === 1) {
        deleteItem(button);
    } else {
        cart[id]--;
        saveToCart();
        loadCart();
    }
    
}

function increaseItems(button) {
    var id = button.getAttribute('data-id');
    cart[id]++;        
    saveToCart();
    loadCart();   
}

function deleteItem(button) {
    var id = button.getAttribute('data-id');
    delete cart[id];    
    saveToCart();
    loadCart();    
}

function saveToCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showResult (result, querySelector) {
    var htmlNode = document.querySelector(querySelector);
    htmlNode.innerHTML = result;
}