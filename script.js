const cardTemplate = document.querySelector("[data-card-template]");
const cardContainer = document.querySelector("[data-card-container]");
const searchInput = document.querySelector("[data-search-input]");

let users = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  users.forEach((user) => {
    const isVisible = user.name.includes(value) || user.email.includes(value);
    user.element.classList.toggle("hide", !isVisible);
  });
});

const fetchData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  users = data.map((user) => {
    const card = cardTemplate.content.cloneNode(true).children[0];
    const header = card.querySelector("[data-header]");
    const body = card.querySelector("[data-body]");

    header.textContent = user.name;
    body.textContent = user.email;
    cardContainer.append(card);

    return { name: user.name.toLowerCase(), email: user.email.toLowerCase(), element: card };
  });
};

fetchData();
