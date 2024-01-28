$('.proj').hover(function(){
    $(this).css('background-color','rgba(47, 79, 79, 0.928)')
}, function(){
    $(this).css('background-color','darkslategrey')
})

$('.content').hide()
const sleep = (ms) => {return new Promise(resolve => setTimeout(resolve, ms));}

$(document).on('click','.proj',function(){
    $(this).toggleClass('open')
    if ($(this).hasClass('open')) {
        $(this).css('border-radius','6px 6px 0 0')
        $(this).next().show()
        $(this).next().css('opacity','100')
    }
    else {
        $(this).css('border-radius','6px')
        $(this).next().css('opacity','0')
        sleep(400).then( () => {$(this).next().hide()} )
    }
})

let curImgIdx = 0;
let images = $(".gallery-image");
images.hide()
let descs = $(".imgDesc")
descs.hide()

function nextImage(change) {
    console.log(`from: ${curImgIdx}`)
    $(images[curImgIdx]).hide()
    $(descs[curImgIdx]).hide()
    curImgIdx = (curImgIdx+change+images.length) % images.length;
    console.log(`to: ${curImgIdx}`)
    $(images[curImgIdx]).show()
    $(descs[curImgIdx]).show()
}

$(document).on('click','#recap',function(){
    document.getElementById('modal').showModal()
    $(images[0]).show()
    $(descs[0]).show()
})
