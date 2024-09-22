import { sleep } from "../common.js";

export class Train {
	constructor(train) {
		this.train = train;
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

	forward = async (sityX) => {
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
			this.train.style.left = Math.round(this.x) + "px";
			this.t += 0.5;
			await sleep(20);
		}
	}

	backward = async (sityX) => {
		this.resetValues();
		const breakX = sityX + (0 - this.vMax ** 2) / (2 * this.breakA);
		this.a = this.goA;
		while (this.x > sityX) {
			if (this.v > -this.vMax || this.x <= breakX) {
				this.v = this.v0 - this.a * this.t;
				this.x = this.x0 + this.v0 * this.t - this.a * this.t ** 2 / 2;
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
			this.train.style.left = Math.round(this.x) + "px";
			this.t += 0.5;
			await sleep(20);
		}
	}

	reverse_on() {
		if (!this.train.classList.contains('reverse')) {
			this.train.classList.add('reverse');
		}
	}

	reverse_off() {
		if (this.train.classList.contains('reverse')) {
			this.train.classList.remove('reverse');
		}
	}
}