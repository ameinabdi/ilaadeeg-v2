import React from 'react'
import { Alert, ScrollView, Text,FlatList,Image, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/AntDesign'
import AccountActions from '../../../shared/reducers/account.reducer'
// Styles
import styles from './profile-screen-styles'
import { Container,Header, Content, Thumbnail, Card, Left, Right,CardItem,Body } from 'native-base'
import { Colors, Images, } from '../../../shared/themes'
import { View } from 'react-native-animatable';
import TextAvatar from 'react-native-text-avatar';
import { AntDesign } from 'react-native-vector-icons';
import AlertMessage from '../../../shared/components/alert-message/alert-message'
import moment from 'moment';
import '../../../../i18n';
import {useTranslation} from 'react-i18next';
import ProfileActions from './Profile.reducer'
import PostScreen from '../../entities/post/post-list-screen';
import Share from 'react-native-share';

function ProfileScreen(props) {
  const { account,navigation,deleteProfile } = props;
  const {t, i18n} = useTranslation();
  const deleteUser = ()=>{
    Alert.alert(
      "Are You Sure",
      "To Delete Delete Your Account",
      [
        {
          text: "No",
          style: "cancel",
        },
        {text: 'Yes', onPress: () => deleteProfile(account.id)},  
      ],
    )
    }
     const inviteFreinds = ()=>{
      const options = {
        title:'Lets Shopping on ilaadeeg',
        subject:'Lets Shopping on ilaadeeg',
        url: 'http://ilaadeeg.app.link/KKscMwjJ3wb',
        message:  'Lets Shopping on ilaadeeg, The Best Place to Buy and Sell Products Online in Somalia',

    }
    Share.open(options)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      err && console.log(err);
    });
      }
 
      if(!account){
        return (
          <AlertMessage title="No Account Found" show={true} />
        )
      }
    return (
      <Container style={styles.container}>
        <View  style={styles.header}>
            <Left>
               <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.goBack()}/>
            </Left>
            <Body />
            <Right/>
        </View>
        <View style={styles.profile}>
          <TextAvatar
           backgroundColor={Colors.secondary}
           size={80}
           type={'circle'} // optional
          >{account.fullName}</TextAvatar>
           <Text style={styles.fullname} >{account.fullName}</Text>
           {account.email && (<Text style={styles.id} ><Icon name="mail" size={20} /> {account.email}</Text>)} 
           {account?.phoneNumber && (<Text style={styles.id} ><Icon name="phone" size={20} /> {account?.phoneNumber}</Text>)} 
          </View>
          <View style={styles.content}>
          <Text style={styles.contenTitle}>{t('screen.profile.title')}  </Text>
          <TouchableHighlight onPress={() => navigation.navigate('EditProfileScreen',{ account})}>
            <View style={styles.card}>
                <View style={styles.left}>
                  <Image source={Images.profile} style={styles.menuIcon} />
                </View>
                <View style={styles.center}>
                  <Text style={styles.title}>{t('screen.profile.update')}</Text>
                </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => navigation.navigate('postScreen')}>
            <View style={styles.card}>
                <View style={styles.left}>
                  <Image source={Images.onebox} style={styles.menuIcon} />
                </View>
                <View style={styles.center}>
                  <Text style={styles.title}>My Post</Text>
                </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => navigation.navigate('LanguageScreen')}>
            <View style={styles.card}>
                <View style={styles.left}>
                  <Image source={Images.language} style={styles.menuIcon} />
                </View>
                <View style={styles.center}>
                  <Text style={styles.title}>Langauge</Text>
                </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={inviteFreinds}>
            <View style={styles.card}>
                <View style={styles.left}>
                  <Image source={Images.share} style={styles.menuIcon} />
                </View>
                <View style={styles.center}>
                  <Text style={styles.title}>Tell Your Freinds</Text>
                </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={deleteUser}>
            <View style={styles.card}>
                <View style={styles.left}>
                  <Image source={Images.deleteUser} style={styles.menuIcon} />
                </View>
                <View style={styles.center}>
                  <Text style={styles.title}>Delete Account</Text>
                </View>
            </View>
          </TouchableHighlight>
          </View>
      </Container>
    )
  }


const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    updating: state.account.updating,
    error: state.account.error,

    deleting: state.profile.deleting,
    errorDeleting: state.profile.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProfile: (id) => dispatch(ProfileActions.profileDeleteRequest(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
