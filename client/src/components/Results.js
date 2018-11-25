import React from "react";
import { Container, Footer, Row, Col, Card, Button} from "react-materialize";

const Results = props =>

    <Card className="z-depth-1">
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
          <br />
          <Button waves='light' className="blue">View Article</Button>
          </a>
          <Button waves='light' className="blue" onClick={() => props.handleSaveButton(props._id)}>Save</Button>
          </div>
      </h4>
      <p>Date Published: {props.date}</p>
    </Card>


export default Results;
