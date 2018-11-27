reg = /(\d+) (\w+)/g
s="75 ab e 5 4 17 ef"
WSH.Echo(s.match(reg).join("\n"))

var result
//while (result = reg.exec(s))
  //WSH.Echo(res.lastIndex);