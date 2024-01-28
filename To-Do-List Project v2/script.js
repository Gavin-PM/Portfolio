/* Basic Definitions */

const ls = localStorage
const cl = (a) => {console.log(a)}
const hi = "hi"



const listdiv = document.getElementById("list") 
const settingNumTextEl = document.getElementById("setting-num-text")

var numTextOption;

const getInputElement = (id) => { return document.getElementById(`todo_value_${id}`); }
const getInputElementID = (element) => {return element.getAttribute("id").substring(11)}
const getCheckboxElement = (id) => { return document.getElementById(`todo_checkbox_${id}`); }
const getDebugText = (id) => {return 'id: ' + listitems[id].id;}

const clearLS = () => {ls.clear();location.reload();}

const sleep = (ms) => {return new Promise(resolve => setTimeout(resolve, ms));}

// Counts # of items, tbh useless
let itemCount = 0;

// When webpage loads, runs this

function setup(){
    $('.sidebar-settings').fitText(1)
    listdiv.style.marginTop = document.getElementById("buttons").offsetHeight + "px"
    if(ls.getItem("todolist") != null){
        templistitems = JSON.parse(ls.getItem("todolist"))
        startUpLoadItems()
    }
}

// following code changes option to automatically number todo items
numTextOption = JSON.parse(ls.getItem("numText"))
settingNumTextEl.checked = numTextOption

$(document).on('change', '#setting-num-text', function(e){
    cl("Turned Numbered Text Option" + settingNumTextEl.checked)
    numTextOption = settingNumTextEl.checked;
    ls.setItem("numText", numTextOption)
    updateChecked()
})

$(document).on('change', '.todo_checkbox', function(e){
    let idx = $(this).attr('id').substring(14)
    if ((this.checked) && ($(`#todo_value_${idx}`).val() != undefined)) {$(getInputElement(idx)).css({'text-decoration':'line-through'})}
    else {$(getInputElement(idx)).css({'text-decoration':'none'})}
})

function updateChecked(){
    for(var i = 0; i < listitems.length; i++) {
        if(numTextOption == true) {
            getInputElement(i).placeholder = getDebugText(i)
        }
        else {
            getInputElement(i).placeholder = '(nothing here)';
        }
    }
}

// Stores all items
let listitems = [];

// turns object into string, stores it in ls
function updateLS(reload){
    ls.setItem("todolist", JSON.stringify(listitems))
    if(reload) {location.reload();}
}

// For every thing in ls, it reflects it inside the html
function startUpLoadItems() {
    templistitems.forEach(element => {
        generateNewListItem(element.text, element.ifCompleted, false, element.date)
    });
}

function updatePlaceholderValue(index) {
    getInputElement(index).placeholder = getDebugText(index);
}

function updateSpecificText(id){
    document.getElementById()
}

// Generates HTML objects for a task
function generateNewListItem(text, ifCompleted, ifNewItem, date) {
    id = itemCount;
    itemCount++;
    if (ifNewItem) text = document.getElementById("inputField").value;
    // adds element in listitems
    listitems.push({'id': id,'text':text,'ifCompleted':ifCompleted, 'date': date})

    
    $('#list').append(`
        <div class = "todo" id = "${id}">
            <input class = "todo_checkbox" id = "todo_checkbox_${id}" type = "checkbox"></input>
            <input disabled class = "todo_value" id = "todo_value_${id}" placeholder = "${getDebugText(id)}" value = "${text}"> 
            <span class = "material-symbols-outlined cancel todo_edit" id = "todo_edit_${id}"> edit </span>
            <span class = "material-symbols-outlined todo_cal" id = "todo_cal_${id}"> event </span>
            <span class = "material-symbols-outlined cancel todo_del" id = "todo_del_${id}"> cancel </span>
        </div>
    `)

    if(!numTextOption) {
        $(`#todo_value_${id}`).attr('placeholder','(nothing here)')
    }
    else {
        updatePlaceholderValue(id)
    }
    // Append Child adds elemenet inside the parent
    if(ifCompleted) document.getElementById('todo_checkbox_' + id).checked = true;

    if (ifCompleted && text != '') {$(getInputElement(id)).css({'text-decoration':'line-through'})}

    updateLS(false)
}

