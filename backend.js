// 1. User greeting (with a small fix for cancelation)
let userName = prompt("Welcome to the Flash Learning game! What's your name?");
while (!userName) {
    userName = prompt("Enter your name por favor? (That's please in spanish!)");
}
alert("Welcome " + userName + "! Let's learn some new words! ¡vamos!");

// 2. State Variables
let flashcards = []; 
let currentCardIndex = 0;
let currentLanguage = 'Spanish'; // Default language

// 3. UI Elements
const flashcardElement = document.querySelector('.flashcard');
const wordDisplay = document.getElementById('word-display');
const translationDisplay = document.getElementById('translation-display');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

// 4. Fetch Data from your Server
async function loadCards() {
    try {
        // This calls the server we will create in server.js
        const response = await fetch('http://localhost:3000/api/cards');
        const allData = await response.json();
        
        // Filter data based on selected language
        flashcards = allData.filter(card => card.language === currentLanguage);
        
        if (flashcards.length > 0) {
            currentCardIndex = 0;
            updateCardContent();
        } else {
            wordDisplay.textContent = "No cards found";
            translationDisplay.textContent = "Add some in DB!";
        }
    } catch (error) {
        console.error("Connection Error:", error);
        wordDisplay.textContent = "Server Offline";
    }
}

// 5. Logic to update the display
function updateCardContent() {
    if (flashcards.length === 0) return;
    const card = flashcards[currentCardIndex];
    wordDisplay.textContent = card.word;
    translationDisplay.textContent = card.translation;
    flashcardElement.classList.remove('flipped');
}

// 6. Navigation
function showNextCard() {
    if (flashcards.length === 0) return;
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    updateCardContent();
}

function showPrevCard() {
    if (flashcards.length === 0) return;
    currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
    updateCardContent();
}

// 7. Flip Card Function
window.flipCard = function(card) {
    card.classList.toggle('flipped');
}

// 8. Event Listeners
if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', showNextCard);
    prevBtn.addEventListener('click', showPrevCard);
}

// Initial Load
loadCards();