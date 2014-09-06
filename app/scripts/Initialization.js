var initialization = function(){
	if(!localStorage.lists) {
		var allItems = load_all_items();
		var list = {};
		for (var index in allItems) {
			var code = allItems[index].code;
			list[code] = 0;
		}
		localStorage.lists = JSON.stringify(list);
	}
};