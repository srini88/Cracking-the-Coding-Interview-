
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	3.6 - Write a program to sort a stack in ascending order (with biggest items on top). You may use at most one additional stack to hold 
		  items, but you may not copy the elements into any other data structure (such as an array). The stack supports the following 
		  operations: push, pop, peek, and isEmpty.
*/

function Node(val) {
	this.next = null;
	this.prev = null;
	this.value = val;
}

function Stack() {
	this.root = null;

	this.push = function(val) {
		if(this.root == null) {
			this.root = new Node(val);
		} else {
			var temp = this.root;
			while(temp.next != null) {
				temp = temp.next;
			}			
			temp.next = new Node(val);
			temp.next.prev = temp;
		}
	}

	this.pop = function() {
		/*check if our starting node is null, if so, return null*/
		if(this.root == null) {
			return null;
		}

		/*save the last node for return and remove it from the list*/
		var ret;
		if(this.root.next == null) {
			ret = this.root;
			this.root = null;
			return ret.value;
		}

		/*create a temporary node to iterate through the linked list*/
		var temp = this.root; 
		/*stop at the second to last node*/
		while(temp.next != null) {
			temp = temp.next;
		}
		ret = temp;
		temp.prev.next = null;

		return ret.value;
	}

	this.peek = function() {
		if(this.root == null) {
			return null;
		}

		var temp = this.root;
		while(temp.next != null) {
			temp = temp.next;
		}

		return temp.value;
	}

	this.isEmpty = function() {
		return this.root == null;
	}

	//for testing purposes, this is here to just print out the stack and see what it looks like
	this.dump = function() {
		var temp = this.root;
		while(temp != null) {
			process.stdout.write("[" + temp.value + "] -> ");
			temp = temp.next;
		}
		console.log("\n");
	}
}

/*
	I'm reading "you are not allowed to copy elements into any other data structure (such as an array)" as meaning, I'm still allowed to 
	use other variables to keep track of certain things if needed; for instance one variable to perform a swap.

	The algorithm I came up with here involves a lot of pushing and popping back and forth between the two stacks I have. 
	One stack will prioritize larger numbers, and the other will prioritize smaller numbers. This means when I'm filling 
	one stack, I will swap out the last number if it is smaller than the new one I want to insert, and in the other stack I want to
	swap out the last number if it is larger than the number I want to insert. After doing this loop several times, what I'll end up with 
	is a sorted stack. The final thing to do is to check whether the stack is sorted in ascending or descending order. 
*/

function sortAscending(stack) {
	var stack1 = stack, stack2 = new Stack();
	var swapped, buffer;

	//swapped keeps track of whether or not I have done any swaps or any "work" in the process each iteration. If I have, I want to keep looping 
	do {
		swapped = false;
		if(stack2.isEmpty()) {
			//insert the first item into stack2 
			stack2.push(stack1.pop());
			while(!stack1.isEmpty()) {
				if(stack1.peek() < stack2.peek()) {
					buffer = stack2.pop();
					stack2.push(stack1.pop());
					stack2.push(buffer);
					swapped = true;
				} else {
					stack2.push(stack1.pop());
				}
			}
		} else if(stack1.isEmpty()) {
			//insert the first item into stack1 
			stack1.push(stack2.pop());
			while(!stack2.isEmpty()) {
				if(stack2.peek() > stack1.peek()) {
					buffer = stack1.pop();
					stack1.push(stack2.pop());
					stack1.push(buffer);
					swapped = true;
				} else {
					stack1.push(stack2.pop());
				}
			}
		}
	} while(swapped == true);

	//when the algorithm stops, the list will be sorted in descending order in stack1, so we need to reverse the list
	while(!stack1.isEmpty()) {
		stack2.push(stack1.pop());
	} 

	return stack2;
}

/*
	Time to test!
*/

//first create a stack to use and push numbers at random into it
var myStack = new Stack();
myStack.push(3);
myStack.push(5);
myStack.push(2);
myStack.push(4);
myStack.push(9);
myStack.push(7);
myStack.push(6);

console.log("Sorted stacK: ");
var mySortedStack = sortAscending(myStack);
mySortedStack.dump();