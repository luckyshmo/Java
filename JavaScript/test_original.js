function Node(name, cnt, used, code, link){
    this.name = name;
    this.cnt = cnt;
    this.used = used;
    this.code = code;
    this.link = link;
}
var str = "aaabbcas";
n = str.length;
alph = new Array();// массив где индекс буква - значение кол-во раз в строке
tree = new Array();
code = new Array();
encode = new Array();
function find_to_merge()
{
    cnt = n;
    ind = 0;
    for(i = 0; i < tree.length; ++i)
        if(tree[i].cnt < cnt && !tree[i].used){
            cnt = tree[i].cnt;
            ind = i;
        }
    return ind;
}
for(i = 0; i < n; ++i)
    alph[str.charAt(i)] = 0;
for(i = 0; i < n; ++i)
    alph[str.charAt(i)]++;
 
for(i in alph){
    node = new Node(i, alph[i], 0, '', null);
    tree.push(node);
}
m = tree.length;
for(k = 0; k < m - 1; ++k){
    var num1 = find_to_merge();
    tree[num1].used = 1;
    tree[num1].code = 0;
    tree[num1].link = tree.length;
    var num2 = find_to_merge();
    tree[num2].used = 1;
    tree[num2].code = 1;
    tree[num2].link = tree.length;
    node = new Node(tree[num1].name + tree[num2].name, tree[num1].cnt + tree[num2].cnt, 0, '', null);
    tree.push(node);
}
for(i = 0; i < m; ++i){
    j = i;
    code[tree[j].name] = "";
    while(tree[j].link){
        code[tree[i].name] = tree[j].code + code[tree[i].name];
        j = tree[j].link;
    }
    encode[code[tree[i].name]] = tree[i].name;
}
if (m == 1)
{
    code[str.charAt(0)] = '1';
    encode['1'] = str.charAt(0);
}
ans = ""
for (i = 0; i < n; ++i)
    ans += code[str.charAt(i)] + ' ';
WSH.echo(ans);
 
var cur = "";
str = "";
for (i = 0; i < ans.length; ++i)
{
    cur += ans.charAt(i);
    if (encode[cur])
    {
        str += encode[cur];
        cur = "";
    }
}
 
WSH.echo(str);