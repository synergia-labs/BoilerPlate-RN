cd android && ./gradlew clean && ./gradlew buildRelease && cd .. && adb uninstall com.synergia.zoombee && npx react-native run-android --mode=release