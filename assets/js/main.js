document.addEventListener('DOMContentLoaded', () => {
    const mainCard = document.getElementById("main-card");
    const extraCards = document.getElementById("extra-cards");
    const newCards = document.getElementById("new-cards");
    const mainTitle = mainCard.querySelector(".card__title");

    // Handle Main Card Click to show/hide extra cards with transition effect
    mainCard.addEventListener("click", () => {
        if (extraCards.style.display === "grid") {
            // When main card is clicked, hide extra cards and reset new cards
            extraCards.style.opacity = 0;
            setTimeout(() => extraCards.style.display = "none", 300);  // Hide after animation
            mainCard.classList.remove("is-active");
            newCards.style.opacity = 0;
            setTimeout(() => newCards.style.display = "none", 300);  // Hide new cards
        } else {
            extraCards.style.display = "grid";  // Show extra cards
            setTimeout(() => extraCards.style.opacity = 1, 0);  // Fade in extra cards
            mainCard.classList.add("is-active");
        }
    });

    // Handle clicks on any of the 6 additional cards
    const allExtraCards = document.querySelectorAll('.extra__cards .card__article');
    allExtraCards.forEach(card => {
        card.addEventListener("click", () => {
            // Remove the 'selected-card' class from all extra cards to reset the state
            allExtraCards.forEach(card => card.classList.remove('selected-card'));
            // Remove the 'blurred' class from all extra cards to reset the state
            allExtraCards.forEach(card => card.classList.remove('blurred'));

            // Add the 'selected-card' class to the clicked extra card
            card.classList.add('selected-card');

            // Apply the 'blurred' class to all other extra cards
            allExtraCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.add('blurred');
                }
            });

            // Get the title of the clicked card
            const cardTitle = card.querySelector(".card__title").textContent;
            const cardId = card.dataset.id; // Get the dataset id for the clicked card (1-6)

            // Change the main card's title based on the clicked card
            mainTitle.textContent = `You Selected: ${cardTitle}`;

            // Dynamically generate new cards based on the clicked extra card
            generateNewCards(cardId);

            // Add "centered" effect to the clicked card
            card.classList.add("centered-card");
            newCards.style.display = "grid";  // Show the new cards container
            setTimeout(() => newCards.style.opacity = 1, 0);  // Fade in new cards

            // Ensure the extra cards remain visible
            extraCards.style.opacity = 1;  // Ensure the extra cards remain visible
        });
    });

    // Function to generate new cards dynamically based on the extra card clicked
    function generateNewCards(cardId) {
        // Clear any existing new cards before adding new ones
        newCards.innerHTML = '';

        let newCardTitles = [];
        switch (cardId) {
            case '1':
                newCardTitles = ['1.1', '1.2', '1.3', '1.4'];
                break;
            case '2':
                newCardTitles = ['2.1', '2.2', '2.3', '2.4'];
                break;
            case '3':
                newCardTitles = ['3.1', '3.2', '3.3'];
                break;
            case '4':
                newCardTitles = ['4.1', '4.2', '4.3'];
                break;
            case '5':
                newCardTitles = ['5.1'];
                break;
            case '6':
                newCardTitles = ['6.1', 'hello'];
                break;
            default:
                newCardTitles = [];
                break;
        }

        // Create and append new cards to the newCards container
        newCardTitles.forEach(title => {
            const newCard = document.createElement('div');
            newCard.classList.add('new-card');
            newCard.innerHTML = `
                <h3>${title}</h3>
            `;
            newCards.appendChild(newCard);
        });
    }

    // Handle clicks on new cards or extra cards to go back to the initial state
    document.querySelectorAll(".extra__cards .card__article, .new-card").forEach(element => {
        element.addEventListener("click", () => {
            // Remove the centered styling from clicked card
            document.querySelectorAll(".centered-card").forEach(centeredCard => {
                centeredCard.classList.remove("centered-card");
            });

            // Hide the new cards and reset the extra cards visibility
            // newCards.style.opacity = 0;
            // setTimeout(() => newCards.style.display = "none", 300);

            // Remove the blurred state from all extra cards
            allExtraCards.forEach(card => card.classList.remove('blurred'));

            // Keep the extra cards visible
            extraCards.style.display = "grid";  // Ensure extra cards remain displayed
            extraCards.style.opacity = 1;  // Ensure the opacity is set to 1

            // Reset the title of the main card to the default state
            mainTitle.textContent = "Click to Reveal 6 Cards"; // Reset the title to its original text
        });
    });
});
