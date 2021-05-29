/*Начиная с ES6 у функций могут быть 'параметры по умолчанию'
Они представляют собой стандартные значения, задаваемые параметрам функций в том случае, если при ее вызове значения некоторых параметровне задаются.*/

/*Установка параметра innerHTML string преобразует массив в строку, разделенную запятыми; разделитель запятых используется по умолчанию для параметра Array.prototype.toString .

Метод join записывает результирующий массив в одну строку без запятых*/

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
  ];

  
const renderGoodsItem = (title, price) => {
    return `<div class="goods-item"><img src="https://picsum.photos/seed/picsum/200/300" alt="pic"><h3>${title}</h3><p>Цена: ${price}</p></div>`;
  };
  
const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
  }
  
renderGoodsList(goods);

