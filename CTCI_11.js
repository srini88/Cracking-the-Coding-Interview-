
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	2.3 -  Implement an algorithm to delete a node in the middle of a singly linked list, given only access to that node.

			EXAMPLE
			
			Input: the node c from the linked list a -> b -> c -> d -> e
			Result: nothing is returned, but the new linked list looks like a -> b -> d -> e 
*/

/*
	Since we don't have access to the root node, we basically don't have access to any nodes before the middle node. This
	is a problem since the only way to remove a node from a linked list is to remove any and all references to it. In a 
	singly linked list this involves pointing the previous node's next pointer to the node pointed to by the current node's 
	next pointer.

	ex. 
	a -> b -> c ;  remove b:   a -> ) b (-> c  gives us: a -> c 
								   (_____)

	The only way I can think of to remove the middle node is to simply turn the middle node into the node it's pointing to 
	by copying all of the data in the node it's pointing to, to itself. Do this for all nodes until the last, then remove the 
	reference to the last node as it is no longer needed. 

	ex. a -> b -> c -> d -> e; remove c; copy d data into c, copy e data into d, now we have a -> b -> d -> e -> e; now point 
	the first e to null and you're done: a -> b -> d -> e -> null

	This time I moved the boilerplate linked list code to a separate file and imported it using require(). 
*/

var LinkedList = require("./LinkedList.js");

LinkedList.removeMiddle = function(n) {
	//we want to stop on the second to last node, d in this case so we can later remove its reference to the last node
	while(n.next.next != null) {
		n.value = n.next.value; //copy the data 
		n = n.next;
	}

	n.next = null; //remove the reference to the last node which is now a duplicate
}

//now we're going to test! 
for(var i = 0; i < 5; i++) {
	LinkedList.add(Math.floor(Math.random() * 10 + 1));
}
var theNode = LinkedList.getRoot().next.next; //get the 3rd node in a list of 5

console.log("Before removal: \n");
LinkedList.listDump();
LinkedList.removeMiddle(theNode);
console.log("After removal: \n");
LinkedList.listDump();

/* Note: the solution works but once again I missed the mark with efficiency. There was no need to copy down all nodes, 
	simply copy node d's data into c and then remove d. 

	ex. 
		a -> b -> c -> d -> e; then a -> b -> d -> d -> e; finally a -> b -> d -> e
*/