class Product {
    constructor(id, name, price, img_url) {
        if (this.constructor === Product) { //
            throw new Error("Cannot initialize the Abstract Class")
        }
        this.id = id
        this.name = name
        this.price = price
        this.img_url = img_url
    }

    displayProduct() { //
        throw new Error("Abstract method must be implemented");
    }
}

class PhysicalProduct extends Product {
    constructor(id, name, price, weight, img_url) {
        super(id, name, price, img_url)
        this.weight = weight
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
                    <span class="price">${this.price}</span>
                    <button class="add-btn row" onclick="shop.addtocart(${this.id})">
                        <span>Add to Cart</span>
                        <iconify-icon icon="mdi:cart-outline" width="24" height="24"></iconify-icon>
                    </button>
                </div>
            </div>
        </div>
        `
    }
}


class DigitalProduct extends Product {
    constructor(id, name, price, fileSize, img_url) {
        super(id, name, price, img_url)
        this.fileSize = fileSize
    }
    displayProduct() {
        return `
        <div class="product-card w-3">
            <div class="product-img">
                <img src="${this.img_url}" alt="product image">
            </div>
            <div class="product-description">
                <h2>${this.name}</h2>
                <p>File Size: ${this.fileSize} Kg</p>
                <div class="product-footer row">
                    <span class="price">${this.price}</span>
                    <button class="add-btn row" onclick="shop.addToCart(${this.id})">
                        <span>Add to Cart</span>
                        <iconify-icon icon="mdi:cart-outline" width="24" height="24"></iconify-icon>
                    </button>
                </div>
            </div>
        </div>
        `
    }
}


class CartItem {
    constructor(product, quantity = 1) {
        this.product = product
        this.quantity = quantity
    }

    incrementQuality() {
        this.quantity++
    }

    getTotalPrice() {
        return this.product.price * this.quantity
    }

    displayCartItem() {
        return `
        <tr>
            <td>${this.product.name}</td>
            <td><img src="${this.product.img_url}" alt="product image"></td>
            <td>${this.quantity}</td>
            <td>${this.product.price}</td>
            <td>${this.getTotalPrice()}</td>
        </tr>
        `
    }
}


class Cart {
    constructor() {
        this.items = []
    }

    addProduct(product) {
        const exisitingItem = this.items.find( //
            (item) => item.product.id = product.id
        )

        if (exisitingItem) {
            exisitingItem.incrementQuality()
        } else {
            this.items.push(new CartItem(product))
        }
        this.displayCart()
    }

    displayCart() {
        const cartItem = document.getElementsByTagName("tbody")
        cartItem.innerHTML = ""
        this.items.forEach((item) => {
            cartItem.innerHTML += item.displayCartItem()
        })
    }

    checkout() {
        if (this.items.length === 0) {
            alert("Your cart is empty.")
        } else {
            alert(`Checkout ${this.items.length}. Total Price: ${this.getTotal()}`)
            this.items = []
            this.displayCart()
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0) //
    }
}


class Shop {
    constructor(products) {
        this.products = products
        this.cart = new Cart()
    }

    displayProduct() {
        const productList = document.getElementById("products")
        productList.innerHTML = ""
        this.products.forEach((product) => {
            productList.innerHTML += product.displayProduct()
        });
    }

    addToCart(productID) {
        const product = this.products.find((p) => p.id === productID)
        this.cart.addProduct(product)
    }

    checkout() {
        this.cart.checkout()
    }

    init() {
        this.displayProduct()
        document.getElementById("checkout-btn").addEventListener("click", () => {
            this.checkout()
        })
    }
}


const products = [
    new PhysicalProduct(
        1,
        "Laptop",
        1500,
        2.4,
        "https://www.apple.com/v/macbook-air/s/images/overview/routers/compare_mbp_14_16__f7ovwhzitq6i_large.png"
    ),
    new PhysicalProduct(
        1,
        "Laptop",
        1500,
        2.4,
        "https://www.apple.com/v/macbook-air/s/images/overview/routers/compare_mbp_14_16__f7ovwhzitq6i_large.png"
    ),
    new PhysicalProduct(
        1,
        "Laptop",
        1500,
        2.4,
        "https://www.apple.com/v/macbook-air/s/images/overview/routers/compare_mbp_14_16__f7ovwhzitq6i_large.png"
    ),
    new PhysicalProduct(
        1,
        "Laptop",
        1500,
        2.4,
        "https://www.apple.com/v/macbook-air/s/images/overview/routers/compare_mbp_14_16__f7ovwhzitq6i_large.png"
    ),
    new PhysicalProduct(
        1,
        "Laptop",
        1500,
        2.4,
        "https://www.apple.com/v/macbook-air/s/images/overview/routers/compare_mbp_14_16__f7ovwhzitq6i_large.png"
    ),
];

const shop = new Shop(products)
shop.init()