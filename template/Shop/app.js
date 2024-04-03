document.addEventListener("DOMContentLoaded", function() {
    const iconCart = document.querySelector('.icon-cart');
    const cartTab = document.querySelector('.cartTab');
    const closeBtn = document.querySelector('.btn .close');
    const addToCartBtns = document.querySelectorAll('.addcart');
    const checkOutBtn = document.querySelector('.checkOut');
    let cartItems = [];
    let cartTotal = 0;

    cartTab.style.display = 'none';

    function toggleCart() {
        cartTab.style.display = (cartTab.style.display === 'none') ? 'block' : 'none';
    }

    iconCart.addEventListener('click', toggleCart);

    closeBtn.addEventListener('click', function(event) {
        event.preventDefault();
        toggleCart();
    });

    addToCartBtns.forEach(function(addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const item = this.parentNode;
            const itemName = item.querySelector('.item h2').textContent;
            const itemPrice = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
            const itemImage = item.querySelector('.item img').src;
    
            const existingItem = cartItems.find(cartItem => cartItem.name === itemName);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ name: itemName, price: itemPrice, quantity: 1, image: itemImage });
            }
    
            cartTotal += itemPrice;
    
            renderCart();
            
            cartTab.scrollIntoView({ behavior: 'smooth' });
        });
    });
    

    function renderCart() {
        const listCart = document.querySelector('.listCart');
        listCart.innerHTML = '';
    
        cartItems.forEach(function(cartItem, index) {
            if (cartItem.quantity > 0) {
                const newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.innerHTML = `
                    <img src="${cartItem.image}" alt="${cartItem.name}" class="item-image">
                    <div class="details">
                        <div class="name">${cartItem.name}</div>
                        <div class="price">$${(cartItem.price * cartItem.quantity).toFixed(2)}</div>
                        <div class="quantity">
                            <span class="minus">&nbsp;&nbsp;-</span>
                            <span>${cartItem.quantity}</span>
                            <span class="plus">&nbsp;+</span>
                        </div>
                    </div>
                `;
    
                const minusButton = newItem.querySelector('.minus');
                const plusButton = newItem.querySelector('.plus');
    
                minusButton.addEventListener('click', function() {
                    if (cartItem.quantity > 1) {
                        cartItem.quantity--;
                        renderCart();
                    } else {
                        cartItems.splice(index, 1);
                        renderCart();
                    }
                });
    
                plusButton.addEventListener('click', function() {
                    cartItem.quantity++;
                    renderCart();
                });
    
                listCart.appendChild(newItem);
            } else {
                cartItems.splice(index, 1);
                renderCart();
            }
        });
    }

    checkOutBtn.addEventListener('click', function() {
        if (cartItems.length === 0) {
            alert("Your cart is empty. Please add items before checkout.");
            return;
        }

        const checkoutPopup = document.getElementById('checkoutPopup');
        checkoutPopup.style.display = 'block';
        // Populate the items and total price in the checkout form
        const checkoutItemList = document.getElementById('checkoutItemList');
        checkoutItemList.innerHTML = '';
        cartItems.forEach(function(cartItem) {
            const li = document.createElement('li');
            li.textContent = `${cartItem.name} - Quantity: ${cartItem.quantity}`;
            checkoutItemList.appendChild(li);
        });
        const checkoutTotalPrice = document.getElementById('checkoutTotalPrice');
        checkoutTotalPrice.textContent = cartTotal.toFixed(2);
    });

    // Form submission handling remains the same
});
