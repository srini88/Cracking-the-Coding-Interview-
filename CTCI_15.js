
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	2.7 - Implement a function to check if a linked list is a palindrome.

*/

/*
	The book doesn't specify whether or not we have a singly-linked list or a doubly-linked list, 
	so I'm going to code as if it's doubly-linked first. 
	
	A palindrome is a list or string that has the the same values in the same order going forwards 
	or backwards. In other words, if you reverse the string or list, you should still have the same 
	sequence of items. 

	Ex. the word "racecar"; racecar backwords is still racecar. 

	So my thinking here is to just send one pointer to the end of the list and keep one at the start. 
	I'll loop the one at the start one step forward and the pointer at the end one step backward until 
	the node pointers collide in the middle. If I reach this point, and all nodes my pointers have visited 
	have the same value, then it's a palindrome. If at any point they don't, then it's not. 
*/

function isPalindrome(theList) {
	if(theList == null) return false;
	
	//set up the nodes; counter counts the number nodes in the list - I'm assuming that info isn't given to us 
	var listStart = theList, listEnd = theList, counter = 0; 
	while(listEnd.next != null) {
		listEnd = listEnd.next;
		counter++;
	} 
	counter++;
	
	//I use counter just so we can know if the list has an even or odd number of items; this determines how we'll end the loop
	if(counter % 2 != 0) {
		//an odd number of nodes means that the ends will converge into one middle node 
		while(listStart != listEnd) {
			//stop immediately if we are ever not equal
			if(listStart.value != listEnd.value) {
				return false;
			}
			//move nodes closer to each other
			listStart = listStart.next;
			listEnd = listEnd.prev;
		}
	} else if(counter % 2 == 0) {
		//an even number of nodes means that we will have two center nodes 
		while(listStart.next != listEnd) {
			//stop immediately if we are ever not equal
			if(listStart.value != listEnd.value) {
				return false;
			}
			//move nodes closer to each other
			listStart = listStart.next;
			listEnd = listEnd.prev;
		}
		//this loop stops before checking the final two nodes in the middle, so we do the check again 
		if(listStart.value != listEnd.value) {
			return false;
		}
	}

	return true;
}

//helper function I wrote to reduce code length and improve clarity 
/*function check(listStart, listEnd) {
	//stop immediately if we are ever not equal
	if(listStart.value != listEnd.value) {
		return false;
	}
	//move nodes closer to each other
	listStart = listStart.next;
	listEnd = listEnd.prev;
	return true;
}*/

var LinkedList = require('./LinkedList.js');

//purposely create a palindrome (ABCBA)
LinkedList.add("A");
LinkedList.add("B");
LinkedList.add("C");
LinkedList.add("B");
LinkedList.add("A");

console.log("Is it a palindrome: " + isPalindrome(LinkedList.nodeAt(0))); //prints true 

//mofify the list to make it not a palidrome 
LinkedList.add('D');

console.log("Is it a palindrome: " + isPalindrome(LinkedList.nodeAt(0))); //prints false

/*
	Note: I tried to encapsulate repetitive code into the function check() but I ran into an issue regarding how JavaScript handles 
	argument passing and evaluation strategy. I asked a question here: http://stackoverflow.com/questions/34927439/how-does-javascript-handle-objects-passed-to-functions-with-regards-to-this-link/34927674#34927674

	I'll update this when I figure it out - which will make the code more concise. 
*/