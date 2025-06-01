class ExtendedDate extends Date {
    constructor(dateString) {
        super(dateString);
    }

    getDateText() {
        const months = [
            'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
            'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'
        ];
        return `${this.getDate()} ${months[this.getMonth()]}`;
    }

    isFutureOrCurrent() {
        const now = new Date();
        now.setHours(0, 0, 0, 0); 
        this.setHours(0, 0, 0, 0);
        return this >= now;
    }

    isLeapYear() {
        const year = this.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    getNextDate() {
        const nextDate = new Date(this);
        nextDate.setDate(this.getDate() + 1);
        return nextDate;
    }
}

function testExtendedDate() {
    const dateInput = document.getElementById('dateInput').value;
    let output = '';

    if (dateInput && !isNaN(new Date(dateInput))) {
        const extendedDate = new ExtendedDate(dateInput);
        
        output += `<p>Дата текстом: ${extendedDate.getDateText()}</p>`;
        output += `<p>Майбутня або поточна дата: ${extendedDate.isFutureOrCurrent() ? 'Так' : 'Ні'}</p>`;
        output += `<p>Високосний рік: ${extendedDate.isLeapYear() ? 'Так' : 'Ні'}</p>`;
        output += `<p>Наступна дата: ${extendedDate.getNextDate().toLocaleDateString('uk-UA')}</p>`;
    } else {
        output = '<p style="color: red;">Будь ласка, введіть коректну дату у форматі РРРР-ММ-ДД</p>';
    }

    document.getElementById('output').innerHTML = output;
}