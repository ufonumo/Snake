document.addEventListener('DOMContentLoaded', () =>{
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startbtn = document.querySelector('.start');

    const width = 15;
    let currentIndex = 0; //first div in the grid
    let appleIndex = 0;
    let currentSnake = [2,1,0]; // creating the snake, 2 means head, 0 means the tail 1 means the body 
    let direction = 1; // the direction of the snake
    let score  = 0; // the default score =0
    let speed = 0.9; // the speed of the snake
    let intervalTime = 0; // the interval
    let interval = 0;

    // to start and restart the game
    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval)
        score = 0;
        randomApple()
        direction = 1
        scoreDisplay.innerText = score;
        intervalTime = 400;
        currentSnake = [2,1,0]
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime);
    }

    //function that carries out all the outcome of the snake
    function moveOutcomes(){

    // function that deals with the snake when it hits the border and itself
        if(
            (currentSnake[0] + width >= (width * width) && direction === width) || // if the snake hits the bottom wall 
            (currentSnake [0] % width === width -1  && direction === 1 ) ||  // if the snake hits the right wall
            (currentSnake [0] % width === 0 && direction === -1) || // if the snake hits the left wall
            (currentSnake[0] - width < 0 && direction === -width) || // if the snake hits the top wall
            squares[currentSnake[0] + direction].classList.contains('snake')
        ){
            return clearInterval(interval) // this automatically clears the interval if any of the conditions above happens
        }

        const tail = currentSnake.pop() // removes the last element of the array
        squares[tail].classList.remove('snake') // removes the class of snake from the tail
        currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head of the array
               
    // function that deals with the snake when it eats the apple

    if(squares[currentSnake[0]].classList.contains('apple')){
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')

    }

    // generate random apple
    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        }while(squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }

    //assign the functions to the keycodes
    function control(e){
        squares[currentIndex].classList.remove('snake'); // remove the snake from all the classes

        if(e.keyCode === 39){
            direction = 1; // press right
        }
        else if(e.keyCode === 38){
            direction = -width; //press up
        }
        else if(e.keyCode === 37){
            direction = -1; //press left
        }
        else if(e.keyCode === 40){
            direction = +width; // press down
        }
    }

    document.addEventListener('keyup', control);
    startbtn.addEventListener('click', startGame)
})