let total=document.getElementById('total')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let count=document.getElementById('count')
let category=document.getElementById('category')
let title=document.getElementById('title')
let submit=document.getElementById('create')
let search=document.getElementById('search')

let flag='create'
let tmp
// get total function
function getTotal(){
    if(price.value!=''){
        let result=+price.value+ +taxes.value+ +ads.value- +discount.value
        total.innerHTML=result
        total.style.background='#3D30A2'
    }
    else{
        total.innerHTML=''
        total.style.background='#6F4E37'
    }
}
// create product

let data
if(localStorage.products!=null){
    data=JSON.parse(localStorage.products)
}
else{
    data=[]
}
submit.onclick=function(){
    dataobj={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    // count
    if(title.value!=''&&price.value!=''&&category.value!=''&&count.value<200){
     if(flag==='create'){
       if(dataobj.count>1){
        for (let i = 0; i < dataobj.count; i++) {
            data.push(dataobj)
        }
        }
        else{
        data.push(dataobj)
        } 
    }

    else{
        data[tmp]=dataobj
        count.style.display='block'
        submit.innerHTML='Create'
        flag='create'
    } 
    clearinputs()  
    }
    
    // save in local storage
    localStorage.setItem('products',JSON.stringify(data))
    showdata()
}
// clear inputs
function clearinputs(){
    title.value=''
    price.value=''
    ads.value=''
    taxes.value=''
    discount.value=''
    total.innerHTML=''
    total.style.background='#6F4E37'
    count.value=''
    category.value=''
}

// read
showdata()
function showdata(){
    getTotal()
    let table=''
    tbody=document.getElementById('tbody')
    for (let i = 0; i < data.length; i++) {
        table+=`
        <tr>
            <td>${i}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td><button onclick="updateitem(${i})">update</button></td>
            <td><button onclick="deleteitem(${i})">delete</button></td>
        </tr>
        `    
    }
    let deleteall=document.getElementById('deleteall')
    tbody.innerHTML=table
    if(data.length>0){
        deleteall.innerHTML=`
        <button onclick="deleteall()">DELETE ALL (${data.length})</button>
        `
    }
    else{
        deleteall.innerHTML=''
    }
}
// delete
function deleteitem(i){
    data.splice(i,1)
    localStorage.products=JSON.stringify(data)
    showdata()
}
function deleteall(){
    localStorage.clear()
    data.splice(0)
    showdata()

}

// update
function updateitem(i){
    title.value=data[i].title
    price.value=data[i].price
    taxes.value=data[i].taxes
    ads.value=data[i].ads
    discount.value=data[i].discount
    category.value=data[i].category
    count.style.display='none'
    submit.innerHTML='Update'
    getTotal()
    flag='update'
    tmp=i
    scroll({
        top:0,
        behavior:'smooth'
    })
}
let mood='title'
// search
function searchdata(value){
    
    if(value=='stitle'){
        search.placeholder='search by title'  
        mood='title' 
    }
    else{
        search.placeholder='search by category'
        mood='cat'
    }
    search.focus()
    search.value=''
    showdata()   
}
function showsearch(){
    let table=''
    tbody=document.getElementById('tbody')
    for (let i = 0; i < data.length; i++) {
        if(mood=='title'){
            if(data[i].title.includes(search.value.toLowerCase())){
                table+=`
                        <tr>
                            <td>${i+1}</td>
                            <td>${data[i].title}</td>
                            <td>${data[i].price}</td>
                            <td>${data[i].taxes}</td>
                            <td>${data[i].ads}</td>
                            <td>${data[i].discount}</td>
                            <td>${data[i].total}</td>
                            <td>${data[i].category}</td>
                            <td><button onclick="updateitem(${i})">update</button></td>
                            <td><button onclick="deleteitem(${i})">delete</button></td>
                        </tr>
                        `
            }
            
        }
        else{
            if(data[i].category.includes(search.value.toLowerCase())){
                table+=`
                        <tr>
                            <td>${i}</td>
                            <td>${data[i].title}</td>
                            <td>${data[i].price}</td>
                            <td>${data[i].taxes}</td>
                            <td>${data[i].ads}</td>
                            <td>${data[i].discount}</td>
                            <td>${data[i].total}</td>
                            <td>${data[i].category}</td>
                            <td><button onclick="updateitem(${i})">update</button></td>
                            <td><button onclick="deleteitem(${i})">delete</button></td>
                        </tr>
                        `
            }
            
        }            
    }
    tbody.innerHTML=table 

}
// violations
