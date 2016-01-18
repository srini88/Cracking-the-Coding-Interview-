
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	2.4 -  Write code to partition a linked list around a value x, such that all nodes less than x come before all nodes 
		   greater than or equal to x. 
*/

/*
	Here I'm thinking I'll iterate through the Linked List and then make two separate lists - one that is populated with 
	nodes containing values smaller than the one given, and one with values larger than given. At the end I'll just link
	the lists together;
*/

var LinkedList = require("./LinkedList.js");

LinkedList.partition = function(val) {
	if(this.root == null) return false; //false for fail

	var temp = this.root, ltList = null, gtList = null, ltStart = null, gtStart = null;
	//iterate through the list and look at the value of each node
	while(temp != null) {
		if(temp.value < val) {
			if(ltList == null) {
				ltList = temp;
				ltStart = ltList;
			} else {
				ltList.next = temp;
				ltList = ltList.next;
			}
		} else {
			if(gtList == null) {
				gtList = temp;
				gtStart = gtList;
			} else {
				gtList.next = temp;
				gtList = gtList.next;
			}
		}
		temp = temp.next;
	}

	if(ltStart != null) {
		this.root = ltStart;
		ltList.next = gtStart;
	} else {
		this.root = gtStart;
	}
	gtList.next = null; //prevent infinite loop by pointing last node's next to null

	//success
	return true;
} 

//now we're going to test! 
for(var i = 0; i < 10; i++) {
	LinkedList.add(Math.floor(Math.random() * 10 + 1));
}

console.log("Before partitioning: ");
LinkedList.listDump();

console.log("\n\nOur pivot number is: " + LinkedList.at(4));
LinkedList.partition(LinkedList.at(4)); //at() returns the value of the node at the given index (zero-based)

console.log("After partitioning: ");
LinkedList.listDump();

/*
	Note: the code worked! It successfully partitioned the linked list. The algorithm I wrote is O(n) because we 
	iterate through the whole linked list once.

	Before partitioning:
	[4] -> [7] -> [5] -> [6] -> [3] -> [10] -> [6] -> [2] -> [2] -> [3] ->
	Our pivot number is: 3

	After partitioning:
	[2] -> [2] -> [4] -> [7] -> [5] -> [6] -> [3] -> [10] -> [6] -> [3] ->
*/