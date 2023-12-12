module.exports = {
	project: {
		ios: {
			automaticPodsInstallation: true
		  },
        android:{}
	},
	dependencies: {
		'react-native-vector-icons': {
		  platforms: {
			ios: null,
		  },
		},
	  },
	assets: ['./assets/fonts/']
};