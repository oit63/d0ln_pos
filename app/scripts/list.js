show_list = function () {
	var allItems = load_all_items();
	var bar = $("#list").find("tbody").html();
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
