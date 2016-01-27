
/*
	Author: Vuk Petrovic

	So this question was something I've recently experienced in a job interview, and frankly, some of it 
	stumped me. Here's my own personal second attempt at it. 

	Question: Given a sample input string and an alphabet, determine the smallest substring you could make from 
	the input that contains the whole alphabet. This problem was inspired by the sentence:
	"The Quick Brown Fox Jumps Over The Lazy Dog" which contains every letter in the English alphabet. 

	Examples: 

	alphabet: 'a', 'b', 'c'
	input: "aabbaccbbbaaaac"
	output: "bac"

	or 

	alphabet: 'a', 'b', 'c'
	input: "acccbbaaccba"
	output: "cba"
*/

/*
	The issue for me wasn't simply finding a short substring that contained the alphabet, the requirement that I couldn't 
	solve for was finding the shortest. My idea was to use a hashtable to keep track of the characters I've found and how many 
	of them; then, when I've seen I've found every character in my alphabet at least once, I can stop looking, I've found a valid substring.

	The next thing I did was weed out the redundant characters from the start of the substring until my seen character counts were all zero.

	Ex. 
	alphabet: 'a', 'b', 'c'
	input: "abbaaccaaabba"

	My code worked the following way:
	seen = [] //start out with an empty hash table 
	
	iterate through the string: 
	seen = [a:1]
	seen = [a:1, b:1]
	seen = [a:1, b:2]
	seen = [a:2, b:2]
	seen = [a:3, b:2]
	seen = [a:3, b:2, c:1]

	Now we're done looking, let's iterate through this string again and assemble our substring by weeding out redundant chars 
	substring = "" 

	seen = [a:2, b:2, c:1], substring = ""
	seen = [a:2, b:1, c:1], substring = ""
	seen = [a:2, b:0, c:1], substring = "b" //we now had a boolean variable set to true to say we are in the substring, include the following characters until we're done 
	seen = [a:1, b:0, c:1], substring = "ba"
	seen = [a:0, b:0, c:1], substring = "baa"
	seen = [a:0, b:0, c:0], substring = "baac" //we're done now, we don't have any more characters to test 

	output = "baac"

	Now, this seemed to have worked, indeed, baac is the shortest substring containing the alphabet in this example. But then we 
	changed the example. What if we added a 'c' to the end of the sample string? 

	input: "abbaaccaaabbac"

	Now the shortest substring containing the whole alphabet is "bac" found at the end of the input; my algorithm wouldn't find that 

	So I thought, ok, a simple solution without writing much extra code would be to perform my algorithm twice; once on the sample 
	input, and again on the sample input reversed. Then, to find the shortest substring, I'll just take the shorter of the two! 

	This would work for this example, I'd find 'baac' and I'd find "bac", and so my program would output "bac" as the shortest 
	substring. Victory! 

	Except my interviewer threw in another wrench in the machine... the case where the shortest substring is in the middle of the string. 

	input: "abbaaccababbaaaac"

	Now we have the substrings "baac" in the beginning, "cab" in the middle, and "baaaac" at the end. My program would miss the "cab"
	and say that "baac" is the best we can do. Here's where I'm stuck. Here's what I'll be trying to figure out!
*/

/*
	So I'm thinking, the problem with my code is that it stopped searching for substrings after it found one. I'm making a huge assumption
	that the first one I find is the shortest. I think the way to fix this is to keep looking for substrings, starting from the position
	right after the first character in the substring I last found.

	For example: 

	alphabet: 'a', 'b', 'c'
	input: "abbaacab"

	The program will start at index zero, and loop: 

	seen = [], 
	seen = [a:1]
	seen = [a:1, b:1]
	seen = [a:1, b:2]
	seen = [a:2, b:2]
	seen = [a:3, b:2]
	seen = [a:3, b:2, c:1] //here we've found our first substring 

	Assemble the substring 
	seen = [a:2, b:2, c:1] sub = [0:""]
	seen = [a:2, b:1, c:1] sub = [0:""]
	seen = [a:2, b:0, c:1] sub = [0:"b"]
	seen = [a:1, b:0, c:1] sub = [0:"ba"]
	seen = [a:0, b:0, c:1] sub = [0:"baa"]
	seen = [a:0, b:0, c:0] sub = [0:"baac"]

	now we look for our next string, start at the index immediately to the right of the first character in our previous substring, b
	
	seen = []
	seen = [a:1]
	seen = [a:2]
	seen = [a:2, c:1]
	seen = [a:3, c:1]
	seen = [a:3, c:1, b:1] //we've found another substring! 

	Start again from the index of that first a, and decrement all the characters until we've finished the substring assembly 

	seen = [a:2, c:1, b:1], sub = [0:"baac", 1:""]
	seen = [a:1, c:1, b:1], sub = [0:"baac", 1:""]
	seen = [a:1, c:1, b:1], sub = [0:"baac", 1:""]
	seen = [a:1, c:0, b:1], sub = [0:"baac", 1:"c"]
	seen = [a:0, c:0, b:1], sub = [0:"baac", 1:"ca"]
	seen = [a:0, c:0, b:0], sub = [0:"baac", 1:"cab"] //we're done assembling the substring! 

	We repeat this process until our algorithm can no longer find substrings that contain the alphabet. Now I can iterate through 
	the substring list and determine which substring has the shortest length, then that's the one I'll return! I just wish I wasn't 
	so nervous during the interview, I couldn't think clearly. 
*/

