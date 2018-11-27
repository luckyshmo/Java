function calculate( input ) {
  var ar = input.split( /\s+/ ), st = [], token;
  while( token = ar.shift() ) { 
    if ( token == +token ) { // numeric
      st.push( token );
    } else {
      var n2 = st.pop(), n1 = st.pop();
	  if (token == '^')
		  st.push(eval(Math.pow(n1, n2)))
	  else
		st.push( eval( n1 + token + n2 ) );
    }
  }
  return st.pop();
}
function toRPN (infix) {
	var outputQueue = "";
    var operatorStack = [];
    var operators = {
        "^": {
			precedence: 4,
            associativity: "Right"
        },
        "/": {
            precedence: 3,
            associativity: "Left"
        },
        "*": {
            precedence: 3,
            associativity: "Left"
        },
        "+": {
            precedence: 2,
            associativity: "Left"
        },
        "-": {
			precedence: 2,
            associativity: "Left"
        }
	}
    infix = infix.split(/\s+/g);
    for(var i = 0; i < infix.length; i++) {
        var token = infix[i];
        if(token == +token) {
            outputQueue += token + " ";
        } 
		else if("^*/+-".indexOf(token) != -1) {
            var o1 = token;
            var o2 = operatorStack[operatorStack.length - 1];
            while("^*/+-".indexOf(o2) != -1 && 
			((operators[o1].associativity == "Left" && operators[o1].precedence <= operators[o2].precedence) 
			|| (operators[o1].associativity == "Right" && operators[o1].precedence < operators[o2].precedence))) 
			{
                outputQueue += operatorStack.pop() + " ";
                o2 = operatorStack[operatorStack.length - 1];
            }
            operatorStack.push(o1);
        } 
		else if(token == "(") {
            operatorStack.push(token);
        } 
		else if(token == ")") {
            while(operatorStack[operatorStack.length - 1] != "(") {
				outputQueue += operatorStack.pop() + " ";
            }
            operatorStack.pop();
        }
		
    }
    while(operatorStack.length > 0) {
        outputQueue += operatorStack.pop() + " ";
    }
	WSH.echo(outputQueue);
	return outputQueue;
}
var ans = toRPN('-1.2 + -20.1')
//WSH.echo()
//WSH.echo()
WSH.echo(calculate(ans))