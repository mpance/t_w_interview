// "Take a second to imagine that you 
// are in a room with 100 chairs arranged in a circle. 
// These chairs are numbered sequentially from 1 to 100. 
// At some point in time, the person in chair #1 will be removed 
// from the room along with his chair. The person in chair #2 will 
// be skipped, and the person in chair #3 will be told to leave. 
// Next to go is person in chair #6. In other words, 1 person will 
// be skipped initially, and then 2, 3, 4.. and so on. This 
// pattern of skipping will keep going around the circle until there 
// is only one person remaining... You have to figure out which is 
// the number of the last remaining chair. Who survives this Game of 
// Chairs?",


var chairs = [],
    numSkips = 0,
    currIdx = 0;

for(var i = 1; i <= 100; i++) {
  chairs.push(i);
}

while (chairs.length != 1) {
	if(currIdx >= chairs.length) {
		currIdx = currIdx % chairs.length;
	}

  var spliced = chairs.splice(currIdx, 1);
  numSkips++;
  currIdx = currIdx + numSkips;
}

//Answer
console.log(chairs) // [31]

