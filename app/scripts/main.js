$(document).ready(function () {
	initialization();
	button_click();
	$("#totol").text(total());
});

button_click = function () {
	$('#list').hide();
	$('#cart').hide();
	$('#pay').hide();
	$('#go-to-home-page').on('click', function () {
		$('#home').hide();
		$('#list').hide();
		$('#pay').hide();
		$('#cart').hide();
		$('#home').show();
	})
	$('.show-list').on('click', function () {
		$('#home').hide();
		$('#cart').hide();
		$('#pay').hide();
		$('#list').show();
		show_list();
	})
	$('#go-to-cart-page').on('click', function () {
		$('#home').hide();
		$('#list').hide();
		$('#pay').hide();
		$('#cart').show();
		show_cart();
	})
	$('#go-to-pay-page').on('click', function () {
		$('#home').hide();
		$('#list').hide();
		$('#cart').hide();
		$('#pay').show();
		show_pay();
	})
}

show_list = function () {
	var allItems = load_all_items();
	var bar = $("#list").find("body").html();
	bar = "";
	$("#list").find("tbody").html('<tr>' + bar + '</tr>');
	_(allItems).each(function (item) {
		var tbody_tr = "<tr class='text-center'>" +
			"<td>" + item.sort + "</td>" +
			"<td>" + item.name + "</td>" +
			"<td>" + item.unit + "</td>" +
			"<td>" + item.price + "</td>" +
			"<td>" + "<p><a " + "data-code='" + item.code + "' class='btn btn-primary btn-xs list-plus'  role='button'>加入购物车</a></p>" + "</td>" +
			"</tr>";
		$("#list").find("table").append(tbody_tr);
	})
	$('.list-plus').on('click', function () {
		plus($(this).data('code'));
	})
}

plus = function (item_code) {
	var lists = JSON.parse(localStorage.lists);
	lists[item_code] = parseInt(lists[item_code]) + 1;
	localStorage.lists = JSON.stringify(lists);
	var pig = total();
	$("#totol").text(pig);
};
minus = function (item_code) {
	var lists = JSON.parse(localStorage.lists);
	if (lists[item_code] > 1) {
		lists[item_code] = parseInt(lists[item_code]) - 1;
		localStorage.lists = JSON.stringify(lists);
		var pig = total();
		$("#totol").text(pig);
	}
};

total = function () {
	var counter = 0;
	var lists = JSON.parse(localStorage.lists);
	_(lists).each(function (value) {
		counter += value;
	});
	return counter;
};

//cart page functions

show_cart = function () {
	var lists = JSON.parse(localStorage.lists);
	var allItems = load_all_items();
	var bar = $("#drink").find("tbody").html();
	bar = "";
	$("#drink").find("tbody").html('<tr>' + bar + '</tr>');
	var allInTotal = 0;
	_(allItems).each(function (item) {
		var inTotal = item.price * lists[item.code];
		var tbodyTr = "<tr class='text-center'>" +
			"<td class='code'>" + item.code + "</td>" +
			"<td>" + item.name + "</td>" +
			"<td class='price'>" + item.price + "</td>" +
			"<td>" + item.unit + "</td>" +
			"<td data-code='" + item.code + "'>" + "<div class='btn-group'>" +
			"<button type='button' class='btn-group btn-group-sm cart-minus' >-</button>" +
			"<button type='button' class='btn-group btn-group-sm' disabled='true'>" + "  " + parseInt(lists[item.code]) + "</button>" +
			"<button type='button' class='btn-group btn-group-sm cart-plus'>+</button>" +
			"</div>" +
			"</td>" +
			"<td>" + inTotal + "</td>" +
			"</tr>";
		$("#drink").find("table").append(tbodyTr);
		$("#drink").find(".code").hide();
		allInTotal += inTotal;
	})
	$(".cart-plus").on("click", function () {
		plus($(this).closest("td").data("code"));
		$(this).closest("td").find("button").eq(1).text(parseInt($(this).closest("td").find("button").eq(1).text()) + 1)
		var price = $(this).closest("tr").find("td").eq(2).text()
		$(this).closest("tr").find("td").last().text(parseInt($(this).closest("tr").find("td").last().text()) + parseInt(price))
		$(".all-in-total").text(parseInt($(".all-in-total").text()) + parseInt(price));
	})
	$(".cart-minus").on("click", function () {
		minus($(this).closest("td").data("code"));
		if ($(this).closest("td").find("button").eq(1).text() > 1) {
			$(this).closest("td").find("button").eq(1).text(parseInt($(this).closest("td").find("button").eq(1).text()) - 1);
			var price = $(this).closest("tr").find("td").eq(2).text()
			$(this).closest("tr").find("td").last().text(parseInt($(this).closest("tr").find("td").last().text()) - parseInt(price))
		}
		$(".all-in-total").text(parseInt($(".all-in-total").text()) - parseInt(price));
	})
	$(".all-in-total").text(allInTotal);
}


//show_pay = function(){
//	var lists = JSON.parse(localStorage.lists);
//	var allItems = load_all_items();
//	var bar = $("#pay").find("table").eq(0).html();
//	$("#pay").find("table").eq(0).html('<tr>' + bar + '</tr>');
//	var allInTotal = 0;
//	_(allItems).each(function (item) {
//		var inTotal = item.price * lists[item.code];
//		var tbodyTr = "<tr class='text-center'>" +
//			"<td class='code'>" + item.code + "</td>" +
//			"<td>" + item.name + "</td>" +
//			"<td class='price'>" + item.price + "</td>" +
//			"<td>" + item.unit + "</td>" +
//			"<td data-code='" + item.code + "'>" + "<div class='btn-group'>" +
//			"<button type='button' class='btn-group btn-group-sm cart-minus' >-</button>" +
//			"<button type='button' class='btn-group btn-group-sm' disabled='true'>" + "  " + parseInt(lists[item.code]) + "</button>" +
//			"<button type='button' class='btn-group btn-group-sm cart-plus'>+</button>" +
//			"</div>" +
//			"</td>" +
//			"<td>" + inTotal + "</td>" +
//			"</tr>";
//		$("#pay").find("table").eq(1).append(tbodyTr);
//		$("#pay").find(".code").hide();
//		allInTotal += inTotal;
////	})
//
//}



