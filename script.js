// Add smooth page load animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

class TypeWriter {
    constructor(element, texts, delay = 200) {
        this.element = element;
        this.texts = texts;
        this.delay = delay;
        this.cursor = document.createElement('span');
        this.cursor.className = 'cursor';
        this.element.appendChild(this.cursor);
        this.currentText = '';
        this.isDeleting = false;
        this.dots = '';
        this.textIndex = 0;
    }

    type() {
        const currentWord = this.texts[this.textIndex];
        
        if (!this.isDeleting) {
            if (this.currentText === currentWord) {
                if (this.dots.length < 3) {
                    this.dots += '.';
                } else {
                    this.isDeleting = true;
                }
                this.element.textContent = this.currentText + this.dots;
            } else {
                this.currentText = currentWord.substring(0, this.currentText.length + 1);
                this.element.textContent = this.currentText;
            }
        } else {
            if (this.dots.length > 0) {
                this.dots = this.dots.substring(0, this.dots.length - 1);
                this.element.textContent = this.currentText + this.dots;
            } else if (this.currentText.length > 0) {
                this.currentText = this.currentText.substring(0, this.currentText.length - 1);
                this.element.textContent = this.currentText;
            } else {
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % this.texts.length;
            }
        }
        
        this.element.appendChild(this.cursor);

        setTimeout(() => this.type(), this.isDeleting ? this.delay / 2 : this.delay);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const mainText = document.getElementById('main-text');
    
    // Initialize typewriter with all words
    const writer = new TypeWriter(
        mainText, 
        ['futonic', 'vision', 'Focus', 'Dream', 'Football'],
        300
    );
    
    // Start animation
    setTimeout(() => {
        writer.type();
    }, 500);
}); 