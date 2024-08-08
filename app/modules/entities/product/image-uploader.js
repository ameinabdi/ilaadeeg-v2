import React from 'react';
import { TouchableHighlight, Modal,Image, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ProductActions from './product.reducer';
import styles from './image-uploader-styles';
import { Colors, Images, Animation } from '../../../shared/themes'
import  Icon  from 'react-native-vector-icons/AntDesign';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import appConfig from '../../../config/app-config';
import { Col, Row, Grid } from "react-native-easy-grid";
import LottieView from 'lottie-react-native';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import Toast from 'react-native-toast-message';


function ImageUploader(props) {
  const { visible, setVisible, updloading,error,updloadSuccess, gallery,uploadRequest, entity,setGallery, navigation, testID } = props;
  const [images, setImages ] = React.useState([])
  const [picture, setPicture ] = React.useState([])
  const [ispicture, setIsPicture ] = React.useState(false)

  const handlePressUpload = async () =>{
    setIsPicture(true)
    const options = {
      title: 'Select Avatar',
      mediaType: 'photo',
      maxWidth: 1024,
      maxHeight:1024,
      quality: 1,
      // includeBase64:true
    };
   await launchImageLibrary(options, async(response)=>{
      if(response.assets){
        uploadRequest(gallery, response.assets[0])
        setPicture([...picture, response.assets[0]])
      }
    });
    setIsPicture(false)
}
useDidUpdateEffect(() => {
  if (!updloading && error) {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: error,
      visibilityTime: 8000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  }else if(updloadSuccess){
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'sucess',
      text2: "sucessfully Uploaded",
      visibilityTime: 100,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  }
}, [updloading]);

const deletePicture = (data)=>{
    const filter = gallery.filter((item)=>{
      if(item.id != data.id){
        return item
      }
      return null
    })
    setGallery(filter)
 }
  return (
      <View testID={testID} style={styles.container}>
       <FlatList
        columnWrapperStyle={styles.list}
        numColumns={4}
        horizontal={false}
        data={gallery}
        renderItem={({item})=>{

            return(
              <TouchableOpacity  onPress={()=>handlePressUpload()}  onLongPress={()=>deletePicture(item)}  style={styles.picker}>
              <View  style={styles.pickerView}>
                      <Image source={{uri:item.downloadUrl}}  style={styles.image}/>
               </View>
             </TouchableOpacity>
            )
          }
        }
        ListFooterComponent={()=>{
          if(updloading){
            return (
              <TouchableOpacity  >
                <View  style={styles.pickerView}>
                <LottieView source={Animation.upload}  autoPlay loop />
                </View>
              </TouchableOpacity> 
            ) 
          }
          return (
            <TouchableOpacity  onPress={()=>handlePressUpload()}   style={styles.picker}>
              <View  style={styles.pickerView}>
              <Image source={Images.camera} style={styles.icon} />
              </View>
            </TouchableOpacity> 
          )
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
    updloading: state.products.updloading,
    error: state.products.errorUploading,
    updloadSuccess: state.products.updloadSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGallery: (data) => dispatch(ProductActions.galleryStore(data)),
    uploadRequest: (gallery, data) => dispatch(ProductActions.uploadRequest(gallery, data)),
    getBooking: (id) => dispatch(ProductActions.bookingRequest(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);
