
//document.addEventListener('click', editBtn)

//---------> Add item <----------------------
var tbody = document.getElementsByTagName('tbody')[0]

var addItem = document.createElement('button')
addItem.className = 'addItem'
addItem.textContent = 'Add New Item'
tbody.parentElement.appendChild(addItem)

addItem.addEventListener('click', addItemList)
var itemNo = 2
function addItemList(){
    if(itemNo == 10){
        alert('Maximum items lenght is 9!')
        return false
    }
    tbody.innerHTML += `<tr>
    <td class="no">0${itemNo}</td>
    <td class="desc" ><h3 style="display: inline;" name="Biller Address" id="item${itemNo}decs" contenteditable="true" name="Item Name" id="item-name" >Website Design</h3></td>
    <td class="unit"><label>₦</label><h4 oninput="let one = document.querySelector('#item${itemNo}total');let two = document.querySelector('#item${itemNo}qty'); let total = (Math.round(parseFloat(this.textContent) * 100) / 100).toFixed(2) * parseInt(two.textContent); let totaltwo = (Math.round(parseFloat(total) * 100) / 100).toFixed(2); one.textContent = parseFloat(totaltwo).toLocaleString() ; ; subtotal()" style="display: inline-block;" name="Biller Address" id="item${itemNo}price" contenteditable="true">0.00</h4></td>
    <td class="qty"><h4 oninput="let one = document.querySelector('#item${itemNo}total');let two = document.querySelector('#item${itemNo}price'); let total = (Math.round(parseFloat(two.textContent) * 100) / 100).toFixed(2) * parseInt(this.textContent); let totaltwo = (Math.round(parseFloat(total) * 100) / 100).toFixed(2); one.textContent = parseFloat(totaltwo).toLocaleString() ; subtotal()" style="display: inline-block;" name="Biller Address" id="item${itemNo}qty" contenteditable="true">1</h4></td>
    <td class="total"><label>₦</label><h4 style="display: inline-block;" name="Biller Address" id="item${itemNo}total">0.00</h4></td>
  </tr>`
  itemNo++
  document.body.querySelectorAll('.circle').forEach((e)=>{
      e.remove()
  })
  editBtn()
  subtotal()
}
// tbody.parentElement.insertBefore(addItem, tbody)


document.addEventListener('blur', reset, true) 
function reset(e){
    if(e.target.getAttribute('contenteditable') == 'true'){
        //console.log('yes')
        var element = e.target;
        if (element.textContent == '' || element.textContent == undefined){element.textContent = 'Abdul'}
    }
}
window.onload = editBtn
function editBtn(){
    document.body.querySelectorAll('*').forEach((e)=>{
        if(e.getAttribute('contenteditable') == 'true'){
            if(e.getAttribute('already') == 'yes'){
                console.log('Already')
                //return false
            }
                var mainElement = e
                mainElement.style.position = 'relative';
                mainElement.style.width = 'fit-content'
                
                var circle = document.createElement('editIcon')
                circle.innerHTML = `<i class='fas fa-pen'></i>`
                circle.setAttribute('onClick', "this.previousElementSibling.focus()")
                var textNode = document.createElement(mainElement.tagName)
                textNode.textContent = mainElement.textContent
                //console.log(textNode)
                textNode.setAttribute('contenteditable', 'true')
                textNode.setAttribute('already', 'yes')
                textNode.setAttribute('oninput', mainElement.getAttribute('oninput'))
                textNode.id = mainElement.id
                textNode.className = mainElement.className
                textNode.style.display = 'inline'
                //textNode.style.padding = '0px'
                // console.log(getComputedStyle(mainElement).fontSize)
                textNode.style.fontSize = `${getComputedStyle(mainElement).fontSize}`
                mainElement.innerHTML = ''
                mainElement.appendChild(textNode)
                circle.className = 'circle'
                mainElement.appendChild(circle)
                mainElement.removeAttribute('contenteditable')
                mainElement.id = ''
                
                //console.dir(e.clientWidth)
            //console.log(e)
        }
    })
    
    // if(e.target.getAttribute('contenteditable') == 'true'){
    //     var mainElement = e.target
    //     var circle = document.createElement('div')
    //     circle.className = 'circle'
    //     mainElement.appendChild(circle)
    //     console.dir(e.target.clientWidth)
    // }
}


//----Print Page ------------------

var printPageBtn = document.querySelector('.printPage')
var logoPen = document.querySelector('#logoPen')
printPageBtn.addEventListener('click', printPage)

