var arg = WSH.arguments(0);

var fso = new Activexobject('ScriptingFileSystemObject');
var ts = fso.OpenTextFile('file.txt',  1)
str = ts.readAll();
ts.write('text');
ts.close();

WSH.Echo(arg);