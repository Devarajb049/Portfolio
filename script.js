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
        setTimeout(typeText, 100); /
    } else {
        setTimeout(() => {
            charIndex = 0;
            textIndex = (textIndex + 1) % texts.length;
            document.getElementById("typing-text").textContent = "";
            typeText(); 
        }, 1000);
    }
}

typeText(); 
