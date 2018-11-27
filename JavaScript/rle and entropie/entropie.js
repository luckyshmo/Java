WSH.echo('Type a string to caculate entropy')  
str = 'eeeeeeeeeeeeeeeee'; 
alph = new Array(); 

var j = 0;
for(i=0;i<str.length;i++)
{	
	alph[str.charAt(i)]=0; 
	if (str.charAt(i) == str.charAt(i+1))
	j++;
}
for(i=0;i<str.length;i++) 
	alph[str.charAt(i)]++;

//WSH.echo(j +"___"+ str.length)
if (j+1 == str.length)
{
	WSH.echo(1);
}

else
{
	for (i in alph) 
		WSH.echo('alph [',i,']=', alph[i]);
	mySize=0; 
	for (i in alph) 
	{ 
		alph[i]/=str.length; 
		mySize++; 
	} 

	chaos = 0; 
	for (i in alph) 
		chaos -= alph[i]*Math.log(alph[i]); 
	chaos /= Math.log(mySize); 
	WSH.echo(chaos);
}
