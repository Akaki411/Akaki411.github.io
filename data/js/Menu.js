const windows = document.getElementsByClassName("Window");
const headers = document.getElementsByClassName("WindowHead");
const game = document.getElementsByClassName('Game');

window.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < windows.length; i++) {
        dragElement(windows[i], headers[i], i);

        function dragElement(body, head) {
            var pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0;
            if (head) {
                head.onmousedown = dragMouseDown;
            } else {
                body.onmousedown = dragMouseDown;
            }
        }

        function dragMouseDown(e) {
            e = e || window.event;
            pos3 = e.clientX;
            pos4 = e.clientY;
            window.onmouseup = closeDragElement;
            window.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            windows[i].style.top = (windows[i].offsetTop - pos2) + "px";
            windows[i].style.left = (windows[i].offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            window.onmouseup = null;
            window.onmousemove = null;
        }
    }

    const range = document.querySelector('#wins');
    const number = document.querySelector('#num');
    range.oninput = () => {
        number.innerHTML = range.value;
    }
})

function OpenWindow(number) {
    if (windows[number].classList.contains('Invisible')) {
        windows[number].classList.remove('Invisible');
        game[0].classList.add('Blured');
    } else {
        windows[number].classList.add('Invisible');
        game[0].classList.remove('Blured');
    }
    for (let i = 0; i < windows.length; i++) {
        if (i == number) continue;
        windows[i].classList.add('Invisible');
    }
}

function Fullscreen() {
    let doc = window.document;
    let docEl = doc.documentElement;
    let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen;
    let cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen;
    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement) {
        requestFullScreen.call(docEl);
    } else {
        cancelFullScreen.call(doc);
    }
}

function ResetSettings() {
    document.querySelector('#volume').value = 100;
    document.querySelector('#ss').value = 'n';
    document.querySelector('#shadows').checked = true;
}

function ExitGame() {
    window.close();
}