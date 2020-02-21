const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

    let getRequest = (url) => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open('GET', url, true);
            xhr.onreadystatechange = () => {
                const a = xhr.responseText;
                resolve(a);
                reject(console.log('error'));
            }
        });
    }
getRequest();


// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log('Error!');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        // this._fetchProducts();
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render();
            });

        //this.price();
    }

    // _fetchProducts() {
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         this.render();
    //         console.log(this.goods);
    //     });
    // }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                 console.log('Error:', error);
            });
    }

    // // Метод для определения суммарной стоимости всех товаров.
    // price() {
    //     let totalPrice = 0;
    //
    //     this.goods.forEach(product => totalPrice += product.price);
    //     return totalPrice;
    // }

    render() {
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
}


class ProductItem {
    constructor(product, img='https://ipsumimage.appspot.com/200x250') {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <a href="#" class="product-img-link"><img src="${this.img}" alt="image" class="product-img"></a>
                <h3 class="product-name">${this.product_name}</h3>
                <p class="product-price">${this.price} ₽</p>
                <button class="by-btn" onclick="addItemToCart()">Добавить в корзину</button>
            </div>`
    }
}


var btnBasket = document.getElementById('basket-btn');
var goodsListSection = document.getElementById('goods-list-section');
var btnCloseCart = document.getElementById('goods-list-section__delete');
var btnOrder = document.getElementsByClassName('by-btn');

class CartItem {
    constructor (product, img='https://ipsumimage.appspot.com/40x45') {
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = img;
        this.quantity = 1;
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.renderWithIndex();
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log('Error:', error);
            });
    }


    renderWithIndex(index) {
        return `<div class="goods-list__product-box">
        <span class="goods-list__product-box__name">${this.product_name}</span>
        <div class="goods-list__product-box__price">${this.price}</div>
        <div class="goods-list__product-box__quantity">${this.quantity}</div>
        <a href="#" class="product-img-link"><img src="${this.img}" alt="image" class="product-img"></a>
        <input type="submit" value="X" class="goods-list-item__product-box__delete" data-product-index=${index} onclick="deleteItemFromCart()">
        </div>`
    }

    addQuantity() {
        this.quantity += 1;
    }
}


class Cart {
    constructor () {
        this.goods = [];
    }

    render () {
        let listHtml = '';
        let goodsList = document.getElementById('goods-list__product-box');

        this.goods.forEach ((product_name, indexOfProduct) => {
            listHtml += product_name.renderWithIndex(indexOfProduct);
        });
        goodsList.innerHTML = listHtml;

        this.totalCartPrice();
    }

    addItemToCart(product) {
        let cartItem = this.goods.filter(el => el.product_name === product.product_name)[0];

        if (cartItem !== undefined) {
            cartItem.addQuantity();
        } else {
            let item = new CartItem(product);
            this.goods.push(item);
        }
    }

    //Метод для вывода итоговой суммы корзины
    totalCartPrice() {
        let totalPrice = document.getElementById('goods-list__total');
        let sum = 0;
        this.goods.forEach (good => {
            sum += good.price * good.quantity;
        });
        totalPrice.innerText = `Итого  ${sum} рублей`;
    }

    deleteItemFromCart(index) {
        this.goods.splice(index, 1);
        this.render();
    }
}

const addItemToCart = () => {
    let product = `${API}/catalogData.json`;
    cart.addItemToCart(product);
}

const deleteItemFromCart = () => {
    let index = event.target.dataset.productIndex;
    cart.deleteItemFromCart(index);
}

var openBasket = () => {
    cart.render();
    goodsListSection.style.display = 'block';
};


var cart = new Cart();

btnBasket.addEventListener('click', openBasket);
window.addEventListener('click', function (evt) {console.log(evt)});
btnCloseCart.addEventListener ('click', function () {goodsListSection.style.display = 'none'});
//
//         //Метод подсчитывающий количество товаров
//         productCounter() {
//
//         }
//
//         //Метод удаляющий один товар из корзины
//         deleteProduct() {
//
//         }
//
//         //Метод очищающий корзину
//         clearCart() {
//
//         }
//
//         //Метод оформления и оплаты заказа
//         checkoutAndPay() {
//
//         }

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
