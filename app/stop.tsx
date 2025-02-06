import icons from "@/constants/icons";
import { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, View ,Animated, TouchableOpacity} from "react-native"
import Svg,{Circle, G,Defs, LinearGradient, Stop} from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const StopWatch = () => { 
    const radiusHour = 115;
    const circumferenceHour  = 2*radiusHour*Math.PI;
    const strokeWidth = 9;
    const halfCircle = radiusHour + strokeWidth;
    
    const CircleRef = useRef<any>();
    const [isRunning,setIsRunning] = useState(false);
    const [elapsedTime,setElapsedTime] = useState(0);
    const intervalRef = useRef<any>();
    const startTimeRef = useRef(0);
    const StrokeDashRef = useRef(0);
    useEffect(()=>{
        if(isRunning){
            intervalRef.current = setInterval(()=>{
                setElapsedTime(Date.now() - startTimeRef.current)
                
            },100)
        }
        return ()=>{clearInterval(intervalRef?.current);}
    },[isRunning])
    const formatTime =()=>{
        let minutes = Math.floor(elapsedTime/(1000*60)%60).toString();
        let second = Math.floor(elapsedTime/(1000)%60).toString();
        minutes = String(minutes).padStart(2,"0");
        second = String(second).padStart(2,"0")
        return `${minutes} : ${second}`
    }
    return (
        <>
            <View style={styles.container}>
            <View style={{width:350,height:350,display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Image source={icons.background} alt="bg" style={styles.image}/>
            <Svg 
                width={radiusHour*2} height={radiusHour*2} viewBox={`0 0 ${halfCircle*2} ${halfCircle*2}`} style={{position:"absolute",display:"flex",justifyContent:"center",}}
            > 
                <Defs>
                <LinearGradient 
                    id="outergrad" x1={1.1} x2={0.1} y1={0.5} y2={0}
                >
                    <Stop offset={'0%'} stopColor={"#7B9AFF"}/>
                    <Stop offset={'50%'} stopColor={"#E6A7FF"}/>
                    <Stop offset={'100%'} stopColor={"#FFE2B9"}/>
                </LinearGradient> 
                </Defs>
                  <G origin={halfCircle} rotation={-90}>            
                    <Circle
                        cx={'50%'}
                        cy={'50%'}
                        r={radiusHour*0.85}
                        stroke={'lightgray'}
                        strokeWidth={2}
                        fill={'transparent'}
                        strokeOpacity={0.3}
                    />
                    <AnimatedCircle
                        ref={CircleRef}
                        cx={'50%'}
                        cy={'50%'}
                        r={radiusHour}
                        stroke={'url(#outergrad)'}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumferenceHour}
                        strokeDashoffset={circumferenceHour-(circumferenceHour*(elapsedTime/(1000)%60))/60}
                        fill={'transparent'}
                        strokeLinecap="round"
                    />
                    </G>
            </Svg>
            
            </View>
            <Text style={{color:"gray",fontSize:34,position:"absolute",width:"auto", transform:[{translateY:"315%" },]}}>{formatTime()}</Text>
        </View>
        <View style={{display:"flex",flex:1,justifyContent:"space-around",flexDirection:'row',alignItems:"center"}}>
            <TouchableOpacity style={styles.btn}>
                <Image source={icons.flag}/>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:"#fcffff",height:80,width:80,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"100%",boxShadow:"0 0 8 3 lightgray"}} onPress={()=>{
                if(!isRunning){//start
                    setIsRunning(true);
                    startTimeRef.current = Date.now() - elapsedTime;
                }else{
                    setIsRunning(false);
                }
            }}>
                <Image source={isRunning ? icons.pause:icons.play} alt="play-pause" style={{marginLeft:6}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={()=>{
                setIsRunning(false);
                setElapsedTime(0);
            }}>
                <Image source={icons.reset}/>
            </TouchableOpacity>
        </View>
        </>
    )
}
export const styles = StyleSheet.create({
    container:{display:"flex",alignItems:"center", position:"relative",left:"50%",top:"10%",transform:[{translateX:"-50%"}]},
    image:{display:"flex",flex:1},
    svg:{position:"relative", transform:[{translateY:-330 }],marginLeft:19,transformOrigin:"center",},
    btn:{backgroundColor:"#fcffff",height:60,width:60,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"100%",boxShadow:"0 0 8 3 lightgray"}
    
})
export default StopWatch;