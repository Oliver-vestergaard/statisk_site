//const id = 1528;
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("id:", id);

const productURL = "https://kea-alt-del.dk/t7/api/products/" + id;
const productcontainer = document.querySelector("#productContainer");

function getData() {
  fetch(productURL).then((res) => res.json().then((data) => show(data)));
}

function show(data) {
  const discount = data.discount;

  let newPrice = "";

  if (discount > 0) {
    newPrice = Math.round(data.price * (1 - data.discount / 100));
  } else {
    discountClass = "";
  }

  productcontainer.innerHTML = `
  <h1>Product Details</h1>
        <div class="product_info_grid">
            <h2>${data.productdisplayname}</h2>

            <div class="primary_img">
                <img class="product_imgs" src="https://kea-alt-del.dk/t7/images/webp/640/${id}.webp"
                    alt="billede af produkt">

            </div>


            <div class="product_info">
               ${data.discount > 0 ? `<p id="new_priceProductDet">${newPrice} Dkk</p>` : ""}
                <p> <span> ${data.discount > 0 ? "Normalpris:" : ""} <span class="${data.discount > 0 ? "ProductOnSale" : ""}"> ${data.price} Dkk </span> </p>
                 
                
                ${
                  data.discount > 0
                    ? ` <div class="DiscountProcent"> <p id="ProcentMark"> ${data.discount}% </p>   
    </div>`
                    : ""
                }
                
            
                
                <p class="availeble ${data.soldout ? "soldout" : "instock"}">
  ${data.soldout ? "Ikke på lager" : "På lager"}
</p>

                <button class="card_button">Læg i kurv</button>

                <h3 class="product-information">Product Information:</h3>
                <p class="prod_info">${data.description}</p>




            </div>
        </div>

  `;
}

getData();
