import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Metrics, ApplicationStyles, Colors } from '../../../shared/themes';

export default StyleSheet.create({
  container: {
    flex:1,
    height:hp('100'),
    backgroundColor: Colors.white,
  },
  header:{
    backgroundColor:Colors.primary
  },
  headerMenu:{
    width:wp('100%'),
    height:hp('6%'),
    backgroundColor:Colors.primary

  },
  headerSearch:{
    backgroundColor:Colors.primary,
    width:wp('100%'),
    height:hp('10%'),
  },
  content:{
    flex:1,
    backgroundColor:Colors.white

  },
  
  Contenttitle:{
    fontSize:30,
    color:Colors.title,
    margin:wp('4%'),
    fontWeight:'bold'
  },
  menubutton:{
    width:wp('10'),
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.white,
    fontWeight: '600',
  },
  hairline: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginTop: 32,
  },
  logo: {
    marginTop: Metrics.section,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain',
  },
  centered: {
    alignItems: 'center',
  },
  scrollView: {
    paddingBottom: Metrics.baseMargin,
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.transparent,
  },
  sectionContainer: {
    flex:1,
    height:hp('18%'),
    marginHorizontal:wp('2%'),
    marginVertical:wp('1%'),
    padding:wp('3%'),
    borderRadius:wp('1%'),
    backgroundColor:Colors.white,

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.white,
  },
  sectionExchange:{
    flex:1,
    height:hp('6%'),
    justifyContent:'center',
    alignItems:'center'
  },
  exchangeView:{
    width:wp('10%'),
    height:wp('10%'),
    backgroundColor:Colors.primary,
    borderRadius:wp('100%'),
    justifyContent:'center',
    alignItems:'center'

  },
  exchangeIcon:{
      width:wp('4'),
      height:wp('4'),
      tintColor:Colors.white
  },
  row: {
    marginVertical: 5,
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor:Colors.white,
  },
  rowBorder: {
    marginTop:hp('0%'),
    paddingVertical: 10,
    paddingHorizontal: 5,
    height:hp('6%')
  },
  colLeft:{
    width:wp('15%'),
    height:hp('5%')
  },
  colRight:{
    width:wp('75%'),
    height:hp('2%'),
    alignItems:'flex-end'
  },
  label: {
    color: Colors.charcoal,
    fontSize:18,
    marginTop:hp('0.5'),
    marginLeft:wp('1')

  },
  selectPicker:{
    flexDirection:'row',
    justifyContent:'flex-start',
    paddingHorizontal:wp('2')

  },
  paymentTypeIcon:{
    width:wp('7%'),
    height:wp('7%'),
    marginLeft:wp('2'),
    backgroundColor:Colors.borders,
    borderRadius:wp('100')
  },
  selectTitle:{
    fontSize:18,
    color:Colors.title,
    fontWeight:'500',
    marginTop:hp('0.5%'),
    marginLeft:wp('3%'),
    width:wp('70')

  },
  dropdownIcon:{
    width:wp('5%'),
    height:wp('5%'),
    marginTop:hp('0.5%'),    
    marginLeft:wp('5%'),

  },
  list:{
    justifyContent:'flex-start',
    width:wp('100%'),
    height: hp('8%'),
    borderBottomWidth: 1,
    borderColor: Colors.background,
    alignItems:'flex-start',
    padding:wp('2%')
  },
  listRow:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  listTitle:{
    marginLeft:wp('5%'),
    fontSize:18,
    color:Colors.title
  },
  input:{
   marginVertical:hp('1'),
   flexDirection:'row',
   backgroundColor: Colors.background,
   justifyContent:'flex-start',
   borderRadius:wp('1'),
  },
  inputPicker:{
    marginHorizontal:1,
    marginVertical:hp('1'),
    height:hp('6%'),
    backgroundColor:Colors.background,
    justifyContent:'center',
    borderRadius:wp('1'),
   },
   textInputPicker: {
    marginTop:10,
    paddingHorizontal:5,
    width:'100%',
    color: Colors.background,
  },
  picker:{
   backgroundColor:Colors.primary

  },
  inputIcon:{
    marginTop:10,
   },
  textInput: {
    marginLeft:wp('3'),
    height: hp('4'),
    width:wp('92'),
    fontSize:18,

  },
  currency:{
    alignSelf:'flex-end',
    color:Colors.text,
    fontSize:16,
    fontWeight:'bold',
    width:'50%',
    marginBottom:'3%',
  },
  titleText:{
    alignSelf:'flex-start',
    marginHorizontal:5,
    color:Colors.primary,
    fontSize:30,
    marginTop:15,
    fontWeight:'bold',
    marginBottom:20,

  },

  highlight: {
    fontWeight: '700',
  },
  footer: { 
    width:wp('100'),
    height:hp('50'),
    paddingHorizontal:wp('5'),
    backgroundColor:Colors.white
  },
  tabContainer:{
    backgroundColor: Colors.transparent,
    height:hp('12%'),
  },
  menu: { 
    flex:1,
    height:hp('36%'),
    marginTop:hp('-60%'),
    alignItems:'flex-end',
    justifyContent:'center'
  },
 
  service: { 
    flexDirection:'column',
    width:wp('30'),
    height:hp('11'),
    borderRadius:wp('1'),
    marginHorizontal:wp('1'),
    justifyContent:'center',
    alignItems:'center',
    marginBottom:hp('1'),
    backgroundColor:Colors.white,
  },
  busIcon:{
    width:wp('13%'),
    height:wp('13%'),
  },
  boxIcon:{
    width:wp('13%'),
    height:wp('13%'),
  },
  menuIcon:{
    width:wp('13%'),
    height:wp('13%'),
  },
  menuTitle:{
    color:Colors.primary,
    fontWeight:'600',
    fontSize:wp('3%')
  },
  authContainer: {
    margin: 30,
    padding: 5,
    borderRadius: 5,
  },
  authContainerTrue: {
    backgroundColor: '#02b875',
  },
  authContainerFalse: {
    backgroundColor: '#efbb6d',
  },
  authText: {
    textAlign: 'center',
    fontSize: 18,
    color: Colors.white,
    fontWeight: '600',
  },
  sectionFooter: {
    flex:1,
    margin:wp('2%'),
    padding:wp('3%'),
    borderRadius:wp('1%'),
    backgroundColor:Colors.white,

  },
  footerTitle:{
    fontSize:20,
    color:Colors.title,

  },
  
  section:{
    height:hp('7'),
    backgroundColor:Colors.background,
    paddingVertical:hp('1'),
    paddingHorizontal:wp('5'),
    marginVertical:hp('2%'),
    borderRadius:wp('1')
  },
  footerColLeft:{
    width:wp('50')
  },
  footerColRight:{
    width:wp('30')
  },
  sectTitle:{
    fontSize:18,
    color:Colors.title,
    fontWeight:'500'
  },
  sectBody:{
    fontSize:14,
    color:Colors.title,
    fontWeight:'300',
    marginTop:hp('0.8%')

  },
  sectPrice:{
    fontSize:18,
    color:Colors.title,
    fontWeight:'bold',
    marginTop:10

  },
  button:{
    height:hp('6%'),
    width:wp('95'),
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    margin:wp('2'),
    backgroundColor:Colors.primary,
    borderRadius:wp('1'),
  },
  buttonIcon:{
    height:wp('5%'),
    width:wp('5%'),
    tintColor:Colors.white,
    marginRight:wp('5%')
  },
  buttonText:{
    fontSize:18,
    color:Colors.white,
  }
});
