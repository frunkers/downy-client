const canvas = document.querySelector('.can');
const ctx = canvas.getContext('2d');

const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

const nlo = new Image();
nlo.src = "./images/w.png";
const road = new Image();
road.src = "./images/road.jpg";
const width = 134;

const initRender = () => {
	for (let i = 0; i < 17; i++) {
		ctx.drawImage(road, i * width, 0, width, 100);
	}
};

export const init = () => {
	road.addEventListener("load", () => {
		initRender();
	});
};

let v0 = 0;
let v = 0;
let vMax = 10;
let x0 = 0;
let y0 = 11;
let x = 0;
let t = 0;
let a = 0.5;

export const drawMagistral = async () => {
	while (x <= 1000) {
		if (v < vMax || x > 500) {
			v = v0 + a * t;
			x = x0 + v0 * t + a * t ** 2 / 2;
		} else if (v >= vMax) {
			if (a !== 0) {
				t = 0;
				x0 = x;
				v0 = v;
				a = 0;
			} else {
				x = x0 + v * t;
			}
		}
		if (x > 500) {
			if (a === 0) {
				t = 0;
				x0 = x;
				a = -0.2;
			}
			if (v === 0) {
				break;
			}
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		initRender();
		ctx.drawImage(nlo, x, y0, 28, 50);
		// ctx.font = '20px serif';
		// ctx.fillText('🛸', x, y0);
		t += 0.5;
		await sleep(20);
	}
};
