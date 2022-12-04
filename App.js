import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [hallOfFame, setHallOfFame] = React.useState([
        "---", "---","---","---","---"
        
    ]) 
    //localStorage.setItem('minCount', (count + ""))
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])
    
    React.useEffect(()=>{
        if(tenzies)
        {let i= 0
        const zeros = count <= 9? "00":"0"
        
        while (hallOfFame[i] && hallOfFame[i] != "---" && parseInt(hallOfFame[i]) < count){ i++}
        
        if (i < 5){
        hallOfFame.splice(i, 0, zeros+count)
        hallOfFame.splice(5, 1)
        setHallOfFame(hallOfFame)
        // setHallOfFame(arr)
        
        
        }}
        
    }, [tenzies])
    

    function generateNewDie() {
        return {
            value:Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        
        if(!tenzies) {
            setCount(count+1)
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            
            setCount(0)
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {value:die.value, id:die.id, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <div className = "cont">
            <div className = "counter">{count}</div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            </div>
            <div className =  "hof">
                <h3> Top 5 scores </h3>
                {hallOfFame.map(x => <div className = "scores"> {x} </div>)}
            </div>
            
        </main>
    )
}