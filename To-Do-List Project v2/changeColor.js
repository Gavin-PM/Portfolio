var r = document.querySelector(':root')

// // function changeCssVar(name,value){
// //     if(name[0]!='-') name = '--'+name //allow passing with or without --
// //     if(value) {console.log("Changed To: "); document.documentElement.style.setProperty(name, value)}
// //     else {console.log("It is: ")}
// //     return getComputedStyle(document.documentElement).getPropertyValue(name);
// // }

var hue1 = 90
var hue2 = 0
var shift = (hue2 - hue1) / 5
const shiftDist = 0

var slider1 = document.getElementById("hue1slider");
var slider2 = document.getElementById("hue2slider");

// //function is called when slider value changes
// slider.addEventListener("change", function() { 
//   hue1 = slider.value;  
//   dispDiv.innerHTML = "the js variable 'a' currently = " + hue1;
// })



//if you want it real-time, you can do this: 
function slider1Func() {
  hue1 = JSON.parse(slider1.value);
  shift = (hue2 - hue1) / 5
  localStorage.setItem("curColor",hue1)
  changeShift(0)
}

slider1.oninput = slider1Func;

function slider2Func() {
  hue2 = JSON.parse(slider2.value);
  shift = (hue2 - hue1) / 5
  localStorage.setItem("setColor",hue2)
  changeShift(0)
  console.log(hue2)
}
slider2.oninput = slider2Func;


function changeShift(val) {
    var shiftDist = val
    var hue = hue1 + (shift * shiftDist)
    document.documentElement.style.setProperty("--hue", hue)
    console.log("Changed Color To: " + hue)
}

let curColor = localStorage.getItem('curColor')
console.log()
let setColor = localStorage.getItem('setColor')

if(curColor != null){
  slider1.value = curColor;
  slider1Func()
} else {
  slider1.value = 90;
  slider1Func()
}
if(setColor != null){
  slider2.value = setColor;
  slider2Func()
} else {
  slider2.value = 0;
  slider2Func()
}

$(document).on('click','.return-default-color', function(){
  localStorage.removeItem("curColor")
  localStorage.removeItem("setColor")
  location.reload()
})

// the hue of the hsl is hue1 + shift * shiftDist (0-5)









