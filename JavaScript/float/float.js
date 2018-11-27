function f_to_IEEE(f) {
	this.f = f;
	this.sgn = 0;
	this.exp = 0;
	if (f < 0)
		this.sgn = 1;
	f = Math.abs(f);
	this.mantess = f;
	if (f == 0)
		return;
	//f = this.sign * this.mantess * 2^this.exp
	while (2 <= this.mantess || this.mantess < 1) {
		if (this.mantess >= 2)
			this.exp++;
		else
			this.exp--;
		this.mantess = f / Math.pow(2, this.exp);
	}
	this.exp += 127;
	this.mantess = parseInt(Math.round((this.mantess - 1) * Math.pow(2, 23 + Math.min(0, this.exp))));
	//WSH.echo(this.mantess)
	this.exp = Math.max(this.exp, 0);
}

function IEEE_to_f(sgn, exp, mantess) {
	this.sgn = sgn;
	this.exp = exp;
	this.mantess = mantess;
	this.f = 1;
	if (this.sgn)
		this.f = -1;
	if (exp == 0 && mantess == 0)
		this.f *= 0;
	if (a.exp == 0 && a.mantess == 0)
		return b;
	if (a.exp == 255)
		if (a.mantess == 0)
			this.f *= Infinity;
		else
			this.f = NaN;
	var add = 1;
	if (exp == 0)
		add = 0;
	this.f *= (mantess / Math.pow(2, 23) + add) * Math.pow(2.0, exp - 127 + (add ^ 1));
}

function add(a, b) {
	var flag = 0;
	if (a.exp > b.exp) {
		var t = a;
		a = b;
		b = t;
	}
	if (a.exp != 0 || b.exp != 0) {
		flag = 1;
		a.mantess += Math.pow(2, 23);
		b.mantess += Math.pow(2, 23);
	}
	while (a.exp < b.exp) {
		a.exp++;
		a.mantess = (a.mantess - (a.mantess & 1)) / 2;
	}
	if (a.sgn)
		a.mantess *= -1;
	if (b.sgn)
		b.mantess *= -1;
	a.mantess += b.mantess;
	if (a.mantess < 0)
		a.sgn = 1;
	else
		a.sgn = 0;
	a.mantess = Math.abs(a.mantess);
	if (a.mantess >= Math.pow(2, 24)) {
		a.exp++;
		a.mantess = (a.mantess - (a.mantess & 1)) / 2;
	}
	if (a.mantess == 0) {
		a.exp = 0;
		return a;
	}
	while (a.exp != 0 && a.mantess < Math.pow(2, 23)) {
		a.exp--;
		a.mantess *= 2;
	}
	if (flag == 1)
		a.mantess -= Math.pow(2, 23);
	if (a.exp >= 255) {
		a.exp = 255;
		a.mantess = 0;
	}
	return a;
}

var f = parseFloat(WSH.StdIn.ReadLine());
var a = new f_to_IEEE(f);
a = new IEEE_to_f(a.sgn, a.exp, a.mantess)
WSH.echo(a.sgn, a.exp, a.mantess)
f = parseFloat(WSH.StdIn.ReadLine());
var b = new f_to_IEEE(f);
b = new IEEE_to_f(b.sgn, b.exp, b.mantess)
a = add(a, b);
var x = new IEEE_to_f(a.sgn, a.exp, a.mantess);
WSH.echo(x.f, x.sgn, x.exp, x.mantess);