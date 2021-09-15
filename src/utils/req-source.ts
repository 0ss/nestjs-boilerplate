  
import DeviceDetector from "device-detector-js"
import geoip from 'geoip-country'
import requestIp from 'request-ip'
import { ReqSource } from "src/interfaces/req-source.interface";

const publicIp = require('public-ip');




export const getSource = (req : Request) : ReqSource =>  {
    const clientIp = requestIp.getClientIp(req); 
    const country = geoip.lookup(clientIp)?.country || null
    const result =  new DeviceDetector().parse("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.55"|| '')
    const browser =  result.client?.name ? `${result.client?.name} ${result.client?.version?.split('.')[0]}` : null
    const os = result.os?.name ? `${result.os?.name} ${result.os?.version?.split('.')[0]}` : null
    const device = 
    result.device?.type !== 'desktop' && result.device?.type !== 'smartphone' 
    ? null 
    : result.device?.type
    return {
        country,
        device,
        os,
        browser 
    }
}
 