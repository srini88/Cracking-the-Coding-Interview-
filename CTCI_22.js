
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	3.7 - An animal shelter holds only dogs and cats, and operates on a strictly "first in, first out" basis. 
		  People must adopt either the "oldest" (based on arrival time) of all animals at the shelter, or 
		  they can select whether they would prefer a dog or a cat (and will receive the oldest animal of that 
		  type). They cannot select which specific animal they would like. Create the data structures to maintain 
		  this system and implement operations such as enqueue, dequeueAny, dequeueDog and dequeueCat.You may 
		  use the built-in LinkedList data structure
*/

/*
	My first thought here is to set up a queue for dogs, a queue for cats, and a label queue so I know their combined order. 

	myCats = ["Whiskers", "Fluffy", "Garfield"];
	myDogs = ["Fido", "Spot", "Rex"];
	myOrder = ["cat", "dog", "dog", "cat", "dog", "cat"]; //pop() lets us know what the oldest overall animal is

	Finally, I'll need two variables to keep track of my relationship between the order list and the cat/dog lists. Basically
	in the above example, if a customer adopts a cat, we'll dequeue off the myCats queue... Now if the next customer just wants 
	to adopt either a cat or a dog, we'll look at the myOrder queue, and we'll see that the oldest animal is a cat - but we just 
	dequeued that cat! 

	To fix this, I'll have a counter for cats and dogs which will increment every time a customer adopts either a cat or a dog. 
	The next time a customer wants to adopt either a cat or dog, we go to the orderList and check: is the next animal a cat? 
	If so, is our cat counter greater than 0? No? Dequeue a cat. Yes? Decrement the cat counter and dequeue the orderList. Keep doing 
	this until we either run into a dog, or the cat counter gets to zero. Then we know we're on the current oldest cat we still own.
*/

function Node(val) {
	this.next = null;
	this.prev = null;
	this.value = val;
}

function Queue() {
	this.root = null;
	this.end = null;  //keeps track of the oldest element, which we pop

	this.enqueue = function(val) {
		if(val == null) return;

		if(this.root == null) {
			this.root = new Node(val);
			this.end = this.root;
		} else {
			var temp = new Node(val);
			temp.next = this.root;
			this.root.prev = temp;
			this.root = temp;
		}
	}	

	this.dequeue = function() {
		if(this.isEmpty()) return null;
		
		var temp = null;
		//if we only have one item left
		if(this.end == this.root) {
			temp = this.root;
			this.root = null;
			this.end = null;
		} else {
			temp = this.end;
			this.end = this.end.prev;
			this.end.next = null;
		}

		return temp;
	}
	
	this.isEmpty = function() {
		return this.root == null;
	}

	//for testing purposes
	this.dump = function() {
		var temp = this.root;
		while(temp != null) {
			process.stdout.write("[" + temp.value + "] -> ");
			temp = temp.next;
		}
		console.log("\n");
	}
}

function AdoptionHandler() {
	this.catList = new Queue();
	this.dogList = new Queue();
	this.orderList = new Queue();
	this.catsAdoptedSinceLast = 0;
	this.dogsAdoptedSinceLast = 0;

	/*my two thoughts on this are - I could accept a single JavaScript object as an argument of the form : {type: "dog/cat", name: "Spike"}
	  or I could simply accept two arguments, the type of animal and the name; I'm choosing the second one to be independed of the JSON
	  format
	*/
	this.enqueue = function(name, type) {
		if(name == null || type == null || typeof(type) != 'string') return;

		if(type.toLowerCase() == "dog") {
			this.dogList.enqueue(name);
			this.orderList.enqueue("dog");
		} else if(type.toLowerCase() == "cat") {
			this.catList.enqueue(name);
			this.orderList.enqueue("cat");
		}
	}

	this.dequeueDog = function() {
		if(!this.dogList.isEmpty()) {
			this.dogsAdoptedSinceLast++;
			return this.dogList.dequeue().value;
		}

		return null;
	}

	this.dequeueCat = function() {
		if(!this.catList.isEmpty()) {
			this.catsAdoptedSinceLast++;
			return this.catList.dequeue().value;
		}

		return null;
	}

	this.dequeueAny = function() {
		var ret = null;
		if(this.dogList.isEmpty() && this.catList.isEmpty()) return ret;

		while(ret == null) {
			var nextType = this.orderList.dequeue().value;
			if(nextType == "dog") {
				if(this.dogsAdoptedSinceLast > 0) {
					this.dogsAdoptedSinceLast--;
				} else {
					if(this.dogList.isEmpty()) continue; //keep going until we get a cat
					ret = this.dogList.dequeue();
				}
			} else if(nextType == "cat") {
				if(this.catsAdoptedSinceLast > 0) {
					this.catsAdoptedSinceLast--;
				} else {
					if(this.catList.isEmpty()) continue; //keep going until we get a dog
					ret = this.catList.dequeue();
				}
			}
		}
		return ret.value;
	}
}

/*
	Time to test the code! I'll create the same hypothetical scenario as previously described: 

	myCats = ["Whiskers", "Fluffy", "Garfield"];
	myDogs = ["Fido", "Spot", "Rex"];
	myOrder = ["cat", "dog", "dog", "cat", "dog", "cat"];
*/

var handler = new AdoptionHandler();

handler.enqueue("Garfield", "cat");
handler.enqueue("Rex", "dog");
handler.enqueue("Fluffy", "cat");
handler.enqueue("Spot", "dog");
handler.enqueue("Fido", "dog");
handler.enqueue("Whiskers", "cat");

console.log("orderList:");
handler.orderList.dump();

console.log("cat list:");
handler.catList.dump();

console.log("dog list:");
handler.dogList.dump();

/*
	We've verified the lists are formatted correctly. Now to see that the adoption process works.
*/

//First, we'll adopt a cat (yay, I love cats!)
console.log("Adopting: " + handler.dequeueCat());

/*
	Now, if we try to dequeueAny, our orderList will initially think "oh, the oldest inserted animal is that cat" - what dequeueAny
	should return though is the dog, since we already adopted the oldest animal, the cat.
*/

console.log("Adopting (Should be the dog named Rex) : " + handler.dequeueAny());

/*
	Indeed! It's Rex! Let's test this some more...
*/

console.log("Adopting: " + handler.dequeueCat()); 

/*
	Ok, we are throwing a wrench in the machine again - we just dequeued the cat that orderList will think is the next thing to dequeue.
	If it works, we should dequeue the dog named Spot.
*/

console.log("Adopting (should be the dog named Spot) : " + handler.dequeueAny());

/*
	It works! 
*/