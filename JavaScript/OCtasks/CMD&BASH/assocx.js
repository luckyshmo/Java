var inputExt=WSH.Arguments(0)
myShell = new ActiveXObject("WScript.Shell");
var root = "HKEY_CLASSES_ROOT\\" + inputExt + "\\"
var extention = myShell.RegRead(root);
root = "HKCR\\" + extention + "\\shell";

command = 'reg query '+ root +' /s'
var objWSH = new ActiveXObject("WScript.Shell");
var objConsol = objWSH.Exec(command);
var txt = objConsol.StdOut.ReadAll();
//WSH.echo(txt)
var what = /^HKEY_CLASSES_ROOT\\[\w.-]+\\shell$/igm
var adress = /HKEY_CLASSES_ROOT\\[\w.-]+\\shell\\/ig
var single =/^\w+$/gm
var brackets =/\(\W+\)/g
var reg=/REG\w+/g
var com=/\\command$/igm
 
txt=txt.replace(adress, "")
txt=txt.replace(what, "")
txt=txt.replace(brackets,"")
txt=txt.replace(reg,"")
txt=txt.replace(single,"")
txt=txt.replace(com,":")
txt=txt.split(/^\n$/gm);
txt=txt.join(" ")
WSH.echo(txt)