const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

class Train {
	constructor(train) {
		thid.train = train;
		this.v0 = 0;
		this.v = 0;
		this.vMax = 10;
		this.x0 = 0;
		this.x = 0;
		this.t = 0;
		this.a = 0;
		this.goA = 0.5;
		this.breakA = -0.2;
	}

	resetValues() {
		this.a = this.goA;
		this.v = 0;
		this.v0 = 0;
		this.x0 = this.x;
		this.t = 0;
	}

	async go(sityX) {
		this.resetValues();
		const breakX = sityX - (0 - this.vMax ** 2) / (2 * this.breakA);
		while (this.x < sityX) {
			if (this.v < this.vMax || this.x >= breakX) {
				this.v = this.v0 + this.a * this.t;
				this.x = this.x0 + this.v0 * this.t + this.a * this.t ** 2 / 2;
			} else if (this.v >= this.vMax) {
				if (this.a !== 0) {
					this.t = 0;
					this.x0 = this.x;
					this.v0 = this.v;
					this.a = 0;
				} else {
					this.x = this.x0 + this.v * this.t;
				}
			}
			if (this.x >= breakX) {
				if (this.a === 0) {
					this.t = 0;
					this.x0 = this.x;
					this.a = this.breakA;
				}
			}
			this.train.style.left = Math.round(x) + "px";
			this.t += 0.5;
			await sleep(20);
		}
	}

	async back(sityX) {
		this.resetValues();
		const breakX = sityX + (0 - this.vMax ** 2) / (2 * this.breakA);
		this.a = this.goA;
		while (this.x > sityX) {
			if (this.v > -vMax || x <= breakX) {
				this.v = this.v0 - this.a * this.t;
				this.x = this.x0 + this.v0 * t - this.a * this.t ** 2 / 2;
			} else if (this.v >= -this.vMax) {
				if (this.a !== 0) {
					this.t = 0;
					this.x0 = this.x;
					this.v0 = this.v;
					this.a = 0;
				} else {
					this.x = this.x0 + this.v * this.t;
				}
			}
			if (this.x <= breakX) {
				if (this.a === 0) {
					this.t = 0;
					this.x0 = this.x;
					this.a = this.breakA;
				}
			}
			this.train.style.left = Math.round(x) + "px";
			this.t += 0.5;
			await sleep(20);
		}
	}

	reverse_on() {
		this.train.classList.add('reverse');
	}

	reverse_off() {
		this.train.classList.remove('reverse');
	}
}

export class Line {
	constructor(roadImage, stations) {
		this.roadImage = roadImage;
		this.stations = stations;
		this.activeStation = Object.keys(stations)[0];
		const train = document.querySelector('.magistral__train');
		this.train = new Train(train);
	}

	draw() {
		for (let i = 0; i < 20; i++) {
			const item = `<img src=${this.roadImage.src} class="magistral__road" />`
			magistral.insertAdjacentHTML('beforeend', item);
		}

		for (const name in this.stations) {
			let item = document.createElement('div');
			item.innerHTML = name;
			item.classList.add('magistral__sity');
			item.style.left = this.stations[name] + "px";
			item.setAttribute('attr-name', name);
			magistral.insertAdjacentElement('beforeend', item);
		}

		const station = document.querySelector(`.magistral__sity[attr-name=${this.activeStation}]`);
		station.style.color = 'dodgerblue';
	}

	async run() {
		let i = 0;
		const timeStop = 60000;
		const coords = Object.values(sities);
		let e = 0;
		sity.style.color = 'black';
		const run = async (directionGo) => {
			const sityX = coords[i];
			await directionGo(sityX);
			const sity = sityStyles(coords[i]);
			sity.style.color = 'dodgerblue';
			timer.style.left = coords[i] + "px";
			timer.style.display = 'block';
			let t = timeStop / 1000;
			timerContent.innerHTML = `через ${t} сек`;
			const q = setInterval(() => {
				t -= 1;
				timerContent.innerHTML = `через ${t} сек`;
			}, 1000);
			await sleep(timeStop);
			clearInterval(q);
			timer.style.display = 'none';
			sity.style.color = 'midnightblue';
		};
		while (e < 100) {
			e++;
			while (i < coords.length - 1) {
				if (train.classList.contains('reverse')) {
					train.classList.remove('reverse');
				}
				i += 1;
				await run(go);
			}
			while (i > 0) {
				if (!train.classList.contains('reverse')) {
					train.classList.add('reverse');
				}
				i -= 1;
				await run(gow);
			}
		}
	}
}

