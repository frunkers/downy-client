import { API } from "../api.js";

export const login = () => {
	const wrapper = document.querySelector('#app');
	const login = document.querySelector("#app__login");
	if (localStorage.getItem('name') === null) {
		wrapper.style.display = 'none';
		login.style.display = 'block';
		login.addEventListener('submit', (evt) => {
			evt.preventDefault();
			const name = document.querySelector('.app__login-name').value;
			const password = document.querySelector('.app__login-password').value;
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
					wrapper.style.display = 'block';
					localStorage.setItem('name', name);
					localStorage.setItem('password', password);
				} else {
					alert('Неверные данные пользователя.');
				}
			};
			API.getIsValidLoginData(requestIsValidLoginDataFn);
		});
	} else {
		login.style.display = 'none';
		wrapper.style.display = 'block';
		const name = localStorage.getItem('name');
		const password = localStorage.getItem('password');
		const data = {
			name,
			password,
		};
		API.sendLoginData(data);
	}
};