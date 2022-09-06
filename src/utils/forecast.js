const request=require('request')

const forecast=(lattitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=d8ba731aee5f2d3489a81e8ab7e3960a&query=${lattitude},${longitude}`
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to service",undefined)
        }else if (body.error){
            callback("Unable to find location",undefined)
        } else{
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degree celcius out. There is ${body.current.precip*100} % chance of rain.`)
        }
    })
}

module.exports=forecast