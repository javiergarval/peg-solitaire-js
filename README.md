# PEG SOLITARIE
## Peg solitaire game developed for Web Developing Technologies subject as final course project.
### Technical University of Madrid (Spain)
---

### Introduction
I created different views which gets displayed when the user interacts with the game:
- Welcome View
    - Game Options View
- Game View
- Place View
    - Place Options View
- Score View
- About View

---

### index.css
Built using Flexbox.

The board is built using three classes:
1. cell - Gives size and background color to all cells.
2. gap - If added, it displays an image of a gap and gives the property of being a possible movement when a ball is clicked/dragged.
3. ball - If added, it displays an image of a ball. It has Click and Drag-and-Drop Events.

---

### play.js

**Functions:**
- chooseOptions();
- createBoard();
- getPossibleMoves(obj);
- showPossibleMoves(obj);

**Event Listeners:**
- drag
- dragstart
- dragend
- dragover
- dragenter
- dragleave
- drop