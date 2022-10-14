/**** Buttons ****/
$('#orderID').attr('disabled',true);
$('#placeOrder').attr('disabled',true);
$('#addItemBtn').attr('disabled',true);
$('#balance').attr('disabled',true);

/**** Current Date ****/
$('#currentOrderDate').val(currentDate());

/**** Order Id auto increment method ****/
generateOrderId();

$('#addItemBtn').click( function () {
    let qtyOnHand = parseInt($('#orderQtyOnHand').val());
    let orderQty = parseInt($('#orderQty').val());

    if($("#orderQty").val() != "") {
        if(qtyOnHand < orderQty) {
            Swal.fire('Out of stock');
        } else {
            updatedQty();
            addToCart();
            loadAllOrders();
            calculateTotal();
        }
    }
});

$("#cash").on('keyup',function (event) {
    if (event.key == "Enter"){
        event.preventDefault();
    }

    let cash = parseFloat($("#cash").val());
    let tot = $('#total').text();

    if (cach > tot) {
        let tot = parseFloat($('#subTot').text());
        let balance = cash - tot;

        $('#balance').val(balance);
    }
});

function removeItem(){
    $("tblOrder>tr").on('dblclick',function () {
        $(this).remove();
        let totRemove = $('total').text();
        let newVal = totRemove - parseFloat($($(this).children(this).get(5)).text());
        $('total').text(newVal).append('.00');

        $('#cash').val('');
        $('#discount').val('');
        $('#balance').val('');

        if($('#discount').val() === ""){
            $('#subTot').text(newVal);
        }
    });
}

function addToCart() {
    let oID = $('#orderID').val();
    let itemCode = $('#orderItemOpt').val();
    let itemName = $('#orderItemName').val();
    let price =  $('#orderUPrice').val();
    let qty =  $('#orderQty').val();
    let total = price*qty;

    for (let c of cart){
        if(c.code == itemCode){
            var newQty = +c.orderCQty + +qty;
            let newTot = price * newQty;
            c.orderCQty = newQty;
            c.orderCTotal = newTot;
            return;
        }
    }

    let cartOrder = cartModel(oID,itemCode,itemName,price,qty,total);
    cart.push(cartOrder);

    $('#balance,#cash,#discount').val("");

    $('#addItemBtn').attr('disabled',true);
}

function updatedQty() {
    let qtyOnHand = parseInt($('#orderQtyOnHand').val());
    let orderQty = parseInt($('#orderQty').val());
    let upQty = qtyOnHand -orderQty;

    for (let item of items) {
        if ($('#orderItemOpt').val() === item.code){
            item.quantity = upQty;
            $('#orderQtyOnHand').val(item.quantity);
            loadAllItems();
        }
    }
}

function loadAllOrders() {
    $('#tblOrder').empty();

    for (let c of cart) {
        var cartRow = `<tr><td>${c.orderCId}</td><td>${c.orderCItemCode}</td><td>${c.orderCItemName}</td><td>${c.orderCQty}</td><td>${c.orderCPrice}</td><td>${c.orderCTotal}</td></tr>`
        $('#tblOrder').append(cartRow);
    }
    removeItem();
}
function calculateTotal() {
    let total = 0;
    $('#tblOrder>tr').each(function () {
        total += parseFloat($($(this).children().get(5)).text());
        $('#total').text(total)._append('.00');

        if ($('#discount').val() == "") {
            $('#subTot').text(total);
        }
    });
}

$('#placeOrder').click(function () {

});

function saveOrder(){
    let oId = $('#orderID').val();
    let cusId = $('#orderCusOpt').val();
    let date;

    if($('#orderDate').val() === "") {

    } else {
        date = $('#orderDate').val();
    }

    let totalPrice = $('#total').val();
    let newOrder = orderModel(oId,cusId,date,totalPrice);
    let isSaved = orders.push(newOrder);

    if (isSaved){
        return true;
    }
}

$('#orderItemOpt').change(function () {
    let code = $('#orderItemOpt').val();
    let item = searchItem(code);
    if(item != null) {
        $('#orderItemName').val(item.name);
        $('#orderUPrice').val(item.price);
        $('#orderQtyOnHand').val(item.quantity);
    }
});

$('#orderCusOpt').change(function () {
    let id = $('#orderCusOpt').val();
    let customer = searchCustomer(id);
    if(customer != null) {
        $('#orderCusName').val(customer.name);
        $('#orderSalary').val(customer.salary);
        $('#orderAddress').val(customer.address);
    }
    console.log(id);
});

function currentDate() {
    function twoDigit(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date = new Date()) {
        return [
            date.getFullYear(),
            twoDigit(date.getMonth() + 1),
            twoDigit(date.getDate()),
        ].join('-');
    }
    return formatDate();
}

function loadAllCusForOrderOpt() {
    $("#orderCusOpt").empty();
    for (let cus of customers) {
        $("#orderCusOpt").append(`<option>${cus.id}</option>`);
    }
}

function loadAllItemForOrderOpt() {
    $("#orderItemOpt").empty();
    for (let item of items) {
        $("#orderItemOpt").append(`<option>${item.code}</option>`);
    }
}

function generateOrderId() {
    if (orders.length === 0){
        $('#orderID').val('P00-001');
    } else {
        let split = orders[orders.length-1].code.split('-');
        let no = (+split[1])+1;
        $('#orderID').val('P00-'+(String(no).padStart(3,'0')));
    }
}