
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	3.3 - Imagine a (literal) stack of plates. If the stack gets too high, it might topple. Therefore, 
		  in real life, we would likely start a new stack when the previous stack exceeds some threshold. 
		  Implement a data structure SetOfStacks that mimics this. SetOfStacks should be composed of 
		  several stacks and should create a new stack once the previous one exceeds capacity. SetOfStacks.push() 
		  and SetOfStacks.pop() should behave identically to a single stack (that is, pop() should 
		  return the same values as it would if there were just a single stack).

		  Follow up: Implement a function popAt(int index) which performs a pop operation on a specific sub-stack.  
*/

/*
	Here I'm thinking I basically need to write a class that wraps around my Stack class; it will have additional 
	member variables which will keep track of the multiple stacks I have. First I have my previous implementations 
	of the Stack and Node.
*/

function Node(val) {
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

function Stack() {
	this.root = null;

	this.push = function(val) {
		if(this.root == null) {
			this.root = new Node(val);
			this.root.setMin(this.root);
		} else {
			var temp = new Node(val);
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

function SetOfStacks() {
	this.setOfStacks = [];  //the actual list which will contain all stacks 
	this.stackLengths = []; //an array holding the length of each stack, I'll use this to see if we've met the capacity
	this.stackCapacity = 3; //the maximum capacity of each stack; I'm keeping it low for testing purposes 
	this.currentIndex = 0;  //the current index in the setOfStacks which we will be pushing onto or popping from

	this.push = function(val) {
		//check to see if we've started creating stacks yet, if not, make the first one
		if(this.setOfStacks.length == 0) {
			this.setOfStacks[0] = new Stack();
			this.setOfStacks[0].push(val);
			this.currentIndex = 0;
			this.stackLengths[this.currentIndex] = 1;
		} else {
			//otherwise, check to see if the current stack we're working with is full, if so, make a new one
			if(this.stackLengths[this.currentIndex] == this.stackCapacity) {
				this.currentIndex++;
				this.setOfStacks[this.currentIndex] = new Stack();
				this.setOfStacks[this.currentIndex].push(val);
				this.stackLengths[this.currentIndex] = 1;
			} else {
				//otherwise just push to the current stack
				this.setOfStacks[this.currentIndex].push(val);
				this.stackLengths[this.currentIndex]++;
			}
		}
	}

	this.pop = function() {
		//check to see if the current stack is empty, if so, move to the previous stack
		if(this.stackLengths[this.currentIndex] == 0) {
			if(this.currentIndex == 0) {
				//we're out of items! 
				return null;
			}
			this.currentIndex--;
		}
		var temp = this.setOfStacks[this.currentIndex].pop();
		this.stackLengths[this.currentIndex]--;

		return temp;
	}

	this.popAt = function(idx) {
		//if we have any items in the given stack, we return; otherwise we return null
		if(this.stackLengths[idx] != null && typeof(this.stackLengths[idx]) != 'undefined' && 
		   this.stackLengths[idx] > 0 && idx >= 0 && idx < this.setOfStacks.length) {
			return this.setOfStacks[idx].pop();
		}

		return null;
	}

	this.dump = function() {
		for(var i = 0; i < this.setOfStacks.length; i++) {
			console.log("\nSetOfStacks[" + i + "]:");
			this.setOfStacks[i].dump();
		}
	}
}

/*
	Here's a simple demo to test that everything worked correctly
*/
var mySet = new SetOfStacks();

//add more than mySet.stackCapacity items
mySet.push(8);
mySet.push(6);
mySet.push(7);
mySet.push(5);
mySet.push(3);
mySet.push(0);
mySet.push(9);

//lets see if it worked!
mySet.dump();

/*
	It worked! Outputs: 

	SetOfStacks[0]:
	[7] -> [6] -> [8] ->
	SetOfStacks[1]:
	[0] -> [3] -> [5] ->
	SetOfStacks[2]:
	[9] -> 
*/

mySet.pop();
mySet.pop();
mySet.pop();
mySet.dump();

/*
	It worked! Outputs: 

	SetOfStacks[0]:
	[7] -> [6] -> [8] ->
	SetOfStacks[1]:
	[5] ->
	SetOfStacks[2]:
*/

/*
	My solution was just like the one from the book - awesome! There's one note to make about the popAt() function that the author 
	speaks about. There are two ways it could be implemented, and it depends entirely on the interpretation of the problem. One way 
	is to assume that stacks need not be filled entirely in order for a new stack to be occupied; othe other assumption is the opposite. 
	In other words, we could implement popAt() to move all the nodes of the stacks after the current stack we just popped from down to fill 
	previous stacks; or we may not. Both are valid, it just depends on what the interviewer is looking for.
*/