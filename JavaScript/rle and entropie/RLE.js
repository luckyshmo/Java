var fso = new ActiveXObject("Scripting.FileSystemObject");
var ts  = fso.OpenTextFile(WSH.Arguments(0));
//var ts  = fso.OpenTextFile("input.txt");
var str = ts.ReadAll();
ts.Close();
//WSH.echo(str)
//WSH.echo(str.length + " - длинна строки");

var i   = 0;
var n   = 1;
var res = "";
while (i < str.length){
	while(str.charAt(i) == str.charAt(i+n))
		n++;
	n_old = n;
	while (n>127){
		res +=( '#'
			+ String.fromCharCode(127)
			+ str.charAt(i));
		n -= 127;
	}
	if (n > 3 || str.charAt(i) == '#')
		 res +=('#'
			 +  String.fromCharCode(n)
			 +  str.charAt(i));
	else 
	{
		
		res += str.substr(i,n);
	}
	//WSH.echo(n);
	i += n_old;
	n  = 1;
}
//WSH.echo(res);
WSH.echo(res.length/str.length*100 + "% от изначального размера");

var ts  = fso.OpenTextFile(WSH.Arguments(1), 2, true);
//var ts  = fso.OpenTextFile("code.txt", 2, true);
ts.Write(res);
ts.Close();

///
///
///DECODE
///
///
var ts  = fso.OpenTextFile(WSH.Arguments(1));
//var ts  = fso.OpenTextFile("code.txt");
var str = ts.ReadAll();
ts.Close();
//WSH.echo(str);

i   = 0;

var res = "";
while (i < str.length){
	if (str.charAt(i) == '#' && str.charAt(i+1) != '#')
	{
		var j = 0;
		//WSH.echo(str.charCodeAt(i+1) + " - char code")
		for (j; j < str.charCodeAt(i+1); j++)
		{
			res+=str.charAt(i+2);
		}
		i+=2;
	}
	else
		res+=str.charAt(i);
	i++;
	//WSH.echo(i + " - i");
}
//WSH.echo(res + " " + res.length);

var ts  = fso.OpenTextFile(WSH.Arguments(2), 2, true);
//var ts  = fso.OpenTextFile("decode.txt", 2, true);
ts.Write(res);
ts.Close();