const newLocal = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=9";


const API_URL = newLocal;

const cryptoTable = document.getElementById("crypto-table");
const searchInput = document.getElementById("search");
const themeToggle = document.getElementById("theme-toggle");

async function fetchCryptoData() {
  const response = await fetch(API_URL);
  const data = await response.json();
  displayCryptoData(data);
}

function displayCryptoData(data) {
  cryptoTable.innerHTML = "";
  data.forEach((coin, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td class="crypto-image"><img src="${coin.image}" alt="${coin.name} logo"> ${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td>$${coin.market_cap.toLocaleString()}</td>
      </tr>
    `;
    cryptoTable.innerHTML += row;
  });
}

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const rows = cryptoTable.querySelectorAll("tr");
  rows.forEach(row => {
    const name = row.children[1]?.textContent.toLowerCase();
    if (name?.includes(searchTerm)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode")
    ? "Light Mode"
    : "Dark Mode";
});

fetchCryptoData();
