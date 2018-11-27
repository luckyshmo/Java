function GetShiftCode(chr, shift, casesc) {
	if (casesc == "undef")
		return chr;
	if (casesc == "upper")
		if (chr.charCodeAt(0)+shift>90)
			return String.fromCharCode(chr.charCodeAt(0)+shift - 26);
		else if (chr.charCodeAt(0)+shift<65)
			return String.fromCharCode(chr.charCodeAt(0)+26+shift);
		else
			return String.fromCharCode(chr.charCodeAt(0)+shift);
	else 
		if (chr.charCodeAt(0)+shift>122)
			return String.fromCharCode(chr.charCodeAt(0)+shift - 26);
		else if (chr.charCodeAt(0)+shift<97)
			return String.fromCharCode(chr.charCodeAt(0)+26+shift);	
		else 
			return String.fromCharCode(chr.charCodeAt(0)+shift);
}
function CheckCase(chr) {
	if (chr.charCodeAt(0)>64 && chr.charCodeAt(0) <= 90) return "upper";
	if (chr.charCodeAt(0)>96 && chr.charCodeAt(0) <= 122) return "lower";
	return "undef";
}
function Analyse(text) {
	var freq = new Object();
	for (var i = 0; i < text.length;i++)
	{
		if (CheckCase(text.charAt(i)) == "undef") continue;
		var chr = text.charAt(i);
		var f = true;
		for (charElem in freq)
			if (chr == charElem) 
			{
				freq[chr]++;
				f=false;
			}
		if (f) freq[chr]=1;

	}
	var tmax = 1, max='';
	for (var i in freq)
	{
		if (freq[i] > tmax) 
		{
			tmax=freq[i]; 
			max=i;
		}
	}
	WSH.Echo("Found shift:",max.charCodeAt(0) - "e".charCodeAt(0));
	return max.charCodeAt(0) - "e".charCodeAt(0); 
	
}

var fso = new ActiveXObject("Scripting.FileSystemObject")

function CeasarEncrypt(text, shift){
	var cipher = "";
	for (var i=0;i<text.length;i++)
	{
		cipher+=GetShiftCode(text.charAt(i),shift %26, CheckCase(text.charAt(i)));
	}
	WSH.Echo();	
	return cipher;
}

WSH.Stdout.Write("Enter type of operation (encrypt/decrypt/crack): ");
var operation = WSH.Stdin.ReadLine();
WSH.Stdout.Write("Enter name of input file (default input.txt, must be exist): ");
var inputfile = WSH.Stdin.ReadLine();
WSH.Stdout.Write("Enter name of output file (default output.txt): ");
var outputfile = WSH.Stdin.ReadLine();

try{
	fin = fso.OpenTextFile(inputfile,1);
}
catch(err){
	WSH.Echo("useing input.txt");
	fin = fso.OpenTextFile("input.txt",1);
}

try{
	fout = fso.OpenTextFile(outputfile,2,1);
}
catch(err){
	WSH.Echo("useing output.txt");
	fout = fso.OpenTextFile("output.txt",2,1);
}

try{

	textdata = fin.ReadAll();
}
catch(err)
{
	textdata="";
}
switch (operation){
	case "encrypt":
		WSH.Stdout.Write("Enter shift: ");
		var shift = parseInt(WSH.Stdin.ReadLine());
		fout.write(CeasarEncrypt(textdata,shift));
		WSH.Echo("Success!")
		break;
	case "decrypt":
		WSH.Stdout.Write("Enter shift: ");
		var shift = parseInt(WSH.Stdin.ReadLine());
		fout.write(CeasarEncrypt(textdata,-shift));
		WSH.Echo("Success!")
		break;
	case "crack":
		WSH.Echo("#ATTENTION! Frequency analyse working right at big legngth text!\n#Found shift can be wrong!.");
		fout.write(CeasarEncrypt(textdata,-Analyse(textdata)));
		WSH.Echo("Success!")
		break;
	default:
		WSH.Echo("Wrong operation")
		break;
}