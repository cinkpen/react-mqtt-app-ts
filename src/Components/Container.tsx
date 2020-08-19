import React, { useState, useEffect } from 'react'
import mqttClient from '../Services/Mqtt-Client';
import CPUTemperatureRenderer from './CPUTemperature-Renderer';

interface IContainer {
}

const Container = (props: IContainer) => {

  const [value, setValue] = useState(0);

  useEffect(() => {
    const handleValueChange = (topic:string, newValue: number) => setValue(newValue);
    const subscribeId = mqttClient.subscribe(["home/cluster1-1/metric/cputemp"], handleValueChange);

    return () => {
      mqttClient.unsubscribe(subscribeId);
    }
  });

  return (<div>
    <CPUTemperatureRenderer Value={value} />
  </div>);
};

export default Container;