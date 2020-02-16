const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price, img ='https://ipsumimage.appspot.com/200x250') => {
    return `<div class="product-item">
                <a href="#" class="product-img-link"><img src="${img}" alt="image" class="product-img"></a>
                <h3 class="product-name">${title}</h3>
                <p class="product-price">${price}</p>
                <button class="by-btn">Добавить в корзину</button>
            </div>`;
};

const renderProducts = (list) => {
    const productList = list.map((item) => renderProduct(item.title, item.price)).join('');
    document.querySelector('.products').innerHTML = productList;
};

renderProducts(products);
