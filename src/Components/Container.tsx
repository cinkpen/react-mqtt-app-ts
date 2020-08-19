import React, { useState, useEffect } from 'react'
import mqttClient from '../Services/Mqtt-Client';
import CPUTemperatureRenderer from './CPUTemperature-Renderer';

interface IContainer {
}

const Container = (props: IContainer) => {

  const [temp1, setTemp1] = useState<undefined | number>(undefined);
  const [temp2, setTemp2] = useState<undefined | number>(undefined);

  useEffect(() => {
    const handleValueChange = (topic:string, newValue: number) => {
      switch (topic){
        case "home/cluster1-1/metric/cputemp": 
          setTemp1(newValue);
          break
        case "home/pi0-server2/metric/cputemp":
          setTemp2(newValue);
          break;
      }
      
    };
    const subscribeId = mqttClient.register(["home/cluster1-1/metric/cputemp", "home/pi0-server2/metric/cputemp"], handleValueChange);

    return () => {
      mqttClient.unsubscribe(subscribeId);
    }
  });

  return (<div>
    <CPUTemperatureRenderer Value={temp1} />
    <CPUTemperatureRenderer Value={temp2} />
  </div>);
};

export default Container;