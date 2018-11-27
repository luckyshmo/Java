WSH.echo('Please enter a string to search in')
str = WSH.StdIn.ReadLine()
WSH.echo('Now enter a string that you want to search for')
substr = WSH.StdIn.ReadLine()

n = str.length
m = substr.length

if (n == 0 || m == 0){
	WSH.echo('Sorry, one or both of your strings are empty. Please try again with non-empty strings')
	WSH.quit()
}else if(n < m){
	WSH.echo('Sorry, search string is smaller than a substring. Please try again')
	WSH.quit()
}else{
	i = 0
	while (i <= str.length - substr.length){
		j = 0
		while (str.charAt(i + j) == substr.charAt(j)){
			j++
			if (j == substr.length){
				WSH.echo()
				WSH.echo('Position of first index is', i)
				break
			}
		}
		i++
	}
}