const listURL = "https://kea-alt-del.dk/t7/api/products?limit=50";
const listContainer = document.querySelector(".product-gallery");

function getProducts() {
  fetch(listURL).then((res) => res.json().then((products) => showProducts(products)));
}

function showProducts(products) {
  // Start med tom container
  listContainer.innerHTML = "";

  // products er et array af objekter

  products.forEach((product) => {
    let soldOutClass = "";

    if (product.soldout === 1) {
      soldOutClass = "sold-out";
    } else {
      soldOutClass = "InStock";
    }

    let discountClass = "";
    let newPrice = "";
    // DISCOUNT
    if (product.discount > 0) {
      discountClass = "on-sale";
      newPrice = Math.round(product.price * (1 - product.discount / 100));
    } else {
      discountClass = "";
    }

    listContainer.innerHTML += `
   
   
    <article class="card ${soldOutClass} ${discountClass}">
   <h3>${product.productdisplayname}</h3>

   <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}" />
   <div class="grid_1-1">
    
   
   <p class="on-sale price">${product.price}</p>
    
     
 <p class="new_price ">${newPrice}</p>
     
       
      <p class="hide">SOLD OUT</p>
     <p class="brand">${product.brandname}</p>
   </div>
   <div class="button_container">
     <a class="card_button" href="product.html">
       Køb nu
     </a>
   </div>
 </article>
    `;
  });
}

getProducts();
