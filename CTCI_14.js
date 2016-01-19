/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	2.6 - Given a circular linked list, implement an algorithm which returns the node at the beginning of the loop.
		  DEFINITION Circular linked list: A (corrupt) linked list in which a node's next pointer points to an earlier node, so as to make a loop in the linked list.
		  
		  EXAMPLE
		  Input: A->B->C->D->E->C [the same C as earlier]
		  Output: C
*/

/*
	Ok my emmediate idea is to just maintain a count of how many times I've seen each node and the first time I see a particular node 
	more than once is the start of the loop. I can do this probably with a hashtable for quick look up and insertion. 

	UPDATE: I tried usng a hash table but there just wasn't a way to differenciate the nodes. It kept telling me any node looked like 
	any other node.So I went with a simple stack. This makes my runtime slow though, O(n^2).
*/

var LinkedList = require('./LinkedList.js');

function findLoopHead(theList) {
	if(theList == null) return -1;

	var temp = theList, seen = [];
	while(true) {
		if(temp == null) {
			//we've gone through the whole list and not found a single loop
			return -1;
		}
		
		if (seen.indexOf(temp) == -1) {
			seen.push(temp);
		} else {
			//we've found a node we've already seen, return this node immediately
			return temp;
		}
		temp = temp.next;
	}
}

/*
	Populate the list with some test nodes
*/
var letters = ["A", "B", "C", "D", "E"];
for(var i = 0; i < 5; i++) {
	var let = letters[Math.floor(Math.random() * 4 + 1)];
	LinkedList.add(let);
}

/*
	Link the last node to a previous node to create a loop
*/
LinkedList.createLoop = function() {
	//I'll just link the end node to the middle node 
	var headNode = null, endNode = null;
	for(var i = 0; i < this.numNodes; i++) {
		if(i == Math.floor(this.numNodes / 2)) {
			headNode = LinkedList.nodeAt(i);
		}
		if(i == this.numNodes - 1) {
			endNode = LinkedList.nodeAt(i);
		}
	}
	//create the loop
	endNode.next = headNode;
}

//call the function and let there be a loop!
LinkedList.createLoop();

//since we added 5 nodes, and pointed the last node at the middle node, then node of index 5 should be the middle node 
var tempNode = LinkedList.nodeAt(0);
for(var i = 0; i < 6; i++) {
	console.log(tempNode.value);
	tempNode = tempNode.next;
}

//find the loophead! 
var loopHead = findLoopHead(LinkedList.nodeAt(0));
console.log("The loopHead is " + loopHead.value);

/*
	We successfully find the node head but I'm sure there is a better way. 
*/