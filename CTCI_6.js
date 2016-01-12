
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	1.6 - Given an image represented by an NxN matrix, where each pixel in the image is
		  4 bytes, write a method to rotate the image by 90 degrees. Can you do this in
		  place?
*/

/*
	It's a dissapointing time when I can't figure out the answer myself - this question truthfully 
	stumped me. I thought about dividing the image into four pieces like a big plus sign right in the middle, 
	then subdividing all the pieces, all the way until I was left with four pixels: top left, top right, 
	bottom left, bottom right. Then I would rotate those four-pixel blocks, then combine them into the larger,
	16-pixel blocks, rotate those, and so on, until I was back at my original divided image. One final rotation
	would yield the 90-degree turn I wanted. 

	The time it took to figure that out would have been probably dawrfed by the time it took to figure out the code 
	for it and a gut feeling told me there was a better way. 

	According to the book you can rotate the image in layers, starting from the outermost layers of pixels toward the center. 
	For a 90-degree rotation to the right, top pixels go to the right side, right pixels go to the bottom, 
	bottom pixels go on the left, and left pixels go on the top.
*/

