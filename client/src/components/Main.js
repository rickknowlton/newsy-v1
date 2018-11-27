import React, { Component } from "react";
import { Container, Footer, Row, Col, Card, Button} from "react-materialize";
import Saved from "./Saved";
import Search from "./Search";
import Results from "./Results";
import API from "../utils/api";

class Main extends Component {

  state = {
    topic: "",
    startYear: "",
    endYear: "",
    articles: [],
    saved: []
  };

  componentDidMount() {
    this.getSavedArticles()
  }

  getSavedArticles = () => {
    API.getArticle()
      .then((res) => {
        this.setState({ saved: res.data });
      });
  }

  renderArticles = () => {
    return this.state.articles.map(article => (
      <Results
        _id={article._id}
        key={article._id}
        title={article.headline.main}
        snippet={article.snippet}
        date={article.pub_date}
        url={article.web_url}
        handleSaveButton={this.handleSaveButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  renderSaved = () => {
    return this.state.saved.map(save => (
      <Saved
        _id={save._id}
        key={save._id}
        title={save.title}
        snippet={save.snippet}
        date={save.date}
        url={save.url}
        handleDeleteButton={this.handleDeleteButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  handleTopicChange = (event) => {
    this.setState({ topic: event.target.value });
  }

  handleStartYearChange = (event) => {
    this.setState({ startYear: event.target.value });
  }

  handleEndYearChange = (event) => {
    this.setState({ endYear: event.target.value });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Getting NYT Articles");
    console.log("this.state.topic: ", this.state.topic);
    console.log("this.state.startYear: ", this.state.startYear);
    console.log("this.state.endYear: ", this.state.endYear);
    API.searchNYT(this.state.topic, this.state.startYear, this.state.endYear)
      .then((res) => {
        this.setState({ articles: res.data.response.docs });
        console.log("this.state.articles: ", this.state.articles);
      });
  }

  handleSaveButton = (id) => {
    const findArticleByID = this.state.articles.find((el) => el._id === id);
    console.log("findArticleByID: ", findArticleByID);
    const newSave = {title: findArticleByID.headline.main, snippet: findArticleByID.snippet, date: findArticleByID.pub_date, url: findArticleByID.web_url};
    API.saveArticle(newSave)
    .then(this.getSavedArticles());
  }

  handleDeleteButton = (id) => {
    API.deleteArticle(id)
      .then(this.getSavedArticles());
  }

  render() {
    return <div className="container">
          <Card>
            <h1 className="center-align">
              <strong>newsy.</strong>
            </h1>
            <h4 className="center-align">
              Use <span className="brandname">newsy</span> to dig deep into the New York Times archives to find everything on the topic of your choice.
            </h4>
          </Card>

          <Card>
          <Search 
          handleTopicChange={this.handleTopicChange} 
          handleStartYearChange={this.handleStartYearChange} 
          handleEndYearChange={this.handleEndYearChange} 
          handleFormSubmit={this.handleFormSubmit} 
          renderArticles={this.renderArticles} />
          </Card>

          <Card>
                    <h3>
                      <strong>
                        <i className="far fa-bookmark" aria-hidden="true" /> Saved Articles
                      </strong>
                    </h3>
                  <div>
                    <ul>{this.renderSaved()}</ul>
                  </div>
          </Card>

          <Footer
                  moreLinks={
                    <a className="grey-text text-lighten-4 right" href="https://rickknowlton.github.io/">© 2018 | Rick Knowlton</a>
                  }
                  className='blue lighten-1'>
                  <h5 className="white-text">About <span className="brandname">newsy</span></h5>
                  <p className="grey-text text-lighten-4"><span className="brandname">newsy</span> is a MERN stack application built to deliver and save articles on demand from the New York Times.</p>
                  <a className="grey-text text-lighten-3" href="https://www.github.com/rickknowlton/newsy"><i className="fab fa-github" aria-hidden="true" /> Check out the Repo on Github</a>
          </Footer>
      </div>;
  }

}

export default Main;
