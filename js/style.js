var initialGap;
var initialTime;
var html;

function chooseOptions(this) {
    /*
        Choose whether if the option is handled by play-btn or place-btn and display their options.
    */

    document.getElementById('welcome').style.display = 'none';

    if(this.id == 'play-btn') {
        this.style.display = 'flex';

    } else if(this.id == 'place-btn') {
        this.style.display = 'flex';
        document.getElementById('empty-board').innerHTML = createBoard('gap');
    }
}

function createBoard(obj) {
    /*
        Creates board
    */

    html = "";
    var id = "";
    
    // Building the board
    for (var row = 1; row <= 7; row++) {
        html += "<ul class='row'>"
        for (var column = 1; column <= 7; column++) {
            id = "pos-" + row + "-" + column;

            switch (true) {
                case (row == 1 || row == 2 || row == 6 || row == 7) && (column == 1 || column == 2 || column == 6 || column == 7):
                    html += "<li id=" + id + " class='cell'></li>";
                    break;
                default:
                    html += "<li id=" + id + " class='cell '" + obj + "draggable='true' onclick='showPossibleMoves(this);'></li>";
                    break;
            }

        }
        html += "</ul>";
    }



    

    if(this.id == 'play-btn') {

        // Retrieve the options from chooseOptions()
        if(document.getElementById('default-gap').checked == true) {
            initialGap = document.getElementById('default-gap').value;
        } else if(document.getElementById('random-gap').checked == true) {
            var row = Math.floor((Math.random() * 7) + 1);
            var column = Math.floor((Math.random() * 7) + 1);
            initialGap = "pos-" + row + "-" + column;
        }

    } else if(this.id == 'place-btn') {

    }

    // Set time
    if(document.getElementById('timer-option').value != "") {
        time = document.getElementById('timer-option').value;
    } else {
        time = 'Timeless';
    }
}

function startGame(this) {
    /*

    */

    if(this.id == 'play-start') {

    } else if(this.id == 'place-start') {

    }
}