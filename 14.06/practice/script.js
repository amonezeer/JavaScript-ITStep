document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById("pause-btn");
    if(!btn) throw "#pause-btn not found";
    btn.addEventListener('click', pauseButtonClick);

    const btn2 = document.getElementById("sequence-btn");
    if(!btn2) throw "#sequence-btn not found";
    btn2.addEventListener('click', sequenceButtonClick);
});

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
