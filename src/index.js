import "./css/reset.css";
import "./css/style.css";
import { API } from "./api.js";
import { login } from "./modules/login.js";
import { Line } from "./modules/magistral/Line.js";
import { sleep } from "./modules/common.js";
import blueRoad from "./images/road.jpg";
import "./images/bg.jpg";
import "./images/clock.jpg";
import "./images/mpa.jpg";
import "./images/Сая.jpg";
import "./images/b.jpg";
import "./images/s.jpg";

login();

{
	// const magistral = document.querySelector('.magistral');
	const sities = {
		'blue': {
			'DownЯта': 0,
			'Тест1': 500,
			'Тест2': 1000,
			'Гавриловка': 1900,
		}
	}
	const blueLineEL = document.querySelector('.line.line--blue');
	const blueLine = new Line(blueLineEL, blueRoad, sities.blue);
	blueLine.draw();
	const sity = blueLine.getActiveSity();
	console.log(sity);
}

const bvBtn = document.querySelector('.bvBtn');
// bvBtn.addEventListener('click', () => {
// 	blueLine.draw();
// });

const сая = document.querySelector('.сая');
setInterval(() => {
	сая.style.filter = 'invert(1000%)';
	const a = () => new Promise((res) => res(setTimeout(() => {
		сая.style.filter = 'invert(0%)';
	}, 50)));
	a();
}, 100);
{
	const elevator = document.querySelector('.elevator');
	const ctxE = elevator.getContext('2d');
	const tt = () => {
		ctxE.fillStyle = 'red';
		ctxE.beginPath();
		ctxE.rect(10, y, 60, 80);
		ctxE.fill();
	};
	let t = 0;
	let v0 = 0;
	let y0 = 10;
	let vmax = 6;
	let a = 0.3;
	let v = 0;
	let y = y0;
	const downBtn = document.querySelector('.downBtn');
	tt();
	let y_prev = 0;
	downBtn.addEventListener('click', async () => {
		for (let i = 0; i < 500; i++) {
			if (i >= 50) {
				a -= 0.001;
			}
			v = v0 + a * t;
			y = y0 + v * t + a * t ** 2 / 2;
			if (y_prev > y) {
				break;
			}
			y_prev = y;
			t += 0.25;
			ctxE.fillStyle = 'black';
			ctxE.clearRect(0, 0, elevator.width, elevator.height);
			tt();
			await sleep(10);
		}
	});
}