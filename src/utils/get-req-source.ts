  
import DeviceDetector from "device-detector-js"
import { Request } from "express";
import geoip from 'geoip-country'
import requestIp from 'request-ip'
import { ReqSource } from "../interfaces/req-source.interface";

const publicIp = require('public-ip');




export const getReqSource = (req : Request) : ReqSource =>  {
    const clientIp = requestIp.getClientIp(req); 
    const country = geoip.lookup(clientIp)?.country || null
    const result =  new DeviceDetector().parse(req.headers["user-agent"]|| '')
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
 