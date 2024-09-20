class Product {
    constructor(id, name, price, img_url) {
        if (this.constructor === Product) { //
            throw new Error("Cannot initialize the Abstract Class");
        }
        this.id = id;
        this.name = name;
        this.price = price;
        this.img_url = img_url;
    }

    displayProduct() { //
        throw new Error("Abstract method must be implemented");
    }
}

class PhysicalProduct extends Product {
    constructor(id, name, price, weight, img_url) {
        super(id, name, price, img_url);
        this.weight = weight;
    }

    displayProduct() {
        return `
        <div class="product-card w-3">
            <div class="product-img">
                <img src="${this.img_url}" alt="product image">
            </div>
            <div class="product-description">
                <h2>${this.name}</h2>
                <p>Weight: ${this.weight} Kg</p>
                <div class="product-footer row">
                    <span class="price">$ ${this.price}</span>
                    <button class="add-btn row" onclick="shop.addToCart(${this.id})">
                        <span>Add to Cart</span>
                        <iconify-icon icon="mdi:cart-outline" width="24" height="24"></iconify-icon>
                    </button>
                </div>
            </div>
        </div>`;
    }
}

class DigitalProduct extends Product {
    constructor(id, name, price, fileSize, img_url) {
        super(id, name, price, img_url);
        this.fileSize = fileSize;
    }

    displayProduct() {
        return `
        <div class="product-card w-3">
            <div class="product-img">
                <img src="${this.img_url}" alt="product image">
            </div>
            <div class="product-description">
                <h2>${this.name}</h2>
                <p>File Size: ${this.fileSize} MB</p>
                <div class="product-footer row">
                    <span class="price">${this.price}</span>
                    <button class="add-btn row" onclick="shop.addToCart(${this.id})">
                        <span>Add to Cart</span>
                        <iconify-icon icon="mdi:cart-outline" width="24" height="24"></iconify-icon>
                    </button>
                </div>
            </div>
        </div>`;
    }
}

class CartItem {
    constructor(product, quantity = 1) {
        this.product = product;
        this.quantity = quantity;
    }

    incrementQuantity() {
        this.quantity++;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }

    displayCartItem() {
        return `
        <tr>
            <td>${this.product.name}</td>
            <td><img src="${this.product.img_url}" alt="product image" height="25%" width="25%"></td>
            <td>${this.product.price}</td>
            <td>${this.quantity}</td>
            <td>${this.getTotalPrice()}</td>
        </tr>`;
    }
}

class Cart {
    constructor() {
        this.items = [];
    }

    addProduct(product) {
        const existingItem = this.items.find(item => item.product.id === product.id); //
        if (existingItem) {
            existingItem.incrementQuantity();
        } else {
            this.items.push(new CartItem(product));
        }
        this.displayCart();
    }

    displayCart() {
        const cartItems = document.querySelector("tbody");
        cartItems.innerHTML = "";
        this.items.forEach(item => { //
            cartItems.innerHTML += item.displayCartItem();
        });
    }

    checkout() {
        if (this.items.length === 0) {
            alert("Your cart is empty.");
        } else {
            alert(`Checkout ${this.items.length} items. Total Price: $${this.getTotal()}`);
            this.items = [];
            this.displayCart();
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0); //
    }
}

class Shop {
    constructor(products) {
        this.products = products;
        this.cart = new Cart();
    }

    displayProducts() {
        const productList = document.getElementById("products");
        productList.innerHTML = "";
        this.products.forEach(product => { //
            productList.innerHTML += product.displayProduct();
        });
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId); //
        this.cart.addProduct(product);
    }

    checkout() {
        this.cart.checkout();
    }

    init() {
        this.displayProducts();
        document.getElementById("checkout-btn").addEventListener("click", () => this.checkout());
    }
}

// Sample product data
const products = [
    new PhysicalProduct(1, "Display", 1000, 2.4, "https://www.apple.com/v/imac/p/images/overview/routers/compare_imac__f7hnie54ekii_large.png"),
    new PhysicalProduct(2, "Headphone", 500, 0.5, "https://www.apple.com/v/airpods-max/g/images/overview/contrast/airpods_max_midnight__ddy8oa1y3y4i_large.png"),
    new PhysicalProduct(3, "Watch", 700, 0.2, "https://www.apple.com/v/apple-watch-series-10/a/images/overview/contrast/product_s10__d7ch2jhtbhme_xlarge.png")
];

const shop = new Shop(products);
shop.init();
