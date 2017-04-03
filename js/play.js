/*
    Global variables
*/
var clicked; // The ball that is been clicked
var dragged; // The ball that is been dragged
var ballsList = document.getElementsByClassName('ball'); // All the elements with class='ball'
var gapsList = document.getElementsByClassName('gap'); // All the elements with class="gap"
var neighbourGaps; // The immediate gap neighbours of clicked & dragged
var gap;
var time;

function chooseOptions() {
    /*
        Choose Gap position & Time
    */
    document.getElementById('welcome-container').style.display = 'none';
    document.getElementById('options-container').style.display = 'flex';

   if(document.getElementById('default-gap').checked == true) {
       gap = document.getElementById('default-gap').value;
   } else if(document.getElementById('random-gap').checked == true) {
       var row = Math.floor((Math.random() * 2) + 1);
       var column = Math.floor((Math.random() * 2) + 1);
       gap = "pos-" + row + "-" + column;
   }

   return gap;

}

function createBoard() {
    /*
        Creates the board structure
    */

    document.getElementById('options-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'flex';

    var board = document.getElementById('board');
    var html = "";
    var id = "";

    for (var row = 1; row <= 7; row++) {
        html += "<ul class='row'>"
        for (var column = 1; column <= 7; column++) {
            id = "pos-" + row + "-" + column;

            switch (true) {
                case (row == 1 || row == 2 || row == 6 || row == 7) && (column == 1 || column == 2 || column == 6 || column == 7):
                    html += "<li id=" + id + " class='cell'></li>";
                    break;
                default:
                    html += "<li id=" + id + " class='cell ball' draggable='true' onclick='showPossibleMoves(this);'></li>";
                    break;
            }

        }
        html += "</ul>";
    }

    board.innerHTML = html;
    document.getElementById(gap).className = 'cell gap';
}

function getPossibleMoves(cell) {
    /*
        Feeds neighbourGaps array with possible movements for the ball
        Fired by:
            - onclick event: showPossibleMoves(this)
            - ondrop event: drop(event)
    */
    var row = parseInt(cell.id.slice(4, 5)); // Cell's row
    var column = parseInt(cell.id.slice(6, 7)); // Cell's column

    // If the nearest neighbour to cell is a ball and next to it there is a gap, save it to neighbourGaps
    var upBall = "pos-" + parseInt(row - 1) + "-" + column;
    var downBall = "pos-" + parseInt(row + 1) + "-" + column;
    var rightBall = "pos-" + row + "-" + parseInt(column + 1);
    var leftBall = "pos-" + row + "-" + parseInt(column - 1);

    var upGap = "pos-" + parseInt(row - 2) + "-" + column;
    var downGap = "pos-" + parseInt(row + 2) + "-" + column;
    var rightGap = "pos-" + row + "-" + parseInt(column + 2);
    var leftGap = "pos-" + row + "-" + parseInt(column - 2);

    for(var i = 0; i < ballsList.length; i++) {
        for(var j = 0; j < gapsList.length; j++) {
            if(upBall == ballsList[i].id && upGap == gapsList[j].id) {
                neighbourGaps.push(upGap);
            } else if(downBall == ballsList[i].id && downGap == gapsList[j].id) {
                neighbourGaps.push(downGap);
            } else if(rightBall == ballsList[i].id && rightGap == gapsList[j].id) {
                neighbourGaps.push(rightGap);
            } else if(leftBall == ballsList[i].id && leftGap == gapsList[j].id) {
                neighbourGaps.push(leftGap);
            }
        }
    }
}

function showPossibleMoves(cell) {
    /*
        - Shows possible moves related to the element (ball) that fires the event.
        - Possible moves depend on the target event position; must be: className='gap' && position + 2
        - When clicking in other ball, the previous style must be cleared up.
    */
    if(cell.className == 'cell ball') {
        // If is not the first click
        if(neighbourGaps != undefined && clicked != undefined) {
            for(var i = 0; i < neighbourGaps.length; i++) {
                if( document.getElementById(neighbourGaps[i]).className == 'cell gap') {
                    document.getElementById(neighbourGaps[i]).style.border = '5px solid #F1D67F';
                } else {
                    document.getElementById(neighbourGaps[i]).style.border = 0;
                }
            }
            var popped = clicked.pop(); 
            if(popped.className == 'cell gap') {
                popped.style.border = '5px solid #F1D67F';
            } else if(popped.className == 'cell ball') {
                popped.style.border = 0;
            } else if(document.getElementById(dragged).className == 'cell ball') {
                document.getElementById(dragged).style.border = 0;
            }
        }

        neighbourGaps = [];
        clicked = [];
        clicked.push(cell);

        getPossibleMoves(cell);

        // Giving borders for the clicked ball and the neighbour gaps
        for(var i = 0; i < neighbourGaps.length; i++) {
            if(document.getElementById(neighbourGaps[i]).className == 'cell gap') {
                document.getElementById(neighbourGaps[i]).style.border = '5px solid #21B180';
            }
        }

        if(cell.className != 'cell gap' ) {
            cell.style.border = '5px solid gray';
        }
    }
}

/* Events fired on the draggable target */
document.addEventListener("drag", function (event) {
}, false);

document.addEventListener("dragstart", function (event) {
    if(event.target.className != 'cell gap') {
        dragged = event.target.id;
        neighbourGaps = [];
        getPossibleMoves(event.target);
        event.target.style.border = 0;
    }
    event.dataTransfer.setData('Text', this.id);
;}, false);

document.addEventListener("dragend", function (event) {
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function (event) {
    // prevent default to allow drop
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function (event) {
}, false);

document.addEventListener("dragleave", function (event) {
}, false);

document.addEventListener("drop", function (event) {
    // prevent default action (open as link for some elements)

    if(event.preventDefault) { event.preventDefault(); }
    if(event.stopPropagation) { event.stopPropagation(); }

    var dropRow = parseInt(event.target.id.slice(4, 5));
    var dropColumn = parseInt(event.target.id.slice(6, 7));

    var dragRow = parseInt(dragged.slice(4, 5));
    var dragColumn = parseInt(dragged.slice(6, 7));

    var row = dropRow - dragRow;
    var column = dropColumn - dragColumn
    var id;

    // move dragged elem to the selected drop target
    for(var i = 0; i < neighbourGaps.length; i++) { 
        if(event.target.id == neighbourGaps[i]) {
            // The gap converts to a ball
            event.target.className = 'cell ball';
            event.target.style.border = 0;
            event.target.style.background = "url('images/ball.svg') center";
            event.target.style.backgroundSize = '6vh';
            event.target.style.backgroundRepeat = 'no-repeat';
            event.target.addEventListener('onclick', showPossibleMoves);
        
            // The dragged ball converts to a gap
            document.getElementById(dragged).className = 'cell gap';
            document.getElementById(dragged).style.border = '5px solid #F1D67F';
            document.getElementById(dragged).style.background = '#D8BF7D';
            document.getElementById(dragged).style.backgroundSize = 0;
            document.getElementById(dragged).style.backgroundRepeat = 0;
            document.getElementById(dragged).removeEventListener('onclick', showPossibleMoves);

            // The middle ball gets eaten
            switch(true) {
                case row == -2 && column == 0:
                    id = "pos-" + parseInt(dragRow - 1) + "-" + parseInt(dragColumn);
                    document.getElementById(id).className = 'cell gap';
                    document.getElementById(id).style.border = '5px solid #F1D67F';
                    document.getElementById(id).style.background = '#D8BF7D';
                    document.getElementById(id).removeEventListener('onclick', showPossibleMoves);
                break;
                case row = 2 && column == 0:
                    id = "pos-" + parseInt(dragRow + 1) + "-" + parseInt(dragColumn);
                    document.getElementById(id).className = 'cell gap';
                    document.getElementById(id).style.border = '5px solid #F1D67F';
                    document.getElementById(id).style.background = '#D8BF7D';
                    document.getElementById(id).removeEventListener('onclick', showPossibleMoves);
                break;
                case row == 0 && column == -2:
                    id = "pos-" + parseInt(dragRow) + "-" + parseInt(dragColumn - 1);
                    document.getElementById(id).className = 'cell gap';
                    document.getElementById(id).style.border = '5px solid #F1D67F';
                    document.getElementById(id).style.background = '#D8BF7D';
                    document.getElementById(id).removeEventListener('onclick', showPossibleMoves);
                break;
                case row == 0 && column == 2:
                    id = "pos-" + parseInt(dragRow) + "-" + parseInt(dragColumn + 1);
                    document.getElementById(id).className = 'cell gap';
                    document.getElementById(id).style.border = '5px solid #F1D67F';
                    document.getElementById(id).style.background = '#D8BF7D';
                    document.getElementById(id).removeEventListener('onclick', showPossibleMoves);
                break;
            }
        }
    }

    if(clicked != undefined ) {
        document.getElementById(clicked[0].id).style.border = 0;
        document.getElementById(dragged).style.border = '5px solid #F1D67F';
        for(var i = 0; i < gapsList.length; i++) {
            document.getElementById(gapsList[i].id).style.border = '5px solid #F1D67F';
        }       
    }

    return false;

}, false);