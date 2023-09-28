import React from "react";
import { Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { footerColOne, footerColTwo, footerColThree } from "../../data/myFooterData";
import { nanoid } from "nanoid";
import "./footer.css"

const Footer = () =>  {
   
        return (
            <Container>
                <Row>
                    <Col className="footer-costume">
                        {footerColOne.map((link) => (
                            <li key={nanoid()}>
                                <a href={link.href}>
                                    {link.label}
                                </a>
                            </li>
                        ))}

                    </Col>

                    <Col className="footer-costume">
                        {footerColTwo.map((link) => (
                            <li key={nanoid()}>
                                <a href={link.href}>
                                    {link.label}
                                </a>
                            </li>
                        ))}

                    </Col>

                    <Col className="footer-costume">
                        {footerColThree.map((link) => (
                            <li key={nanoid()}>
                                <a href={link.href}>
                                    {link.label}
                                </a>
                            </li>
                        ))}

                    </Col>

                </Row>
            </Container>
        )
    }

export default Footer
