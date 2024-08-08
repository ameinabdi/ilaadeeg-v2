import React from 'react';
import { TouchableHighlight, Modal,Image, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ProductActions from './product.reducer';
import styles from './image-viewer-styles';
import { Colors, Images, Animation } from '../../../shared/themes'
import ImageViewer from 'react-native-image-zoom-viewer';
import { Left, Body, Right } from 'native-base'
import  Icon  from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Gallery from 'react-native-image-gallery';
import {AnimatedImage} from 'react-native-ui-lib'; //eslint-disable-line

function ImageView(props) {
  const { testID , route} = props;
  const { images } = route.params
  const image = images.map((item)=>{
    return item.downloadUrl ? {url:item.downloadUrl, freeHeight: true}: {url:null,props: Images.brokenimg}
  })

  return (
    <View style={styles.container}   visible={true} transparent={true} testID="productDetailScrollView">
    <View style={styles.header}>
                <Left>
                  <Icon name="left" color={Colors.white} style={styles.backbutton} size={20}  onPress={()=>props.navigation.goBack()}/>
                </Left>
                <Body>
                </Body>
                <Right>
       </Right>
    </View>
    <Gallery
        style={{ height:hp('100'), width:wp('100'), backgroundColor: 'black', justifyConten:'center', aligmItems:'center' }}
        images={images}
        imageComponent={(data, index)=>{
          return( <AnimatedImage
            containerStyle={{ height:hp('100'), width:wp('100'), justifyConten:'center', aligmItems:'center'}}
            style={{resizeMode: 'contain', height:hp('100'), width:wp('100'),justifyConten:'center', aligmItems:'center' }}
            source={{uri:data.image.downloadUrl ? data.image.downloadUrl : null}}
            loader={<ActivityIndicator   color={Colors.primary}/>}
            key={data.image.id}
            animationDuration={300}
          />)
        }
        }
      />
</View>
  );
}

const mapStateToProps = (state) => {
  return {
    booking: state.bookings.booking,
    gallery: state.products.gallery,
    fetching: state.bookings.fetchingOne,
    deleting: state.bookings.deleting,
    errorDeleting: state.bookings.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGallery: (data) => dispatch(ProductActions.galleryStore(data)),

    getBooking: (id) => dispatch(ProductActions.bookingRequest(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageView);
