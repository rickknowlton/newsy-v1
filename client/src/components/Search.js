import React from "react";
import { Container, Row, Col, Card, Button} from "react-materialize";


const Search = props =>
<div>
            <h3>
              <strong>
                <i className="fa fa-search" aria-hidden="true"></i> Search
              </strong>
            </h3>
            <form>
              <div className="form-group">
                <label htmlFor="topic">Topic</label>
                <input onChange={props.handleTopicChange} type="text" className="form-control" id="topic" aria-describedby="emailHelp" />
              </div>
              <div className="form-group">
                <label htmlFor="start-year">Start Year(YYYY)</label>
                <input onChange={props.handleStartYearChange} type="text" className="form-control" id="start-year" />
              </div>
              <div className="form-group">
                <label htmlFor="end-year">End Year(YYYY)</label>
                <input onChange={props.handleEndYearChange} type="text" className="form-control" id="end-year" />
              </div>
              <div className="button-wrapper right-align">
              <Button waves='light' onClick={props.handleFormSubmit} type="submit" className="blue right-align">Submit</Button>
              </div>
            </form>


    <br/><br/>

    <div className="row">
      <div className="col-lg-12">
            <h3>
              <strong>
                <i className="far fa-newspaper" aria-hidden="true"></i> Results
              </strong>
            </h3>
            {props.renderArticles()}
      </div>
    </div>
</div>

export default Search;
