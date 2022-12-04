import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    const dots = []
    for(let i = 0; i < props.value; i++){
            dots.push(<p key = {i} className = "dot" >⏺</p>)
            
        }
    let val = "dots " + "dots-"+props.value
    
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <div className={val}>{dots}</div>
        </div>
    )
}