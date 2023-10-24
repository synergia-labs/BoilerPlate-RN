// If you're running on a device or in the Android simulator be sure to change
// let METEOR_URL = 'ws://10.0.2.2:3000/websocket';
// let METEOR_URL = 'wss://develop.zoombee.synergia.dcc.ufmg.br/websocket';
let METEOR_URL = 'ws://150.164.5.151:3000/websocket'; //helio
// let METEOR_URL = 'ws://192.168.18.4:3000/websocket'; //Rafael
// if (process.env.NODE_ENV === 'production') {
// 	METEOR_URL = ''; // your production server url
// }

export const settings = {
	env: process.env.NODE_ENV,
	METEOR_URL
};