// const magistral = document.querySelector('.magistral');
// const timer = document.querySelector('.magistral__timer');
// const timerContent = document.querySelector('.timer__content');
// for (let i = 0; i < 20; i++) {
// 	const item = `<img src="../images/road.jpg" class="magistral__road" />`
// 	magistral.insertAdjacentHTML('beforeend', item);
// }
// const train = document.querySelector('.magistral__train');
// const sities = {
// 	'DownЯта': 0,
// 	'Тест1': 500,
// 	'Тест2': 1000,
// 	'Гавриловка': 1900,
// }
// for (const name in sities) {
// 	let item = document.createElement('div');
// 	item.innerHTML = name;
// 	item.classList.add('magistral__sity');
// 	item.style.left = sities[name] + "px";
// 	item.setAttribute('attr-name', name);
// 	magistral.insertAdjacentElement('beforeend', item);
// }
// let v0 = 0;
// let v = 0;
// let vMax = 10;
// let x0 = 0;
// let x = 0;
// let t = 0;
// let a = 0;
// const goA = 0.5;
// const breakA = -0.2;
// const go = async (sityX) => {
// 	const breakX = sityX - (0 - vMax ** 2) / (2 * breakA);
// 	a = goA;
// 	v = 0;
// 	v0 = 0;
// 	x0 = x;
// 	t = 0;
// 	while (x < sityX) {
// 		if (v < vMax || x >= breakX) {
// 			v = v0 + a * t;
// 			x = x0 + v0 * t + a * t ** 2 / 2;
// 		} else if (v >= vMax) {
// 			if (a !== 0) {
// 				t = 0;
// 				x0 = x;
// 				v0 = v;
// 				a = 0;
// 			} else {
// 				x = x0 + v * t;
// 			}
// 		}
// 		if (x >= breakX) {
// 			if (a === 0) {
// 				t = 0;
// 				x0 = x;
// 				a = breakA;
// 			}
// 		}
// 		train.style.left = Math.round(x) + "px";
// 		t += 0.5;
// 		await sleep(20);
// 	}
// };
// const gow = async (sityX) => {
// 	v0 = 0;
// 	v = 0;
// 	x0 = x;
// 	t = 0;
// 	const breakX = sityX + (0 - vMax ** 2) / (2 * breakA);
// 	a = goA;
// 	while (x > sityX) {
// 		// console.log(v);
// 		if (v > -vMax || x <= breakX) {
// 			v = v0 - a * t;
// 			x = x0 + v0 * t - a * t ** 2 / 2;
// 		} else if (v >= -vMax) {
// 			if (a !== 0) {
// 				t = 0;
// 				x0 = x;
// 				v0 = v;
// 				a = 0;
// 			} else {
// 				x = x0 + v * t;
// 			}
// 		}
// 		if (x <= breakX) {
// 			if (a === 0) {
// 				t = 0;
// 				x0 = x;
// 				a = breakA;
// 			}
// 			if (v === 0) {
// 				break;
// 			}
// 		}
// 		train.style.left = Math.round(x) + "px";
// 		t += 0.5;
// 		await sleep(20);
// 	}
// };
// const sityStyles = (x) => {
// 	const sityName = Object.keys(sities).find((el) => {
// 		return sities[el] === x;
// 	});
// 	const sity = document.querySelector(`.magistral__sity[attr-name=${sityName}]`);
// 	return sity;
// };
// const sity = sityStyles(0);
// sity.style.color = 'dodgerblue';
// export const drawMagistral = async () => {
// 	let i = 0;
// 	const timeStop = 60000;
// 	const coords = Object.values(sities);
// 	let e = 0;
// 	sity.style.color = 'black';
// 	const run = async (directionGo) => {
// 		const sityX = coords[i];
// 		await directionGo(sityX);
// 		const sity = sityStyles(coords[i]);
// 		sity.style.color = 'dodgerblue';
// 		timer.style.left = coords[i] + "px";
// 		timer.style.display = 'block';
// 		let t = timeStop / 1000;
// 		timerContent.innerHTML = `через ${t} сек`;
// 		const q = setInterval(() => {
// 			t -= 1;
// 			timerContent.innerHTML = `через ${t} сек`;
// 		}, 1000);
// 		await sleep(timeStop);
// 		clearInterval(q);
// 		timer.style.display = 'none';
// 		sity.style.color = 'midnightblue';
// 	};
// 	while (e < 100) {
// 		e++;
// 		while (i < coords.length - 1) {
// 			if (train.classList.contains('reverse')) {
// 				train.classList.remove('reverse');
// 			}
// 			i += 1;
// 			await run(go);
// 		}
// 		while (i > 0) {
// 			if (!train.classList.contains('reverse')) {
// 				train.classList.add('reverse');
// 			}
// 			i -= 1;
// 			await run(gow);
// 		}
// 	}
// };
