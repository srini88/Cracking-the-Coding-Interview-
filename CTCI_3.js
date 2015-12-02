
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	1.3 - Given two strings, write a method to decide if one is a permutation of the other.
	
*/

/* 
	A string permutation is simply all of the different strings you can make given some characters. 
	For example, the permutations of the characters ABC are: 

	ABC, ACB, BAC, BCA, CAB, CBA

	I notice some rules here quickly: 
		- the permutations of a string will always have only as many characters as the original string 
		- the permutations of a string will only use the characters in the given string, no others 
		- the permutations of a string will only have as many of each character as in the original string 

	Given these rules I came up with, I know the following are NOT permutations of ABC: 
	AABC, ABCD, ABBC, ABCDQ

	So my approach is basically to make sure the second string follows those three rules 
*/

var sampleString1 = "ABCA";
var sampleString2 = "BCAA";


StringTable = function() {
	var obj = {
		table: [],
		buckets: 0,
		add: function(char) {
			if(this.table[char]) {
				this.table[char]++;
			} else {
				this.table[char] = 1;
				this.buckets++;
			}
		},
		get: function() {
			return {
				table: this.table,
				buckets: this.buckets
			}
		},

	}

	return obj;
}

/*
	So first we check the strings' lengths. True permutations always have the same length.
	Next, we add every character in each string into a StringTable object which basically creates
	a hashtable that counts the occurence of each character and keeps track of how many different 
	buckets are in use. 

	If one StringTable is using 3 buckets, and the other 4, then one has 3 unique characters and 
	the other 4, which means they're not permutations. 

	Finally, if everything else is ok, I check that the individual charcter counts are the same.
	So I need to make sure two stings of the same length and bucket count also have the same number 
	of corresponding characters like:

	AACB and ABAC -> passes 
	ABBC and AACB -> fails 
*/
function isPerm(str1, str2) {
	//check for rule 1
	if(str1.length != str2.length) return false;

	var st1 = StringTable(), st2 = StringTable();
	for(var i = 0; i < str1.length; i++) {
		st1.add(str1[i]);
		st2.add(str2[i]);
	}

	//check for rule 2
	if(st1.get().buckets != st2.get().buckets) {
		return false;
	}

	//check for rule 3
	Object.keys(st1.get().table).forEach(function(key) {
		if(st1.get().table[key] != st2.get().table[key]) {
			return false;
		}
	});

	return true;
}

console.log("Permutations? : " + isPerm(sampleString1, sampleString2));

/*
	First thing the author says is we need to get some more clarification of the conditions. 
	We need to ask things like "does whitespace matter?" and "should this be a case-sensitive comparison?".
	For my example I assumed the answer to both was 'yes'.

	There were two ways to solve this problem, I basically did the second way in the book, but more complicated. 
	It's funny because I failed to come up with the obvious solution - simply sorting both strings and 
	checking if they're the same. This will cover both the string length issue, and everything else...
*/

function isPermBetter(str1, str2) {
	if(str1.split('').sort().join() != str2.split('').sort().join()) {
		return false;
	}

	return true;
}

console.log("Permutations? : " + isPermBetter(sampleString1, sampleString2));

//so simple... 