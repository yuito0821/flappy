'use strict';

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let score = 0;
let mX = 150;
let mY = 100;
let mdy = 2;
let macc = 0.13;
let mW = 40;
let mH = 30;
let spacePressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.keyCode == 32) {
		spacePressed = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == 32) {
		spacePressed = false;
	}
}

class Pipe {
	constructor(x, y, dx, color) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.color = color;
	}
}
let pipe = [];

function pipeAdd() {
	let b_x = canvas.width;
	let b_y = Math.floor(Math.random() * (canvas.height - 180));
	let b_dx = -2;
	let b_color = "#63B623";

	let b = new Pipe(b_x, b_y, b_dx, b_color);
	pipe.push(b);
}

function draw() {
	let w = 70;
	let h = 150;

	context.clearRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = "#aa6600";
	context.fillRect(0, 670, canvas.width, canvas.height);

	for (let i = 0; i < pipe.length; i++) {
		context.fillStyle = pipe[i].color;
		context.fillRect(pipe[i].x, 0, w, canvas.height);

		context.fillStyle = "#aefcff";
		context.fillRect(pipe[i].x, pipe[i].y, w, h);

		pipe[i].x += pipe[i].dx;

		if (mX == pipe[i].x) {
			score += 1;
		}

		if (pipe[i].x < -w) {
			pipe.shift();
		}
	}
	context.font = "60px bold italic";
	context.fillStyle = "black"
	context.fillText(score, canvas.width / 2, 100);

	context.drawImage(piyo, mX, mY, mW, mH);

	mdy += macc;
	mY += mdy;

	if (spacePressed) {
		mdy = -3;
	}

	canvas.addEventListener('click', function (e) {
		let rect = e.target.getBoundingClientRect();
		let mux = e.clientX - rect.left;
		let muy = e.clientY - rect.top;

		if (mux && muy) {
			mdy = -4;
		}
	}, false);

	for (let i = 0; i < pipe.length; i++) {
		if (((pipe[i].x < mX + mW - 5 && pipe[i].x + w > mX) && (pipe[i].y > mY + 5 || pipe[i].y + h < mY + mH - 13)) || mY + mH > 700) {
			context.fillStyle = "grey";
			context.fillRect(0, 0, canvas.width, canvas.height);
			clearInterval(interval);

			for (let i = 0; i < 100000000; i++) {
				if (i == 99999999) {
					context.fillStyle = "#dd5000";
					context.font = "60px bold italic";
					context.fillText("score", 180, 280);
					context.fillRect(190, 468, 120, 40);
					context.fillRect(190, 550, 120, 40);
					context.fillStyle = "white";
					context.fillText(score, 220, 380);
					context.fillStyle = "#444444";
					context.font = "40px bold italic";
					context.fillText("enter", 200, 500);
					context.fillText("click", 205, 585);
					context.fillStyle = "black";
					context.fillText("or", 230, 540);
				}
			}

			document.addEventListener("keydown", e => {
				if (e.key == "Enter") {
					document.location.reload();
				}
			});

			canvas.addEventListener('click', function (e) {
				let rect = e.target.getBoundingClientRect();
				let mux = e.clientX - rect.left;
				let muy = e.clientY - rect.top;

				if (mux && muy) {
					document.location.reload();
				}
			}, false);
		}
	}
}

setInterval(pipeAdd, 1500);
let interval = setInterval(draw, 8);
