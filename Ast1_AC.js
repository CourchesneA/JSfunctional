/*
* Anthony Courchesne
* 260688650
* anthony.courchesne@mail.mcgill.ca
* COMP302 - Assignment 1
* Prof. C. Verbrugge
*
* 19 Septembre 2016
*/


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
//-----------Question 1---------------
console.log("test1");
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
        //this returns the first part of the list
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
         //this returns the second part of the list
         slicedString = dStr.slice(1,dStr.length-1);
       return slicedString.slice(getLeft(dStr).length+1);
    }

    //The core of the function check if an element is null or a string, return it;
    // else parse it then return is
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

    /*var t = rndTree(0.6);
    var display = show(t.tree)
 
    document.write(display);
    document.write("<BR><BR>");
    document.write("Left: "+getLeft(display));
    document.write("<BR><BR>");
    document.write("Right: "+getRight(display));
    document.write("<BR><BR>");
    document.write("Answer:");
    document.write("<BR><BR>");
    document.write(show(wohs(display)));*/

//-----Question 4----------
function partition(dList){  
    function buildList(list,func){  //this function take as params the list and a function, returns a list where this function is true
        if(list==null){
            return null
        }
        if(func(car(list))==true){    //if current element yield true, return it in the outputlist
            return (cons(car(list),buildList(cdr(list),func)));
        }
        //current element yield false, omit it
        return buildList(cdr(list),func);
    }

    function listOfLists(list,args){     //this function take as params the array arguments and return list of lists
        function listOfListsHelper(list,args,i){    //i should start at 1
            return cons(buildList(list,args[i]),buildList(list,args[i+1]));
        }
    }
    return (buildList(dList,arguments[1]));
}

function isEven(param){
    if(param%2==0)
        return true;
    return false;
}

var theList = cons(2,cons(3,cons(4,null)));
console.log(show(partition(theList,isEven)));
