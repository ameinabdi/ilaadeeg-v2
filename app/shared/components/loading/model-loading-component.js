import React from 'react'
import { FlatList, Text, StyleSheet, View,Image,TouchableHighlight } from 'react-native'
import LottieView from 'lottie-react-native';
import {Animation,Colors} from '../../themes';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp , heightPercentageToDP as hp  } from 'react-native-responsive-screen';

// More info here: https://reactnative.dev/docs/flatlist.html

class ModelLoadingComponent extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {

    }
  }

 render() {
    return (
     <Modal isVisible={true}>
      <View style={styles.container}>
        <LottieView source={Animation.newloading} autoPlay loop style={styles.animation} />
      </View>
      </Modal>
    );
  }
 }

const styles = StyleSheet.create({

    container:{
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:Colors.white,
        height:hp('10'),
        width:wp('30'),
        borderRadius:wp('1')
    },
    animation:{
        width:wp('30'),
        height:wp('30')
    },
    title:{
        marginTop:hp('5%'),
        fontSize:wp('4'),
        fontWeight:'500',
        color:Colors.primary,
        
    }
})
 

export default ModelLoadingComponent