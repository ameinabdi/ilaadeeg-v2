import React from 'react';
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native';
import styles from './business-item-styles';
import { Colors,Animation, Images } from '../../../shared/themes';

import TextAvatar from 'react-native-text-avatar';
function BusinessItem(props) {
  const { business } = props
  
  if(!business){
    return null
  }
  if(business.contact){
    return (
      <TouchableOpacity >
      <View style={styles.card}>
       <View style={styles.leftItem}>
       <TextAvatar
        backgroundColor={Colors.secondary}
        size={70}
        type="circle" // optional
        >{business.contact?.name ?business.contact?.name: 'NO' }</TextAvatar>
       </View>
       <View style={styles.contactcenter}>
         <View style={styles.row}>
         <View style={styles.column}>
              <Text style={styles.titleName}>{business.contact?.name}</Text>
          </View>
         <View style={styles.column}>
          <View style={styles.badge}>
              <Text style={styles.text}>Tel: {business.contact?.telephone}</Text>
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.badge}>
            <Text style={styles.text}>Email: {business.contact?.email}</Text>
            </View>
          </View>
        </View>
      </View>
     
      </View>
    </TouchableOpacity>
    ); 
  }
  if(business.tenant){
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('BusinessDetailScreen', { businessDetail: business.tenant })}>
      <View style={styles.card}>
       <View style={styles.leftItem}>
       <TextAvatar
        backgroundColor={Colors.secondary}
        size={70}
        type="circle" // optional
        >{business.tenant?.name}</TextAvatar>
       </View>
       <View style={styles.center}>
         <View style={styles.column}>
         <View style={styles.row}>
           <Text style={styles.titleName}>{business.tenant.name}</Text>
          </View>
          <View>
          <Text style={styles.title}>City:</Text>
          <View style={styles.badge}>
           <Text style={styles.text}>{business.tenant.locations?.city}</Text>
          </View>
          </View>
         </View>
         <View style={styles.column}>
         <View style={styles.row}>
         <View style={styles.badge}>
           <Text style={styles.text}>{business.tenant?.category?.categoryName}</Text>
         </View>
          </View>
          <View>
            <Text style={styles.title}>Address:</Text>
            <View style={styles.badge}>
            <Text style={styles.text}>{business.tenant.address}</Text>
            </View>
          </View>
         </View>
      </View>
     
      </View>
    </TouchableOpacity>
    ); 
  }

}



export default BusinessItem;
