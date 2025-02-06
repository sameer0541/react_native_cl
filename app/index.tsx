import icons from "@/constants/icons";
import { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, View ,Animated} from "react-native"
import Svg,{Circle, G,Defs, LinearGradient, Stop} from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const Clock = () => { 
    const CircleRef = useRef<any>();
    const [hours,setHours] = useState('');
    const [min,setMin] = useState('hello');
    const [temperature,setTemperature] = useState(67)
    const CITY = "London"
    const api_id = process.env.WEATHER_API_KEY;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&apiid=${api_id}&units=metric`

    const radiusHour = 115;
    const radiusMin = radiusHour*0.85;
    const circumferenceHour  = 2*radiusHour*Math.PI;
    const circumferenceMin = 2*radiusMin*Math.PI;
    const strokeWidth = 9;
    const halfCircle = radiusHour + strokeWidth;
    const strokeDashoffsetHour = circumferenceHour - (circumferenceHour*parseInt(hours))/12;
    const strokeDashoffsetMin = circumferenceMin - (circumferenceMin*parseInt(min))/60;
    useEffect(()=>{
        const interval = setInterval(()=>{
            const date = new Date();
            const formatHour = new Intl.DateTimeFormat('en-us',{
                hour:'numeric',
                hour12:true,
                
            }).format(date);
            const formatMin = new Intl.DateTimeFormat('en-us',{
                minute:'2-digit',
            }).format(date);
            
            setMin(formatMin);
            setHours(formatHour);
        },1000)
        return(()=>{
            clearInterval(interval);
        })
    },[min])
    useEffect(()=>{
        const fetchWeather = async()=>{
            try {
                const response = await fetch(URL);
                const data =await response.json();
                if(data.main){
                    setTemperature(data.main.temp);
                }
            } catch (error) {
                console.log('error fetching')
            }
            fetchWeather();
        }
    },[])
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
                    id="grad" x1={'1.1'} x2={'0.1'} y1={0.5} y2={0}
                >
                    <Stop offset="0%" stopColor={"#66BAFF"}/>
                    <Stop offset={'50%'} stopColor={"#A1F1FF"}/>
                    <Stop offset={"100%"} stopColor={"#3950C6"}/>    
                </LinearGradient>
                </Defs> 
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
                    {/* <Circle
                        cx={'50%'}
                        cy={'50%'}
                        r={radius}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill={'transparent'}
                        strokeOpacity={0.2}
                        
                    /> */}
                    <AnimatedCircle
                        ref={CircleRef}
                        cx={'50%'}
                        cy={'50%'}
                        r={radiusMin}
                        stroke={"url(#grad)"}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumferenceMin}
                        strokeDashoffset={strokeDashoffsetMin}
                        fill={'transparent'}
                        strokeLinecap="round"
                        
                    />            
                    {/* <Circle
                        cx={'50%'}
                        cy={'50%'}
                        r={radius*0.85}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill={'transparent'}
                        strokeOpacity={0.2}
                    /> */}
                    <AnimatedCircle
                        ref={CircleRef}
                        cx={'50%'}
                        cy={'50%'}
                        r={radiusHour}
                        stroke={'url(#outergrad)'}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumferenceHour}
                        strokeDashoffset={strokeDashoffsetHour}
                        fill={'transparent'}
                        strokeLinecap="round"
                    />
                    </G>
            </Svg>
            
            </View>
            <Text style={{color:"434343",fontSize:34,position:"absolute",width:"auto", transform:[{translateY:"315%" },]}}>{`${parseInt(hours)} : ${parseInt(min)<10?'0':''}${min}`}</Text>
            <Text style={{position:"absolute",fontSize:17,transform:[{translateY:200}],color:"#434343"}}>{hours.split(' ')[1]}</Text>
            

        </View>
        {/* textbox */}
        <View style={{display:"flex",justifyContent:"center",alignItems:"center" , width:'auto',height:200,marginTop:60}}>
            <View style={{backgroundColor:'#E8E8E8',width:'80%',height:'60%',display:"flex",flexDirection:"row",borderRadius:4}}>
                <View style={{display:"flex",flex:1,alignItems:'flex-start',flexDirection:'row',gap:4,paddingTop:4}}>
                    <Image source={icons.location} alt="loc" width={60} height={60} style={{marginLeft:4}}/>
                    <View style={{display:"flex",flexDirection:"column"}}><Text style={{fontSize:20,color:"#999999"}}>India</Text><Text style={{fontSize:9,color:"#A7A7A7"}}>(GMT +5:30)</Text></View>
                </View>
                <View style={{display:"flex",flex:1,alignItems:'center',justifyContent:"center",flexDirection:'row'}}>
                    <Image source={icons.temp} alt="temp"/>
                    <Text style={{color:"#B6B6B6",paddingLeft:12}}>{temperature}</Text>
                </View>
            </View>
        </View>
        </>
    )
}
export default Clock;

export const styles = StyleSheet.create({
    container:{display:"flex",alignItems:"center", position:"relative",left:"50%",top:"10%",transform:[{translateX:"-50%"}]},
    image:{display:"flex",flex:1},
    svg:{position:"relative", transform:[{translateY:-330 }],marginLeft:19,transformOrigin:"center",}
    
})