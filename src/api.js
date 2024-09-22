import { io } from "socket.io-client";

const PORT = 3003;
let baseURL = "";

if (process.env.NODE_ENV === "development") {
	baseURL = `http://localhost:${PORT}`;
}

if (process.env.NODE_ENV === "production") {
   baseURL = `https://airmonitor.servermc.ru:${PORT}`;
}

const socket = io(baseURL);

socket.on("connect", () => {
	console.log("Client connected");
});

export const API = {
	sendLoginData: (data) => {
		socket.emit("login-data:send", data);
	},

	getIsValidLoginData: (callback) => {
		socket.on("is-valid-login-data:request", (isValid) => {
			callback(isValid);
		});
	},
};
