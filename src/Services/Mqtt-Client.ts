import  MQTT, * as Paho from 'paho-mqtt'
import { v4 as uuidv4 } from 'uuid';


class MyMqttClient{
    client: MQTT.Client;
    registrations : { [id:string]: MqttRegistration;};

    constructor() {
        this.client = new MQTT.Client("192.168.2.253", Number(9001), "clientId");
        
        this.client.onConnectionLost = (responseObject:any)=>{
            if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost:" + responseObject.errorMessage);
              }
        };

        this.client.onMessageArrived = (message:any)=>{
            console.log("onMessageArrived:" + message.topic, message.payloadString);
            Object.keys(this.registrations).forEach(key =>{
                const obj = this.registrations[key];
                if (obj._topics.includes(message.topic))
                {
                    obj._callback(message.topic, message.payloadString)
                }
            });
            //TODO - at the moment - all callbacks are called for any topic
            // this.callbacks.forEach(callback => {
            //     callback(message.payloadString);
            // });
        }
      
        this.registrations = {};
        this.connect();
    }

    connect(){
        this.client.connect({onSuccess:()=>{
            console.log("onConnect");

            Object.keys(this.registrations).forEach(key =>{
                const val = this.registrations[key];
                val._topics.forEach(topic =>{
                    this.client.subscribe(topic);
                } );
            });
        }});
    }

    subscribe(topics:string[], callback:any):string{
        //TODO if connected - then we need to subscribe immediately
        const id = uuidv4();
        const reg = new MqttRegistration(topics, callback, id);
        this.registrations[id] = reg;
      
        return id;
    }

    unsubscribe(id: string){
        delete this.registrations[id];
    }

}

class MqttRegistration{
    constructor(public _topics:string[], public _callback:any, public _id:string) {}
}

export default new MyMqttClient();