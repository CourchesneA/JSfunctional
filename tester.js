// Construct a random tree based on pairs constructed using cons.
// Branches are deepened with probability p.
// Returns an object, with a "tree" field containing the random tree,
// and a "target" field containing a randomly selected, unique name
// within the tree.
function rndTree(p) {
    // Keep track of all names used, so we can ensure they are unique,
    // and also find a random name later too.
    var allNames = [];
    // The number of characters in a random string.
    var nameLength = 5;

    // Returns a random integer 0..max-1.
    function rndInt(max) {
        return Math.floor(Math.random() * max);
    }

    // Constructs a random string, as a tree element.
    function rndString() {
        // The set of characters from which the random name will be derived.
        var alphas = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        // A recursive helper to progressively append n chars onto s.
        function helper(n,s) {
            if (n==0)
                return s;
            return helper(n-1,s + alphas.charAt(rndInt(alphas.length)));
        }
        var name = helper(nameLength,'');
        // Here we ensure the name just constructed is unique within the tree,
        // and if not we try again recursively.
        if (allNames.indexOf(name)>=0)
            return rndString();
        // Ok, unique, so record the name.
        allNames.push(name);
        return name;
    }

    // This function actually constructs the random tree, recursively deepening either the 
    // first or second of the pair with probability p.
    function rndTreeHelper(p) {
        return cons(
            (Math.random()<p) ? rndTreeHelper(Math.max(0,p-0.01)) : rndString(),
            (Math.random()<p) ? rndTreeHelper(Math.max(0,p-0.01)) : null);
    }
    
    var t = rndTreeHelper(p);

    return { target: allNames[rndInt(allNames.length)],
             tree: t };
}

function cons(a,b) {
    return function (selector) {
        if (selector=='areyoualist?')
            return 'yesIam';
        return selector(a,b);
    };
}

function car(list) {
    function carHelper(a,b) {
        return a;
    }
    return list(carHelper);
}

function cdr(list) {
    function cdrHelper(a,b) {
        return b;
    }
    return list(cdrHelper);
}

function isList(thing) {
    if (typeof(thing)!='function')
        return false;
    try {
        if (thing('areyoualist?')=='yesIam')
        return true;
    } catch(e) {
    }
    return false;
}

function show(list) {
    var sval;
    if (list==null)
        sval = '()';
    else if (isList(list))
        sval = '('+ show(car(list)) +' '+show(cdr(list))+')';
    else 
        sval = String(list);
    return sval;
}


function cXXXr(ads){
    if(ads.length==1){
        if(ads == 'a'){
            return function (list){
                return car(list);
            }
        }
        if(ads == 'd'){
            return function (list){
                return cdr(list);
            }
        }
   }
   if(ads.charAt(0)=='a'){
    return function (list){
        return car(cXXXr(ads.slice(1,ads.length))(list));
    }
   }
   if(ads.charAt(0)=='d'){
    return function (list){
        return cdr(cXXXr(ads.slice(1,ads.length))(list));
    }
   }
}

/*var ls = cons('v',cons('w',cons('x',cons('y',cons('z',null)))));
var cadr = cXXXr('ad');
var caddr = cXXXr('add');

document.writeln("cadr: "+cadr(ls));
document.writeln("caddr: "+caddr(ls));
document.write(cXXXr("adddd")(ls));
*/

//---------------Question 2 ------------------

//this function find a string then returns its path
//Debth-first search
function makeXXX(tree,s){
    var left = car(tree);
    var right = cdr(tree);
    if(!isList(left)){
        if(left===s){   //left is the searched string
            return "a";
        }
    }else{  //left is a list
        var result = makeXXX(left,s);
        if(result!=null){   //string found in left
            return result+"a";
        }
    }
    //string not found in left side
    if(isList(right)){
        var result = makeXXX(right,s);
        if(result!=null){   //string found in right
            return result+"d";
        }
    }
    //right is null
    return null;
}

//var t = rndTree(0.6);
//document.write(show(t.tree));
//document.write("<BR><BR>");
/*
document.write("Target: "+t.target);
document.write("<BR><BR>");
document.write(makeXXX(t.tree,t.target));
document.write("<BR><BR>");
document.write(cXXXr(makeXXX(t.tree,t.target))(t.tree));
*/

//-------------Question 3------------------------------

function wohs(param){
    function getLeft(dStr){
        //this return everything in the first parenthesis or the string
        function getLeftHelper(str,i,pStack){
            var character = str.charAt(i);
            if(character != '(' && i==0){
                //Left part is a string, return it
                return str.slice(0,5);
            }
            if(pStack==0 && i!=0){
                return "";
            }
            if(character=='(')
                return character+""+getLeftHelper(str,i+1,pStack+1);
            if(character==')')
                return character+""+getLeftHelper(str,i+1,pStack-1);
            return character+""+getLeftHelper(str,i+1,pStack);
        }
        return(getLeftHelper(dStr.slice(1,dStr.length-1),0,0));
    }
    function getRight(dStr){
         //this return everything in the second parenthesis
         slicedString = dStr.slice(1,dStr.length-1);
       return slicedString.slice(getLeft(dStr).length+1);
    }
    var leftPart = getLeft(param);
    var rightPart = getRight(param);
    var leftConstruct;
    var rightConstruct;
    if(leftPart.charAt(0)=='('){
        leftConstruct = wohs(leftPart);     //the left part is a list so parse it
    }else{
        leftConstruct = leftPart;   //The left part is a string so return it like it is
    }
    if(rightPart=="()"){
        rightConstruct = null;      //The right part is null so return null
    }else{
        rightConstruct = wohs(rightPart);   //The right part is a list so parse it
    }
    return cons(leftConstruct,rightConstruct);

}

var display = "(zcvrH (CXbYW (((AMPYW (eUBSL ())) ()) ())))";
    console.log(display);
    console.log("<BR><BR>");
    //console.log("Left: "+getLeft(display));
    console.log("<BR><BR>");
    //console.log("Right: "+getRight(display));
    console.log("<BR><BR>");
    console.log("Answer:");
    console.log(show(wohs(display)));