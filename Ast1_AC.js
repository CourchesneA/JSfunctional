/*
* Anthony Courchesne
* 260688650
* anthony.courchesne@mail.mcgill.ca
* COMP302 - Assignment 1
* Prof. C. Verbrugge
*
* 19 Septembre 2016
*/
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

/*var t = rndTree(0.6);
document.write(show(t.tree));
document.write("<BR><BR>");
document.write("Target: "+t.target);
document.write("<BR><BR>");
document.write(makeXXX(t.tree,t.target));
document.write("<BR><BR>");
document.write(cXXXr(makeXXX(t.tree,t.target))(t.tree));
*/

//-------------Question 3------------------------------

function wohs(param){
    function getLeft(dStr){
        //this return everything in the first parenthesis
        function getLeftHelper(str,i,pStack){
            var character = str.charAt(i);
            if(pStack==0 && i!=0){
                return character;
            }
            if(character=='(')
                return character+""+getLeftHelper(str,i+1,pStack+1);
            if(character==')')
                return character+""+getLeftHelper(str,i+1,pStack-1);
        }
        return(getLeftHelper(dStr,0,0));
    }
    function getRight(dStr){
         //this return everything in the second parenthesis
        function getRightHelper(str,i,pStack){
            var character = str.charAt(i);
            if(pStack==0 && i!=0){
                return i;
            }
            if(character=='(')
                return getLeftHelper(str,i+1,pStack+1);
            if(character==')')
                return getLeftHelper(str,i+1,pStack-1);
        }
        return(str.slice(getLeftHelper(dStr,0,0),str.length-1));
    }
    
    if(param.isAlphaNum){
        return param;
    }else if(param.isNullList){
        return null;
    }else{
        return cons(wosh(param.left),wosh(param.right));
    }

}

//var t = rndTree(0.6);
//var display = show(t.tree)
//document.write(display);
//console.log(wohs("(test(TEST))(not)"));

//console.log(BuildString("((test(tt))te)(not)",0,0));

    function getLeft(dStr){
        //this return everything in the first parenthesis
        function getLeftHelper(str,i,pStack){
            var character = str.charAt(i);
            if(pStack==0 && i!=0){
                return "";
            }
            if(character=='(')
                return character+""+getLeftHelper(str,i+1,pStack+1);
            if(character==')')
                return character+""+getLeftHelper(str,i+1,pStack-1);
            return character+""+getLeftHelper(str,i+1,pStack);
        }
        return(getLeftHelper(dStr,0,0));
    }
    function getRight(dStr){
         //this return everything in the second parenthesis
        function getRightHelper(str,i,pStack){
            var character = str.charAt(i);
            if(pStack==0 && i!=0){
                return i;
            }
            if(character=='(')
                return getRightHelper(str,i+1,pStack+1);
            if(character==')')
                return getRightHelper(str,i+1,pStack-1);
            return getRightHelper(str,i+1,pStack);
        }
        return(dStr.slice(getRightHelper(dStr,0,0)+1));
    }

    //document.write("<BR><BR>");
    //document.write("LEFT: "+ getLeft("((test(tt))te)(not)"));
    var test = getLeft("((test(tt))te) ()");
    var test2 = getRight("((test(tt))te) ()");
    console.log(test);
    console.log(test2);
    //document.write("<BR><BR>");
    //document.write("RIGHT: "+ getRight(display.slice(1,display.length-1)));