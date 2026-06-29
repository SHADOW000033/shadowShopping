// Sample Products (Expanded to 20)
        const product = [
            { id: 1, name: 'Premium T-Shirt', price: 19.99, img: 'premiumshirt.avif', rating: '★★★★★' },
            { id: 2, name: ' Headphones', price: 59.99, img: 'wireless headphnes.avif', rating: '★★★★☆' },
            { id: 3, name: 'Smart Watch', price: 99.99, img: 'smate wath.avif', rating: '★★★★★' },


{ id: 4, name: 'Leather Backpack', price: 79.99, img: 'leatheerr.avif', rating: '★★★★☆' },
            { id: 5, name: 'Coffee Maker', price: 49.99, img: 'coffeee maker.avif', rating: '★★★★★' },
            { id: 6, name: 'Fitness Tracker', price: 39.99, img: 'Fitness tracker.avif', rating: '★★★★☆' },
            { id: 7, name: 'Bluetooth Speaker', price: 29.99, img: 'Speakeer2.avif', rating: '★★★★★' },
            { id: 8, name: 'Gaming Mouse', price: 24.99, img: 'photo-1629121291243-7b5e885cce9b.jpeg', rating: '★★★★☆' },
            { id: 9, name: 'Sunglasses', price: 14.99, img: 'sunglasses.avif', rating: '★★★★★' },
            { id: 10, name: 'Running Shoes', price: 69.99, img: 'runing shoes.avif', rating: '★★★★☆' },
            { id: 11, name: 'Laptop Stand', price: 34.99, img: 'lappystand.avif', rating: '★★★★★' },
            { id: 12, name: 'Wireless Charger', price: 19.99, img: 'wireless charger.avif', rating: '★★★★☆' },
            { id: 13, name: 'Noise-Cancelling Earbuds', price: 89.99, img: 'noise cana.avif', rating: '★★★★★' },
            { id: 14, name: 'Yoga Mat', price: 29.99, img: 'yoga mat.avif', rating: '★★★★☆' },
            { id: 15, name: 'Portable Blender', price: 39.99, img: 'blened.avif', rating: '★★★★★' },
            { id: 16, name: 'Travel Mug', price: 14.99, img: 'travel mug.webp', rating: '★★★★☆' },
            { id: 17, name: 'Desk Lamp', price: 24.99, img: 'desk lamp.avif', rating: '★★★★★' },
            { id: 18, name: 'Water Bottle', price: 9.99, img: 'water bottle.avif', rating: '★★★★☆' },
            { id: 19, name: 'Notebook Set', price: 12.99, img: 'notebook.avif', rating: '★★★★★' },
            { id: 20, name: 'Phone Case', price: 15.99, img: 'pjoe case.avif', rating: '★★★★☆' },
        ];

        // Cart as Map-like array
        let cart = [];

        // Render Products
        function renderProducts(containerId, productList) {
            const container = document.getElementById(containerId);
            productList.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('product-card');
                card.innerHTML = 
                    `<img src="${product.img}" alt="${product.name}" class="product-img"> 
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <div class="product-rating">${product.rating}</div>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>`
                ;
                container.appendChild(card);
            });
        }

       
        function addToCart(id) {
            const product = products.find(p => p.id === id);
            if (product) {
                const existing = cart.find(item => item.id === id);
                if (existing) {
                    existing.quantity += 1;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }
                updateCart();
            }
        }

        // Change Quantity
        function changeQuantity(index, delta) {
            cart[index].quantity += delta;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            updateCart();
        }


// Update Cart Display
        function updateCart() {
            const cartCount = document.getElementById('cart-count');
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

            const cartItems = document.getElementById('cart-items');
            cartItems.innerHTML = '';
            let total = 0;
            cart.forEach((item, index) => {
                const subtotal = item.price * item.quantity;
                const div = document.createElement('div');
                div.classList.add('cart-item');
                div.innerHTML = 
                    `<img src="${item.img}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <span class="cart-item-name">${item.name}</span>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" data-index="${index}" data-delta="-1">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn" data-index="${index}" data-delta="1">+</button>
                        </div>
                        <span class="cart-item-subtotal">Subtotal: $${subtotal.toFixed(2)}</span>
                    </div>
                    <button class="remove-item" data-index="${index}">Remove</button>`
                ;
                cartItems.appendChild(div);
                total += subtotal;
            });
            document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
        }

        // Event Listeners
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const id = parseInt(e.target.dataset.id);
                addToCart(id);
            } else if (e.target.classList.contains('quantity-btn')) {
                const index = parseInt(e.target.dataset.index);
                const delta = parseInt(e.target.dataset.delta);
                changeQuantity(index, delta);
            } else if (e.target.classList.contains('remove-item')) {
                const index = parseInt(e.target.dataset.index);
                cart.splice(index, 1);
                updateCart();
            } else if (e.target.classList.contains('faq-question')) {
                const item = e.target.closest('.faq-item');
                item.classList.toggle('active');
            }
        });

        // Cart Modal
        const cartBtn = document.getElementById('cart-btn');
        const cartModal = document.getElementById('cart-modal');
        const closeModal = document.getElementById('close-modal');

        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cartModal.style.display = 'flex';
        });

        closeModal.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });

        // Hamburger Menu
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Init
        renderProducts('featured-products-grid', products.slice(0, 8)); // Featured: first 8
        renderProducts('all-products-grid', products); // All products
