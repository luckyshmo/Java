var fso = new ActiveXObject("Scripting.FileSystemObject");
var f = fso.OpenTextFile("c:\\scripts\\DZ.txt", 1, false);
var s = "prefics_";
var test = "";
while (!f.AtEndOfStream)	{
	test = f.Read(1);
	 
	if (test == "\r")
		s += "prefics_";
	else 
		s += test;
	//s = s.replace('\r', '\rprefics_')
}

f.Close();
WSH.echo(s);
