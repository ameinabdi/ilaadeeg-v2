import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Colors, Images, Metrics } from '../../../shared/themes'

class GooglePlaces extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render(){
        return (
            <GooglePlacesAutocomplete
                  placeholder='Search Venue Through Map'
                  ref={(c) => {
                    this.usernameInput = c
                  }}
                  onPress={(data)=>this.setState({location:data})}
                  styles={{
                    textInputContainer: {
                      marginTop:10,
                      backgroundColor: Colors.secondbg,
                    },
                    textInput: {
                      height: 38,
                      color: Colors.coal,
                      backgroundColor:Colors.secondbg,
                      fontSize: 16,
                    },
                    predefinedPlacesDescription: {
                      color: Colors.primary,

                    },
                  }}
                  query={{
                    key: 'AIzaSyCbJ1uNohGV0z3WvaEPD-yEpRh3XbvcyQU',
                    language: 'en',
                  }}
                  isRowScrollable={true}
                  fetchDetails={true}
                  keyboardShouldPersistTaps="handled"
                />
          );
    }
  
};

export default GooglePlaces;