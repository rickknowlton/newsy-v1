import React from "react";
import { Container, Footer, Row, Col, Card, Button} from "react-materialize";


const Saved = props =>
  <Card>
    <li>
      <h4>
       <span className="article-title">
          <em>{props.title}</em>
        </span>
        <p>
        <span className="article-snippet">
          {props.snippet}
        </span>
        </p>
        <div className="button-wrapper right-align">
          <a href={props.url} target="_blank">
            <Button waves='light' className="blue">View Article</Button>
          </a>
          <Button waves='light' className="blue" onClick={() => props.handleDeleteButton(props._id)}>Delete</Button>
        </div>
      </h4>
      <p>Date Published: {props.date}</p>
    </li>
  </Card>

export default Saved;
