class ProductItem {
    constructor(product, img='https://ipsumimage.appspot.com/200x250') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <a href="#" class="product-img-link"><img src="${this.img}" alt="image" class="product-img"></a>
                <h3 class="product-name">${this.title}</h3>
                <p class="product-price">${this.price}</p>
                <button class="by-btn">Добавить в корзину</button>
            </div>`
    }
}

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
        this.render();
        this.price();
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }

    render() {
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    // Метод для определения суммарной стоимости всех товаров.
    price() {
        let totalPrice = 0;

        this.goods.forEach(product => totalPrice += product.price);
        return totalPrice;
    }
}

class Cart {
    constructor() {
        //Метод подсчитывающий общую стоимость товаров
        totalPrice() {

        }

        //Метод подсчитывающий количество товаров
        productCounter() {

        }

        //Метод удаляющий один товар из корзины
        deleteProduct() {

        }

        //Метод очищающий корзину
        clearCart() {

        }

        //Метод оформления и оплаты заказа
        checkoutAndPay() {

        }
    }
}

new ProductList();

// const products = [
//     {id: 1, title: 'Notebook', price: 20000},
//     {id: 2, title: 'Mouse', price: 1500},
//     {id: 3, title: 'Keyboard', price: 5000},
//     {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (title, price, img ='https://ipsumimage.appspot.com/200x250') => {
//     return `<div class="product-item">
//                 <a href="#" class="product-img-link"><img src="${img}" alt="image" class="product-img"></a>
//                 <h3 class="product-name">${title}</h3>
//                 <p class="product-price">${price}</p>
//                 <button class="by-btn">Добавить в корзину</button>
//             </div>`;
// };
//
// const renderProducts = (list) => {
//     const productList = list.map((item) => renderProduct(item.title, item.price)).join('');
//     document.querySelector('.products').innerHTML = productList;
// };
//
// renderProducts(products);
