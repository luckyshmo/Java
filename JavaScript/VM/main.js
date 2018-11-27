var mem = new Array();
var fso = new ActiveXObject('Scripting.FileSystemObject');
try {
	var text_prog= fso.OpenTextFile(WSH.Arguments(0));
}
catch (e)
{
	WScript.echo('No such file')
	WScript.Quit()
}
var s='';
while(!text_prog.AtEndOfStream)
	s+=text_prog.ReadLine()+' ';
s+='exit';
mem=s.split(' ');
var index=0;
/*for(var count=0;count<mem.length;count++)
WScript.echo('In ',count,' is ',mem[count])*/
var st = Array();
var stIt = 0;

function gcd(x, y) {
	while (y != 0) {
		var z = x % y;
		x = y;
		y = z;
	}
	return x;
}

var old = 0;

while(mem[index]!='exit')
	switch(mem[index]){
		case 'input':
			WScript.Echo('Eneter value')
			mem[mem[index+1]]=parseFloat(WScript.StdIn.ReadLine())
			index+=2
			break
		case 'output':
			WScript.Echo(mem[mem[index+1]])
			index+=2
			break
		case 'sub':
			mem[mem[index+3]]=mem[mem[index+1]]+mem[mem[index+2]]
			index+=4
			break
		case 'diff':
            mem[mem[index+3]]=mem[mem[index+1]]-mem[mem[index+2]]
            index+=4
            break
		case 'mult':
            mem[mem[index+3]]=mem[mem[index+1]]*mem[mem[index+2]]
            index+=4
            break
		case 'mod':
            mem[mem[index+3]]=mem[mem[index+1]]%mem[mem[index+2]]
            index+=4
            break
		case 'div':
            mem[mem[index+3]]=mem[mem[index+1]]/mem[mem[index+2]]
            index+=4
            break
		case 'noteql':
            if (mem[mem[index+1]]==mem[mem[index+2]])
            mem[mem[index+3]] = false //"Equal"
            else mem[mem[index+3]] = true; //"Not equal";
            index+=4
            break;
        case 'eql':
            if (mem[mem[index+1]]==mem[mem[index+2]])
            mem[mem[index+3]] = true; //"Equal"
            else mem[mem[index+3]] = false; //"Not equal";        
            index+=4;         
            break;
        case 'less':
            if (mem[mem[index+1]]<mem[mem[index+2]])
            mem[mem[index+3]] = true; //"less"
            else mem[mem[index+3]] = false; //"same or bigger";           
            index+=4;         
            break;
        case 'bigger':
            if (mem[mem[index+1]]>=mem[mem[index+2]])
            mem[mem[index+3]] = true; //"same or bigger"
            else mem[mem[index+3]] = false; //"less";         
            index+=4;         
            break;
		case 'while':
			//WScript.Echo('while');
            old = index;
			index++;
            break;
		case 'endwhile':
			//WScript.Echo('endwhile');
			if (mem[mem[index-1]]==true)
				index = old + 1;
			else
				index++;
            break;
		case 'ifEnd':
			if (mem[mem[index-1]]==true)
			{
				WScript.Echo(mem[mem[index+1]])
				WScript.Quit();
			}
				
		case 'set':
			//WScript.Echo('set');
			mem[mem[index + 2]] = parseInt(mem[index + 1]); 
			index += 3; 
			break; 
		case 'fact':
			var fact = 1;
			while (mem[mem[index+1]] > 0)
			{
				fact *= mem[mem[index+1]];
				mem[mem[index+1]]--;
			}
			mem[mem[index+1]] = fact;
			index+=2
			break
		case 'GCD':
			mem[mem[index+3]]=gcd(mem[mem[index+1]], mem[mem[index+2]]);
			index += 4
			break
		case 'exit':
			WScript.Quit()
}