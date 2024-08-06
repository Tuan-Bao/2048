document.addEventListener("DOMContentLoaded",() => {
    const gridDisplay = document.querySelector(".grid");
    const scoreDisplay = document.getElementById("score");  
    const resultDisplay = document.getElementById("result");
    let squares = [];
    const width = 4;
    let score = 0;

    function createBoard() {
        for(let i = 0; i < width*width; i++) {
            let square;
            square = document.createElement("div");
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square)
        }
        generate();
        generate();
    }
    createBoard();

    function generate() {
        randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2;
            checkForGameOver();
        }
        else generate()
    }

    function moveRight() {
        for(let i = 0; i < width * width; i++) {
            if(i % 4 ==0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [ parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour) ];
                
                let filteredRow = row.filter(num => num);
                let missing = row.length - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }
    
    function moveLeft() {
        for(let i = 0; i < width*width; i++) {
            if(i % 4 == 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num);
                let missing = row.length - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function moveUp() {
        for(let i = 0; i < width; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width*2].innerHTML;
            let totalFour = squares[i + width*3].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = column.length - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + width*2].innerHTML = newColumn[2];
            squares[i + width*3].innerHTML = newColumn[3];
        }
    }

    function moveDown() {
        for(let i = 0; i < width; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width*2].innerHTML;
            let totalFour = squares[i + width*3].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = column.length - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + width*2].innerHTML = newColumn[2];
            squares[i + width*3].innerHTML = newColumn[3];
        }
    }

    function combineRow() {
        for(let i = 0; i < 15; i++) {
            if(squares[i].innerHTML == squares[i + 1].innerHTML && i != 3 && i != 7 && i != 11) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    function combineColumn() {
        for(let i = 0; i < 12; i++) {
            if(squares[i].innerHTML == squares[i + width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    function addColours() {
        for(let i = 0; i < width*width; i++) {
            if(squares[i].innerHTML == 0) {
                squares[i].innerHTML = "";
                squares[i].style.backgroundColor = "#afa192";
            }
            else if(squares[i].innerHTML == 2) {
                squares[i].style.backgroundColor = "#eee4da";
            }
            else if(squares[i].innerHTML == 4) {
                squares[i].style.backgroundColor = "#ede0c8";
            }
            else if(squares[i].innerHTML == 8) {
                squares[i].style.backgroundColor = "#f2b179";
            }
            else if(squares[i].innerHTML == 16) {
                squares[i].style.backgroundColor = "#ffcea4";
            }
            else if(squares[i].innerHTML == 32) {
                squares[i].style.backgroundColor = "#e8c064";
            }
            else if(squares[i].innerHTML == 64) {
                squares[i].style.backgroundColor = "#ffab6e";
            }
            else if(squares[i].innerHTML == 128) {
                squares[i].style.backgroundColor = "#fd9982";
            }
            else if(squares[i].innerHTML == 256) {
                squares[i].style.backgroundColor = "#ead79c";
            }
            else if(squares[i].innerHTML == 512) {
                squares[i].style.backgroundColor = "#76daff";
            }
            else if(squares[i].innerHTML == 1024) {
                squares[i].style.backgroundColor = "#beeaa5";
            }
            else if(squares[i].innerHTML == 2048) {
                squares[i].style.backgroundColor = "#d7d4f0";
            }
        }
    }
    addColours();

    var myTimer = setInterval(addColours, 50);

    function clear() {
        clearInterval(myTimer);
    }


    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generate();
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }

    function control(e) {
        switch (e.key) {
            case "ArrowLeft":
                keyLeft();
                break;
            case "ArrowRight":
                keyRight();
                break;
            case "ArrowUp":
                keyUp();
                break;
            case "ArrowDown":
                keyDown();
                break;
        }
    }

    document.addEventListener("keyup", control);

    function checkForWin() {
        for(let i = 0; i < width*width; i ++) {
            if(squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = `You win with score ${score}!`;
                document.removeEventListener("keyup", control);
                setTimeout(()=>{
                    clear();
                }, 3000);
            }
        }
    }

    function canContinueCombineRow() {
        let count = 0;
        for(let i =  0; i < width*width -1; i++) {
            if(squares[i].innerHTML == squares[i + 1].innerHTML && i != 3 && i != 7 && i != 11) {
                count++;
            }
        }
        if(count != 0) {
            return true;
        }
        return false;
    }

    function canContinueCombineColumn() {
        let count = 0;
        for(let i = 0; i < width*width - 4; i++) {
            if(squares[i].innerHTML == squares[i + width].innerHTML) {
                count++;
            }
        }
        if(count != 0) {
            return true;
        }
        return false;
    }

    function checkForGameOver() {
        let zerosTiles = 0;
        for(let i = 0; i < width*width; i++) {
            if(squares[i].innerHTML == 0) {
                zerosTiles++;
            }
        }
        if(zerosTiles == 0 && !canContinueCombineColumn() && !canContinueCombineRow())  {
            resultDisplay.innerHTML = "You lose!";
            document.removeEventListener("keyup", control);
                setTimeout(()=>{
                    clear();
                }, 3000);
        }
    }
})