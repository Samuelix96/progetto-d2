import React, { useState, useContext} from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./card.css"
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import CommentArea from "../recommendation/CommentArea"
import CommentList from "../recommendation/CommentList"

import { PostProvider } from "../../Context/PostContext";




const LatestRelease = ({ img, title, category, price, info, asin,  elementId ,}) =>
{

    const [asincurrent, setAsinCurrent] = useState(asin);
    console.log( "sono l asin" , asincurrent);
    const [ selected, setSelected ] = useState(false);
    
    



    const changeState = () =>
    {
        setSelected(!selected)
    }

    return (

        <Card key={ nanoid() } className="card-book">
            <Card.Img
                onClick={ changeState }
                className={ `${ selected ? "myBorder" : "" }` }
                variant="top"
                src={ img } />
            <Card.Body className="card-size">
                <Card.Title>{ title }</Card.Title>
                <Card.Text>
                    { category }
                </Card.Text>
                <Card.Text>
                    { asin }
                </Card.Text>
                <Button variant="primary">{ price }€</Button>
                <Button
                    className="mx-2"
                    variant="success">
                    <Link className="  text-black link-underline link-underline-opacity-0 " to={ `/bookdetail/${ asin }` }>
                        { info }
                    </Link>
                </Button>
            </Card.Body>
            <Card.Body>
                { selected ? <CommentArea bookId = {asin } /> : ""}
            </Card.Body>
           
        </Card>



    )
}


export default LatestRelease;