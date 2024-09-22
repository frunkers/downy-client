import { API } from "../api.js";

export const login = () => {
	const wrapper = document.querySelector('#app');
	const login = document.querySelector(".app__login");
	const nameEl = document.querySelector('.app__login-name');
	const passwordEl = document.querySelector('.app__login-password');
	document.body.classList.add('body-login');
	wrapper.style.display = 'none';
	login.style.display = 'block';
	if (localStorage.getItem('name') !== null) {
		const name = localStorage.getItem('name');
		const password = localStorage.getItem('password');
		nameEl.value = name;
		passwordEl.value = password;
	}
	login.addEventListener('submit', (evt) => {
		evt.preventDefault();
		const name = nameEl.value;
		const password = passwordEl.value;
		if (localStorage.getItem('name') === null) {
			localStorage.setItem('name', name);
			localStorage.setItem('password', password);
		}
		if (name !== '' && password !== '') {
			const data = {
				name,
				password,
			};
			API.sendLoginData(data);
		} else {
			alert('Заполни данные пользователя!');
		}

		const requestIsValidLoginDataFn = (isValid) => {
			if (isValid) {
				login.style.display = 'none';
				document.body.classList.remove('body-login');
				wrapper.style.display = 'block';
			} else {
				alert('Неверные данные пользователя.');
			}
		};
		API.getIsValidLoginData(requestIsValidLoginDataFn);
	});
};