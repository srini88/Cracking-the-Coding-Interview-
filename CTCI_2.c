
/*
	Author: Vuk Petrovic
	Cracking the Coding Interview Practice

	1.2 - Implement a function void reverse(char* str) in C or C++ which reverses a nullterminated
		  string.
*/

#include <stdio.h>
#include <string.h>

void reverse(char*);
void reverseBetter(char*);

int main(int argc, char **argv) {
	char sampleString[] = "Hello, World. This is a test.\0";
	reverse(sampleString);		 //works
	reverseBetter(sampleString); //doesn't work

	return 0;
}

/*
 	My first thought here is to create a temporary char array that I can write into, calculate
 	the length of the given string so I can get my left and right incides set up, and then swap
 	the left and right characters as long the left index is to the left of the right index. 

 	This will work for strings of even or odd length. The run time of this function is O(n).
 	It is O(n) to find the length of the string by iterating through it until a null character is found,
 	and O(n) to perform the while loop; giving us O(n + n) or O(2n); for large enough n, the constant 
 	is negligable, so the total run time is O(n);
*/

void reverse(char *str) {
	int len = strlen(str);
	char tempStr[len + 1];
	tempStr[len] = '\0';

	int left = 0, right = len - 1;
	char tempChar;
	while(left <= right) {
		tempStr[left] = str[right];
		tempStr[right] = str[left];

		left++; right--;
	}

	printf("The string reversed: %s\n", tempStr);

	return;
}

/*
	According to McDowell, it's even more optimal to do the problem in place 
	rather than use another array: 
*/
void reverseBetter(char *str) {
	char *end = str;
	char temp;
	if(str) { //also important here, make sure the string is valid 
		while(*end) { //find null character at the end of the string 
			++end;
		}
		--end; //move one back so we don't use the null char

		while(str < end) {
			temp = *str;
			*str++ = *end;
			*end-- = temp;
		}

		printf("Reversed string is: %s\n", end);
	}
}

/*
	Unfortunately I need to disagree with this syntax, simply because char *'s in C are 
	read-only. The lines *str++ = *end and *end-- = temp won't work because you're trying
	to write in a read-only char pointer. That's why I implemented my solution using a second 
	data structure that's writable. 

	The best way would be to simply accept a string initialized by char sampleStr[] = "Hello, World";
	The output for the in-place version is "Reversed string is: T .dlroW ,olleH"
	Not sure why...
*/