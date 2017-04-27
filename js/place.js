var emptyHtml;
var emptyBoard;

function createEmptyBoard() {
	/**
	 * [display description]
	 * @type {String}
	 */

    // Display game container
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('place-options').style.display = 'flex';

    emptyBoard = document.getElementById('empty-board');
    emptyHtml = "";
    var id = "";

    // Building the board
    for (var row = 1; row <= 7; row++) {
        emptyHtml += "<ul class='row'>"
        for (var column = 1; column <= 7; column++) {
            id = "pos-" + row + "-" + column;

            switch (true) {
                case (row == 1 || row == 2 || row == 6 || row == 7) && (column == 1 || column == 2 || column == 6 || column == 7):
                    emptyHtml += "<li id=" + id + " class='cell'></li>";
                    break;
                default:
                    emptyHtml += "<li id=" + id + " class='cell gap'></li>";
                    break;
            }

        }
        emptyHtml += "</ul>";
    }

    emptyBoard.innerHTML = emptyHtml;
    document.addEventListener('click', placeBall);

}

function placeBall(event) {
	/**
	 * [if description]
	 * @param  {[type]} document [description]
	 * @return {[type]}          [description]
	 */

    if(document.getElementById(event.target.id).className == 'cell gap') {
        var pos = document.getElementById(event.target.id);
        pos.className = 'cell ball';
    } else if(document.getElementById(event.target.id).className == 'cell ball') {
        var pos = document.getElementById(event.target.id);
        pos.className = 'cell gap';
    }

    emptyHtml = document.getElementById('empty-board');

}

function choosePlaceOptions() {
    /**
     * [display description]
     * @type {String}
     */

    // Display game container
    document.getElementById('place-options').style.display = 'none';
    document.getElementById('place-other-options').style.display = 'flex';

    document.removeEventListener('click', placeBall);
}

function startGame() {
	/**
	 * [if description]
	 * @param  {[type]} document [description]
	 * @return {[type]}          [description]
	 */

    if(document.getElementById('place-timer-option').value != "") {
        time = document.getElementById('place-timer-option').value;
    } else {
        time = 'Timeless';
    }

    var html = "";
    var id = "";

    // Display game container
    document.getElementById('place-other-options').style.display = 'none';
    document.getElementById('place-container').style.display = 'flex';

    document.getElementById('place-board').appendChild(emptyBoard);

    var ballPositions = document.getElementsByClassName('ball');

    for(var i = 0; i < ballPositions.length; i++) {
        document.getElementById(ballPositions[i].id).setAttribute('draggable', true);
        document.getElementById(ballPositions[i].id).addEventListener('click', function(){ showPossibleMoves(this) });
    }

    displayTime = document.getElementById('display-time-place');
    displayScore = document.getElementById('display-score-place');
	countDown = setInterval(placeCountDown, 1000);
    displayTime.appendChild(document.createTextNode(time));
    ballsList = document.getElementsByClassName('ball');
    gapsList  = document.getElementsByClassName('gap');
}

function placeCountDown() {
	if (time >= 0) {
		displayTime = document.getElementById('display-time-place').innerHTML = time--;
	} else if (time < 0){
		clearInterval(countDown);
		if (ballsList.length == 1) {
			score += 150;
		} else {
			score -= ballsList.length * 50;
		}

		alert('Time is over. Your puntuation is: ' + score);
		if(confirm('Go to the main page?')) {
			window.location.reload(false);
		} else {
			document.getElementById('place-container').style.display = 'none';
			document.getElementById('credits').style.display = 'flex';
		}
	}
}
