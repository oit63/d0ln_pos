function Item(code, sort, name, unit, price) {
	this.code = code;
    this.sort = sort;
    this.name = name;
    this.unit = unit;
    this.price = price || 0.00;
}