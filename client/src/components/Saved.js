import React from "react";
import { Container, Footer, Row, Col, Card, Button} from "react-materialize";


const Saved = props =>
<div className="row">
<div className="col-lg-12">
  <Card>
    <li>
      <h4>
       <span className="article-title">
            {props.title}
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
        </div>
        </div>

export default Saved;
