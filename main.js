var cart = {};

window.onload = function () {   

    var request = new XMLHttpRequest ();
    request.open ('GET', 'goods.json');
    request.send (null);
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var goods = JSON.parse (this.responseText);                
                showGoods(goods);
            } else {
                console.log ('Some error has occurred. Please, try again');
            }
        }
    }

    loadCart();
       
}

function showGoods(goods) {
    var result = '';
    for (var key in goods) {
        result += `<div class="card">`;
        result += `<p class="name">${goods[key].name}</p>`;
        result += `<img src="${goods[key].img}" alt="${goods[key].name}">`;
        result += `<div class="cost">Price: $${goods[key].price}</div>`;
        result += `<button class="addToCart" data-id="${key}">Add to cart</button>`;
        result += `</div>`;
    }
    var card = document.querySelector('.goods');
    card.innerHTML = result;

    card.onclick = function(event){
        var target = event.target;
        if(target.tagName != 'BUTTON'){
            return;
        }
        getClick(target);        
    };

}

function getClick(target){    
    var button = target.parentNode.querySelector('.card button');
    addToCart(button);
}

function addToCart (button){    
    var id = button.getAttribute('data-id');

    if (cart[id] === undefined) {
        cart[id] = 1;
    } else {
        cart[id]++;
    }
    
    saveToCart();
}

function saveToCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart(){
    var savedCart= localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}