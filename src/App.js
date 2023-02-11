
import './App.css';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import SingleCard from './component/SingleCard';
// make an array of card cause the card are constant that will never chaneg
const cardImages = [
  {"src":"/img/helmet-1.png", matched: false},
  {"src":"/img/potion-1.png",matched: false},
  {"src":"/img/ring-1.png",matched: false},
  {"src":"/img/scroll-1.png",matched: false},
  {"src":"/img/shield-1.png",matched: false},
  {"src":"/img/sword-1.png",matched: false}
]
function App() {
  const [cards, setCards] = useState([]) // used to store card state
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  // shuffle card using sort methjod 
  const shuffleCards = ()=>{
    const shuffleCard = [...cardImages, ...cardImages]
    // if value is greater than 0 its swap else it remain unchanged
      .sort(()=> Math.random() - 0.5)
      .map((card)=> ({...card, id: Math.random()}))
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
    setCards(shuffleCard)
    setTurns(0)

  }
  const handleChoice = (card)=>{
    choiceOne ? setChoiceTwo(card): setChoiceOne(card)
    // if (choiceOne.src == choiceTwo.src)
  }
  // now how to compare two selected item 
  useEffect(()=>{
    
    if (choiceOne && choiceTwo){ // true when both have an value
      setDisabled(true)
      // now compare using src property
      if (choiceOne.src === choiceTwo.src){
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if (card.src === choiceOne.src){
              return {...card, matched : true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }
      else{
        setTimeout(()=> resetTurn(), 1000)
      }

    }
  },[choiceOne, choiceTwo])
 // start a new game automatically
 useEffect(()=>{
  shuffleCards()
 },[])
  // reset the choice and increase the turn
  const resetTurn = () =>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns (prevTurn => prevTurn+1)
    setDisabled(false)
  }
  
  return (
    <div className="app">
     <h1>Magic Match</h1>
     <Button onClick={shuffleCards}>New Game</Button>
     <div className='card-grid'>
      {cards.map((card)=>(
          <SingleCard 
            key={card.id} 
            card ={card} 
            handleChoice ={handleChoice}
            flipped = {card === choiceOne|| card === choiceTwo || card.matched}  
            disabled = {disabled}
          />
        ))}
     </div>
     <p>Turns:{turns}</p>
    </div>
  );
}

export default App;
