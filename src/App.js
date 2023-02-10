
import './App.css';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import SingleCard from './component/SingleCard';
// make an array of card cause the card are constant that will never chaneg
const cardImages = [
  {"src":"/img/helmet-1.png"},
  {"src":"/img/potion-1.png"},
  {"src":"/img/ring-1.png"},
  {"src":"/img/scroll-1.png"},
  {"src":"/img/shield-1.png"},
  {"src":"/img/sword-1.png"}
]
function App() {
  const [cards, setCards] = useState([]) // used to store card state
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  // shuffle card using sort methjod 
  const shuffleCards = ()=>{
    const shuffleCard = [...cardImages, ...cardImages]
    // if value is greater than 0 its swap else it remain unchanged
      .sort(()=> Math.random() - 0.5)
      .map((card)=> ({...card, id: Math.random()}))

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
      // now compare using src property
      if (choiceOne.src === choiceTwo.src){
        console.log("The selected item match ")
        resetTurn()
      }
      else{
        console.log("The item didnt match")
        resetTurn()
      }

    }
  },[choiceOne, choiceTwo])
  // console.log(cards, turns)
  // reset the choice and increase the turn
  const resetTurn = () =>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns (prevTurn => prevTurn+1)
  }
  
  return (
    <div className="app">
     <h1>Magic Match</h1>
     <Button onClick={shuffleCards}>New Game</Button>
     <div className='card-grid'>
      {cards.map((card)=>(
          <SingleCard key={card.id} card ={card} handleChoice ={handleChoice}/>
        ))}
     </div>
    </div>
  );
}

export default App;
