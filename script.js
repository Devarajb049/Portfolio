const texts = [
    "Student", 
    "Designer", 
    "Developer", 
    ];
let textIndex = 0;
let charIndex = 0;

function typeText() {
    const currentText = texts[textIndex];
    if (charIndex < currentText.length) {
        document.getElementById("typing-text").textContent += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100); // Adjust typing speed here (100 ms per character)
    } else {
        // Once one text is typed out, erase and move to the next one after a short pause
        setTimeout(() => {
            charIndex = 0;
            textIndex = (textIndex + 1) % texts.length;
            document.getElementById("typing-text").textContent = "";
            typeText(); // Start typing the next text
        }, 1000); // Pause before changing the text (1 second)
    }
}

typeText(); // Start typing effect
