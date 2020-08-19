import React from 'react'

/*
Use the hook here
*/

export interface ICPUTemperatureRenderer {
   Value:number
  } ;


const CPUTemperatureRenderer = (props:ICPUTemperatureRenderer) =>{

    return <>This will display the latest value: {props.Value}</>;
};

export default CPUTemperatureRenderer;