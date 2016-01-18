
/*
	A simple Linked List object that I'll use for linked-list related problems
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
				next: null,
				prev: null
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
	},

	getRoot: function() {
		return this.root;
	}, 

	at: function(idx) {
		if(idx > this.numNodes) return false;

		var temp = this.root;
		for(var i = 0; i < idx; i++) {
			temp = temp.next;
		}

		return temp.value;
	}
}

module.exports = LinkedList;