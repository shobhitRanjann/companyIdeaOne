import App from '../App'
import { useState } from 'react'

function Colorrender() {
    const [color, setColor] = useState();
    const redButton = () => {
        <App  color="backgroundColor: red"/>
    }
  return (
    <div>
        <button type="button" onClick={redButton}>Red</button>
        <button type="button">Pink</button>
        <button type="button">Blue</button>
        <button type="button">Green</button>
        <button type="button">Yellow</button>
        <button type="button">Orange</button>
        <button type="button">Purple</button>
    </div>
  )
}

export default Colorrender