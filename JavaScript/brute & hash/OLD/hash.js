function Compare(hs, sub_hs){
	if (hs == sub_hs){
		compstr = str.substr(i, m)
		if (compstr === substr){
			WSH.echo()
			WSH.echo('Position of first index is', i)
			flag = false
		}else{
			WSH.echo()
			WSH.echo('There is a collision ( index', i, '):')
			WSH.echo('Expected -', substr)
			WSH.echo('Actual   -', compstr)
		}
	}
}

function InputStr(){
	/*WSH.echo('Please enter a string to search in')
	str = WSH.StdIn.ReadLine()
	WSH.echo('Now enter a string that you want to search for')
	substr = WSH.StdIn.ReadLine()*/
	
	fso = new ActiveXObject("Scripting.FileSystemObject");
	ts  = fso.OpenTextFile('input.txt');
	str = ts.ReadAll();
	ts.Close();
	ts  = fso.OpenTextFile('search.txt');
	substr = ts.ReadAll();
	ts.Close();

	n = str.length
	m = substr.length

	if (n == 0 || m == 0){
		WSH.echo('Sorry, one or both of your strings are empty. Please try again with non-empty strings')
		WSH.quit()
	}else if (n < m){
		WSH.echo('Sorry, search string is smaller than a substring. Please try again')
		WSH.quit()
	}
}
	
if (WSH.arguments(0) == 'linear'){
	InputStr()
	
	compstr = ''

	sub_hs = 0
	for (i = 0; i < m; i++)
		sub_hs += substr.charCodeAt(i)
	WSH.echo()
	WSH.echo('Hash-code for \'', substr, '\' is:')
	WSH.echo(sub_hs)

	hs = 0
	time_start = new Date()
	for (i = 0; i < m; i++)
		hs += str.charCodeAt(i)
	
	flag = true
	i = 0
	Compare(hs, sub_hs)

	for (i = 1; i < n - m + 1; i++){
		hs = hs + str.charCodeAt(i + m - 1) - str.charCodeAt(i - 1)
		Compare(hs, sub_hs)
	}
	
	if (flag){
		WSH.echo()
		WSH.echo('Substring was not found')
	}
	
	time_finish = new Date()
	WSH.echo()
	//WSH.echo('Runtime of this script: ', time_finish.getMilliseconds - time_start.getMilliseconds)
}else 
if (WSH.arguments(0) == 'square'){
	InputStr()
	
	compstr = ''
	
	sub_hs = 0
	for (i = 0; i < m; i++)
		sub_hs += Math.pow(substr.charCodeAt(i), 2)
	WSH.echo()
	WSH.echo('Hash-code for \'', substr, '\' is:')
	WSH.echo(sub_hs)

	hs = 0
	time_start = new Date()
	for (i = 0; i < m; i++)
		hs += Math.pow(str.charCodeAt(i), 2)

	flag = true
	i = 0
	Compare(hs, sub_hs)

	for (i = 1; i < n - m + 1; i++){
		hs = hs + Math.pow(str.charCodeAt(i + m - 1), 2) - Math.pow(str.charCodeAt(i - 1), 2)
		Compare(hs, sub_hs)
	}
	
	if (flag){
		WSH.echo()
		WSH.echo('Substring was not found')
	}
	
	time_finish = new Date()
	WSH.echo()
	//WSH.echo('Runtime of this script: ', time_finish.getMilliseconds - time_start.getMilliseconds)
}else 
if (WSH.arguments(0) == 'Rabin-Karp'){
	InputStr()
	
	compstr = ''

	sub_hs = 0
	for (i = 0; i < m; i++)
		sub_hs += substr.charCodeAt(i)*Math.pow(2, m - i - 1)
	WSH.echo()
	WSH.echo('Hash-code for \'', substr, '\' is:')
	WSH.echo(sub_hs)

	hs = 0
	time_start = new Date()
	for (i = 0; i < m; i++)
		hs += str.charCodeAt(i)*Math.pow(2, m - i - 1)
	
	flag = true
	i = 0
	Compare(hs, sub_hs)

	for (i = 1; i < n - m + 1; i++){
		hs = (hs - str.charCodeAt(i - 1)*Math.pow(2, m - 1))*2 + str.charCodeAt(i + m - 1)
		Compare(hs, sub_hs)
	}
	
	if (flag){
		WSH.echo()
		WSH.echo('Substring was not found')
	}
	
	time_finish = new Date()
	WSH.echo()
	//WSH.echo('Runtime of this script: ', time_finish.getMilliseconds - time_start.getMilliseconds)
}else 
if (WSH.arguments(0) == '/?'){
	WSH.echo('This script is searching for a substring in an input line using different Hash algorithms.')
	WSH.echo('The result is an index of the first similar letter in both strings.')
	WSH.echo()
	WSH.echo('There are several working mods for this script:')
	WSH.echo('\t 1) <linear>')
	WSH.echo('\t 2) <square>')
	WSH.echo('\t 3) <Rabin-Karp>')
}else{
	WSH.echo('Not correct working mode. See HELP (/?) for more information')
}