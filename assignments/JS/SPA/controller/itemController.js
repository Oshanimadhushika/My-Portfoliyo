$("#itemCode").focus();

$("#saveItem").click(function () {
    let itemCode = $("#itemCode").val();
    let itemName = $("#itemName").val();
    let quantity = $("#quantity").val();
    let price = $("#itemPrice").val();

    var itemObject = item(itemCode,itemName,quantity,price)

    items.push(itemObject);

    loadAllItems();
    bindRowClick();
    loadAllItemForOption();
    clearTexts();
});

function loadAllItems() {
    $("#tblItems").empty();

    for (let item of items) {
        console.log(item);

        var row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.quantity}</td><td>${item.price}</td></tr>`;

        $("#tblItems").append(row);
    }
}

function bindRowClick() {
    $("#tblItems>tr").click(function () {
        let code = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let qtyOnHand = $(this).children(":eq(2)").text();
        let price = $(this).children(":eq(3)").text();

        $('#update-itemCode').val(code);
        $('#update-itemName').val(name);
        $('#update-quantity').val(qtyOnHand);
        $('#update-itemPrice').val(price);
    });
}

/*$("#update-itemCode").on('keyup', function (event) {
   if(event.code == "Enter"){
       let typeCode = $("#update-itemCode").val();
       let item = searchItem(typeCode);
       if(item != null){
           setTextFieldValues(item.code, item.name, item.quantity, item.price);
       } else {
           Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'There is no Item available for that item code ' + typeCode,
           });
           setTextFieldValues("", "", "", "");
       }
   }
});*/

$("#updateItemSearchBtn").click(function () {
    let code = $("#updateItemSearch").val();
    let item = searchItem(code);
    if(item != null){
        setTextFieldValues(item.code, item.name, item.quantity, item.price);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There is no Item available for that item code ' + code,
        });
    }
});

$('#itemDelete').click(function () {
    let deleteCode = $('#update-itemCode').val();
    let option = confirm("Do you really want to delete item code: " + deleteCode);
    if(option){
        if (deleteItem(deleteCode)){
            Swal.fire('Item Successfully Deleted..');
            setTextFieldValues("","","","");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No such Item to delete. please check the code',
            });
        }
    }
});

$('#itemUpdate').click( function () {
    let updateCode = $('#update-itemCode').val();
    let response = updateItem(updateCode);
    if(response){
        Swal.fire('Item updated Successfully');
        setTextFieldValues("","","","")
        $("#update-itemCode").focus();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Update Failed..!',
        });
    }
})

function deleteItem(itemCode) {
    let item = searchItem(itemCode);
    if(item != null) {
        let indexNo = items.indexOf(item);
        items.splice(indexNo,1);
        loadAllItems();
        return true;
    } else {
        return false;
    }
}

function updateItem(itemCode) {
    let item = searchItem(itemCode);
    if(item != null){
        item.code = $('#update-itemCode').val();
        item.name = $('#update-itemName').val();
        item.quantity = $('#update-quantity').val();
        item.price = $('#update-itemPrice').val();
        loadAllItems();
        bindRowClick();
        return true;
    } else {
        return false;
    }
}

function setTextFieldValues(code, name, qtyOnHand, price) {
    $("#update-itemCode").val(code);
    $("#update-itemName").val(name);
    $("#update-quantity").val(qtyOnHand);
    $("#update-itemPrice").val(price);
}

function searchItem(itemCode) {
    for (const item of items) {
        if(item.code == itemCode){
            return item;
        }
    }
    return null;
}

function searchByName(itemName) {
    for (const item of items) {
        if(item.name == itemName){
            return item;
        }
    }
    return null;
}

function loadAllItemForOption() {
    $("#selectCodeForUpdate").empty();
    for (let item of items) {
        $("#selectCodeForUpdate").append(`<option>${item.name}</option>`);
    }
}

/****** Item regular expressions ******/
const regExCode = /^(I00-)[0-9]{1,3}$/;
const regExItemName = /^[A-z 1-9]{5,20}$/;
const regExItemQty = /^[0-9]{1,8}$/;
const regExPrice = /^\d{0,9}(\.\d{1,4})?$/;

let itemValidations = [];
itemValidations.push({reg: regExCode, field: $('#itemCode'),error:'Item Code Pattern Is Wrong :I00-1/ I00-001'});
itemValidations.push({reg: regExItemName, field: $('#itemName'),error:'Item Name Pattern Is Wrong : A-z 0-9 Ex: Naadu 5kg'});
itemValidations.push({reg: regExItemQty, field: $('#quantity'),error:'Item Quantity Pattern Is Wrong : 0-9'});
itemValidations.push({reg: regExPrice, field: $('#itemPrice'),error:'Item Price Pattern Is Wrong : 100 or 100.00'});

$("#itemCode,#itemName,#quantity,#itemPrice").on('keydown', function (event) {
    if (event.key == "Tab"){
        event.preventDefault();
    }
});

$("#itemCode,#itemName,#quantity,#itemPrice").on('keyup',function () {
    checkValidity();
});

$("#itemCode,#itemName,#quantity,#itemPrice").on('blur',function () {
    checkValidity();
});

$('#itemCode').on('keydown', function (event) {
    if (event.key == "Enter" && check(regExCode, $('#itemCode'))) {
        $('#itemName').focus();
    } else {
        $('#itemCode').focus();
    }
});

$('#itemName').on('keydown', function (event) {
    if (event.key == "Enter" && check(regExItemName, $('#itemName'))) {
        $('#quantity').focus();
    }
});

$('#quantity').on('keydown', function (event) {
    if (event.key == "Enter" && check(regExItemQty, $('#quantity'))) {
        $('#itemPrice').focus();
    }
});

$('#itemPrice').on('keydown', function (event) {
    if (event.key == "Enter" && check(regExItemQty, $('#itemPrice'))) {
        let res = confirm("Do you want to add this item.?");
        if(res) {
            clearTexts();
        }
    }
});

/****** Item Update ******/
let itemValidationsForUpdated = [];
itemValidationsForUpdated.push({reg: regExCode, field: $('#update-itemCode'),error:'Item Code Pattern Is Wrong : I00-001'});
itemValidationsForUpdated.push({reg: regExItemName, field: $('#update-itemName'),error:'Item Name Pattern Is Wrong : A-z 0-9 Ex: Naadu 5kg'});
itemValidationsForUpdated.push({reg: regExItemQty, field: $('#update-quantity'),error:'Item Quantity Pattern Is Wrong : 0-9'});
itemValidationsForUpdated.push({reg: regExPrice, field: $('#update-itemPrice'),error:'Item Price Pattern Is Wrong : 100 or 100.00'});

$("#update-itemCode,#update-itemName,#update-quantity,#update-itemPrice").on('keyup',function () {
    checkValidityForUpdate();
});

$("#update-itemCode,#update-itemName,#update-quantity,#update-itemPrice").on('blur',function () {
    checkValidityForUpdate();
});

$('#update-itemCode').on('keydown', function (event) {
    if (event.key == "Enter" && check(regExCode, $('#update-itemCode'))) {
        $('#update-itemName').focus();
    } else {
        $('#update-itemCode').focus();
    }
});

$('#update-itemName').on('keydown', function (event) {
    if (event.key == "Enter" && check(regExItemName, $('#update-itemName'))) {
        $('#update-quantity').focus();
    }
});

$('#update-quantity').on('keydown', function (event) {
    if (event.key == "Enter" && check(regExItemQty, $('#update-quantity'))) {
        $('#update-itemPrice').focus();
    }
});

$('#update-itemPrice').on('keydown', function (event) {
    if (event.key == "Enter" && check(regExItemQty, $('#update-itemPrice'))) {
        let res = confirm("Do you want to updated this item.?");
        if(res) {
            $('#update-itemPrice,#update-itemName,#update-quantity,#update-itemPrice').val("");
        }
    }
});
/****** Item Update End ******/

function clearTexts(){
    $('#itemCode').focus();
    $('#itemCode,#itemName,#quantity,#itemPrice').val("");
    checkValidity();
}

function checkValidity() {
    let errCount = 0;
    for (let validation of itemValidations) {
        if (check(validation.reg,validation.field)) {
            inputSuccess(validation.field,"");
        } else {
            errCount += 1;
            inputError(validation.field,validation.error)
        }
    }
    setBtnState(errCount);
}

function checkValidityForUpdate() {
    let errCount = 0;
    for (let validation of itemValidationsForUpdated) {
        if (check(validation.reg,validation.field)) {
            inputSuccess(validation.field,"");
        } else {
            errCount += 1;
            inputError(validation.field,validation.error)
        }
    }
}

function setBtnState(val){
    if (val > 0) {
        $("#saveItem").attr('disabled', true);
    } else {
        $("#saveItem").attr('disabled', false);
    }
}

function check(regex,textField){
    let inputValue = textField.val();
    return regex.test(inputValue) ? true : false;
}

function inputSuccess(textField,error) {
    if(textField.val().length <= 0){
        defaultText(textField,"");
    } else {
        textField.css('border','2px solid green');
        textField.parent().children('span').text(error);
    }
}

function inputError(textField,error) {
    if (textField.val().length <= 0) {
        defaultText(textField,"");
    } else {
        textField.css('border','2px solid red');
        textField.parent().children('span').text(error);
    }
}

function defaultText(textField,error){
    textField.css("border","1px solid #ced4da");
    textField.parent().children('span').text(error);
}