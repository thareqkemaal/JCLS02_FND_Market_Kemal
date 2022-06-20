
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
let databaseProduct = [
    new dbProduct(1, "Jaket", "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/1/11/af28cec6-6626-47d1-8bcc-aa08d1b0efa0.jpg", "SKU-1-912087", "General", 10, 100000),
    new productFnb(2, "Apel", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwchWJmM3HrPZEdeBeQLhiICRlp3xEb9kARw&usqp=CAU", "SKU-2-782319", "FnB", 50, 2500, "2022-07-09"),
    new dbProduct(3, "Helm", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzcNYrnAEVH6sQj_eu0mSXqHN0hQZkk0etvw&usqp=CAU", "SKU-3-612782", "General", 20, 200000),
    new productFnb(4, "Pisang", "https://img.okezone.com/content/2020/05/15/298/2214844/ciri-ciri-pisang-matang-sempurna-bReK2YGBA0.jpg", "SKU-4-228344", "FnB", 100, 1000, "2022-06-25")
];

console.log(databaseProduct);

let getId = 5;
let addId = 5;
const incrementId = () => {
    addId++;
    getId = addId;
};

document.getElementById("prodcategory").onchange = function () {
    if(this.value == "FnB"){
        document.getElementById("prodexpire").disabled = false;
    } else {
        document.getElementById("prodexpire").disabled = true;
    };
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
    if (expire == ""){
        if (category == "General"){
        databaseProduct.push(new dbProduct(id, name, image, sku, category, stock, price));
        } else {
            alert(`Belum Memasukkan Tanggal Expire⚠️`);
        }
    } else {
        databaseProduct.push(new productFnb(id, name, image, sku, category, stock, price, expire));
    };
    
    //reset input
    form.elements["prodname"].value = null;
    form.elements["prodimage"].value = null;
    form.elements["prodcategory"].value = null;
    form.elements["prodstock"].value = null;
    form.elements["prodprice"].value = null;
    form.elements["prodexpire"].value = null;
    form.elements["prodexpire"].disabled = true;
    
    // print data
    printData();
} ;  

const printData = (data = databaseProduct, value) => {
    document.getElementById("listdata").innerHTML = data.map((val, idx) => {
        if (val.id == value){
            return `
            <tr>
                <td>${idx + 1}</td>
                <td>${val.sku}</td>
                <td><img src="${val.image}" width="75px"></td>
                <td><input id="editname" type="text" value="${val.name}"/></td>
                <td>${val.category}</td>
                <td><input id="editstock" type="number" value="${val.stock}"/></td>
                <td><input id="editprice" type="number" value="${val.price}"/></td>
                <td>${val.expire ? val.expire : "-"}</td>
                <td><button type="button" onClick="saveBtn(${val.id})">Save</button>
                <button type="button" onClick="cancelBtn(${val.id})">Cancel</button></td>
            </tr>`
        } else {
            return `
            <tr>
                <td>${idx + 1}</td>
                <td>${val.sku}</td>
                <td><img src="${val.image}" width="75px"></td>
                <td>${val.name}</td>
                <td>${val.category}</td>
                <td>${val.stock}</td>
                <td>Rp. ${val.price.toLocaleString("id")},00</td>
                <td>${val.expire ? val.expire : "-"}</td>
                <td><button type="button" onClick="editBtn(${val.id})">Edit</button>
                <button type="button" onClick="delBtn(${val.id})">Delete</button></td>
            </tr>`
        }
    }).join('');
};


const filter = () => {
    let form = document.getElementById("filter-data");
    
    let objFilter = new Object();
    if (form.elements["filname"].value != ''){
        objFilter.name = form.elements["filname"].value;
    };
    if (form.elements["filsku"].value != ''){
        objFilter.sku = form.elements["filsku"].value;
    };
    if (form.elements["filcategory"].value != 'null'){
        objFilter.category = form.elements["filcategory"].value;
    };
    if (form.elements["filprice"].value != ''){
        objFilter.price = parseInt(form.elements["filprice"].value);
    };
    
    console.log(objFilter);
    
    let result = [];
    databaseProduct.forEach((val) => {
        let databaseKeys = Object.keys(val);
        let filterKeys = Object.keys(objFilter); // data yang diinput / dicari

        console.log(databaseKeys);
        console.log(filterKeys);
        
        let checkFilter = [];
        databaseKeys.forEach((value) => {
            if (filterKeys.includes(value)){
                if (value == "sku" || value == "name"){
                    checkFilter.push(val[value].includes(objFilter[value]));
                } else {
                    checkFilter.push(val[value] == objFilter[value]);
                };
            };
        });
        console.log(checkFilter);
        if (!checkFilter.includes(false)){
            result.push(val);
        };
    });
    printData(result);
};

const delBtn = (value) => {
    let index = databaseProduct.findIndex((val) => val.id == value);
    databaseProduct.splice(index, 1);
    printData();
};
        
const resetFilter = () => {
    let form = document.getElementById("filter-data");
    form.elements["filname"].value = null;
    form.elements["filsku"].value = null;
    form.elements["filcategory"].value = null;
    form.elements["filprice"].value = null;  
    
    printData();
};
        
const editBtn = (value) => {
    printData(databaseProduct, value);
};

const saveBtn = (valueid) => {
    // cari index yang sama dengan yang di edit ==> findIndex
    let searchIndex = databaseProduct.findIndex((val) => val.id == valueid);

    // compile semua data yang diedit jadi 1 object
    let editCompile = {
        id: valueid,
        sku: databaseProduct[searchIndex].sku,
        image: databaseProduct[searchIndex].image,
        name: document.getElementById("editname").value,
        category: databaseProduct[searchIndex].category,
        stock: parseInt(document.getElementById("editstock").value),
        price: parseInt(document.getElementById("editprice").value),
        expire: databaseProduct[searchIndex].expire
    };
    // update data compile ke index yang dipilih
    databaseProduct[searchIndex] = editCompile;
    // cetak ulang
    printData(databaseProduct);
};

const cancelBtn = () => {
    printData();
};