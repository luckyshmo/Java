function node (letter, freq, used, code, father) 
{ 
this.letter = letter; 
this.freq = freq; 
this.used = used; 
this.code = code; 
this.father = father; 
} 

/*n1 = new node('a', 5, 0, "", null); 
n2 = new node('b', 2, 0, "", null); 
//n3 = new node('r', 2, 0, "", null); 
//n4 = new node('k', 1, 0, "", null); 
//n5 = new node('d', 1, 0, "", null); 

n6 = new node(n1.letter+n2.letter, n1.freq+n2.freq, 0, "", null);*/ 

/*WSH. echo ('type the string'); 
str = WSH.StdInReadLine(); 
WSH.echo(str); */
str = "aaaaabsddd";
alph = new Array(); 
for (i = 0; i<str.length; i++) 
	alph[str.charAt(i)] = 0; 
for (i = 0; i<str.length; i++) 
	alph[str.charAt(i)]++; 

tree = new Array(); 
for (i in alph) 
{ 
//WSH.echo(i, alph[i]); 
n = new node(i, alph[i], 0, "", null); 
tree.push(n); 
} 

for (i=0; i<tree.length; i++) 
{ 
	WSH.echo(tree[i].letter); 
} 


//WSH.echo(n1.letter);