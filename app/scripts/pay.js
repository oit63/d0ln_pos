show_pay = function(){
	var saved = 0;
	var time = new Time();
	$('#time').text(time.get_time());
	var lists = JSON.parse(localStorage.lists);
	var type_pay = ["coke", "sprite", "instant_noodles"];
	var allItems = load_all_items();
	bar = "";
	$("#drink").find("tbody").html('<tr>' + bar + '</tr>');
	var bar = $("#pay").find("tbody").html();
	bar = "";
	$("#pay").find("tbody").html('<tr>' + bar + '</tr>');
	var allInTotal = 0;
	var fullAllInTotal = 0;
	_(allItems).each(function (item) {
		var inTotal = Number(item.price * lists[item.code]);
		var inTotalDiscount = inTotal - Number.parseInt(lists[item.code] / 3) * item.price;
		var tbodyTrD = "<tr class='text-center'>" +
			"<td class='code' id='"+ item.code + "'>" + item.code + "</td>" +
			"<td>" + item.sort + "</td>" +
			"<td>" + item.name + "</td>" +
			"<td class='price'>" + item.price + "</td>" +
			"<td>" + item.unit + "</td>" +
			"<td class='number'>" + Number(lists[item.code]) +"</td>"+
			"<td>" + '<span>' + inTotalDiscount + '</span>' +
			'<span>(原价:' + '</span>' +
			'<span>' + inTotal + '</span>' +
			'<span>元)' + '</span>' +
			"</td>" +
			"</tr>";
		var tbodyTr = "<tr class='text-center'>" +
			"<td class='code'>" + item.code + "</td>" +
			"<td>" + item.sort + "</td>" +
			"<td>" + item.name + "</td>" +
			"<td class='price'>" + item.price + "</td>" +
			"<td>" + item.unit + "</td>" +
			"<td>" + Number(lists[item.code]) +"</td>"+
			"<td>" + '<span>' + inTotal + '</span>' +
			"</td>" +
			"</tr>";
		var id = "#" + item.code;
		if(Number(lists[item.code]) > 0){
			if (_.indexOf(type_pay, item.code) != -1) {
				$("#pay").find("table").eq(0).append(tbodyTrD);
				allInTotal += inTotalDiscount;
				id = "#" + item.code;
				var num =+ $(id).closest("tr").find(".number").text();
				if(num < 3){
					var dog = $(id).closest("tr").find("td").last().find("span");
					dog.eq(1).hide();
					dog.eq(2).hide();
					dog.eq(3).hide();
					saved
				}
				saved += inTotal- inTotalDiscount
			}
			else {
				$("#pay").find("table").eq(0).append(tbodyTr);
				allInTotal += inTotal;
			}
			fullAllInTotal += inTotal;
		}
		$("#pay").find(".code").hide();
		allInTotal += inTotal;



	})
	$(".saved").text(saved)
	var jdb = 0;
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
			if(parseInt(Number(lists[item.code]) / 3) > 0){
				$("#pay").find("table").eq(1).append(tbodyTr);
				$("#pay").find(".code").hide();
			}
			jdb += parseInt(Number(lists[item.code]) / 3);
		}
	})
	if(!jdb){
		$("#pay-promotion").find("a").first().hide();
		$("#pay").find("table").eq(1).hide();
		$(".saved").closest("p").hide()
	}

}

