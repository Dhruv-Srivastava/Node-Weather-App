require('dotenv').config()
const request=require("postman-request")

const forecast=(location,callback)=>{
    const baseURL=`http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=`
    const url=baseURL+location
    request({url,json:true},(err,res)=>{
        if(err){
            callback("Unable to reach the server as an error occured");
            return;
        }
        else if(res.body.success===false){
            callback(res.body.error.info);
            return;
        }
        const data=res.body
        callback(undefined,{
            location:data.location.name,
            forecast:`The current temperature in ${data.location.name}, ${data.location.country} is ${data.current.temperature} degrees celcius. Forecast says it's ${data.current.weather_descriptions[0].toLowerCase()} over there`
        })
        
    })
}


const handleResponse=(error,data)=>{
    if(error){
        console.log(error)
        return;
    }
    console.log(data)
}

module.exports={
    forecast,
    handleResponse
}