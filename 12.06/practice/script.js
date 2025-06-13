document.addEventListener('DOMContentLoaded', () => {
    const fig2 = document.getElementById('fig-2');
    if(!fig2) throw "#fig-2 not found";
    window.dc2 = fig2.getContext('2d');
    showStatistics();

    const fig1 = document.getElementById('fig-1');
    if(!fig1) throw "#fig-1 not found";
    window.dc1 = fig1.getContext('2d');

    const drawLineBtn = document.getElementById('draw-line-btn');
    if(drawLineBtn){
        drawLineBtn.onclick = drawLineBtnClick;
    }

    const drawRectBtn = document.getElementById('draw-rect-btn');
    if(drawRectBtn){
        drawRectBtn.onclick = drawRectBtnClick;
    }

    const fillRectBtn = document.getElementById('fill-rect-btn');
    if(fillRectBtn){
        fillRectBtn.onclick = fillRectBtnClick;
    }

    const fullRectBtn = document.getElementById('full-rect-btn');
    if(fullRectBtn){
        fullRectBtn.onclick = fullRectBtnClick;
    }

    const clearBtn = document.getElementById('clear-btn');
    if(clearBtn){
        clearBtn.onclick = clearBtnClick;
    }

    const circleBtn = document.getElementById('circle-btn');
    if(circleBtn){
        circleBtn.onclick = circleBtnClick;
    }

    const halfBtn = document.getElementById('half-btn');
    if(halfBtn){
        halfBtn.onclick = halfBtnClick;
    }

    const diskBtn = document.getElementById('disk-btn');
    if(diskBtn){
        diskBtn.onclick = diskBtnClick;
    }


});

function diskBtnClick() {
    window.dc1.beginPath();
    window.dc1.fillStyle = "#FF22FF"; 
    window.dc1.arc(100, 80, 30, 0, Math.PI * 2); 
    window.dc1.fill();
}

function halfBtnClick() {
    window.dc1.beginPath();
    window.dc1.strokeStyle = "#2200FF";
    window.dc1.strokeWidth = 2;
    window.dc1.arc(30,140,20,0,Math.PI,true );
    window.dc1.stroke();
    window.dc1.beginPath();
    window.dc1.strokeStyle = "#FF0000"; 
    window.dc1.lineWidth = 2;
    window.dc1.moveTo(10, 140); 
    window.dc1.lineTo(50, 140); 
    window.dc1.stroke();
}

function circleBtnClick() {
    window.dc1.beginPath();
    window.dc1.strokeStyle = "#8B0000";
    window.dc1.strokeWidth = 2;
    window.dc1.arc(50,100,20,0,Math.PI * 2);
    window.dc1.stroke();
}

function clearBtnClick() {
    window.dc1.beginPath();
    window.dc1.clearRect(0,0,300,150);
}

function drawLineBtnClick() {
    window.dc1.strokeStyle = "black";
    window.dc1.strokeWidth = 2;
    window.dc1.moveTo(0,0);
    window.dc1.lineTo(150,150);
    window.dc1.lineTo(300,0);
    window.dc1.stroke();
    console.log(window.dc1);
}

function drawRectBtnClick() {
    window.dc1.strokeStyle = "green";
    window.dc1.strokeWidth = 3;
    window.dc1.rect(50,10,200,30);
    window.dc1.stroke();
}

function fillRectBtnClick() {
    window.dc1.beginPath();
    window.dc1.fillStyle = "gold";
    window.dc1.rect(100,50,100,30);
    window.dc1.fill();

}

function fullRectBtnClick() {
    window.dc1.beginPath();
    window.dc1.fillStyle = "lime";
    window.dc1.strokeStyle = "salmon";
    window.dc1.rect(200,120,120,30);
    window.dc1.fill();
    window.dc1.stroke();

}

function showStatistics() {
    window.dc2.beginPath();
    window.dc2.clearRect(0,0,300,150);
    window.dc2.fillStyle = "skyblue";
    const figWidth = 300;
    let maxHeight = 130;
    const stat = getStatistics();
    let n = stat.length;
    let w = figWidth / n * 0.68;
    let W = figWidth / n;
    let offset = (figWidth - w * n) / (n) / 2;
    let maxSold = Math.max(...stat.map(item => item.sold));
    let k = maxHeight / maxSold;
    for(let i = 0; i < n; i += 1){
        window.dc2.beginPath();
        window.dc2.fillStyle = "skyblue";
        window.dc2.rect(W*0.16 + i*W, 160-k*stat[i].sold, w, k*stat[i].sold);
        window.dc2.fill();

        window.dc2.beginPath();
        window.dc2.fillStyle = "darkgreen"
        window.dc2.fillText(stat[i].sold, W*0.32 + i*W, 160-k*stat[i].sold - 3)
        window.dc2.fill();
    }

}

function getStatistics() {
    return [
        { "day": 1, "sold": 100 },
        { "day": 2, "sold": 130 },
        { "day": 3, "sold": 80 },
        { "day": 4, "sold": 90 },
        { "day": 5, "sold": 150 },
        { "day": 6, "sold": 130 },
        { "day": 7, "sold": 160 },
    ];
}