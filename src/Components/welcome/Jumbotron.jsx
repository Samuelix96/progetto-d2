import React from "react";
import { Container } from "react-bootstrap";

const  Jumbotron = (title, firstPar,secondPar) =>  {
   
        return (
            <Container className="text-center  ">
                <div class="jumbotron">
                    <h1 class="display-1">Don't Open That Book</h1>
                    <p class="lead">A catalog full of books to read and browse that will make you shiver</p>

                    <p>Famous novels and surreal stories that will make your blood run cold</p>
                    
                </div>
            </Container>
        )
    }

export default Jumbotron