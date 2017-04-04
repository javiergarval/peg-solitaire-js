var html;

function createEmptyBoard() {
    /*
        Creates the board structure
    */

    // Display game container
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('place-options').style.display = 'flex';

    var board = document.getElementById('empty-board');
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
                    html += "<li id=" + id + " class='cell gap' onclick='placeBall(this);'></li>";
                    break;
            }

        }
        html += "</ul>";
    }

    board.innerHTML = html;

}

function placeBall(cell) {
    if(document.getElementById(cell.id).className == 'cell gap') {
        var pos = document.getElementById(cell.id);
        pos.className = 'cell ball';
    } else {
        var pos = document.getElementById(cell.id);
        pos.className = 'cell gap';
    }

    html = document.getElementById('empty-board');

}