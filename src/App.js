import React, { useState } from 'react';
import logo from './logo.svg';

import Icon from "./components/Icon"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardBody, Container, Col, Row } from 'reactstrap';
import './App.css';


const itemArray = new Array(9).fill("empty")
const App = () => {

  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty");
   const boxArr =  document.getElementsByClassName("box");
    for(let i=0; i<boxArr.length; i++){
      boxArr[i].classList.remove("circle");
      boxArr[i].classList.remove("cross");
    }
  }

  const checkIsWinner = () => {
    if(itemArray[0] === itemArray[1] && 
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"){
      setWinMessage(`${itemArray[0]} wins`);
      }
      if(itemArray[3] === itemArray[4] && 
        itemArray[3] === itemArray[5] &&
        itemArray[3] !== "empty"){
        setWinMessage(`${itemArray[3]} wins`);
        }
      if(itemArray[6] === itemArray[7] && 
        itemArray[6] === itemArray[8] &&
        itemArray[6] !== "empty"){
        setWinMessage(`${itemArray[6]} wins`);
        }
      if(itemArray[0] === itemArray[3] && 
        itemArray[0] === itemArray[6] &&
        itemArray[0] !== "empty"){
        setWinMessage(`${itemArray[0]} wins`);
        }
      if(itemArray[1] === itemArray[4] && 
        itemArray[1] === itemArray[7] &&
        itemArray[1] !== "empty"){
        setWinMessage(`${itemArray[1]} wins`);
        }
      if(itemArray[2] === itemArray[5] && 
        itemArray[2] === itemArray[8] &&
        itemArray[2] !== "empty"){
        setWinMessage(`${itemArray[2]} wins`);
        }
      if(itemArray[0] === itemArray[4] && 
        itemArray[0] === itemArray[8] &&
        itemArray[0] !== "empty"){
        setWinMessage(`${itemArray[0]} wins`);
        }
      if(itemArray[2] === itemArray[4] && 
        itemArray[2] === itemArray[6] &&
        itemArray[2] !== "empty"){
        setWinMessage(`${itemArray[2]} wins`);
        }
  }

  const changeItem = itemNumber => {
    if(winMessage){
      return toast(winMessage, {type: "success"});
    }
    if(itemArray[itemNumber] === "empty"){
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
      if(itemArray[itemNumber] === "circle"){
       document.getElementsByClassName("box")[itemNumber].classList.add("circle");
      }
     else if(itemArray[itemNumber] === "cross"){
      document.getElementsByClassName("box")[itemNumber].classList.add("cross");
      }
    }
    else{
      return toast("Already filled",{type: "error"});
    }
    checkIsWinner();
  }

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
        <Row>
          <Col md={6} className="offset-md-3">
            {winMessage ? (
              <div className="mb-2 mt-2">
                <h1 className="text-success text-uppercase text-center">
                  {winMessage}
                </h1>
                <Button color="success" block onClick={reloadGame}>
                Reload the game
                </Button>
                </div>
            ) : (
              <h1 className="text-center text-warning">
                {isCross ? "Cross" : "Circle"} turns
              </h1>
            )}
            <div className="grid">
              {itemArray.map((item, index) => (
                <Card key={index} onClick={() => changeItem(index)}>
                  <CardBody className="box">
                    <Icon name={item} className="icon"/>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
    </Container>
  );
}

export default App;
