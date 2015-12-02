
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	1.4 - Write a method to replace all spaces in a string with '%20'. You may assume that
		  the string has sufficient space at the end of the string to hold the additional
		  characters, and that you are given the "true" length of the string. (Note: if implementing
		  in Java, please use a character array so that you can perform this operation
		  in place.)
		  
		  EXAMPLE
		  Input: "Mr John Smith"
		  Output: "Mr%20Dohn%20Smith"
*/

/*
	My first thought here is that this problem seems to be intended for a language not 
	quite so high-level as JavaScript. This problem is trivial with JavaScript, but I'll
	try to do it in-place rather than making new variables to hold portions of the string. 
*/

var sampleString = "This is a test!";

function replaceSpace(str) {
	while(str.indexOf(" ") != -1) {
		var first = str.substr(0, str.indexOf(" "));
		var last = str.substr(str.indexOf(" ") + 1, str.length);
		str = first + "%20" + last;
	}

	return str;
}

console.log(replaceSpace(sampleString));

/*
	Since the author used Java, she implemented it slightly differently; first passing 
	through the string to count the number of white spaces, calculate the new string 
	length, and then create a new string of that length to copy the original string plus 
	the %20s into. 

	Mine unfortunately does not pass through the string once, but as many times as there 
	are spaces. The while loop uses indexOf to find the spaces, which is basically a linear
	search for the first whitespace in the string. Although less efficient than the way the 
	author had done it, the code is more elegent and concise.

	Of course, JavaScript has a built-in replace function which makes short work of this
	problem: 

	return str.replace(/ /gi, "%20");
*/

function replaceSpaceFunny(str) {
	return str.replace(/ /gi, "%20");
}

console.log(replaceSpaceFunny("Hello, world! Welcome to my universe."));

//lol