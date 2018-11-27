function InputData(){
	try {
		fso = new ActiveXObject("Scripting.FileSystemObject");
		ts  = fso.OpenTextFile('input.txt');
		str = ts.ReadAll();
		ts.Close();
		ts  = fso.OpenTextFile('search.txt');
		t = ts.ReadAll();
		ts.Close();
	}
	catch (e){
		WSH.echo('One(or both) files doesn\'t exist or empty')
		WSH.echo('Files names should be "input.txt" and "search.txt"')
		WSH.quit();
	}
	n = str.length
	m = t.length
	if (n == 0 || m == 0){
		WSH.echo('One(or both) sting is empty')
		WSH.quit()
	}else if (n < m){
		WSH.echo('String length is smaller than substing length')
		WSH.quit()
	}
}
InputData()
//str='asdasdasd'
//t='das'
var t0 = new Date().getTime();
alph=new Array() 
//Определяем алфавит строки t 
for(i=0;i<m;i++) 
	alph[t.charAt(i)]=0 
//В двумерном массиве del будем хранить таблицу переходов 
del=new Array(m+1) 
for(j=0;j<=m;j++) 
	del[j]=new Array() 
//Инициализируем таблицу переходов 
for(i in alph) 
	del[0][i]=0 
//Формируем таблицу переходов 
for(j=0;j<m;j++)
{ 
	prev=del[j][t.charAt(j)] 
	del[j][t.charAt(j)]=j+1 
	for(i in alph) 
		del[j+1][i]=del[prev][i] 
} 
//Выводим таблицу переходов 
/*for(j=0;j<=m;j++)
{ 
	out='' 
	for(i in alph) 
		out+=del[j][i]+' ' 
	WScript.Echo(out) 
}*/
var arrayOfIndex = [];
var index = 0;
for (var i = 0; i < str.length; i++)
{
	//WScript.Echo(str[i])
	if (del[index][str.charAt(i)] == null)
	{
		index = 0;
	}
	else
	{
		index = del[index][str.charAt(i)]
	}
	if (index == m)
		arrayOfIndex.push(i-m+1)
		//WScript.Echo(i - m + 1); //выводим номер первого элемента строки (нач с 0)
}
if (arrayOfIndex.length == 0)
{
	WSH.echo("string don't contain substring")
	WSH.quit();
}
var t1 = new Date().getTime();

WSH.echo("Call to do Automat algorithm took " + (t1 - t0) + " milliseconds.")
WSH.echo('String contains ',arrayOfIndex.length, ' substrings')
WSH.echo('Indexes are:\n', arrayOfIndex)
