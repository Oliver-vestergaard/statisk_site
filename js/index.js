const url = "https://kea-alt-del.dk/t7/api/categories";

const container = document.querySelector(".categories_section");

function getData() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => show(data));
}

function show(categories) {
  categories.forEach((singleCategory) => {
    container.innerHTML += `
      <a href="productlist.html?category=${encodeURIComponent(singleCategory.category)}" class="index_button">
        ${singleCategory.category}
      </a>
    `;
  });
}

getData();
