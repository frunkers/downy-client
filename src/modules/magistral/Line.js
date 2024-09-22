import { Train } from "./Train.js";
import { sleep } from "../common.js";

export class Line {
	constructor(line, roadImage, sities) {
		this.line = line;
		this.lineClasses = '.' + line.classList.value.split(' ').join('.');
		this.roadImage = roadImage;
		this.sities = sities;
		this.activeSity = Object.keys(sities)[0];
		const train = document.querySelector(`${this.lineClasses} .line__train`);
		this.train = new Train(train);
		const timer = document.querySelector(`${this.lineClasses} .line__timer`);
		this.timer = timer;
		const timerContent = document.querySelector(`${this.lineClasses} .line__timer-content`);
		this.timerContent = timerContent;
		this.stopingTime = 3000; // ms
	}

	getActiveSity() {
		return this.activeSity;
	}

	getSity() {
		const sity = document.querySelector(
			`${this.lineClasses} .line__sity[attr-name="${this.activeSity}"]`
		);
		return sity;
	}

	run = async (directionGo, sityX, i) => {
		await directionGo(sityX);
		this.activeSity = Object.keys(this.sities)[i];
		const sity = this.getSity();
		sity.style.color = 'dodgerblue';
		this.timer.style.left = sityX + "px";
		this.timer.style.display = 'block';
		let timerTime = this.stopingTime / 1000;
		this.timerContent.innerHTML = `через ${timerTime} сек`;
		const timerInterval = setInterval(() => {
			timerTime--;
			this.timerContent.innerHTML = `через ${timerTime} сек`;
		}, 1000);
		await sleep(this.stopingTime);
		clearInterval(timerInterval);
		this.timer.style.display = 'none';
		sity.style.color = 'midnightblue';
	}

	render = async () => {
		const coords = Object.values(this.sities);
		let e = 0;
		let i = 0;
		while (e < 100) {
			while (i < coords.length - 1) {
				i += 1;
				this.train.reverse_off();
				await this.run(this.train.forward, coords[i], i);
			}
			while (i > 0) {
				i -= 1;
				this.train.reverse_on();
				await this.run(this.train.backward, coords[i], i);
			}
			e++;
		}
	}

	draw = () => {
		for (let i = 0; i < 20; i++) {
			const item = `<img
				src=${this.roadImage}
				class="line__road"
			/>`;
			this.line.insertAdjacentHTML('beforeend', item);
		}

		for (const name in this.sities) {
			let item = document.createElement('div');
			item.innerHTML = name;
			item.classList.add('line__sity');
			item.style.left = this.sities[name] + "px";
			item.setAttribute('attr-name', name);
			this.line.insertAdjacentElement('beforeend', item);
		}

		const sity = this.getSity();
		sity.style.color = 'dodgerblue';
		this.render();
	}
}