import { StyleSheet } from 'react-native'

import { ApplicationStyles, Colors  } from '../../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: Colors.primary,

  },
  card:{
      paddingTop:10,
     justifyContent:'flex-end',
     alignItems:'center',
     borderRadius:10,
     height:600,
     marginBottom:100
  },
  cardView:{
     flex:1,
     width:"90%"
      
  },
  carditem:{
    flexDirection:'column'

  },
  animation:{
   width:200,
   height:200,
   alignSelf:'center',
   marginBottom:10,
  },
  row:{
    flexDirection:'row'
  },
  title:{
    color:Colors.primary,
    fontSize:25,
    marginTop:19
  },
  subtitle:{
    color:Colors.primary,
    fontSize:16,
    marginTop:20
  },
  error:{
    color:Colors.secondary,
    fontSize:16,
    textAlign:'center',
    marginTop:10,
   },
  textInput: {
        padding: 0,
        margin: 0,
        flex: 1,
        fontSize: 20,
        color: Colors.primary
    },
  buttonText: {
    fontSize: 18,
    color: Colors.white,
    alignSelf: 'center',
  },
  button: {
    flex:1,
    backgroundColor: Colors.primary,
    color: Colors.white,
    marginTop:40
  },
  buttontext:{
    color: Colors.white,
    fontSize:16
  },
  footer:{
    color: Colors.white,
    fontSize:13,
    alignSelf:'center',
    marginBottom:30
  },
  verified:{
    fontSize: 25,
    color: Colors.primary,
    alignSelf: 'center',
  },
  text:{
      marginTop:10,
      fontSize:15,
      color:Colors.charcoal,
      textAlign:'center'
  },
  resend: {
     height:40,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center'
  },
  resendtext:{
      color:Colors.primary,
      fontSize:20,
      fontWeight:'700'
  }
})
