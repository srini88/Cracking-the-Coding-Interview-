
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	4.1 - Implement a function to check if a binary tree is balanced. For the purposes of this question, a balanced tree 
		  is defined to be a tree such that the heights of the two subtrees of any node never differ by more than one.
*/

/*
	Based on the question, I can basically whittle down the challenge to being "how do I find the height of a subtree?"
	I think I can just do a traversal through the tree and recursively return the heights of child nodes up to the parents 
	and perform a check at every step to see if the left and right heights are at least within a range of 1 of each other 
*/

var bst = require('../implementations/BSTImpl.js');

bst.isBalanced = function(node) {
	if(node == null) return 0;

	var leftHeight = this.isBalanced(node.left);
	var rightHeight = this.isBalanced(node.right);

	//check to see if we already have an answer, if so, return the boolean; othewise return the height 
	if(typeof(leftHeight) == 'boolean') {
		return leftHeight;
	} else if(typeof(rightHeight) == 'boolean') {
		return rightHeight;
	}

	//check to see if the heights are out of the acceptable range 
	if(Math.abs(leftHeight - rightHeight) > 1) {
		return false; 
	}

	//otherwise we'll just return the height at this node 
	return Math.max(leftHeight, rightHeight) + 1;
}

bst.doIsBalanced = function() {
	//either the isBalanced function returned false, or an int - if it returned an int, then it's balanced
	var result = this.isBalanced(this.root);
	return (typeof(result) == 'boolean') ? result : true;
}

/*
	Time to test! First I'll add some nodes so that I already know the tree is balanced; the function should return true.
*/

bst.add(7);
bst.add(5);
bst.add(13);
bst.add(4);
bst.add(6);
bst.add(10);
bst.add(14);

console.log("Is it balanced? " + bst.doIsBalanced());

/*
	It prints true - now to unbalance the tree...
*/

bst.add(3);
bst.add(2);
bst.add(1);

console.log("Is it still balanced? " + bst.doIsBalanced());

/*
	It works! 
*/