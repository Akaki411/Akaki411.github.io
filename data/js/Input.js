var fPlayer = 0;
var sPlayer = 0;
var startSpeed = 0.4;
var mayItMove = false;

export class Input {
    static getAxis(name) {
        if (mayItMove) {
            if (name == "FirstPlayer") {
                return fPlayer;
            } else if (name == "SecondPlayer") {
                return sPlayer;
            }
        } else {
            return 0;
        }
    }

    static Start() {
        mayItMove = true;
    }
}

function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyS') {
        if (sPlayer == 0) {
            sPlayer = startSpeed;
        } else {
            sPlayer = clamp(sPlayer + 0.2, 0, 1);
        }
    }

    if (event.code == 'KeyW') {
        if (sPlayer == 0) {
            sPlayer = -startSpeed;
        } else {
            sPlayer = clamp(sPlayer - 0.2, -1, 0);
        }
    }


    if (event.code == 'ArrowDown') {
        if (fPlayer == 0) {
            fPlayer = startSpeed;
        } else {
            fPlayer = clamp(fPlayer + 0.2, 0, 1);
        }
    }

    if (event.code == 'ArrowUp') {
        if (fPlayer == 0) {
            fPlayer = -startSpeed;
        } else {
            fPlayer = clamp(fPlayer - 0.2, -1, 0);
        }
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code == 'KeyS') {
        sPlayer = 0;
    }

    if (event.code == 'KeyW') {
        sPlayer = 0;
    }


    if (event.code == 'ArrowDown') {
        fPlayer = 0;
    }

    if (event.code == 'ArrowUp') {
        fPlayer = 0;
    }
});