function printPage(){
    saveCompanyData()
    console.log('Print')
    document.body.querySelectorAll('.circle').forEach((e)=>{
        e.style.display = 'none'
    })
    addItem.style.display = 'none'
    logoPen.style.display = 'none'
    this.style.display = 'none'
    window.print()
    setTimeout(() => {
        document.body.querySelectorAll('.circle').forEach((e)=>{
            e.style.display = 'flex'
        })
        logoPen.style.display = 'inline'
        addItem.style.display = 'inline'
        this.style.display = 'flex'
    }, 15000);

}
document.body.querySelectorAll('.circle').forEach((e)=>{
    e.style.display = 'none'
})

//_______________________>>>>>>

//---------Change Logo------------------------>>
var logo = document.getElementById('logosource')
var fileInput = document.getElementById('file')

logo.addEventListener('click', changeLogo)

function changeLogo(){
    fileInput.click()
    fileInput.onchange = function(i){
        var filer = i.target.files[0];
        if( filer.size > 2000000){
            alert('Max logo size is 2Mb!')
            return false
        }                      
        var reader = new FileReader();
        reader.onload = function(file) {
        console.log('Logo Changed!')
        logo.src = file.target.result
        }
        reader.readAsDataURL(filer)
}
}

//______________________________________>>>>>>

//--------------Subtotal------------------->>>
var total = new Number
function subtotal(){
    total = 0
    Array.from(tbody.children).forEach((e)=>{
        total += parseFloat(e.lastElementChild.lastElementChild.innerHTML.replace(/\,+/g, ''))
    })
    var subtotal = document.getElementById('subtotal')
    var grandtotal = document.getElementById('grandtotal')
    var check = (Math.round(parseFloat(total) * 100) / 100).toFixed(2);
    subtotal.textContent = '₦'+ parseFloat(check).toLocaleString()
    grandtotal.textContent = '₦'+ parseFloat(check).toLocaleString()
}
subtotal()
//__________________________________________>>>

//---------Invoice Numner and date------------->>

var invoice_no = document.getElementById('invoiceno')
var invoice_random = Math.floor(Math.random() * 10000)
var invoice_date = document.getElementById('invoicedate')
var invoice_due = document.getElementById('invoicedue')

var dateTo = new Date()
var dateDue = new Date()
dateDue.setDate(dateTo.getDate() + 7)

invoice_no.innerHTML = `INVOICE IN${invoice_random}`
invoice_date.innerHTML = `Date of invoice: ${new Date().toLocaleDateString('en-Au')}`
invoice_due.innerHTML = `Due Date: ${dateDue.toLocaleDateString('en-Au')}`



//__________________________________>>>>>

//----------Save Company Details to local storage----------->>

    var company_name = document.getElementById('company-name')
    var company_address = document.getElementById('company-address')
    var company_phone = document.getElementById('company-phone')
    var company_email = document.getElementById('company-email')
    var acc_name = document.getElementById('acc_name')
    var acc_no = document.getElementById('acc_no')
    var bank_name = document.getElementById('bank_name')

function saveCompanyData(){
    localStorage.setItem('name', company_name.textContent)
    localStorage.setItem('address', company_address.textContent)
    localStorage.setItem('phone', company_phone.textContent)
    localStorage.setItem('email', company_email.textContent)
    localStorage.setItem('logo', logo.src)
    localStorage.setItem('acc_name', acc_name.textContent)
    localStorage.setItem('acc_no', acc_no.textContent)
    localStorage.setItem('bank_name', bank_name.textContent)
}
function retrieveCompanyData(){
    if(localStorage.getItem('name')){
        console.log('We have data')
        company_name.textContent = localStorage.getItem('name')
        company_address.textContent = localStorage.getItem('address')
        company_phone.textContent = localStorage.getItem('phone')
        company_email.textContent = localStorage.getItem('email')
        logo.src = localStorage.getItem('logo')
        acc_name.textContent = localStorage.getItem('acc_name')
        acc_no.textContent = localStorage.getItem('acc_no')
        bank_name.textContent = localStorage.getItem('bank_name')
    }
}
retrieveCompanyData()


//_______________________________________>>>>>>>>>>>>>>>>
// document.addEventListener('keyup', (e)=>{
//     console.log(e.keyCode)
//     var evt = window.event || e;
//     if(evt.which == 18 && evt.which == 80){
//         console.log('print')
//     }
// }, false) 
// function editBtn(e){
//     if(e.target.getAttribute('contenteditable') == 'true'){
//         var mainElement = e.target
//         var circle = document.createElement('div')
//         circle.className = 'circle'
//         mainElement.appendChild(circle)
//         console.dir(e.target.clientWidth)
//     }
// }