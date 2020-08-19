import  MQTT, * as Paho from 'paho-mqtt'

class MyMqttClient{
    client: MQTT.Client;
    topics:string[];
    callbacks: any[];
    
    constructor() {
        this.client = new MQTT.Client("192.168.2.253", Number(9001), "clientId");
        
        this.client.onConnectionLost = (responseObject:any)=>{
            if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost:" + responseObject.errorMessage);
              }
        };

        this.client.onMessageArrived = (message:any)=>{
            console.log("onMessageArrived:" + message.payloadString);

            //TODO - at the moment - all callbacks are called for any topic
            this.callbacks.forEach(callback => {
                callback(message.payloadString);
            });
        }
        this.topics = [];
        this.callbacks = [];
        this.connect();
    }

    connect(){
        this.client.connect({onSuccess:()=>{
            console.log("onConnect");
            this.topics.forEach(topic => {
                this.client.subscribe(topic);
            });
        }});
    }

    subscribe(topic:string, callback:any){
        //TODO if connected - then we need to subscribe immediately
        this.topics.push(topic);
        this.callbacks.push(callback);
    }

    unsubscribe(topic:string, callback:any){
        //TODO remove subscription from topics and callbacks
    }

}


export default new MyMqttClient();