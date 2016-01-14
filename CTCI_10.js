
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	2.2 - Implement an algorithm to find the kth to last element of a singly linked list. 
*/

/*
	There is one really obvious solution here that comes to mind quickly - in a typical linked list move a pointer 
	through the list until you hit the end, then move back K - 1 elements. This would take O(n) time because you will
	at most need to go through 2n elements (move all the way to the back and then all the way to the front)
*/

/*
	A simple Linked List object that I'll use 
*/
var LinkedList = {
	root: null, //root node 
	numNodes: 0, //number of nodes in list 

	//adds a new node to the linked list 
	add: function(val) {
		//deal with the special case that this is our first node
		if(this.root == null) {
			this.root = {
				value: val,
				next: null
			}
			this.numNodes++;
			return;
		}

		//starting at the root node, traverse the list until at the end 
		var tempNode = this.root; 
		while(tempNode.next != null) {
			tempNode = tempNode.next;
		}
		//create a new node object and add it 
		tempNode.next = {
			value: val,
			next: null,
			prev: tempNode
		};
		this.numNodes++;
	},

	/*removes a node based on a given value, we assume our linked list will only 
	  have unique nodes, node duplicates */
	remove: function(val) {
		//start at the root node, traverse list until node with value found 
		var tempNode = this.root;
		while(tempNode.next.value != val) {
			tempNode = tempNode.next;
		}
		//remove node by eliminating references to it 
		tempNode.next = tempNode.next.next;
		this.numNodes--;
	},

	//prints structure of linked list
	listDump: function() {
		var tempNode = this.root; 
		while(tempNode != null) {
			process.stdout.write("[" + tempNode.value + "] -> ")
			//console.log("[" + tempNode.value + "] -> ");
			tempNode = tempNode.next;
		}
		console.log("");
	},

	getSize: function() {
		return this.numNodes;
	}
}

//The described algorithm: 

LinkedList.kthToLast = function(k) {
	//we will return early if we are asking for a node that is out of bounds of our list 
	if(k - 1 > this.numNodes) return;

	var temp = this.root;

	//move through the list until we reach the last element 
	while(temp.next != null) {
		temp = temp.next;
	} 

	//number of times we need to move back
	var num = k - 1;
	while(num > 0) {
		temp = temp.prev;
		num--;
	}

	return temp.value;
}

/*
	Populating the list with random numbers 
*/

for(var i = 0; i < 20; i++) {
	LinkedList.add(Math.floor(Math.random() * 10 + 1));
}

LinkedList.listDump();

console.log("\nSecond to last item is: " + LinkedList.kthToLast(2));