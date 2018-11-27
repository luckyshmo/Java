WSH.echo(Moor("abc", "abccd abcdaaadcd 123 6543tyu 567123  aaa"));

function Moor(needle, haystack){
	var i, k;
	var n = needle.length;
	var m = haystack.length;
	if( n === 0 ) return 0;
	var charTable = makeCharTable( needle );
	var suffixTable = makeSuffixTable(needle);
	var ans = new Array();
	for( i = n - 1; i < m; ) {
		var i0 = i;
		for( k = n - 1; needle.charAt(k) === haystack.charAt(i); --i, --k )
			if( k == 0 )  
			{
				ans.push(i);
				break;
			}
		var suffixShift = suffixTable[haystack.substr(i, i0+1)];
		if (isNaN(suffixShift)) suffixShift = haystack.substring(i, i0+1).length;
		i += Math.max(charTable[haystack.charAt(i)], suffixShift);
	}
	if (ans.length == 0)
	{
		WSH.echo(":(");
		WSH.quit();
	}
	return ans;
	//return -1;
}

function makeSuffixTable (needle) {
	n = needle.length;
	var pi = prefixFunction(needle)
	var pi1 = prefixFunction(reverse(needle))
	var suffShift = new Array();
	for ( j = 0; j < n; j++)
		suffShift[j] = n - pi[n-1];
	for ( i = 1; i < n; i++){
		j = n - pi1[i];
		suffShift[j] = Math.min(suffShift[j], i - pi1[i] + 1);
	}
	
	var table = new Array();
	for (i = n - 1; i >= 0; i--)
		table[needle.substring(i, n)] = suffShift[i];
	return table;
}

function reverse(s){
    return s.split("").reverse().join("");
}

function prefixFunction (str) {
	var len = str.length;
	p = new Array(len); // значения префикс-функции
	                    // индекс вектора соответствует номеру последнего символа аргумента
	p[0] = 0; // для префикса из нуля и одного символа функция равна нулю

    var k = 0;	
	for (i = 1; i < len; ++i) {	
		while ((k > 0) && (str.charAt(k) != str.charAt(i))) 
			k = p[k - 1]; 
		if (str.charAt(k) == str.charAt(i))
			++k;
		p[i] = k;
	}
	return p;
}

function makeCharTable( needle ) {
    var table = new Array();
    var n = needle.length;
    var t = table.length;
    var i = 0;
    	
	for(i = 0; i < 256; i++) 
		table[String.fromCharCode(i)]=n;
    
    n--;
    
    for( i = 0; i < n; ++i ) {
		table[needle.charAt(i)] = n - i;
    }
    return table;
    
}
  