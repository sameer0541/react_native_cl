import icons from "@/constants/icons";
import "./global.css"
import { Tabs } from "expo-router";
import { Image, ImageBackground, ImageSourcePropType, View } from "react-native";

export const TabIcon = ({focused,icon}:{focused ? :boolean,icon : ImageSourcePropType})=>
     (
        <View style={{display:"flex",marginTop: 25,flexDirection:"column",alignItems:"center",}}>
        <Image source={icon} 
        alt="icon" resizeMode="contain" height={40} width={40}/>
        </View>
    )

const TabLayout = () => {
    return(
        <Tabs screenOptions={{
            headerShown : false,
            tabBarShowLabel : false,
            tabBarStyle:{
                backgroundColor : "#D9D9D9",
                position: "absolute",
                minWidth : 362,
                minHeight : 68,
                marginBottom : 43,
                marginLeft :16,
                marginRight : 16,
                borderRadius : 19 
            }
        }}>
            <Tabs.Screen name="alarm" options={{
                tabBarIcon : ()=>(<TabIcon icon ={icons.alarm}/>)
            }}/>
            <Tabs.Screen name="index" options={{
                tabBarIcon : ()=>(<TabIcon icon ={icons.clock}/>),
            }}/>
            <Tabs.Screen name="stop" options={{
                tabBarIcon : ({focused})=>(<TabIcon focused = {focused} icon ={icons.stopwatch}/>)
            }}/>
            <Tabs.Screen name="timer" options={{
                tabBarIcon : ({focused})=>(<TabIcon focused = {focused} icon ={icons.timer}/>)
            }}/>
        </Tabs>
    )
};

export default TabLayout;
