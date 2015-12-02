
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	1.1 - Implement an algorithm to determine if a string has all unique characters. What
	      if you cannot use additional data structures?
*/

var sampleString = "AC34BYA6Z9"; //has a repeated 'A'

/*
  My first thought is to just use a stack where I keep track of all characters I've visited. 
  Then, every time I visit a character, I first check to see if it's in the stack. 
  I return false if the string is not composed of only unique characters, true otherwise. 
*/

function unique_with_stack(str) {
	var visited = [];

	for(var i = 0; i < str.length; i++) {
		if(visited.length > 0 && visited.indexOf(str[i]) != -1) {
			return false;
		}

		visited.push(str[i]);
	}

	return true; //if we haven't yet returned false, then the string checks out 
}

console.log("Unique? : " + unique_with_stack(sampleString));

/*
  The second part of the question asks me to solve the problem without using another data 
  structure (like my visited stack).

  The solution that comes to my mind first is to search through the string a second time 
  for every character I find and see if I run into it again later. For each character I 
  test, the second loop will see if it's the same as the remaining characters. The run time 
  is O(n^2), but it gets the job done
*/ 

function unique_without_stack(str) {
	for(var i = 0; i < str.length; i++) {
		for(var j = i; j < str.length; j++) {
			if(str[i] == str[j] && i != j) {
				return false;
			}
		}
	}

	return true;
}

console.log("Unique? : " + unique_without_stack(sampleString));

/*
  An important thing that I missed that author Gayle Laakmann McDowell pointed out is
  that I can short-circuit the functions simply by checking the length of the string. 

  Since there are only 256 unique ascii characters, if my input string length is greater 
  than 256, then I know there has to be some repetition; I can return false immediately. 
*/

//if(str.length > 256) return false;

/*
  McDowell's solution is also quicker because it utilizes the effecient lookup time of an
  array to determine if a character has been used already. Using a boolean array of length 
  256 allows you to check if a character has been seen in O(1) time. My stack method probably
  takes longer assuming JavaScript's indexOf() method takes O(n) if it's implemented as a
  linear search. So in the worst case since I'm going through all n characters in the string,
  and searching through a stack which will eventually have n-1 items in it, the runtime would 
  be O(n^2). 
*/

/*
  As I was walking home from school I had a eureka moment - what if we used a Hash Table to 
  solve the problem? Hash Tables have insertion and query times of O(1); Not only that, but 
  to know whether or not the string has only unique characters would simply be a matter of 
  getting the Hash Table's load factor. If the load factor is equal to 1 then each element
  is in its own unique bucket; otherwise there is a repeated character. 

  In JavaScript this would be easy since Hash Tables are implemented like normal arrays - they 
  simply work with non-index keys as well as indexes. 
*/

var HashTable = {
	numObjects: 0,
	numBuckets: 0,
	table: [],
	add: function(item) {
		//if the entry already exists in the table, increment its value
		if(this.table[item]) {
			this.table[item]++;
		} else {
		//otherwise, make a new element and initialize value to 1
			this.table[item] = 1;
			this.numBuckets++;
		}
		this.numObjects++;
	},
	getLoadFactor: function() {
		return this.numObjects / this.numBuckets;
	}
}

function unique_with_ht(str) {
	for(var i = 0; i < str.length; i++) {
		HashTable.add(str[i]);
	}

	/*load factor of 1 means that there are n buckets in use and n total objects
	  which means each element has a unique bucket which means each element is unique
	*/
	return HashTable.getLoadFactor() == 1;
}

console.log("Unique? : " + unique_with_ht(sampleString));