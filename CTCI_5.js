/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	1.5 - Implement a method to perform basic string compression using the counts
		  of repeated characters. For example, the string aabcccccaaa would become
		  a2blc5a3. If the "compressed" string would not become smaller than the original
		  string, your method should return the original string.
*/

/*
	First I want to list all the different special cases I can think of.
	1. dealing with the end of the string 
	2. dealing with the start of the string 
	3. dealing with the case that the entire string is one character repeated n times (aaaaaaa)
	4. dealing with the case that the string is empty 
*/

var sampleString = "aaaccbbcaab";

function stringCompress(str) {
	/*case 4 can be dealt with just a return statement at the start; I trim because I assume
	  we don't consider whitespaces valid characters for this problem
	*/
	if(str.trim().length = 0) return sampleString;

	var compressed = "", count = 0, trimmed = str.trim(), currentChar;
	for(var i = 0; i < trimmed.length; i++) {
		//case 2; we don't do any processing if we're only on our first character, so currentChar = null 
		if(currentChar != null && trimmed[i] != currentChar) {
			//we are on a new character, save the information of the previous one 
			compressed += String(currentChar) + String(count);
			count = 0;
		}

		//every iteration we will be setting the current character and incrementing the count of that character
		currentChar = str[i];
		count++;
	}
	//case 1; the last character we encounter will not be included because the loop ends, so we do that here 
	//case 3 also, this will still work even if the string is aaaaaaaa
	compressed += String(currentChar) + String(count);

	//finally we check the length to see which version to return
	return (str.length <= compressed.length) ? str : compressed;
}

console.log(stringCompress(sampleString));

/*
	code either runs in O(N) time or O(P + K^2); the idea is whether or not strings are mutable or immutable in the 
	given language. If they are immutable, then every string concatenation we do to compressed will need to create a new
	string and copy over all of the characters, taking a total of O(n^2) time to do. Whereas if they are mutable, the 
	code is much more efficient. 

	Unfortunately, JavaScript is immutable so this code will work in O(P + K^2) time. There is a good post for an alternative
	means of concatenation here: http://stackoverflow.com/questions/51185/are-javascript-strings-immutable-do-i-need-a-string-builder-in-javascript 
*/