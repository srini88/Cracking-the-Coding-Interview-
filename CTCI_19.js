
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	3.4 - In the classic problem of the Towers of Hanoi, you have 3 towers and N disks of 
	      different sizes which can slide onto any tower. The puzzle starts with disks sorted in 
	      ascending order of size from top to bottom (i.e., each disk sits on top of an even 
	      larger one). You have the following constraints:
			
		  (1) Only one disk can be moved at a time.
		  (2) A disk is slid off the top of one tower onto the next tower.
		  (3) A disk can only be placed on top of a larger disk.
		  Write a program to move the disks from the first tower to the last using stacks. 
*/

/*
	I always knew I'd run into this classic Towers of Hanoi problem... my archrival, we meet again at last. 

	If I remember correctly, this problem is best solved using recursion - and it makes sense since this problem 
	can be modeled with the base case -> eventual case format. The base case is if we only have one disk, we simply 
	move it to the final tower. With two disks, we need to move the top disk to the middle tower as a buffer, 
	and then move the second disk to the final tower. Finally we move the top disk thats resting in the middle tower 
	to the final tower. To do the problem with three disks; move the two disks as before, and then move the third. 

	ex.1 

	1	_	_
	_	_	1	

	ex.2

	1
	2	_	_

	2	1	_

	_	1	2

			1
	_	_	2

	ex.3 

	1
	2
	3	_	_

	2
	3	_	1

	3	2	1

		1
	3	2	_

		1
	_	2	3

	1	2	3

			2
	1	_	3

			1
			2
	_	_	3
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

/*
	Initialize my stacks 
*/
var left = new Stack(), leftLength = 3;
left.push(3);
left.push(2);
left.push(1);

var mid = new Stack(), midLength = 0;
var right = new Stack(), rightLength = 0;

/*
	Unfortunately, after thinking about this problem for a long time, I couldn't figure it out. Recursion is evil. Useful, but evil.
	Here I will just translate the solution in the book into JavaScript and look at it closely to see if I can understand it.
*/

//n = number of disks, origin = starting tower, destination = end tower, buffer = middle tower
function moveDisks(n, origin, destination, buffer) {
	if(n <= 0) return; //base case

	/*move n-1 disks (all but the largest) to the buffer, using the 
	  destination as the buffer*/
	moveDisks(n - 1, origin, buffer, destination);

	/*move the top disk from the origin to the destination*/
	moveTop(origin, destination);

	/*move the top n-1 disks from the buffer to the destination using 
	  the origin as the new buffer*/
	moveDisks(n - 1, buffer, destination, origin);
}

//simply transfering one item from a stack to another stack
function moveTop(origin, destination) {
	destination.push(origin.pop().value);
}

console.log("Before algorithm: ");

console.log("Left:");
left.dump();

console.log("\nMid:");
mid.dump();

console.log("\nRight:");
right.dump();

moveDisks(3, left, right, mid);

console.log("After algorithm: ");

console.log("Left:");
left.dump();

console.log("\nMid:");
mid.dump();

console.log("\nRight:");
right.dump();

/* It worked, I'm just dissapointed I couldn't figure out the moveDisks algorithm myself - it looks so simple and short in retrospect.*/