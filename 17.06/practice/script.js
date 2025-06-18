document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById("pause-btn");
    if(!btn) throw "#pause-btn not found";
    btn.addEventListener('click', pauseButtonClick);

    const btn2 = document.getElementById("sequence-btn");
    if(!btn2) throw "#sequence-btn not found";
    btn2.addEventListener('click', sequenceButtonClick);
    
    const btnRates = document.getElementById("load-rates");
    if(!btnRates) throw "#load-rates not found";
    btnRates.addEventListener('click', ratesButtonClick);

    const searchRate = document.getElementById("search-rate");
    if(!searchRate) throw "#search-rate not found";
    searchRate.addEventListener('input', searchKeypress);

    const loadMoon = document.getElementById("load-moon-phase");
    if(!loadMoon) throw "#load-moon-phase not found";
    loadMoon.addEventListener('click', moonClick);
});

function moonClick() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    fetch(`https://icalendar37.net/lunar/api/?year=${year}&month=${month}&shadeColor=gray&size=150&texturize=true`)
        .then(r => r.json())
        .then(data => {
            const container = document.getElementById("moon-container");
            container.innerHTML = ""; 

            const days = [
                { label: "Вчора", date: new Date(today.getTime() - 86400000) }, 
                { label: "Сьогодні", date: today },
                { label: "Завтра", date: new Date(today.getTime() + 86400000) } 
            ];

            for (const dayObj of days) {
                const d = dayObj.date.getDate().toString();
                const phase = data.phase[d];
                container.appendChild(createMoonCard(phase, dayObj.label, dayObj.date));
            }
        });
}

function createMoonCard(phase, label, dateObj) {
    const div = document.createElement("div");
    div.classList.add("col-md-4", "text-center", "mb-4");

    const dateStr = dateObj.toLocaleDateString('uk-UA');
    const distance = calculateFakeDistance(phase.lighting);

    div.innerHTML = `
        <div class="card shadow">
            <div class="card-body">
                <h5 class="card-title">${label} (${dateStr})</h5>
                <div>${phase.svg}</div>
                <p class="card-text"><strong>Фаза:</strong> ${phase.phaseName}</p>
                <p class="card-text"><strong>Освітленість:</strong> ${phase.lighting}%</p>
                <p class="card-text text-muted"><strong>Відстань:</strong> ~${distance} км</p>
            </div>
        </div>
    `;
    return div;
}

function calculateFakeDistance(lighting) {
    const min = 356000; 
    const max = 406000; 
    return Math.round(max - (lighting / 100) * (max - min));
}



function showMoonPhase(phase) {
    const moonImage = document.getElementById("moon-phase");
    const moonInfo = document.getElementById("moon-info");

    moonImage.innerHTML = phase.svg;

    moonInfo.innerHTML = `
        <p><strong>Фаза:</strong> ${phase.phaseName}</p>
        <p><strong>Освітленість:</strong> ${phase.lighting}%</p>
    `;
}

function searchKeypress(e) {
    if(!window.nbuRates) return;
    let fragment = e.target.value; 
    console.log(fragment);
    if(fragment.length > 0){
        showRates(window.nbuRates.filter(r => r.cc.includes(fragment) || r.txt.includes(fragment)));
    }
    else {
        showRates(window.nbuRates);
    }
}

function ratesButtonClick() {
    const rates = document.getElementById("rates");
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then(r => {
        if(r.ok) {
            return r.json();
        }
        else {
            rates.innerHTML = `<div class="alert alert-danger" role="alert">Запит до сайту завершився помилкою${r.status}</div>`;
        }
    })
    .then(j => {
        window.nbuRates = j;
        showRates(j);
    });
}

function showRates(j) {
    const table = document.createElement('table');
    table.classList.add("table", "table-success", "table-striped");
    const thead = document.createElement('thead');
    let line = document.createElement('tr');
    let cell = document.createElement('th');
    cell.innerText = "Code";
    line.appendChild(cell);
    cell = document.createElement('th'); cell.innerText = "Short"; line.appendChild(cell);
    cell = document.createElement('th'); cell.innerText = "Full"; line.appendChild(cell);
    cell = document.createElement('th'); cell.innerText = "Rate"; line.appendChild(cell);
    thead.appendChild(line);
    table.appendChild(thead);

    const tbody = document.createElement('tbody')
    
    for (let rate of j) {
        line = document.createElement('tr');
        cell = document.createElement('td'); cell.innerText = rate.r030; line.appendChild(cell);
        cell = document.createElement('td'); cell.innerText = rate.cc; line.appendChild(cell);
        cell = document.createElement('td'); cell.innerText = rate.txt; line.appendChild(cell);
        cell = document.createElement('td'); cell.innerText = rate.rate; line.appendChild(cell);
        tbody.appendChild(line);
    }
    table.appendChild(tbody);
    const rates = document.getElementById("rates");
    rates.innerHTML = "";
    rates.appendChild(table);
}


async function sequenceButtonClick() {
    // pause(1000)
    // .then(ms => {console.log(1); return pause(1000);})
    // .then(ms => {console.log(2); return pause(1000);})
    // .then(ms => {console.log(3);});

    await pause(1000); console.log(1);
    await pause(1000); console.log(2);
    await pause(1000); console.log(3);
}

function pause(ms) {
    return new Promise(
        (resolve,reject) => {
            setTimeout (
                () => resolve(ms),
                ms 
            );
        }
    );
}

async function  pauseAsync (ms) {
    return await pause(ms);
}

async function pauseButtonClick() {
    // pause(1500)
    // .then (
    //     (ms) => console.log(ms)
    // )
    // .catch(
    //     (err) => console.error(err)
    // );
    // console.log( "Async : ", await pause(1500) );
     console.log( "Async : ", await pauseAsync(1500) );
}
