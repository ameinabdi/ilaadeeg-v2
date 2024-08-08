
import React from 'react';
import {View,Text, StyleSheet ,Dimensions}  from 'react-native';
import HomeScreen from '../modules/home/home-screen';
import ProfileScreen from '../modules/account/profile/profile-screen';
import PostScreen from '../modules/entities/post/post-list-screen';
import SearchScreen from '../modules/entities/search/search-screen';
import WorkerScreen from '../modules/entities/worker/worker-screen';
import BusinessScreen from '../modules/entities/business/business-screen';
import { connect } from 'react-redux';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Icon from 'react-native-vector-icons/AntDesign';
import SearchIcon from 'react-native-vector-icons/Feather';
import { Colors } from '../shared/themes';
import { Badge } from 'react-native-ui-lib'; //eslint-disable-line

const Tab = AnimatedTabBarNavigator();



function MyTabs(props) {
    const { customerOrders,account } = props;
    return (
        <Tab.Navigator
        tabBarOptions={{
            activeTintColor: Colors.white,
            inactiveTintColor: Colors.primary,
            labelStyle:{
                fontSize:15
            }
          }}
        appearance={{
            activeTabBackgrounds:Colors.primary,
            dotCornerRadius:5,
        }}
        >
             
          <Tab.Screen name={"Home"} component={HomeScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Icon
                        name="home"
                        size={size ? size : 24}
                        color={focused ? color : "#222222"}
                        focused={focused}
                        color={color}
                    />
                )
            }}/>
            <Tab.Screen name={"Business"} component={BusinessScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Icon
                        name="enviroment"
                        size={size ? size : 24}
                        color={focused ? color : "#222222"}
                        focused={focused}
                        color={color}
                    />
                )
            }}/>
            <Tab.Screen name={"Worker"} component={WorkerScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <SearchIcon
                    name="users"
                    size={size ? size : 24}
                    color={focused ? color : "#222222"}
                    focused={focused}
                    color={color}
                />
                )
            }}/>
            <Tab.Screen name={"Search"} component={SearchScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <SearchIcon
                        name="search"
                        size={size ? size : 24}
                        color={focused ? color : "#222222"}
                        focused={focused}
                        color={color}
                    />
                )
            }}/>
            {/* {account &&(
                <Tab.Screen name={"My Post"} component={PostScreen}  a
            
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <View position="relative">
                    {!!customerOrders && (
                        <View
                        bg="red"
                        position="absolute"
                        right={-10}
                        top={-10}
                        w={16}
                        h={16}
                        rounded={16}
                        zIndex={1}
                        justifyContent="center"
                        >
                        <Badge
                        label={customerOrders.length}
                        labelFormatterLimit={4}
                        backgroundColor={Colors.primary}
                        borderColor={Colors.primary}
                        />
                       
                        </View>
                    )}
                     <SearchIcon
                    name="shopping-bag"
                    size={size ? size : 24}
                    color={focused ? color : "#222222"}
                    focused={focused}
                    color={color}
                    />
                    </View>
                )
            }}/>
            )} */}
             {account &&(
            <Tab.Screen name={"Profile"} component={ProfileScreen} 
            
            options={{
                
                tabBarIcon: ({ focused, color, size }) => (
                    
                    <Icon
                        name="user"
                        size={size ? size : 24}
                        color={focused ? color : "#222222"}
                        focused={focused}
                        color={color}
                    />
                )
            }}/>
            )}
        </Tab.Navigator>
    );
}
const mapStateToProps = (state) => ({ 
    account: state.account.account,
    customerOrders: state.order.customerOrders,

});
const mapDispatchToProps = (dispatch) => ({
  customerOrderSave: (order) => dispatch(OrderAction.customerOrderSave(order)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyTabs);
