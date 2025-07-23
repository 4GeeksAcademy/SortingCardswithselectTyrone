const suits = ["♦", "♥", "♠", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let cards = [];
let log = [];

function getRandomCard() {
  const value = values[Math.floor(Math.random() * values.length)];
  const suit = suits[Math.floor(Math.random() * suits.length)];
  return { value, suit };
}

function drawCards() {
  const count = parseInt(document.getElementById("cardCount").value);
  if (!count || count < 1) return;
  cards = [];
  for (let i = 0; i < count; i++) {
    cards.push(getRandomCard());
  }
  log = [];
  renderCards();
  document.getElementById("logContainer").innerHTML = "";
}

function renderCards(cardsToRender = cards) {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";
  cardsToRender.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.innerHTML = `${card.value}`;
    const topLeft = document.createElement("div");
    topLeft.className = "suit top-left";
    topLeft.innerText = card.suit;
    const bottomRight = document.createElement("div");
    bottomRight.className = "suit bottom-right";
    bottomRight.innerText = card.suit;
    cardDiv.appendChild(topLeft);
    cardDiv.appendChild(bottomRight);
    container.appendChild(cardDiv);
  
  });
}

function getCardNumericValue(value) {
  if (!isNaN(value)) return parseInt(value);
  if (value === "A") return 1;
  if (value === "J") return 11;
  if (value === "Q") return 12;
  if (value === "K") return 13;
  return 0;
}

function sortCards() {
  const steps = [];
  let tempCards = [...cards];
  let len = tempCards.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (
        getCardNumericValue(tempCards[j].value) >
        getCardNumericValue(tempCards[j + 1].value)
      ) {
        let temp = tempCards[j];
        tempCards[j] = tempCards[j + 1];
        tempCards[j + 1] = temp;
        steps.push([...tempCards]);
      }
    }
  }
  cards = tempCards;
  renderCards();
  logChanges(steps);
}

function logChanges(steps) {
  const logContainer = document.getElementById("logContainer");
  steps.forEach((step, index) => {
    const logEntry = document.createElement("div");
    logEntry.innerText = `Step ${index + 1}: ` +
      step.map(card => `${card.value}${card.suit}`).join(" ");
    logContainer.appendChild(logEntry);
  });
}
