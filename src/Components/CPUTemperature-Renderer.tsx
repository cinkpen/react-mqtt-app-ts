import React from 'react'
import { stringify } from 'uuid';

export interface ICPUTemperatureRenderer {
   Value?:number
  } ;


const CPUTemperatureRenderer = (props:ICPUTemperatureRenderer) =>{
  const toDisplay  = (props.Value === undefined?"unknown":props.Value.toString());
    return <div className="live-value">{toDisplay}</div >;
};

export default CPUTemperatureRenderer; 