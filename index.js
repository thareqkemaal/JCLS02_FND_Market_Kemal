let databaseProduct = [];

class dbProduct {
    constructor(_id, _name, _image, _sku, _category, _stock, _price){
        this.id = _id;
        this.name = _name;
        this.image = _image;
        this.sku = _sku;
        this.category = _category;
        this.stock = _stock;
        this.price = _price;
    }
}

class productFnb extends dbProduct {
    constructor(_id, _name, _image, _sku, _category, _stock, _price, _expire){
        super(_id, _name, _image, _sku, _category, _stock, _price);
        this.expire = _expire;
    }
}

let getId = 1;
let addId = 1;
const incrementId = () => {
    addId++;
getId = addId;
};

document.getElementById("prodcategory").onchange = function () {
    document.getElementById("prodexpire").setAttribute("disabled", "disabled");
    if(this.value == "FnB"){
        document.getElementById("prodexpire").removeAttribute("disabled");
    }
};

const addProduct = () => {

    let form = document.getElementById("addprod");

    let id = getId;
    let name = form.elements["prodname"].value;
    let image = form.elements["prodimage"].value;
    let sku = `SKU-${getId}-${Math.floor(100000 + Math.random() * 900000)}`;
    let category = form.elements["prodcategory"].value;
    let stock = parseInt(form.elements["prodstock"].value);
    let price = parseInt(form.elements["prodprice"].value);
    let expire = form.elements["prodexpire"].value;

    // input data ke database
    databaseProduct.push(new productFnb(id, name, image, sku, category, stock, price, expire));

    // print data
    printData(databaseProduct);

    //reset input
    form.elements["prodname"].value = null;
    form.elements["prodimage"].value = null;
    form.elements["prodcategory"].value = null;
    form.elements["prodstock"].value = null;
    form.elements["prodprice"].value = null;
    form.elements["prodexpire"].value = null;
    form.elements["prodexpire"].disabled = true;

    console.log(databaseProduct);
} ;  

const printData = (data = databaseProduct) => {
    document.getElementById("listdata").innerHTML = data.map((val, idx) => {
        return `<tr>
        <td>${idx + 1}</td>
        <td>${val.sku}</td>
        <td><img src="${val.image}" width="75px"></td>
        <td>${val.name}</td>
        <td>${val.category}</td>
        <td>${val.stock}</td>
        <td>Rp. ${(val.price).toLocaleString("id")},00</td>
        <td>${val.expire ? val.expire : "-"}</td>
        <td><button type="button" onClick="editBtn(${val.id})">Edit</button>
        <button type="button" onClick="delBtn(${val.id})">Delete</button></td>
        </tr>`
    }).join('');
};


const filter = () => {
    let form = document.getElementById("filter-data");
    
    let objFilter = new Object();
    
    if (form.elements["filname"].value != ''){
        objFilter.name = form.elements["filname"].value;
    };
    let inputfilsku = (form.elements["filsku"].value).split('-'); // outputnya array
    if (form.elements["filsku"].value != ''){
        objFilter.id = inputfilsku[1];
    };
    if (form.elements["filcategory"].value != 'null'){
        objFilter.category = form.elements["filcategory"].value;
    };
    if (form.elements["filprice"].value != ''){
        objFilter.price = form.elements["filprice"].value;
    };
    
    console.log(objFilter);
    
    let result = [];
    databaseProduct.forEach((val) => {
        let databaseKeys = Object.keys(val);
        let filterKeys = Object.keys(objFilter);
        
        let checkFilter = [];
        databaseKeys.forEach((value) => {
            if (filterKeys.includes(value)){
                if (val[value] == objFilter[value]){
                    checkFilter.push(true);
                } else {
                    checkFilter.push(false);
                }
            }
        })
        if (!checkFilter.includes(false)){
            result.push(val);
        }
    });
    printData(result);
    
    form.elements["filname"].value = null;
    form.elements["filsku"].value = null;
    form.elements["filcategory"].value = null;
    form.elements["filprice"].value = null;
};

const delBtn = (value) => {
    // databaseProduct.forEach((val, idx) => {
    //     if(val.id == value){
    //         databaseProduct.splice(idx, 1);
    //     }
    // });
    // printData();

    let index = databaseProduct.findIndex((val) => val.id == value);
    databaseProduct.splice(index, 1);
    printData();
};

const resetFilter = () => {
    printData(databaseProduct);
};

const editBtn = (value) => {
    
};