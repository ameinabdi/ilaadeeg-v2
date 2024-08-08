import React from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import {Animation} from '../../themes';
import styles from './alert-message.styles';

// static propTypes = {
//   title: PropTypes.string,
//   icon: PropTypes.string,
//   style: PropTypes.object,
//   show: PropTypes.bool,
// };

export default function AlertMessage({ title, style, show = true }) {
  return show ? (
    <View style={[styles.container, style]}>
      <View style={styles.contentContainer}>
      <LottieView source={Animation.empty} autoPlay loop style={styles.animation} />
        <Text allowFontScaling={false} style={styles.message}>
          {title && title.toUpperCase()}
        </Text>
      </View>
    </View>
  ) : null;
}
