import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Mask, G, Rect, Circle } from 'react-native-svg';

export const Logo32SVG = () => {
	return (
		<View>
			<Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				<Rect width="32" height="32" rx="4" fill="#007E7A" />
				<Mask id="mask0_633_3339" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
					<Rect x="4.75" y="4.75" width="22.5" height="22.5" fill="#D9D9D9" />
				</Mask>
				<G mask="url(#mask0_633_3339)">
					<Path d="M22.5625 24.4375C21.9531 24.4375 21.4062 24.2619 20.9219 23.9106C20.4375 23.5588 20.1016 23.1094 19.9141 22.5625H15.0625C14.0312 22.5625 13.1484 22.1953 12.4141 21.4609C11.6797 20.7266 11.3125 19.8438 11.3125 18.8125C11.3125 17.7812 11.6797 16.8984 12.4141 16.1641C13.1484 15.4297 14.0312 15.0625 15.0625 15.0625H16.9375C17.4531 15.0625 17.8947 14.8787 18.2622 14.5112C18.6291 14.1444 18.8125 13.7031 18.8125 13.1875C18.8125 12.6719 18.6291 12.2303 18.2622 11.8628C17.8947 11.4959 17.4531 11.3125 16.9375 11.3125H12.0859C11.8828 11.8594 11.5431 12.3087 11.0669 12.6606C10.59 13.0119 10.0469 13.1875 9.4375 13.1875C8.65625 13.1875 7.99219 12.9141 7.44531 12.3672C6.89844 11.8203 6.625 11.1562 6.625 10.375C6.625 9.59375 6.89844 8.92969 7.44531 8.38281C7.99219 7.83594 8.65625 7.5625 9.4375 7.5625C10.0469 7.5625 10.59 7.73813 11.0669 8.08938C11.5431 8.44125 11.8828 8.89062 12.0859 9.4375H16.9375C17.9688 9.4375 18.8516 9.80469 19.5859 10.5391C20.3203 11.2734 20.6875 12.1562 20.6875 13.1875C20.6875 14.2188 20.3203 15.1016 19.5859 15.8359C18.8516 16.5703 17.9688 16.9375 16.9375 16.9375H15.0625C14.5469 16.9375 14.1056 17.1209 13.7388 17.4878C13.3713 17.8553 13.1875 18.2969 13.1875 18.8125C13.1875 19.3281 13.3713 19.7697 13.7388 20.1372C14.1056 20.5041 14.5469 20.6875 15.0625 20.6875H19.9141C20.1172 20.1406 20.4572 19.6912 20.9341 19.3394C21.4103 18.9881 21.9531 18.8125 22.5625 18.8125C23.3438 18.8125 24.0078 19.0859 24.5547 19.6328C25.1016 20.1797 25.375 20.8438 25.375 21.625C25.375 22.4062 25.1016 23.0703 24.5547 23.6172C24.0078 24.1641 23.3438 24.4375 22.5625 24.4375ZM9.4375 11.3125C9.70312 11.3125 9.92594 11.2228 10.1059 11.0434C10.2853 10.8634 10.375 10.6406 10.375 10.375C10.375 10.1094 10.2853 9.88656 10.1059 9.70656C9.92594 9.52719 9.70312 9.4375 9.4375 9.4375C9.17188 9.4375 8.94906 9.52719 8.76906 9.70656C8.58969 9.88656 8.5 10.1094 8.5 10.375C8.5 10.6406 8.58969 10.8634 8.76906 11.0434C8.94906 11.2228 9.17188 11.3125 9.4375 11.3125Z" fill="white" />
				</G>
				<Circle cx="22.625" cy="21.625" r="2.875" fill="#ECB11F" />
				<Path d="M12.25 10.375C12.25 11.9628 10.9628 13.25 9.375 13.25C7.78718 13.25 6.5 11.9628 6.5 10.375C6.5 8.78718 7.78718 7.5 9.375 7.5C10.9628 7.5 12.25 8.78718 12.25 10.375ZM8.50879 10.375C8.50879 10.8534 8.89661 11.2412 9.375 11.2412C9.85339 11.2412 10.2412 10.8534 10.2412 10.375C10.2412 9.89661 9.85339 9.50879 9.375 9.50879C8.89661 9.50879 8.50879 9.89661 8.50879 10.375Z" fill="#0ABB98" />
			</Svg>
		</View>
	)
};
