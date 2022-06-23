
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
    new dbProduct(1, "Jaket", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtyhGHFxPI37CP-wHiauWF-Fv9n45xtNx5Mg&usqp=CAU", "SKU-1-912087", "General", 10, 100000),
    new productFnb(2, "Apel", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwchWJmM3HrPZEdeBeQLhiICRlp3xEb9kARw&usqp=CAU", "SKU-2-782319", "FnB", 15, 2500, "2022-07-09"),
    new dbProduct(3, "Helm", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzcNYrnAEVH6sQj_eu0mSXqHN0hQZkk0etvw&usqp=CAU", "SKU-3-612782", "General", 20, 200000),
    new productFnb(4, "Pisang", "https://img.okezone.com/content/2020/05/15/298/2214844/ciri-ciri-pisang-matang-sempurna-bReK2YGBA0.jpg", "SKU-4-228344", "FnB", 10, 1000, "2022-06-25")
];

// console.log(databaseProduct);
////////////////////////////// USER LOGIN //////////////////////////////////
let userName = '';

const loginBtn = () => {
    userName = document.getElementById("user").value;
    if (userName == ''){
        alert(`Silahkan Login Terlebih Dahulu⚠️`);
    } else {
        alert(`Selamat Datang, ${userName} !`);
    }

    console.log(userName);
};

/////////////////////////// PRINT DATABASE /////////////////////////////////

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
                <td><button type="button" onclick="saveBtn(${val.id})">Save</button>
                <button type="button" onclick="cancelBtn(${val.id})">Cancel</button></td>
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
                <td>Rp. ${val.price.toLocaleString("id")}</td>
                <td>${val.expire ? val.expire : "-"}</td>
                <td>
                <button type="button" id="buybutton${val.id}" onclick="buyBtn(${val.id})">Buy</button>
                <button type="button" onclick="editBtn(${val.id})">Edit</button>
                <button type="button" onclick="delBtn(${val.id})">Delete</button>
                </td>
            </tr>`
        }
    }).join('');
};

const delBtn = (value) => {
    let index = databaseProduct.findIndex((val) => val.id == value);
    databaseProduct.splice(index, 1);
    printData();
};

printData(databaseProduct);

/////////////////////////// FILTER FEATURE /////////////////////////////////
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
    
    //console.log(objFilter);
    
    let result = [];
    databaseProduct.forEach((val) => {
        let databaseKeys = Object.keys(val);
        let filterKeys = Object.keys(objFilter); // data yang diinput / dicari

        //console.log(databaseKeys);
        //console.log(filterKeys);
        
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
        //console.log(checkFilter);
        if (!checkFilter.includes(false)){
            result.push(val);
        };
    });
    printData(result);
};
       
const resetFilter = () => {
    let form = document.getElementById("filter-data");
    form.elements["filname"].value = null;
    form.elements["filsku"].value = null;
    form.elements["filcategory"].value = null;
    form.elements["filprice"].value = null;  
    
    printData();
};

/////////////////////////// EDIT FEATURE /////////////////////////////////
const editBtn = (value) => {
    printData(databaseProduct, value);
};

const saveBtn = (valueid) => {
    // cari index yang sama dengan yang di edit ==> findIndex
    let searchIndex = databaseProduct.findIndex((val) => val.id == valueid);
    // compile semua data yang diedit jadi 1 object
    let editCompile = 
    {
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

/////////////////////////// CART FEATURE /////////////////////////////////
class BuyProduct {
    constructor(_id, _sku, _image, _name, _price, _qty, _subtotal){
        this.id = _id;
        this.sku = _sku;
        this.image = _image;
        this.name = _name;
        this.price = _price;
        this.qty = _qty;
        this.subtotal = _subtotal;
    };
};

// data penampung cart
let cart = [];

// button function
const printCart = () => {
    let list = cart.map ((val, idx) => {
        return `
        <tr>
            <td><input type="checkbox" id="checkitem${val.id}" value=${val.id}></td>
            <td>${val.sku}</td>
            <td><img src="${val.image}" width="75px"></td>
            <td>${val.name}</td>
            <td>Rp. ${val.price.toLocaleString("id")}</td>
            <td>
            <button type="button" onclick="changeQty('minus', ${val.id})">-</button>
            ${val.qty}
            <button type="button" onclick="changeQty('plus', ${val.id})">+</button>
            </td>
            <td>Rp. ${val.subtotal.toLocaleString("id")}</td>
            <td><button type="buton" onclick="delCartBtn(${val.id})">Remove</td>
        </tr>`
    });
    document.getElementById("cartlist").innerHTML = list.join("");
};

const buyBtn = (valueid) => {
if (userName){
    // mengurangi stok pada database
    let findIndex = databaseProduct.findIndex((val) => val.id == valueid)
    let cartIndex = cart.findIndex((val) => val.id == valueid)
    if (databaseProduct[findIndex].stock > 0){
        databaseProduct[findIndex].stock -= 1;
        printData(databaseProduct);

        // cek produk apakah sudah ada atau belum
        if (cartIndex >= 0){
            cart[cartIndex].qty += 1;
            cart[cartIndex].subtotal = cart[cartIndex].qty * databaseProduct[findIndex].price;
    
            databaseProduct[findIndex].stock - 1;
            printCart()
        } else {
            let id = valueid;
            let sku = databaseProduct[findIndex].sku;
            let image = databaseProduct[findIndex].image;
            let name = databaseProduct[findIndex].name;
            let price = databaseProduct[findIndex].price;
            let qty = 1;
            let subtotal = parseInt(qty * databaseProduct[findIndex].price);
                
            cart.push(new BuyProduct(id, sku, image, name, price, qty, subtotal));
            printCart();
        };
    } else {
        alert(`Stock Barang Habis`);
        printData(databaseProduct);
        printCart();
    }
    //console.log(cart);
} else {
    alert(`Silahkan Login Terlebih Dahulu⚠️`);
}

console.log(userName);
};

const delCartBtn = (valueid) => {
    let index = cart.findIndex((val) => val.id == valueid);
    let findIndex = databaseProduct.findIndex((val) => val.id == valueid);

    databaseProduct[findIndex].stock += cart[index].qty;
    printData(databaseProduct);

    cart.splice(index, 1);
    printCart();
};

const changeQty = (action, valueid) => {
    let findIndex = databaseProduct.findIndex((val) => val.id == valueid);
    let cartIndex = cart.findIndex((val) => val.id == valueid);

    let qty = cart[cartIndex].qty;
        if (action == "plus"){
            if (databaseProduct[findIndex].stock > 0){
                databaseProduct[findIndex].stock -= 1;
                printData(databaseProduct);

                cart[cartIndex].qty += 1;
                cart[cartIndex].subtotal = cart[cartIndex].qty * cart[cartIndex].price;
                printCart();
            } else {
                alert(`Stock Barang Habis`);
                printData(databaseProduct);
                printCart();
            }
        } else if (action == "minus"){
            if(cart[cartIndex].qty > 1){
                databaseProduct[findIndex].stock += 1;
                printData(databaseProduct);

                cart[cartIndex].qty -= 1;
                cart[cartIndex].subtotal = cart[cartIndex].qty * cart[cartIndex].price;
                printCart() 
            } else if (cart[cartIndex].qty <= 1){
                databaseProduct[findIndex].stock += 1;
                printData(databaseProduct);

                let cartIndex = cart.findIndex((val) => val.id == valueid);
                cart.splice(cartIndex, 1);
                printCart();
            }
        } 
        //console.log(cart)
};

const deleteItem = () => {
    // 1. Mengakses setiap data product cart satu per satu --> looping --> forEach
    // 2. Mengetahui apakah product tersebut dipilih => getElementById --> checkid
        // 3. Jika checkbox dari product bernilai true, kita ambil datanya --> if(condition)
        // 4. Mengambil qty data product index, kemudian reassign ke stock --> += 
        // 5. menghapus data product pada cart berdasarkan index yang kita dapatkan sebelumnya --> splice

        // 6. jika checkbox bernilai false, maka product akan tetap ada
        // 7. Refresh tampilan product dan juga keranjang

        let selectedItem = [];
        cart.forEach((val, idx) => {
            if (document.getElementById(`checkitem${val.id}`).checked){
                let findIndex = databaseProduct.findIndex((value) => value.id == val.id)
                databaseProduct[findIndex].stock += val.qty;    
                selectedItem.push(val.id);
            }
        });
        selectedItem.forEach((val, idx) => {
            let cartIndex = cart.findIndex((value) => value.id == val)
            cart.splice(cartIndex, 1);
        })
    printCart()
    printData()
};

/////////////////////////// CHECKOUT FEATURE //////////////////////////////////////
let arr = [];
const printPayment = (data = arr) => {
    let list = data.map ((val, idx) => {
        return `
        <tr>
        <td>${val.sku}</td>
        <td>Rp. ${val.subtotal.toLocaleString("id")}</td>
        </tr>`
    });
    document.getElementById("checkout").innerHTML = list.join("");
};

const checkoutBtn = () => {
    cart.forEach((val, idx) => {
        if (document.getElementById(`checkitem${val.id}`).checked == true){
            arr.push({id: val.id, sku: val.sku, subtotal: val.subtotal});
        }
    });
    arr.forEach((val, idx) => {
        let cartIndex = cart.findIndex((value) => value.id == val.id)
        cart.splice(cartIndex, 1);
    });
        //console.log(`ini cart`, cart);
        //console.log(`ini arr`, arr);
    printCart();
    printPayment();

    let sum = 0; // string
    arr.forEach((val, idx) => {
        if (arr[idx].subtotal > 0){
            sum += arr[idx].subtotal;
        }
    });
        //console.log(sum);
    let summary = `Rp. ${sum.toLocaleString("id")},-`
    document.getElementById("sum").innerHTML = summary;
};

const paymentBtn = () => {
    let cash = parseInt(document.getElementById("cash").value);
        //console.log(`Ini pembayaran`, cash)
    let sum = 0; // string
    arr.forEach((val, idx) => {
        if (arr[idx].subtotal > 0){
            sum += arr[idx].subtotal;
        }
    }); 
    let totalPayment = parseInt(sum);
        //console.log(`Ini totalpayment`, totalPayment);
    let calculate = cash - totalPayment;
        //console.log(`Ini calculate`, calculate);
    if (calculate == 0){
        alert(`Pembelian Anda Berhasil✅`);
        arr.splice(0, arr.length);
        printPayment();
        document.getElementById("sum").innerHTML = `Rp. 0,-`;
        document.getElementById("cash").value = '';
        document.getElementById("user").value = '';
        inputReport(totalPayment);
        printReport();
        userName = '';
    } else if (calculate > 0){
        alert(`Pembelian Anda Berhasil✅. \nBerikut Kembalian Anda Rp. ${calculate.toLocaleString("id")}`);
        arr.splice(0, arr.length);
        printPayment();
        document.getElementById("sum").innerHTML = `Rp. 0,-`;
        document.getElementById("cash").value = '';
        document.getElementById("user").value = '';
        inputReport(totalPayment);
        printReport();
        userName = '';
    } else if (calculate < 0){
        let minus = -calculate;
        let text = `Maaf Uang Anda Kurang Rp. ${minus.toLocaleString("id")}`
        document.getElementById("cashdisplay").innerHTML = text;
        document.getElementById("cash").value = '';
        printReport();
    }
};

/////////////////////////// REPORT FEATURE /////////////////////////////////////////

class Report {
    constructor(_date, _name, _transaction){
        this.date = _date;
        this.name = _name;
        this.transaction = _transaction;
    }
};

let reportArr = [];

const inputReport = (totalPayment) => {

    let user = userName;

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = `${dd}/${mm}/${yyyy}`;

    let transaction = totalPayment;
    reportArr.push(new Report(today, user, transaction));
    console.log(reportArr);
};

const printReport = () => {
    let print = reportArr.map((val, idx) => {
        return `
        <tr>
            <td>${idx + 1}</td>
            <td>${val.date}</td>
            <td>${val.name}</td>
            <td>Rp. ${val.transaction.toLocaleString("id")}</td>
        </tr>`
    });
    document.getElementById("report").innerHTML = print.join("");

    let total = 0;
    reportArr.forEach((val, idx) => {
        if (reportArr[idx].transaction > 0){
            total += reportArr[idx].transaction;
        }
    })
    let printTotal = `Total Omzet Rp. ${total.toLocaleString("id")},-`
    document.getElementById("displayomzet").innerHTML = printTotal;
};