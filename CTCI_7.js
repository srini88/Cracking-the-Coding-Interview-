
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	1.7 - Write an algorithm such that if an element in an MxN matrix is 0, its entire row
		  and column are set to 0.
*/

/*
	I'm thinking of first iterating through the whole 2D array and save the coordinates of the 
	zeros. This way I can zero out the columns and rows of those zeros without accidentally zeroing 
	out the columns and rows of zeros I've created (then we'd always end up with a totally zero array.)
*/

var sampleArray = [
	[0, 1, 4, 3, 6, 7, 1, 2, 4, 9, 0],
	[7, 4, 3, 2, 4, 9, 4, 7, 1, 3, 6],
	[3, 6, 5, 0, 6, 5, 5, 0, 6, 3, 9]
]

/*
	Output should produce: 
	[
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[0, 4, 3, 0, 4, 9, 4, 0, 1, 3, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	]
*/

function zeroRowsAndCols(arr) {
	if(arr.length == 0) return arr;

	//array to hold coordinates of the zeros found 
	var coordinates = [];

	//loop through the rows 
	for(var y = 0; y < arr.length; y++) {
		//loop through the columns 
		for(var x = 0; x < arr[y].length; x++) {
			//save the coordinate of the zero
			if(arr[y][x] == 0) {
				coordinates.push({"x": x, "y": y});
			}
		}
	}

	//if we haven't found any zeros, then return the original array
	if(coordinates.length == 0) return arr;

	//loop through the coordinates and turn rows and columns to zeros where needed 
	for(var i = 0; i < coordinates.length; i++) {
		for(var y = 0; y < arr.length; y++) {
			arr[y][coordinates[i].x] = 0; //change column to zeros 
		}

		for(var x = 0; x < arr[coordinates[i].y].length; x++) {
			arr[coordinates[i].y][x] = 0; //change row to zeros 
		}
	}

	return arr;
}

console.log(zeroRowsAndCols(sampleArray)); //it works!