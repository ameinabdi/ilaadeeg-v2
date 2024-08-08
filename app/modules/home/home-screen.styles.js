import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Metrics, ApplicationStyles, Colors, Fonts } from '../../shared/themes';

export default StyleSheet.create({
 
  container: {
    flex:1,
    height:hp('100'),
    backgroundColor: Colors.white,
  },
  header:{
    backgroundColor:Colors.white,

  },
  menuIcon:{
    width:20,
    height:20,
    tintColor:Colors.primary
  },
  headerMenu:{
    width:wp('100%'),
    height:hp('6%'),
    backgroundColor:Colors.primary

  },
  logoTitle:{
    ...Fonts.style.h2,
    alignSelf:'center',
    marginLeft:wp('20%'),
    color:Colors.primary, 
    width:wp(35)
  },
  resellbuttonText:{
    color:Colors.primary,
    fontSize:wp('4')
  },
  headerSearch:{
    backgroundColor:Colors.primary,
    width:wp('100%'),
    height:hp('10%'),
  },
  content:{
    flex:1,
    backgroundColor:Colors.background

  },
  subheader:{
    flex:1,
    backgroundColor:Colors.white,
    marginHorizontal:wp('2%'),
    marginVertical:hp('1%'),
    borderRadius:wp('1%'),
  },
  contain:{
    flex:1,
    backgroundColor:Colors.white,
    marginHorizontal:wp('2%'),
    borderRadius:wp('1%'),
  },
  Contenttitle:{
    fontSize:25,
    color:Colors.title,
    margin:wp('4%'),
    fontWeight:'bold'
  },
  menubutton:{
    width:wp('10'),
  },
  productContent:{
    marginTop:wp('4'),

  },
  productHeader:{
    paddingHorizontal:wp('5'),
    height:hp('5'),
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  productTitle: {
    textAlign: 'left',
    fontSize: 18,
    color: Colors.title,
    fontWeight: '600',
  },

  productView: {
    textAlign: 'left',
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '400',
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
    height:hp('7'),
    justifyContent:'center',
    marginHorizontal:wp('2%'),
    marginVertical:hp('1%'),
    paddingVertical:wp('2%'),
    paddingHorizontal:wp('0%'),
    borderRadius:wp('1%'),
    backgroundColor:Colors.background,

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
    padding:wp('2%'),
    justifyContent:'center',
    marginHorizontal:wp('2%'),
    alignItems:'center',

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
  RateView:{
    flex:1,
    height:hp('6%'),
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    margin:10
  },
  rateText:{
    margin:10,
    textAlign:'center',
    color:Colors.title,
    fontWeight:'400',
    fontSize:16
  },
  row: {
    paddingVertical: wp('2'),
    height:hp('5%'),
  },
  rowBorder: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    height:hp('6%')
  },
  colLeft:{
    width:wp('50%'),
    height:hp('5%'),
  },
  colRight:{
    width:wp('50%'),
    height:hp('2%'),
    alignItems:'flex-start',

  },
  label: {
    color: Colors.charcoal,
    fontSize:14,
    marginTop:3
  },
  selectPicker:{
    flexDirection:'row',
    justifyContent:'center',

  },
  paymentTypeIcon:{
    width:wp('7%'),
    height:wp('7%'),
    marginLeft:wp('2'),
    backgroundColor:Colors.primaryBg,
    borderRadius:wp('100')
  },
  selectTitle:{
    fontSize:16,
    color:Colors.title,
    fontWeight:'500',
    marginTop:hp('0.5%'),
    marginLeft:wp('3%'),

  },
  dropdownIcon:{
    width:wp('5%'),
    height:wp('5%'),
    marginTop:hp('0.5%'),    
    marginLeft:wp('3%'),

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
   width:wp('40%'),
   flexDirection:'row',
   justifyContent:'flex-start',
   alignItems:'baseline'
  },
  inputPicker:{
    marginHorizontal:1,
    height:hp('8%')
   },
   textInputPicker: {
    marginTop:0,
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
    marginLeft:2,
    width:wp('40%'),
    color: Colors.title,
    fontSize:25,
    fontWeight:'500'

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
    padding:wp('1%'),
    borderRadius:wp('1%'),
    backgroundColor:Colors.white,

  },
  footerTitle:{
    fontSize:20,
    color:Colors.title,
    fontWeight:'500',
    marginTop:wp('3%'),
    marginHorizontal:wp('5%')

  },
  
  section:{
    height:hp('12'),
    paddingVertical:hp('1'),
    marginVertical:hp('2%'),
    borderRadius:wp('1')
  },
  footerColLeft:{
    width:wp('50'),
    height:hp('12'),
    marginHorizontal:wp('1'),
    padding:wp('2'),
    borderRadius:wp('1'),
    justifyContent:'center',
    backgroundColor:Colors.background,

  },
  footerColRight:{
    width:wp('40'),
    borderRadius:wp('1'),
    height:hp('12'),
    marginHorizontal:wp('1'),
    padding:wp('1'),
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Colors.background,
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

  },
  button:{
    height:50,
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
