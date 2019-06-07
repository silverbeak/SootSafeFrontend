import React from 'react'
import ductFan from '../../../assets/images/icons/cooling-fan.svg'
import explosion from '../../../assets/images/icons/explosion.svg'

const iconSize = {
    height: '1.9em',
}

export const DuctFan = () => {
    return <img style={iconSize} src={ductFan} alt="fan icon"></img>
}

export const Explosion = () => {
    return <img style={iconSize} src={explosion} alt="explosion icon"></img>
}