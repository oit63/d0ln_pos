show_pay = function(){
	var time = new Time();
	var lists = JSON.parse(localStorage.lists);
	var allItems = load_all_items();
	var bar = $("#pay").find("tbody").html();
	bar = "";
	$("#pay").find("tbody").html('<tr>' + bar + '</tr>');
	$('#time').text(time.get_time());
	var allInTotal = 0;
	_(allItems).each(function (item) {
		var inTotal = item.price * lists[item.code];
		var tbodyTr = "<tr class='text-center'>" +
			"<td class='code'>" + item.code + "</td>" +
			"<td>" + item.sort + "</td>" +
			"<td>" + item.name + "</td>" +
			"<td class='price'>" + item.price + "</td>" +
			"<td>" + item.unit + "</td>" +
			"<td>" + Number(lists[item.code]) +"</td>"+
			"<td>" + inTotal + "</td>" +
			"</tr>";

		if(Number(lists[item.code]) > 0){
			$("#pay").find("table").eq(0).append(tbodyTr);
			$("#pay").find(".code").hide();
		}
		allInTotal += inTotal;
	})

	_(allItems).each(function (item) {
		var inTotal = item.price * lists[item.code];
		var type_pay = ["coke","sprite","instant_noodles"]
		if(_.indexOf(type_pay, item.code) != -1) {
			var tbodyTr = "<tr class='text-center'>" +
				"<td class='code'>" + item.code + "</td>" +
				"<td>" + item.sort + "</td>" +
				"<td>" + item.name + "</td>" +
				"<td>" + parseInt(Number(lists[item.code]) / 3) + "</td>" +
				"</tr>";
			if(Number(lists[item.code]) > 0){
				$("#pay").find("table").eq(1).append(tbodyTr);
				$("#pay").find(".code").hide();
				}
		}
	})

}

