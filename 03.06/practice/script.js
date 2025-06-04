window.modal = null;
document.addEventListener('DOMContentLoaded', () => {
    const block1 = document.getElementById('block-1');
    if(!block1) throw "Block1 not found";
    block1.addEventListener('click', block1Click);

    const block2 = document.querySelector('#block-2');
    if(block2) block2.onclick = block2Click;

    const block3 = document.querySelector('#block-3');
    if(block3) block3.onclick = block3Click;

    modal = document.querySelector('#modal');
    if(window.modal) window.modal.onclick = modalClick;

    const modalCloseBtn = document.querySelector('#modal-close');
    if(modalCloseBtn) modalCloseBtn.onclick = modalCloseBtnClick;

    const pinCode = document.querySelector('#pin-code');
    if(pinCode) {
         pinCode.addEventListener('keydown', pinKeyDown);
         pinCode.addEventListener('keypress', pinKeyPress);
    }

});

function modalClick(e){
    e.stopPropogation();
    }

function modalCloseBtnClick(e) {
window.modal.style.display = 'none';
}

function pinKeyDown(e) {
    if(e.keyCode < 48 || e.keyCode > 57 ){
         console.log('ignored', e.key);
        e.preventDefault();
        return false;
    }
    console.log('keydown', e);
}

function pinKeyPress(e) {
    console.log('keypress', e);
}


function block1Click(e){
    console.log('Block 1 clicked');
   // console.log(e.target);
    const b1 = e.target.closest('[data-product-id]')
    const productId = e.target.getAttribute('data-product-id');
    console.log('Product ID:', productId);
}

function block2Click(e){
    console.log('Block 2 clicked');
    //console.log(e);
}

function block3Click(e){
     const block4 = document.querySelector('#block-4');
    block4.style.left = e.offsetX - block4.clientWidth / 2 + 'px';
    block4.style.top = e.offsetY - block4.clientHeight / 2 + 'px';
    block4.style['background-color'] = '#7788' + Math.round(Math.random() * 100 );
    console.log(e);
}
