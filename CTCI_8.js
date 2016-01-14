
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	1.8 - Assume you have a method isSubstring which checks if one word is a
		  substring of another. Given two strings, si and s2, write code to check if s2 is
		  a rotation of si using only one call to isSubstring (e.g.,"waterbottle"is a rotation
		  of "erbottlewat").
*/

/*
	A simple implementation of isSubstring just so we have it to work with. 
*/
function isSubstring(s1, s2) {
	return s2.indexOf(s1) != -1; //we are asking 'is s1 a substring of s2?' 
}

/*
	This problem made me feel rather, stupid - it's one of those "gotchas" or puzzles where the answer 
	is super easy and obvious in retrospect but I wracked my brain trying every possible solution to no 
	end only to need to see how to do it and now I am hardcore facepalming myself. 

	Basically the idea is since we're constrained to being able to use isSubstring only once, we need 
	to be super clever. We know a rotation occurs at some cutoff point. For example:

		the word "waterbottle" could be cut off at "wat" to produce "wat" and "erbottle"; 
		or it could be cut off at "waterb" and "ottle", etc. 

	The way the question is posed makes it really difficult to find the cutoff point if we can only 
	use isSubstring once. Every solution I thought of involved using isSubstring in a loop and checking
	every cut of the word against the rotation. Really inefficient but it would get the job done. Honestly 
	this question pissed me off. It's a simply word play...

	To answer the question you need to realize that when a word is cut, you get two pieces, say, x and y. 
	For instance, x = "wat" and y = "erbottle". So we know xy = "waterbottle" and yx = "erbottlewat"
	The annoying part is somehow we were supposed to realize that you could get yx if you just put two 
	xy's together like "xyxy"; there is a yx in the middle. The analogy applies to the problem. If we 
	concatenate xy to itself, we can use the isSubstring function to see if s2 is a substring of s1s1. 

	That was clever. 
*/

function isRotation(s1, s2) {
	if(s1.length != s2.length || s1.length == 0 || s2.length == 0) return false;

	var doubleS2 = s2 + s2; 
	return isSubstring(s1, doubleS2);
}

var testS1 = "erbottlewat", testS2 = "waterbottle";
console.log(isRotation(testS1, testS2)); //returns true 