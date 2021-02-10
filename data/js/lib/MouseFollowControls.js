// This set of controls rotates a given object towards the mouse
export class MouseFollowControls
{
    constructor(object, sensitivityX = 1, sensitivityY = 1)
    {
        this.object = object;
        this.sensitivityX = sensitivityX;
        this.sensitivityY = sensitivityY;
        init();
    }
    
    SetSensivity (value)
    {
        this.sensitivityX = value;
        this.sensitivityY = value;
    }

    Update ()
    {
        this.object.rotation.x = posY * (0.001 * this.sensitivityY);
        this.object.rotation.y = posX * (0.001 * this.sensitivityX);
    }   
}


var posX = 0;
var posY = 0;

const halfHeight = window.innerHeight * .5;
const halfWidth = window.innerWidth * .5;


function init() 
{
    if (document.layers) document.captureEvents(Event.MOUSEMOVE);
    document.onmousemove = mouseMove;
}

function mouseMove(event) 
{
    if (document.attachEvent != null) 
    {
        posX = window.event.clientX - halfWidth;
        posY = window.event.clientY - halfHeight;
    } 
    else if (!document.attachEvent && document.addEventListener) 
    {
        posX = event.clientX - halfWidth;
        posY = event.clientY - halfHeight;
    }
}