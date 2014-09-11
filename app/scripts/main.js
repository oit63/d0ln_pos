$(document).ready(function () {
	initialization();
	button_click();
	$("#totol").text(total());
});

plus = function (item_code) {
	var lists = JSON.parse(localStorage.lists);
	lists[item_code] = Number(lists[item_code]) + 1;
	localStorage.lists = JSON.stringify(lists);
	var pig = total();
	$("#totol").text(pig);
};

minus = function (item_code) {
	var lists = JSON.parse(localStorage.lists);
	if (lists[item_code] > 1) {
		lists[item_code] = Number(lists[item_code]) - 1;
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






