const toppingsToggle = () => {
  const toppingsBtn = document.querySelector(".toppings__btn");
  const toppingsList = document.querySelector(".toppings__list");

  toppingsBtn.addEventListener("click", () => {
    if (!toppingsList.classList.contains("toppings__list_show")) {
      toppingsBtn.classList.add("toppings__btn_active");
      toppingsList.classList.add("toppings__list_show");

      toppingsList.style.maxHeight = toppingsList.scrollHeight + "px";
    } else {
      toppingsBtn.classList.remove("toppings__btn_active");

      toppingsList.style.maxHeight = null;

      setTimeout(() => {
        toppingsList.classList.remove("toppings__list_show");
      }, 300);
    }
  });
};

const getPizzas = async () => {
  try {
    const response = await fetch(
      "https://rune-attractive-aspen.glitch.me/api/products"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch pizza products!");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching pizza products: ${error}`);
  }
};

const createCard = (data) => {
  const card = document.createElement("article");
  card.classList.add("products__card", "card");
  card.innerHTML = `
    <picture>
      <source srcset="${data.images[1]}" type="image/webp">
      <img class="card__img" src=${data.images[0]} alt=${data.name.ua}>
    </picture>

    <div class="card__content">
      <h3 class="card__title">${data.name.ua}</h3>

      <p class="card__info">
        <span class="card__price">${data.price["25cm"]} ₴</span>

        <span class="card__divider">/</span>

        <span class="card__size">25 см</span>
      </p>

      <button class="card__btn" type="button" data-id="${data.id}">Вибрати</button>
    </div>
  `;

  return card;
};

const renderPizza = async () => {
  const pizzas = await getPizzas();

  const productsList = document.querySelector(".products__list");
  productsList.textContent = "";

  const items = pizzas.map((data) => {
    const item = document.createElement("li");
    item.classList.add("products__item");
    // item.textContent = data.name.ua;

    const card = createCard(data);
    item.append(card);

    return item;
  });

  productsList.append(...items);
};

const init = () => {
  toppingsToggle();
  renderPizza();
};

init();
