function InputStr(){
	try {
		fso = new ActiveXObject("Scripting.FileSystemObject");
		ts  = fso.OpenTextFile('input.txt');
		str = ts.ReadAll();
		ts.Close();
		ts  = fso.OpenTextFile('search.txt');
		substr = ts.ReadAll();
		ts.Close();
	}
	catch (e){
		WSH.echo('One(or both) files doesn\'t exist or empty')
		WSH.quit();
	}
	n = str.length
	m = substr.length
	if (n == 0 || m == 0){
		WSH.echo('One(or both) sting is empty')
		WSH.quit()
	}else if (n < m){
		WSH.echo('String length is smalle than substing length')
		WSH.quit()
	}
}
function Brute(){
	return true;
}

InputStr()





//BRUTEFORCE

var t0 = new Date().getTime();
var arrayOfIndex = [];
i = 0
while (i <= str.length - substr.length){
	j = 0
	while (str.charAt(i + j) == substr.charAt(j)){
		j++
		if (j == substr.length){
			arrayOfIndex.push(i)
			break
		}
	}
	i++
}
if (arrayOfIndex.length == 0)
{
	WSH.echo("string don't contain substring")
	WSH.quit();
}
var t1 = new Date().getTime();
WSH.echo('String contains ',arrayOfIndex.length, ' substrings')
WSH.echo('Indexes are:\n', arrayOfIndex)
WSH.echo("\n___________________brute____________________")
WSH.echo("\nCall to do BRUTEFORCE algorithm took " + (t1 - t0) + " milliseconds.")
WSH.echo("\n____________________________________________")






//линейное построение хэшей
WSH.echo("\n___________________linear___________________")
var collisions = 0;
sub_hs = 0
for (i = 0; i < m; i++)
	sub_hs += substr.charCodeAt(i)
WSH.echo('\nHash-code for \'', substr, '\' is:')
WSH.echo(sub_hs)
var t0 = new Date().getTime();
var arrayOfIndex = [];

hs = 0
for (i = 0; i < m; i++)
	hs += str.charCodeAt(i)
i = 0
if (hs == sub_hs){
		if (str.substr(i, m) === substr){
			arrayOfIndex.push(i)
		}
		else
			collisions++;
	}

for (i = 1; i < n - m + 1; i++){
	hs = hs + str.charCodeAt(i + m - 1) - str.charCodeAt(i - 1)
	if (hs == sub_hs){
		if (str.substr(i, m) === substr)
		{
			arrayOfIndex.push(i)
		}
		else
			collisions++;
	}
}
var t1 = new Date().getTime();

WSH.echo("\n",collisions, " collisions in linear")
WSH.echo("Call to do linear algorithm took " + (t1 - t0) + " milliseconds.")
WSH.echo("\n____________________________________________")





//квадратичное построение хешей
WSH.echo("\n__________________Square____________________")
collisions = 0;
sub_hs = 0
for (i = 0; i < m; i++)
	sub_hs += Math.pow(substr.charCodeAt(i), 2)
WSH.echo('\nHash-code for \'', substr, '\' is:')
WSH.echo(sub_hs)

var t0 = new Date().getTime();

var arrayOfIndex = [];
hs = 0
for (i = 0; i < m; i++)
	hs += Math.pow(str.charCodeAt(i), 2)
i = 0
if (hs == sub_hs){
		if (str.substr(i, m) === substr){
			arrayOfIndex.push(i)
		}
	}
for (i = 1; i < n - m + 1; i++){
	hs = hs + Math.pow(str.charCodeAt(i + m - 1), 2) - Math.pow(str.charCodeAt(i - 1), 2)
	if (hs == sub_hs){
		if (str.substr(i, m) === substr){
			arrayOfIndex.push(i)
		}
		else
			collisions++;
	}
}
var t1 = new Date().getTime();

WSH.echo("\n",collisions, " collisions in square")
WSH.echo("Call to do square algorithm took " + (t1 - t0) + " milliseconds.")
WSH.echo("\n____________________________________________")






//Рабин-Карп
WSH.echo("\n__________________Rabin-Karp________________")
collisions = 0;
sub_hs = 0
for (i = 0; i < m; i++)
	sub_hs += substr.charCodeAt(i)*Math.pow(2, m - i - 1)
WSH.echo('\nHash-code for \'', substr, '\' is:')
WSH.echo(sub_hs)

var t0 = new Date().getTime();

var arrayOfIndex = [];
hs = 0
for (i = 0; i < m; i++)
	hs += str.charCodeAt(i)*Math.pow(2, m - i - 1)
i = 0
if (hs == sub_hs){
		if (str.substr(i, m) == substr){
			arrayOfIndex.push(i)
		}
		else
			collisions++;
	}
for (i = 1; i < n - m + 1; i++){
	hs = (hs - str.charCodeAt(i - 1)*Math.pow(2, m - 1))*2 + str.charCodeAt(i + m - 1)
	if (hs == sub_hs){
		if (str.substr(i, m) == substr)
		{
			arrayOfIndex.push(i)
		}
		else
			collisions++;
	}
}
var t1 = new Date().getTime();
WSH.echo("\n",collisions, " collisions in Rabin-Karp")
WSH.echo("Call to do Rabin-Karp algorithm took " + (t1 - t0) + " milliseconds.")
WSH.echo("\n____________________________________________")