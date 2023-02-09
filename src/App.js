
import './App.css';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
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
  // shuffle card using sort methjod 
  const shuffleCards = ()=>{
    const shuffleCard = [...cardImages, ...cardImages]
    // if value is greater than 0 its swap else it remain unchanged
      .sort(()=> Math.random() - 0.5)
      .map((card)=> ({...card, id: Math.random()}))

    setCards(shuffleCard)
    setTurns(0)

    
  }
  console.log(cards, turns)
 
  
  return (
    <div className="app">
     <h1>Magic Match</h1>
     <Button onClick={shuffleCards}>New Game</Button>
    </div>
  );
}

export default App;
