/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	3.2 - How would you design a stack which, in addition to push and pop, also has a 
		  function min which returns the minimum element? Push, pop and min should all 
		  operate in O(1) time. 
*/

/*
	The idea here is in the stack, we maintain track of the minimum node. This means when we push for the first time, we set 
	the min to our first and only node. Then, every subsequent push we will check to see if the new node's value is smaller 
	than our current min, and if so, update our min node. So the min method would simply be a matter of returning the min node wich
	would be O(1) time. 

	The push method would also be O(1) time, and the pop method would be O(1) in the average case. I make this distinction because 
	there is one edge case in which the pop method simply needs to be O(n) time, and that is when we pop off the minimum node. When 
	we do this, we need to perform a linear search through our linked list to find the new minimum node and update our min value.

	Below I wrote an example implementation of a stack in JavaScript with the described properties.
*/

//the basic node building blocks of the list 
function Node(val) {
	this.value = val;
	this.next = null;

	this.get = function() {
		return this.value;
	}

	this.set = function(newVal) {
		this.value = newVal;
	}

	this.setNext = function(newNode) {
		this.next = newNode;
	}

	this.removeNext = function() {
		this.next = this.next.next || null;
	}
}

//the stack which maintains track of the minimum node; all operations are O(1) on average; worst case scenario for pop() is O(n)
function Stack() {
	this.minNode = null;
	this.root = null;

	this.push = function(val) {
		if(this.root == null) {
			this.root = new Node(val);
			this.minNode = this.root;
		} else {
			var temp = new Node(val);
			temp.setNext(this.root);
			this.root = temp;
			if(val < this.minNode.get()) {
				this.minNode = this.root;
			}
		}
	}

	this.pop = function() {
		var temp = this.root; 
		this.root = this.root.next;

		if(this.minNode == temp) {
			//find a new minimum
			var iterator = this.root, newMin = this.root;
			while(iterator != null) {
				if(iterator.get() < newMin.get()) {
					newMin = iterator;
				}

				iterator = iterator.next; 
			}
			this.minNode = newMin;
		}

		return temp;
	}

	this.min = function() {
		return this.minNode;
	}

	//optional function I implemented to see the entire stack 
	this.dump = function() {
		var temp = this.root; 

		while(temp != null) {
			process.stdout.write("[" + temp.value + "] -> ");
			temp = temp.next;
		}
	}
}

/*
	Now to test out the Stack implementation: 
*/
var myStack = new Stack();

myStack.push(7);
console.log("The minimum value is: " + myStack.min().value);

myStack.push(9);
console.log("The minimum value is " + myStack.min().value);

myStack.push(3);
console.log("The minimum value is " + myStack.min().value);

myStack.dump();

console.log("\nRemoving an element...");
myStack.pop();
myStack.dump();

console.log("\nNew minimum value is " + myStack.min().value);

/*
	Alas, it worked! Sample output: 

	The minimum value is: 7
	The minimum value is 7
	The minimum value is 3
	[3] -> [9] -> [7] ->
	Removing an element...
	[9] -> [7] ->
	New minimum value is 7

	The stack correctly removes and adds elements to the head of the list; pop is implemented in LIFO order. 

	There's just the issue of my pop method's search for a new min value. We're asked to make all three methods (min, push, pop)
	be O(1) time; my justification here is that in a list there is only one smallest value (or a bunch of values tied for smallest.)
	With that in mind, and depending on the length of my list, there likelihood that the node I am popping off happens to also be the 
	smallest node is 1/n, which could be very, very small. For a list of 1 billion items, we would be performing a linear search 
	only once every billion pops. So I'd consider my pop implementation on average O(1) for that reason. However, if we look at the 
	worst case scenario, that somehow we're inserting the values in to the list in descending order such that every new node we add becomes 
	the new min node. In that case we will perform the search for a new min with every pop. However the search would end after only 
	one index being checked, so maybe it isn't such a bad worst case...

	Either way, the author of Cracking the Coding Interview suggest another way to approach this problem: every node in the stack 
	will keep a count of its own 'local min.' This means every time I push a value onto the stack, I check to see if it's a min or not
	just like I already am. However at the end I simply save the current min in the node. Now whenever I pop I can always know 
	what the min is by checking the value for min from the node at the top of the stack.

*/ 

function NodeBetter(val) {
	this.value = val;
	this.next = null;
	this.min = null;

	this.get = function() {
		return this.value;
	}

	this.set = function(newVal) {
		this.value = newVal;
	}

	this.setNext = function(newNode) {
		this.next = newNode;
	}

	this.removeNext = function() {
		this.next = this.next.next || null;
	}

	this.setMin = function(newMin) {
		this.min = newMin;
	}

	this.getMin = function() {
		return this.min;
	}
}

function StackBetter() {
	this.root = null;

	this.push = function(val) {
		if(this.root == null) {
			this.root = new NodeBetter(val);
			this.root.setMin(this.root);
		} else {
			var temp = new NodeBetter(val);
			temp.setNext(this.root);
			this.root = temp;
			this.root.setMin((this.root.value < this.root.next.value) ? this.root : this.root.next);
		}
	}

	this.pop = function() {
		var temp = this.root; 
		this.root = this.root.next;

		return temp;
	}

	this.min = function() {
		return this.root.getMin();
	}

	//optional function I implemented to see the entire stack 
	this.dump = function() {
		var temp = this.root; 

		while(temp != null) {
			process.stdout.write("[" + temp.value + "] -> ");
			temp = temp.next;
		}
	}
}

/*
	Now to test out the new stack implementation 
*/
var myStack = new StackBetter();

myStack.push(7);
console.log("The minimum value is: " + myStack.min().value);

myStack.push(9);
console.log("The minimum value is " + myStack.min().value);

myStack.push(3);
console.log("The minimum value is " + myStack.min().value);

myStack.dump();

console.log("\nRemoving an element...");
myStack.pop();
myStack.dump();

console.log("\nNew minimum value is " + myStack.min().value);

/*
	We have re-implemented the Node and Stack using the author's method and it works! I rather like how much shorter and 
	concise the code is now. 
*/