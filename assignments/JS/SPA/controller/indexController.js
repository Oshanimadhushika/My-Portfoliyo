$("#order-btn").click(function () {
    $(".order").css("display", "inline-block");
    $(".dashboard").css("display", "none");
    $(".item").css("display", "none");
    $(".customer").css("display", "none");
});

$("#item-btn").click(function () {
    $(".order").css("display", "none");
    $(".dashboard").css("display", "none");
    $(".item").css("display", "inline-block");
    $(".customer").css("display", "none");
});

$("#customer-btn").click(function () {
    $(".order").css("display", "none");
    $(".dashboard").css("display", "none");
    $(".item").css("display", "none");
    $(".customer").css("display", "inline-block");
});

$("#dashboard-btn").click(function () {
    $(".order").css("display", "none");
    $(".dashboard").css("display", "block");
    $(".item").css("display", "none");
    $(".customer").css("display", "none");
});