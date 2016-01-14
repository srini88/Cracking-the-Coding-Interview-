
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
	if(k - 1 > this.numNodes) return null;

	var temp = this.root;

	//move through the list until we reach the last element 
	while(temp.next != null) {
		temp = temp.next;
	} 

	//number of times we need to move back
	var num = k - 1;
	while(num > 0) {
		temp = temp.prev; //this solution assumes you have a doubly-linked list, which is what the book does as well
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

/*
	Note: my method works - it gives us the correct node and it's fairly effecient (O(n)), however there is a better way 
	according to the author - I should have thought of this given my solution to the last question! 

	The idea is to use the same leader/follower technique except instead of keeping the follower one node behind the leader,
	we keep the follower k nodes behind the leader. That way when the leader hits the end of the linked list, the follower 
	is on node n - k, or the kth to last element!
*/

LinkedList.kthToLastBetter = function (k) {
	if(k > this.numNodes) return null;

	var leader = this.root, follower = null;
	var follow = 0;

	while(leader.next != null) {
		//we only want to move when the leader had moved forward k spaces 
		if(follow % k == 0) {
			follower = leader;
		}
		leader = leader.next;
		follow++;
	}

	return follower.value;
}

console.log("Second to last item is still: " + LinkedList.kthToLastBetter(2));

/*
	Now this method of solving the problem is still O(n) because we do need to move through the whole list,
	but it will go through potentially half as many nodes. Remember my method is technically O(2n) because 
	the user might ask for the first node, in which case my algorithm will travserse the list until the end,
	and then traverse the list back. For a small list, the difference is negligable. But say there are 10 billion 
	items in the list - my algorithm will traverse 20 billion nodes at most; this algorithm will traverse 10 billion. 
*/

/*
	Final note: there are also two really trivial solutions to this problem that make assumptions:
		
		- if you have the length of the linked list, then you can simply iterate to the length - kth node and return its value 
		
		- you can also define the linked list object to keep track of the last node. If the linked list is also doubly-linked 
		then all you need to do is travel back k nodes, which makes the algorithm O(k), which may be really fast if k < n
*/