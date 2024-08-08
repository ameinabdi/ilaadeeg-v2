import React from 'react'
import { FlatList, Text, StyleSheet, View,Image,TouchableHighlight } from 'react-native'
import LottieView from 'lottie-react-native';
import {Animation, Colors} from '../../themes';
import { Button } from 'native-base';
import Icon  from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP } from 'react-native-responsive-screen';
// More info here: https://reactnative.dev/docs/flatlist.html

class LoadingComponent extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {

    }
  }

 render() {
   return (
     <View style={styles.container}>
       <LottieView source={Animation.loading} autoPlay loop style={styles.animation} />
       {this.props.navigation ?
       <Button transparent style={styles.cancel} onPress={()=>this.props.navigation.goBack()}>
          <Icon name='close' color={Colors.primary}  size={20}/>
          <Text style={styles.cancelText}>Cancel</Text>
        </Button>
       :null
       }
        
     </View>
   );
 }
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    animation:{
        width:200,
        height:200
    },
    cancel:{
      width: widthPercentageToDP('90'),
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center',
      backgroundColor:Colors.background,
      padding: 6,
    },
    cancelText: {
      textAlign: 'center',
      color: Colors.primary,
      fontSize:17
    },
})
 

export default LoadingComponent