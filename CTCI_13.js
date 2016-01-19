
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	2.5 - You have two numbers represented by a linked list, where each node contains a single digit. The digits are stored in reverse order, such that the Ts digit is at the head of the list. Write a function that adds the two numbers and returns the sum as a linked list.
		
	EXAMPLE
	Input: (7-> 1 -> 6) + (5 -> 9 -> 2). That is, 617 + 295.
	Output: 2 -> 1 -> 9. That is, 912.
*/

/*
	My first thought is that since we don't necessarily know the lengths of the lists, we need to send a node through the 
	list and then start at the end of the list and move backwards. With each node we calculate the digit * 10^idx, where 
	the index (idx) is the index of the node we are on, in reverse (the last item in the list is idx = 0). As we iterate we 
	will add the products items in the list together and get our numbers.  We can reduce the number of times we loop by 
	doing the work for each list in the same loop and just creating a check to make sure we don't try to access non-existent nodes. 
*/

function add(list1, list2) {
	if(list1 == null || list2 == null) return false; //return for failure 	

	var sum1 = 0, sum2 = 0, temp1 = list1, temp2 = list2, idx = 0;
	while(!(temp1 == null && temp2 == null)) {
		if(temp1 != null) {
			sum1 += temp1.value * Math.pow(10, idx);
			temp1 = temp1.next;
		}
		if(temp2 != null) {
			sum2 += temp2.value * Math.pow(10, idx);
			temp2 = temp2.next;
		}
		idx++;
	}

	var total = sum1 + sum2;
	//turn total into a string and create a new node with each digit, then append new digit to the front
	var newList = null;
	for(var i = 0; i < ("" + total).length; i++) {
		if(newList == null) {
			newList = {
				value: parseInt(("" + total).charAt(i)),
				next: null,
				prev: null
			}
		} else {
			newList.prev = {
				value: parseInt(("" + total).charAt(i)),
				next: newList,
				prev: null
			}
			newList = newList.prev;
		}
	}

	return newList;
}

//this is a helper function I wrote to assemble two linked lists 
function append(root, newNode) {
	var temp = root;
	while(temp.next != null) {
		temp = temp.next;
	}
	
	temp.next = newNode;
	newNode.prev = temp;
}

//creating the root node of the first number 
var firstNum = {
	value: 7,
	next: null,
	prev: null,
}

//adding two more digits, should be the number 359 
append(firstNum, {value: 1, next: null, prev: null});
append(firstNum, {value: 6, next: null, prev: null});

//creating the root node of the second number 
var secondNum = {
	value: 5,
	next: null, 
	prev: null
}

//adding two mnore digits, should be number 257
append(secondNum, {value: 9, next: null, prev: null});
append(secondNum, {value: 2, next: null, prev: null});

var theSum = add(firstNum, secondNum);
console.log("Firstnum: ", firstNum);
console.log("Secondnum: ", secondNum);
console.log("The sum: ", theSum);

//console.log(theSum); 

/*
	It worked! We did 359 + 258 and got 617 which we assembled into a linked list such that 7 is the first node 
	and 6 is the last node. The way I did this problem however isn't ass effecient or concise as the way the author did it.
	Effeciency and code quality are what top companies like Google and Facebook look for so lets give this another 
	try, this time I'll write the author's algorithm.

	The idea is we add the numbers just like we were taught in school. 
*/

function addBetter(list1, list2) {
	if(list1 == null || list2 == null) return false; 

	//the value we cary over after addition, the sum list, and temp nodes to traverse list1 and list2 
	var carry = 0, newList = null, temp1 = list1, temp2 = list2, tempSum = 0, newListTemp = newList;
	var val;
	while (!(carry == 0 && temp1 == null && temp2 == null)) {
		tempSum = (temp1 || {value: 0}).value + (temp2 || {value: 0}).value + carry;
		
		//parse the number into the node set and the carry set
		if(("" + tempSum).length > 1) {
			val = parseInt(("" + tempSum).charAt(("" + tempSum).length - 1));
			carry = parseInt(("" + tempSum).substr(0, ("" + tempSum).length - 1));
			console.log(carry);
		} else {
			val = tempSum;
			carry = 0;
		}
		//create the new node 
		if(newListTemp == null) {
			newListTemp = {
				value: val,
				next: null,
				prev: null
			}
			newList = newListTemp;
		} else {
			newListTemp.next = {
				value: val,
				next: null,
				prev: newListTemp	
			}
			newListTemp = newListTemp.next;
		}
		if(temp1 != null)
		temp1 = temp1.next;
		if(temp2 != null)
		temp2 = temp2.next;
		if(temp1 == null && temp2 == null) {

		}
	}

	return newList;
}

//same numbers, should produce the same output
var betterNum = addBetter(firstNum, secondNum);
console.log("Firstnum: ", firstNum);
console.log("Secondnum: ", secondNum);
console.log(betterNum);

/*
	I'm not sure if I have any extra lines in there that I shouldn't, but my original idea is 37 lines long, and the better one 
	is 44 lines long. the add() function takes O(n + m) time where n is the length of the longer list and m is the length of the 
	resulting sum, interpreted as a string. m could be at most n + 1 because the highest number of extra digits an addition could
	create is one. 

	The addBetter() function takes only O(n) because we only loop for as long as the length of the larger list. 
*/