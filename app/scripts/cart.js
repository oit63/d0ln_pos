show_cart = function () {
	var saved = 0;
	var type_pay = ["coke", "sprite", "instant_noodles"];
	var lists = JSON.parse(localStorage.lists);
	var allItems = load_all_items();
	var bar = $("#drink").find("tbody").html();
	bar = "";
	$("#drink").find("tbody").html('<tr>' + bar + '</tr>');
	var allInTotal = 0;
	var fullAllInTotal = 0;
	_(allItems).each(function (item) {
		var inTotal = Number(item.price * lists[item.code]);
		var inTotalDiscount = inTotal - Number.parseInt(lists[item.code] / 3) * item.price;
		var tbodyTrD = "<tr class='text-center'>" +
			"<td class='code' id='"+ item.code + "'>" + item.code + "</td>" +
			"<td>" + item.name + "</td>" +
			"<td class='price'>" + item.price + "</td>" +
			"<td>" + item.unit + "</td>" +
			"<td data-code='" + item.code + "'>" +
				"<div class='btn-group'>" +
					"<button type='button' class='btn-group btn-group-sm cart-minus' >-</button>" +
					"<button type='button' class='btn-group btn-group-sm number' disabled='true'>" + Number(lists[item.code]) + "</button>" +
					"<button type='button' class='btn-group btn-group-sm cart-plus' >+</button>" +
				"</div>" +
			"</td>" +
			"<td>" + '<span>' + inTotalDiscount + '</span>' +
						'<span>(原价:' + '</span>' +
						'<span>' + inTotal + '</span>' +
						'<span>元)' + '</span>' +
			"</td>" +
			"</tr>";
		var tbodyTr = "<tr class='text-center'>" +
			"<td class='code'>" + item.code + "</td>" +
			"<td>" + item.name + "</td>" +
			"<td class='price'>" + item.price + "</td>" +
			"<td>" + item.unit + "</td>" +
			"<td data-code='" + item.code + "'>" + "<div class='btn-group'>" +
				"<button type='button' class='btn-group btn-group-sm cart-minus' >-</button>" +
				"<button type='button' class='btn-group btn-group-sm number' disabled='true'>" + Number(lists[item.code]) + "</button>" +
				"<button type='button' class='btn-group btn-group-sm cart-plus'>+</button>" +
			"</div>" +
			"</td>" +
			"<td>" + '<span>' + inTotal + '</span>';
		if(Number(lists[item.code]) > 0){
			if (_.indexOf(type_pay, item.code) != -1) {
				$("#drink").find("table").append(tbodyTrD);
				allInTotal += inTotalDiscount;
			}
			else {
				$("#drink").find("table").append(tbodyTr);
				allInTotal += inTotal;
			}
			fullAllInTotal += inTotal;
		}
		$("#drink").find(".code").hide();
		$(".all-in-total").text(allInTotal);
//		console.log(fullAllInTotal - allInTotal)

		saved = fullAllInTotal - allInTotal;
		id = "#" + item.code;
		var num =+ $(id).closest("tr").find(".number").text();
		if(num < 3){
			var dog = $(id).closest("tr").find("td").last().find("span");
			dog.eq(1).hide();
			dog.eq(2).hide();
			dog.eq(3).hide();
		}
	})

	if(allInTotal < 1){
		$('#home').hide();
		$('#cart').hide();
		$('#pay').hide();
		$('#list').show();
		show_list();
		$('#go-to-cart-page').closest("li").removeClass("active");
		$('.show-list').closest("li").addClass("active");
	}

	$(".cart-plus").on("click", function () {
		var item_code = $(this).closest("td").data("code");
		plus(item_code);
		var num_button = $(this).closest("td").find("button").eq(1)
		num_button.text(Number(num_button.text()) + 1);
		if(_.indexOf(type_pay, item_code) != -1) {
			var pretotal =+ $(this).closest("tr").find("td").eq("5").find("span").eq("0").text();
			var price = Number($(this).closest("tr").find("td").eq(2).text());
			var total =  $(this).closest("tr").find("td").last().find("span").eq(2);
			total.text(Number(total.text()) + price);
			var num =+ $(this).closest("tr").find(".number").text();
			var inTotal = price * num;
			var inTotalDiscount = inTotal - parseInt(num / 3) * price;
			var totalDiscount = $(this).closest("tr").find("td").last().find("span").first();
			totalDiscount.text(inTotalDiscount);
			var add = inTotalDiscount - pretotal;

			allInTotal += add;
			var dog1 = $(this).closest("tr").find("td").last().find("span");
			if(num<3){
				dog1.eq(1).hide();
				dog1.eq(2).hide();
				dog1.eq(3).hide();
			}
			if(num>2){
				dog1.eq(1).show();
				dog1.eq(2).show();
				dog1.eq(3).show();
			}
			discount = parseInt(num / 3) * price
		}
		else{
			var price =+ $(this).closest("tr").find("td").eq(2).text();
			price_inTotal = $(this).closest("tr").find("td").last().find("span");
			price_inTotal.text(Number(price_inTotal.text()) + Number(price))
			var num =+ $(this).closest("tr").find(".number").text();
			var inTotal =+ price * num;
			allInTotal += price;
		}
		$(".all-in-total").text(allInTotal);
	})

	$(".cart-minus").on("click", function () {
		item_code = $(this).closest("td").data("code");
		minus(item_code);
		var num_button = $(this).closest("td").find("button").eq(1);
		if (Number( num_button.text() > 0)) {
			if(_.indexOf(type_pay, item_code) != -1) {
				num_button.text(Number(num_button.text()) - 1);
				var pretotal =+ $(this).closest("tr").find("td").eq("5").find("span").eq("0").text();
				var price = Number($(this).closest("tr").find("td").eq(2).text());
				var total = $(this).closest("tr").find("td").last().find("span").eq(2);
				total.text(Number(total.text()) - price);
				var num = +$(this).closest("tr").find(".number").text();
				var inTotal = +price * num;
				var inTotalDiscount = inTotal - parseInt(num / 3) * price;
				var totalDiscount = $(this).closest("tr").find("td").last().find("span").first();
				totalDiscount.text(inTotalDiscount);
				var add = inTotalDiscount - pretotal;
				allInTotal += add;
			}
			else {
				num_button.text(Number(num_button.text()) - 1);
				var price =+ $(this).closest("tr").find("td").eq(2).text();
				price_inTotal = $(this).closest("tr").find("td").last().find("span");
				price_inTotal.text(Number(price_inTotal.text()) - Number(price));
				allInTotal -= price;
				}
		}
		if(Number( num_button.text()) === 0){
			$(this).closest("tr").remove();
			if(allInTotal < 1){
				$('#home').hide();
				$('#cart').hide();
				$('#pay').hide();
				$('#list').show();
				show_list();
				$('#go-to-home-page').removeClass("active");
				$('.show-list').closest("li").addClass("active");
				$('#go-to-cart-page').closest("li").removeClass("active");
			}
		}
		var dog1 = $(this).closest("tr").find("td").last().find("span");
		if(num<3){
			dog1.eq(1).hide();
			dog1.eq(2).hide();
			dog1.eq(3).hide();
		}
		if(num>2){
			dog1.eq(1).show();
			dog1.eq(2).show();
			dog1.eq(3).show();
		}

		$(".all-in-total").text(allInTotal);

	})



}



//$(".cart-plus").on("click", function () {
//plus($(this).closest("td").data("code"));
//var num_button = $(this).closest("td").find("button").eq(1)
//num_button.text(Number(num_button.text()) + 1);
//if(_.indexOf(type_pay, item_code) != -1) {
//	$("#drink").find("table").append(tbodyTrD);
//	allInTotal += inTotalDiscount;
//}
//else{
//	$("#drink").find("table").append(tbodyTr);
//	allInTotal += inTotal;
//}
//$("#drink").find(".code").hide();
//var price =+ $(this).closest("tr").find("td").eq(2).text();
//price_inTotal = $(this).closest("tr").find("td").last().find("span").eq(2);
//price_inTotal.text(Number(inTotal.text()) + Number(price))
//var num =+ $(this).closest("tr").find(".number").text();
//var inTotal =+ price * num;
//var inTotalDiscount = inTotal - parseInt(num /3) * price;
//$(this).closest("tr").find("td").last().find("span").first().text(inTotalDiscount);
//$(".all-in-total").text(parseInt($(".all-in-total").text()) + price);
//
//})
