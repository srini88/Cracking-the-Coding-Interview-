
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	2.1 - Write code that removes duplicates from an unsorted linked list 
*/

/*
	To start, I'm going to implement a simple linked list object so that we can create one to work with.
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
			next: null
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

/*
	Next I will populate a list, randomly picking a number between 1 and 10, 20 times. Hopefully we'll get a duplicate! 
*/

for(var i = 0; i < 20; i++) {
	LinkedList.add(Math.floor(Math.random() * 10 + 1));
}

/*
	I'm printing the list to see what's in it and if there are any duplicates 
*/
LinkedList.listDump();

/*
	Here I'm defining the removeDup function for the linked list object. I'm going to use the good ol' leader/follower 
	node trick where one node traverses the list before the other. This allows me to "see into the future" and know if
	a duplicate comes up, and if so, remove it.
*/

LinkedList.removeDup = function() {
	if(this.root == null) return; //return immediately as there is no work to do

	//n1 will lead, n2 will follow	
	var n1 = this.root, n2 = null;
	//we will use a hash table to keep track of seen elements as lookup time is O(1);
	var seen = []; //we assume a maximum number of unique nodes

	//seen elements get a value of 1; newly seen elements are by default null until set
	seen['' + n1.value] = 1; //we automatically see the first item
	for(var i = 0; i < this.numNodes; i++) {
		//we check to see we're not on the first node
		if(i > 0) {
			if(seen['' + n1.value] == 1) {
				//this node is a duplicate
				n2.next = n1.next; 
			} else {
				seen['' + n1.value] = 1;
				n2 = n1; 
			}
		}

		n1 = n1.next;
	}
}

/*
	The algorithm works in O(n) time because we iterate through all n elements of the linked list once.
	In my first run through this problem, seen was an array on which I used the indexOf function to determine 
	if a value already existed in it. This worked, but is less efficient than using a hash table since the 
	only way to determine if a value exists in an unsorted array is by performing a linear search which is 
	O(n). A hash table look up is O(1).
*/

LinkedList.removeDup();
console.log("\nAfter removing duplicates: \n");
LinkedList.listDump();

/*
	Final note: 
	I was curious by which means converting an int into a string was fastest in JavaScript. Multiple times I set the 
	hashtable values to one or check if they are one, but first I must convert the n1.value into a string for it to work. 
	Several methods are possible: n1.toString(), String(n1), or '' + n1; Speeds seem to vary from browser to browser. 
	There is a great stackoverflow response about this here: http://stackoverflow.com/questions/5765398/whats-the-best-way-to-convert-a-number-to-a-string-in-javascript

	If speed isnt an issue then I'd recommend using toString() for code clarity.
*/