var fso = new ActiveXObject("Scripting.FileSystemObject");
var ts = fso.OpenTextFile("c:\\scripts\\file.txt",8, true);
ts.WriteLine("Тестовая строка.");
ts.Close();
