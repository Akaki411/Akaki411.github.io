import { Input } from './Input.js';

let moving = true;
let enemySpeed = 0;
let enemySpeedValue = 0;

export class EnemyControls 
{
	constructor(enemy, ball, type)
	{
		this.platform = enemy;
		this.type = type;
		this.ball = ball;
		this.move = true;
	}

	static Moving(value)
	{
		moving = value;
		if (moving)
		{
			enemySpeed = enemySpeedValue;
		}
		else
		{
			enemySpeed = 0.08;
		}
	}
	static Speed(speed)
	{
		enemySpeedValue = speed;
	}

	UpdatePosition()
	{
		if (this.type == "Player")
		{
			this.platform.position.z += Input.getAxis("SecondPlayer");
		}
		else if (this.type == "Auto")
		{
			this.platform.position.z += Smooth(this.ball.position.z, this.platform.position.z) * enemySpeed;
		}
		
	}
}

function Smooth (num1, num2)
{
	let num3 = num1 - num2;
	if (num3 > -1 && num3 < 1)
	{
		return num3;
	}
	else
	{
		return num3 > 0 ? 1 : -1;
	}
}