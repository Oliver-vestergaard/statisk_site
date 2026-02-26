const id = 1528;
const productURL = "https://kea-alt-del.dk/t7/api/products/" + id;
const productcontainer = document.querySelector("#productContainer");

function getData() {
  fetch(productURL).then((res) => res.json().then((data) => show(data)));
}

function show(data) {
  productcontainer.innerHTML = `
  <h1>Product Details</h1>
        <div class="product_info_grid">
            <h2>${data.productdisplayname}</h2>

            <div class="primary_img">
                <img class="product_imgs" src="https://kea-alt-del.dk/t7/images/webp/640/${id}.webp"
                    alt="billede af produkt">

            </div>


            <div class="product_info">
                <p> ${data.price} Dkk </p>
                <p class="availeble">${data.soldout ? "Ikke på lager" : "På lager"}</p>

                <button class="card_button">Læg i kurv</button>

                <h3 class="product-information">Product Information:</h3>
                <p class="prod_info">${data.description}</p>




            </div>
        </div>

  `;
}

getData();
