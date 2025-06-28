window.addEventListener('hashchange', () => {
    selectPage();
});

document.addEventListener('DOMContentLoaded', () => {
    selectPage();
});

function selectPage() {
    const route = window.location.hash.split('/');
    switch(route[0]) {
        case '':
        case '#home': homePage(); break;
        case '#rate': ratePage(route[1]); break;

        default: notFoundPage();
    };
}

function m(val){
    return val < 10 ? `0${val}` : val;
}

function formatDate(date) {
    return `${m(date.getDate())}.${m(date.getMonth()+1)}.${date.getFullYear()}`;
}

function ratePage(cc) {
    if(typeof cc == 'undefined') {
        cc = 'USD';
    }
    const date1 = new Date();
    const date2 = new Date(date1.getTime() - 604800000);  // 604800000 - 7 днів у мілісекундах
    const d1 = `${date1.getFullYear()}${m(date1.getMonth()+1)}${m(date1.getDate())}`;
    const d2 = `${date2.getFullYear()}${m(date2.getMonth()+1)}${m(date2.getDate())}`;
    console.log(d1, d2);
    let url = `https://bank.gov.ua/NBU_Exchange/exchange_site?start=${d2}&end=${d1}&valcode=${cc.toLowerCase()}&sort=exchangedate&order=desc&json`;
    url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20200302&json';
    // url = 'https://bank.gov.ua/NBU_Exchange/exchange_site?start=20250621&end=20250628&valcode=usd&sort=exchangedate&order=desc&json';
    fetch(url)
    .then(r => r.json())
    .then(j => {
        let html = JSON.stringify(j);
        // for(let r of j) {
        //     html += `<p>exchangedate: ${r.exchangedate}, rate: ${r.rate}</p>`;
        // }
        document.getElementById('main-block').innerHTML = html;
    });    
}
function notFoundPage() {
    document.getElementById('main-block').innerHTML = "Not Found";
}

function homePage() {
    const dateInput = document.getElementById('rate-date');
    const selectedDate = dateInput ? new Date(dateInput.value) : new Date();
    const apiDate = `${selectedDate.getFullYear()}${m(selectedDate.getMonth()+1)}${m(selectedDate.getDate())}`;

    fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${apiDate}&json`)
    .then(r => r.json())
    .then(j => {
        const displayDate = formatDate(selectedDate);
        let table = `
         <div class="card shadow-sm mb-4">
             <h4 class="card-header">Курси валют на ${displayDate}</h4>
             <div class="table-responsive">
                 <input type='date' id='rate-date' value="${selectedDate.toISOString().substr(0,10)}" /><br/>
                 <table class="table table-striped table-hover">
                     <thead class="table-dark">
                         <tr>
                             <th><i class="bi bi-currency-exchange"></i> Код</th>
                             <th><i class="bi bi-translate"></i> Назва</th>
                             <th class="text-end"><i class="bi bi-cash-stack"></i> Курс (₴)</th>
                         </tr>
                     </thead>
                     <tbody>`;

        for(let r of j) {
            table += `
            <tr data-cc="${r.cc}">
              <td>${r.cc}</td>
              <td>${r.txt}</td>
              <td>${r.rate}</td>
            </tr>
          `;
        }
        table += "</tbody></table></div></div>";
        document.getElementById('main-block').innerHTML = table;

        document.querySelectorAll('[data-cc]').forEach(e => {
            e.onclick = rateClick;
        });
        document.getElementById('rate-date').onchange = homePage;
    });
}

function rateDateChange(e) {
    homePage();
}

function rateClick(e) {
    const cc = e.target.closest('[data-cc]').getAttribute('data-cc');
    window.location.hash = "#rate/" + cc;
}