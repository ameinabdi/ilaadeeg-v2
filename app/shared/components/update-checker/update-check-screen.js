import React from 'react';
import { ScrollView,Linking, Text,StyleSheet, View,Image, TouchableOpacity,Platform } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import styles from './update-check-screen.style';
import LottieView from 'lottie-react-native';
import {Animation} from '../../themes';
// import { TouchableOpacity } from 'react-native-ui-lib';
import HomeActions from '../../../modules/home/home-reducer'
import { useDidUpdateEffect } from '../../util/use-did-update-effect';
import DeviceInfo from 'react-native-device-info';

function UpdateScreen(props) {
  
  const { getVersion,versionFetching,versionError,navigation, version } = props;
 // if the user is already logged in, send them home

useFocusEffect(
  React.useCallback(() => {
   
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [ ]),
);

const handleUpdate = ()=>{
  if(Platform.OS == "android"){
    Linking.openURL(`market://details?id=com.ameinabdi.Bus`);
  }else{
    Linking.openURL(`itms://itunes.apple.com/in/app/apple-store/id1585190647`);
  }
}

 handleGoback = ()=>{
  getVersion()
}
useDidUpdateEffect(() => {
  if (!versionFetching) {
    if(versionError){
      
    }else if(version){
      if(version.version <= DeviceInfo.getVersion()){
        navigation.navigate('Home')
      }
    }
   
  }
}, [versionFetching,versionError, version]);

  
  return (
    <View style={styles.container}>
      <LottieView source={Animation.update} autoPlay loop style={styles.animation} />
      <Text style={styles.title}>New Update</Text>
      <Text style={styles.text}>We Have New Release Please Update App !</Text>
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Backbutton} onPress={()=>handleGoback()}>
          <Text style={styles.buttonText}>Check it again</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = (state) => ({ 
 
  version:  state.home.version,
  versionError:  state.home.versionError,
  versionFetching:  state.home.versionFetching,


});
const mapDispatchToProps = (dispatch) => ({
  getVersion: () => dispatch(HomeActions.versionRequest()),

});
export default connect(mapStateToProps, mapDispatchToProps)(UpdateScreen);
