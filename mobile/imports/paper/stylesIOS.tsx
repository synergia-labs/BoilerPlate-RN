import { useSafeAreaInsets } from 'react-native-safe-area-context';

const insets = useSafeAreaInsets();
export const styleIOS = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
}