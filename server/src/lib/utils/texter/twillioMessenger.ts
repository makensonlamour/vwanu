import client from 'twilio'
import {Twilio}  from 'twilio'
import { IMessenger } from "../../../schema/email.schema";

export default class TwillioTexter implements IMessenger{
    private texter:Twilio;

    constructor(private authToken:string, private fromNumber, private accountSid:string){
        this.accountSid=accountSid, 
        this.authToken=authToken, 
        this.fromNumber=fromNumber
        this.texter= client(accountSid, authToken)
    }
    send= async(to:string, body:string, subject:string)=>new Promise<{}>((resolve, reject)=>{
        const message={body,from: this.fromNumber,to}
        this.texter.messages.create(message).then(()=>{
            resolve({ok:true})
        }).catch((error)=>{
            reject(error)
        })
    })

    sendTemplate =async(to:string, body:string, subject:string)=> this.send(to, body, subject)
}