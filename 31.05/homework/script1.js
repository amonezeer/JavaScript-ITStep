class Marker {
    constructor(color, inkLevel) {
        this.color = color;
        this.inkLevel = Math.min(inkLevel, 100); 
    }

    print(text) {
        let output = '';
        let nonSpaceChars = 0;

        for (let char of text) {
            if (this.inkLevel <= 0) break;
            
            if (char !== ' ') {
                if (this.inkLevel >= 0.5) {
                    output += char;
                    this.inkLevel -= 0.5;
                    nonSpaceChars++;
                } else {
                    break;
                }
            } else {
                output += char;
            }
        }

        const result = `<span style="color: ${this.color}">${output}</span>`;
        document.getElementById('output').innerHTML += result + '<br>';
        document.getElementById('status').innerHTML = 
            `Рівень чорнил: ${this.inkLevel.toFixed(1)}%`;
    }
}

class RefillableMarker extends Marker {
    constructor(color, inkLevel) {
        super(color, inkLevel);
    }

    refill() {
        this.inkLevel = 100;
        document.getElementById('status').innerHTML = 
            `Маркер заправлено! Рівень чорнил: ${this.inkLevel}%`;
    }
}

const simpleMarker = new Marker('blue', 10);
const refillableMarker = new RefillableMarker('red', 5);

function testSimpleMarker() {
    const text = document.getElementById('textInput').value;
    if (text) {
        simpleMarker.print(text);
    } else {
        alert('Введіть текст для друку!');
    }
}

function testRefillableMarker() {
    const text = document.getElementById('textInput').value;
    if (text) {
        refillableMarker.print(text);
    } else {
        alert('Введіть текст для друку!');
    }
}

function refillMarker() {
    refillableMarker.refill();
}