/*
	For this solution, I'll write more than one function to keep code organized 
*/

var subStrings = []; //holds all of the substrings we've collected 
var sampleInput = "acbbaacaaab";
var sampleAlpha = [];
sampleAlpha['a'] = true;
sampleAlpha['b'] = true;
sampleAlpha['c'] = true;
var alphaList = ['a', 'b', 'c'];

/*
	searches for the next substring in the input starting at index idx that fits our criteria.
	If it's found, it returns a javascript object containing the substring and the next index to start searching from.
	If no such substring can be found it returns null 
*/
function findSubstring(idx, input, alpha) {
	var seen = [], foundSomething = false; //a hash table we use to count the number of times we see a particular character that is in the alphabet 	

	var done = false;
	for(var i = idx; i < input.length && done == false; i++) {
		if(alpha[input[i]]) {
			//if this character is in the alphabet, we will mark it at seen 
			if(seen[input[i]] == null || typeof(seen[input[i]]) == 'undefined') {
				seen[input[i]] = 1;
				foundSomething = true;
			} else {
				seen[input[i]]++;
			}

			/*
				Here we need to check to see if we've seen every character in the alphabet at least once, if so, we need to stop
			*/
			done = true;
			alphaList.forEach(function(item) {
				if(seen[item] < 1 || typeof(seen[item]) == 'undefined') {
					done = false;
				}
			});
		} else {
			/*
			  if we find a character in our input not in the alphabet, reset all the counts and start them over
			  the logic is that if we haven't found a valid substring yet, and we're processing this character,
			  then we would be including this character in the substring if we kept going, but that would make it 
			  an invalid substring. I can't remember if the requirement that our substring had to be composed of 
			  only the characters in our alphabet was in place during the interview, but I'll assume it was for this 
			  example. I'm basing this off of the Fox and Lazy Dog sentence; we don't see any numbers or symbols in it, 
			  it is composed of only characters found in the alphabet. 
			*/
			foundSomething = false;
			seen.forEach(function(letter) {
				seen[letter] = null;
			});
		}
	} //end for 

	/*
		Now we need to process the input and seen list if we've in fact found something; getting rid of all redundant 
		characters from the beginning 
	*/
	var subStr = "", finished = false, inSubstr = false; 
	for(var i = idx; i < input.length && finished == false; i++) {
		if(seen[input[i]] > 1) {
			seen[input[i]]--;
			if(inSubstr) {
				subStr += input[i];
			}
		} else {
			subStr += input[i];
			inSubstr = true;
			seen[input[i]]--;
		}

		//check to see if we've included every character
		finished = true;
		alphaList.forEach(function(letter) {
			if(seen[letter] > 0) {
				finished = false;
			}
		});
	}

	//one final check to see if we have all the characters
	if(subStr.length < alphaList.length) return null;
	//we do one final check to see if we found a valid substring and return either an object or null accordingly 
	return (subStr.length > 0) ? {sub: subStr, i: idx + 1} : null;
}

/*
	calls the findSubstring function as long as we keep finding valid substrings and saves them into the subStrings list; then 
	processes the list and finds the string with the shortest length and returns it.
	Returns an object with the substring on success, or null on failure.
*/
function findShortestSubstring(input, alpha) {
	if(input == null || input.length == 0 || alpha == null) return null;

	var curr = {i: 0, sub: ""}; //initialize an object to store temporary substring/index info 
	while(curr != null) {
		curr = findSubstring(curr.i, input, alpha);
		if(curr) {
			subStrings.push(curr.sub);
		}
	}

	if(subStrings.length == 0) {
		return null;
	} else {
		var minLength = Number.MAX_VALUE; //the largest possible number in JavaScript before the value is considered "infinity" 
		var idx = -1;
		for(var i = 0; i < subStrings.length; i++) {
			if(subStrings[i].length <= minLength) {
				minLength = subStrings[i].length;
				idx = i;
			}
		}
		return {
			sub: subStrings[idx]
		};
	}
}


/*
	and here we are testing it! Fingers crossed! 
*/
console.log("Input: " + sampleInput);
console.log("Shortest substring: " + findShortestSubstring(sampleInput, sampleAlpha).sub);

/*
	And it worked! 
	Here are some sample program runs: 

	Input: abbaacaaab
	Shortest substring: baac

	Input: abbaacaaabc
	Shortest substring: abc 

	Input: acbbaacaaab
	Shortest substring: acb
*/	