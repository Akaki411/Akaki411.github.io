import { EnemyControls } from './EnemyController.js';
import { Input } from './Input.js';

var Xspeed = 0;
var Zspeed = 0;
var playerScore = 0;
var enemyScore = 0;
var lose = false;
var pause = false;
var started = false;
var score = 10;

export class BallPhysics {
    constructor(firstPlatform, secondPlatform, ball) {
        this.firstPlatform = firstPlatform;
        this.secondPlatform = secondPlatform;
        this.ball = ball;
    }

    static Start() {
        if (!started) {
            Xspeed = 1.1;
            Zspeed = Math.random() * 0.1;
            Input.Start();
            started = true;
            document.querySelector('#space').classList.add('Invisible');
            score = document.querySelector('#wins').value;
        }
    }

    static Pause() {
        pause = !pause;
        if (document.querySelector('#pause').classList.contains('Invisible') && !lose) {
            document.querySelector('#pause').classList.remove('Invisible');
        } else if (!lose) {
            document.querySelector('#pause').classList.add('Invisible');
        }
    }

    EditDirection() {
        if (Xspeed > 0) {
            EnemyControls.Moving(true);
            this.HitCheck("player");
        } else {
            EnemyControls.Moving(false);
            this.HitCheck("enemy");
        }

    }
    Simulate() {
        if (!lose && !pause) {
            if (this.ball.position.x < -69 || this.ball.position.x > 69) {
                this.EditDirection();
            }
            if (this.ball.position.z < -35 || this.ball.position.z > 35) {
                Zspeed *= Math.abs(Zspeed) < 0.3 ? -1 : -0.95;
                Xspeed *= Math.abs(Xspeed) < 0.5 ? 1 : 0.85;
                if (this.ball.position.z < -35) {
                    this.ball.position.z = -35;
                } else if (this.ball.position.z > 35) {
                    this.ball.position.z = 35;
                }
            }
            this.ball.position.x += Xspeed;
            this.ball.position.z += Zspeed;

            this.firstPlatform.position.z += Input.getAxis("FirstPlayer");
            if (this.firstPlatform.position.z >= 31) this.firstPlatform.position.z = 31;
            else if (this.firstPlatform.position.z <= -31) this.firstPlatform.position.z = -31;
            if (this.secondPlatform.position.z >= 31) this.secondPlatform.position.z = 31;
            else if (this.secondPlatform.position.z <= -31) this.secondPlatform.position.z = -31;
        }
    }

    HitCheck(whoTouchedThis) {
        let hit;
        if (whoTouchedThis == "player") {
            hit = this.firstPlatform.position.z - this.ball.position.z;
        } else {
            hit = this.secondPlatform.position.z - this.ball.position.z;
        }
        Zspeed = clamp(Zspeed - hit * 0.05 + 0.05, -1, 1);
        if (hit > 11 || hit < -11) {
            this.Losing(whoTouchedThis);
        }
        Xspeed *= Math.abs(Xspeed) >= 1 ? -1 : -1.2;
    }

    Losing(whoLosing) {
        if (whoLosing == "player") {
            playerScore++;
            document.querySelector('#first').innerHTML = playerScore;
            if (playerScore >= score) {
                document.querySelector('#win').classList.remove('Invisible');
                document.querySelector('#canvas').classList.add('Blured');
                document.querySelector('#status').innerHTML = "Поражение";
                lose = true;
            }
        } else {
            enemyScore++;
            document.querySelector('#second').innerHTML = enemyScore;
            if (enemyScore >= score) {
                document.querySelector('#win').classList.remove('Invisible');
                document.querySelector('#canvas').classList.add('Blured');
                lose = true;
            }
        }
        Xspeed *= 1.2;
    }

    static SetBallSpeed(xSpeed, zSpeed) {
        Xspeed = xSpeed;
        Zspeed = zSpeed;
    }
}

function clamp(num, min, max) {
    if (num > min && num < max) {
        return num;
    } else if (num < min) {
        return min
    } else {
        return max;
    }
}