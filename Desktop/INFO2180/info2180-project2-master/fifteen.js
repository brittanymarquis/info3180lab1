//structure the puzzle	
window.onload = function(){
	var blankx = "300px";
	var blanky = "300px";
	//shows the size of x and y position of the blank space respectively
	
	var solvedleft = new Array();
	var solvedtop = new Array();
	//both arrays store the x and y positions respectively

	var puzzleArea = document.querySelectorAll("div#puzzlearea div");//capture the array of divs in the puzzle area
	var shuffButton = document.getElementById("shufflebutton");//capture the shuffle button
	var header = document.body.children[0];//capture header element
	
	var i=0;
	var a=0;//column counter
	var k=0;//row counter
		
	for(i=0;i<puzzleArea.length;i++){
		puzzleArea[i].classList.add("puzzlepiece");//attach puzzle piece class to each div element in the puzzle area
			
		puzzleArea[i].style.backgroundPosition = "" + (a*100*-1) + "px " + (k*100*-1) + "px";
			
		puzzleArea[i].style.left="" + (a*100) + "px";
		solvedleft.push(puzzleArea[i].style.left);
		puzzleArea[i].style.top="" + (k*100) + "px";
		solvedtop.push(puzzleArea[i].style.top);
			
		a++;
		if(a>3){
			k+=1;
			a=0;
		}

		(function(){
			var pos = i;
			//add on click event listener for moving a block
			puzzleArea[i].addEventListener("click",function(){move(pos);},false);
			//add on mouse over event listener for movable blocks
			puzzleArea[i].addEventListener("mouseover",function(){isMovable(pos);},false);
		}());
	}

	//add on click event listener for shuffle button
	shuffButton.addEventListener("click",function(){shuffle();},false);


	function isMovable(pos){
		if(puzzleArea[pos].style.left == blankx || puzzleArea[pos].style.top == blanky){//check if block is in same row or column as blank space in the grid
			//check if the current block is near to the blank space
			if(Math.abs(blankx.substring(0,blankx.length-2) - (puzzleArea[pos].style.left.substring(0,puzzleArea[pos].style.left.length-2)))==100 ||
		   	   Math.abs(blanky.substring(0,blanky.length-2) - (puzzleArea[pos].style.top.substring(0,puzzleArea[pos].style.top.length-2)))==100)
			{
				puzzleArea[pos].classList.add('movablepiece');//assign class to blocks with a valid move
				return true;
			}
		}
	}

	function move(position){
		//swap the blank space position with current block position
		if(isMovable(position)){
			var tempx = blankx;
			var tempy = blanky;
			blankx = puzzleArea[position].style.left;
			blanky = puzzleArea[position].style.top;
			puzzleArea[position].style.left = tempx;
			puzzleArea[position].style.top = tempy;
			for(var i=0;i<puzzleArea.length;i++){
				puzzleArea[i].classList.remove('movablepiece');
			}
		}
		//check if the puzzle has been solved
		if(isSolved()){
			for(i=0;i<puzzleArea.length;i++)
			{
				puzzleArea[i].style.backgroundImage = "url('https://ewedit.files.wordpress.com/2015/01/family-guy_320-3.jpg?w=320')";
				puzzleArea[i].style.backgroundSize = "400px 400px";//let image size and grid size be the same
				puzzleArea[i].style.borderColor = "red";
			}
			header.innerHTML =  "<h1>YOU SOLVED IT!</h1>";//display  message
			header.style.fontSize = "14pt";
			header.style.color = "red";
			header.style.fontFamily = "Times New Roman";
		}
	}

	var options = new Array();//stores blocks with valid moves
	var opt=0;//option randomly generated

	function shuffle(){
		for(var a=0;a<1000;a++){
			for(var i=0;i<puzzleArea.length;i++){
				if(isMovable(i)){
					options.push(i);//store the current valid block position in array		
				}
			}
			opt=options[Math.floor((Math.random()*options.length)+0)];//randomly select a block from the valid array
			move(opt);//move random valid block
		}
		for(var i=0;i<puzzleArea.length;i++)
		{
			puzzleArea[i].style.backgroundImage = "url('https://ewedit.files.wordpress.com/2015/01/family-guy_320-3.jpg?w=320')";//reset image for unsolved puzzle
			puzzleArea[i].style.borderColor = "black";//set border color to black
			puzzleArea[i].style.backgroundSize = "400px 400px";// let image size and grid size be the same
		}
		document.body.children[0].innerHTML =  "<h1>Fifteen Puzzle</h1>";//set back starting message
		header.style.fontSize = "14pt";
		header.style.color = "black";//
		header.style.fontFamily = "Arial";
	}

	function isSolved(){
		for(var i=0;i<puzzleArea.length;i++){
			if(puzzleArea[i].style.left!=solvedleft[i] || puzzleArea[i].style.top!=solvedtop[i]){
				return false;
			}
		}
		return true;
	}
	shuffle();//shuffle puzzle at start
};
