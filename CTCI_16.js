
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	3.1 - Describe how you could use a single array to implement three stacks.
*/

/*
	It was actually surprising to get this question because it's the first time I've seen a non-coding question in this book!
	Anyway...

	I'm not really sure what type of solution this question is asking for; but here are some of my preliminary thoughts before 
	I look at the answer. There could be a static or dynamic solution to this: 

	Static: divide the array in to 3 equal or almost equal parts, and each stack will begin at the start of each part. Since it's 
	an array, it's easy to fine where exactly each stack begins. Stack1 begins at index 0, Stack2 begins at index 1/3 the length of 
	the array, and Stack3 begins at 2/3 the length of the array. This solution is static in the sense that each stack only has a 
	fixed maximum number of items it can hold equal to one third the length of the array. 

	Dynamic: The dynamic solution is to start out by dividing the array in three again to start; except this time keeping track of 
	the starting index of each stack by a means other than a static value like arrayLength / 3. Meaning, we can keep track of where 
	each stack starts by using pointers or some variables to keep track of starting index. With this, we can resize each stack as needed. 
	If Stack1 has 3 items, Stack2 has 3 items, and Stack3 has 2 times, and we have an array of length 9, we can shift stacks 2 and 3 over 
	and insert the new item in Stack1 in index 3. When an item from a stack is popped off, the stacks to the right can shift back down,
	and so on. This may be rather slow; the worst case scenario is if you want to add to stack 1 but the remaining stacks take up the rest
	of the array minus one slot. Now you're moving potentially n-2 items (we assume Stack1 has at least one item and we're adding one more.)
	For large enough n, the -2 is negligable, making this process O(n)

	For both examples I'm assuming the entire array itself is a static size. We could implement a resizable array by just copying the stacks 
	to a larger array. 
*/

/*
	Alas, my solution is identical to the one in the book! Basically the take away is that there is more than one way to solve the problem
	and often times it's best to ask the interviewer what further restrictions or requirements are imposed on the idea at hand. Both 
	solutions are valid, they just make different assumptions about said restrictions and reqs. 
*/