// starts everything
setup()

// detects change in the input field & checkbox, stores it in listitems and ls
$(document).on('input', '.todo_value', function(e){
    let index = e.target.getAttribute("id").substring(11)
    listitems[index].text = e.target.value
    updateLS(false)
})

$(document).on('change', '.todo_checkbox', function(e){
    let index = e.target.getAttribute("id").substring(14)
    listitems[index].ifCompleted = e.target.checked
    updateLS(false)
})

function changeIdOfListItem(classTodoElement){
    numElements = classTodoElement.children.length;
    let currentID = JSON.parse($(classTodoElement).attr('id'))
    $(classTodoElement).attr('id',JSON.stringify(currentID-1))
    for (let idx = 0; idx < numElements; idx++) {
        let orgStr = $(classTodoElement.children[idx]).attr('id');
        if(orgStr == undefined) continue;
        let orgStrAbridged = orgStr.split('_')[0] + '_' + orgStr.split('_')[1];
        let newStrIndex = JSON.stringify(currentID-1)
        let newStr = orgStrAbridged + '_' + newStrIndex;
        $(classTodoElement.children[idx]).attr('id', newStr)
    }
    listitems[currentID-1].id --;
    if(numTextOption) updatePlaceholderValue(currentID-1)
    updateLS(false);
}


// removes item from list
function removeItem(index){
    cl("removing this item: " + index)
    listitems.splice(index,1)
    updateLS(false)
    listdiv.children[index].remove()
    Array.from(listdiv.children).forEach(element => {
        let value_element = element.children[1];
        let valueCurrentID = getInputElementID(value_element);
        if (valueCurrentID > index) changeIdOfListItem(element)
    });
    itemCount--;
}

$(document).on('click', '.todo_del', function(e){
    let index = this.getAttribute("id").substring(9)
    removeItem(index)
})



let hamburgerMenuOpen = false;
let prevHamburgerIndex;
$(document).on('click','.todo_cal', function(e){
    let currentID = JSON.parse(this.getAttribute("id").substring(9));
    if(hamburgerMenuOpen) {
        $(".cal_menu").remove()
        if (prevHamburgerIndex == currentID) {
            hamburgerMenuOpen = false;
            return;
        }
    }
    
    $(this).after(`
    <div class = 'cal_menu'>
        Calender Feature Not Avaliable Yet.
    </div>
    `)
    hamburgerMenuOpen = true;
    prevHamburgerIndex = JSON.parse(this.getAttribute("id").substring(9));
})


function clearchecked(){
    listitems.forEach(function callback(element, index){
        if(element.ifCompleted == true){
            cl(index)
            removeItem(index)
        }
    });
}


document.getElementById('toggle-sidebar').addEventListener('click',function(){
    $('.sidebar-container').toggleClass('sidebarActive')
})

$(document).on('click','.sidebar-settings', function () {
    let clickedElement = $(this).attr('id');
    switch (clickedElement) {
        case 'settings':
            document.getElementById('modal-settings').showModal()
            break;
            
        case 'other':
            window.location.href = '404.html'
            break;
        
        case 'log-out':
            document.getElementById('modal-log-out').showModal()
            break;
            
            default:
                console.error("Modal ID not in list")
                sleep(400).then( () => {window.location.href = '404.html'})
                break;
            }
})
            
function changeEditable(idx) {
    let el = getInputElement(idx)
    if($(el).attr('disabled') == 'disabled') {
        $(el).attr('disabled', null)
        $(el.parentNode).css('background-color','var(--svg-darker)')
        el.select()
        return;
    }
    $(el).attr('disabled', 'disabled')
        $(el.parentNode).css('background-color','var(--svg-dark)')
}
                
$(document).on('click','.todo_edit',function(){
    let idx = $(this).attr('id').substring(10)
    changeEditable(idx)
})

$(document).on("blur", '.todo_value', function() {
    let idx = $(this).attr('id').substring(11)
    cl(idx)
    changeEditable(idx)
});


