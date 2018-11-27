var fso = new ActiveXObject("Scripting.FileSystemObject");
var f = fso.OpenTextFile("c:\\scripts\\file.txt", 1, false);
var s = "";
while (!f.AtEndOfstream)
  s += f.Read(1);
f.Close();
WSH.echo(s);