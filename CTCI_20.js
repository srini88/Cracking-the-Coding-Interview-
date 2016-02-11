
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	3.5 - Implement a MyQueue class which implements a queue using two stacks.
*/

/*
	Quick note: Huzzah! My 20th problem!

	This is a really interesting problem. Let's go over what we know about queues and stacks. 

	A stack is a structure that holds elements and has a specific way of inserting or removing them. 
	Stacks are LIFO (Last in First Out) data structures. Think of an actual stack of plates. When 
	you place a plate onto the stack, you put it on top of the stack. When you want to take a plate 
	back off the stack, you take one from the top. If you try to take a plate from the bottom, you 
	risk making the whole stack topple over and smash! 

	ex. myStack = []
	myStack.push(1); //myStack: [1]
	myStack.push(2); //myStack: [1, 2]
	myStack.push(3); //myStack: [1, 2, 3]
	myStack.push(4); //myStack: [1, 2, 3, 4]

	myStack.pop();   //myStack: [1, 2, 3]; returns 4
	myStack.pop();   //myStack: [1, 2]	   returns 3
	myStack.pop();   //myStack: [1]		   returns 2

	Think of the leftmost number in the list as the bottom of the stack where the first plate is resting, and the 
	rightmost number in the stack the top plate. 

	A queue is very similar to a stack except its method of selecting which item to remove from the list is the opposite.
	Instead of removing the last item we put into the list (Last In), we remove the first item we put into the list. So 
	queues are called FIFO (First in First Out). Think of a line of people at the movie theater waiting for their turn
	to buy a movie ticket. The first person in the line is also the first person that gets serviced and leaves - and so on.

	ex. myQueue = [];
	myQueue.enqueue(1); // myQueue: [1]
	myQueue.enqueue(2); // myQueue: [1, 2]
	myQueue.enqueue(3); // myQueue: [1, 2, 3]
	myQueue.enqueue(4); // myQueue: [1, 2, 3, 4]

	//so far the process is very similar to push in stack. The difference is how we remove items from the list: 

	myQueue.dequeue();  // myQueue: [2, 3, 4]; returns 1
	myQueue.dequeue();  // myQueue: [3, 4];    returns 2
	myQueue.dequeue();  // myQueue: [4]; 	   returns 3
*/	

/*
	To emulate a queue using two stacks; when we enqueue() we push onto the first stack, when we dequeue() we pop all elements 
	from the first stack and push them onto the second stack. Then we pop the top element off the second stack and save it in a variable. 
	We then pop all rememaining elements from the second stack and push them back onto the first stack and return the variable we saved. 

	Basically, since a stack is LIFO, we need a way to reverse the list before returning a value in order to simulate FIFO. 
	You can easily reverse a list with two stacks by pushing onto a list the popped elements of another list. 
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
	this.length = 0;

	this.push = function(val) {
		if(this.root == null) {
			this.root = new Node(val);
		} else {
			var temp = this.root;
			while(temp.next != null) {
				temp = temp.next;
			}

			temp.next = new Node(val);
		}
		this.length++;
	}

	this.pop = function() {
		var ret = null
		if(this.length == 0) return ret;
		if(this.length == 1) {
			ret = this.root; 
			this.root = null
		} else if(this.length == 2) {
			ret = this.root.next; 
			this.root.next = null;
		} else {
			var temp = this.root; 
			while(temp.next.next != null) {
				temp = temp.next;
			}
			ret = temp.next;
			temp.next = null;
		}

		this.length--;
		return ret;
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

function myQueue() {
	this.stack1 = new Stack();
	this.stack2 = new Stack();

	this.enqueue = function(val) {
		this.stack1.push(val);
	}

	this.dequeue = function() {
		if(this.stack1.length == 0) return null;
		//reverse the list
		while(this.stack1.length > 0) {
			this.stack2.push(this.stack1.pop().value);
		}

		//save the return 
		var ret = this.stack2.pop().value;

		//reverse the list again so we can push again after
		while(this.stack2.length > 0) {
			this.stack1.push(this.stack2.pop().value);
		}

		return ret;
	}
}

/*now to test the code*/

var myQueue = new myQueue();

myQueue.enqueue(1);
myQueue.enqueue(2);
myQueue.enqueue(3);

console.log("dequeue (should be 1): " + myQueue.dequeue());
console.log("dequeue (should be 2): " + myQueue.dequeue());
console.log("dequeue (should be 3): " + myQueue.dequeue());

/*
	It worked! This was by far an easier problem than the Towers of Hanoi. The only part to be very careful of is the two 
	loops inside the dequeue() function. If you use a for loop and this.stack1.length or this.stack2.length in the loop's conditional clause, 
	it will keep re-evaluating the length; and since the stack is implemented to keep track of its current length, it will 
	keep changing the condition in the for loop.

	I fixed it by saving the total length of the loop into a var len before the loop and just used the len variable in the for loop;
	however I realized that I could save a couple of lines of code just using a while loop as in the implementation above.
*/