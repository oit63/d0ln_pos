button_click = function () {
	var type_pay = ["coke","sprite","instant_noodles"];
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
	$('.confirm').on('click', function () {
		$('#home').hide();
		$('#list').show();
		$('#cart').hide();
		$('#pay').hide();
		show_list();
		var allItems = load_all_items();
		var list = {};
		for (var index in allItems) {
			var code = allItems[index].code;
			list[code] = 0;
		}
		localStorage.lists = JSON.stringify(list);
		$("#totol").text("0");
	})

}