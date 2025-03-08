let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.sliders');
const icons = document.querySelectorAll('.icon');

function moveSlide(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    if (currentIndex >= slides.length) currentIndex = 0;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    icons.forEach(icon => icon.classList.remove('active'));
    icons[currentIndex].classList.add('active');
}
setInterval(()=>moveSlide(1),6000);



const scrollWrapper = document.getElementById("scrollWrapper");
const indicator = document.createElement("div"); // Create the moving indicator
indicator.classList.add("indicator");
document.querySelector(".indicator-container").appendChild(indicator);

let isDown = false;
let startX;
let scrollLeft;

scrollWrapper.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - scrollWrapper.offsetLeft;
    scrollLeft = scrollWrapper.scrollLeft;
});

scrollWrapper.addEventListener("mouseleave", () => {
    isDown = false;
});

scrollWrapper.addEventListener("mouseup", () => {
    isDown = false;
});

scrollWrapper.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollWrapper.offsetLeft;
    const walk = (x - startX) * 2;
    scrollWrapper.scrollLeft = scrollLeft - walk;
    updateIndicator();
});

scrollWrapper.addEventListener("scroll", updateIndicator);

function updateIndicator() {
    const cards = document.querySelectorAll(".scroll-item");
    const totalScrollWidth = scrollWrapper.scrollWidth - scrollWrapper.clientWidth;
    const scrollPercentage = scrollWrapper.scrollLeft / totalScrollWidth;

    const firstCard = cards[0];
    const lastCard = cards[cards.length - 1];

    const firstCardRect = firstCard.getBoundingClientRect();
    const lastCardRect = lastCard.getBoundingClientRect();
    const wrapperRect = scrollWrapper.getBoundingClientRect();

    // Calculate the range for the indicator's movement
    const minLeft = firstCardRect.left - wrapperRect.left;
    const maxLeft = lastCardRect.left - wrapperRect.left;

    // Move indicator across all cards smoothly
    const newLeft = minLeft + scrollPercentage * (maxLeft - minLeft);
    
    // Find the closest card and adjust width
    let closestCard = null;
    let closestDistance = Infinity;

    cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const distance = Math.abs(wrapperRect.left + wrapperRect.width / 2 - (cardRect.left + cardRect.width / 2));

        if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
        }
    });

    if (closestCard) {
        const cardRect = closestCard.getBoundingClientRect();
        indicator.style.width = `${cardRect.width}px`;
    }

    indicator.style.left = `${newLeft}px`;
}
