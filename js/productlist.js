const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const listURL = `https://kea-alt-del.dk/t7/api/products?category=${encodeURIComponent(category)}&limit=50`;

const listContainer = document.querySelector(".product-gallery");
const sortButton = document.querySelector(".SortByPrice");
const filterButton = document.querySelector(".filterbtn");
const ShowAll = document.querySelector(".ShowAllProducts");

let products = [];

function getProducts() {
  fetch(listURL)
    .then((res) => res.json())
    .then((data) => {
      products = data; // gem i den globale variabel
      showProducts(products);
    });
}

function showProducts(products) {
  // Start med tom container
  listContainer.innerHTML = "";

  // products er et array af objekter

  products.forEach((product) => {
    //SOLDOUT
    let soldOutClass = "";

    product.soldout === 1 ? (soldOutClass = "sold-out") : (soldOutClass = "InStock");

    // DISCOUNT

    let discountClass = "";
    let newPrice = "";

    if (product.discount > 0) {
      discountClass = "on-sale";
      newPrice = Math.round(product.price * (1 - product.discount / 100));
    } else {
      discountClass = "";
    }

    listContainer.innerHTML += `
   
   

    <article class="card ${soldOutClass} ${discountClass}">
   
  <div>
    <h3 class="productListName">${product.productdisplayname}</h3>


  </div>
   <p class="brand">${product.brandname}</p>

<div>
        ${
          product.discount > 0
            ? ` <div class="DealMark"> <p> DEAL </p>   
    </div>`
            : ""
        }
   <img class="Product_img" src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}" />
</div>

   <div class="grid_1-1">
    
   
  <p class="price">${product.price} DKK</p>
<p class="new_price  ${product.discount === 0 ? "visibilityHide" : ""}">${newPrice} DKK</p>
<p class="SoldOutText">SOLD OUT</p>

   
    ${
      product.discount > 0
        ? ` <div class="DiscountProcent"> <p> ${product.discount}% </p>   
    </div>`
        : ""
    }

 

  




   </div>
   <div class="button_container">  
       <a class="card_button" href="product.html?id=${product.id}">
       Køb nu
     </a>
   </div>
 </article>
    `;
  });
}

function SortérPris() {
  const sorted = [...products].sort((a, b) => a.price - b.price);
  showProducts(sorted);
}

function filtrér(targetGender) {
  const filtered = products.filter((product) => (product.gender || "").toLowerCase() === targetGender.toLowerCase());
  showProducts(filtered);
}

sortButton.addEventListener("click", SortérPris);
filterButton.addEventListener("click", () => filtrér("women"));
ShowAll.addEventListener("click", () => showProducts(products));

getProducts();
