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

  // When the component mounts, get a list of all saved articles and update this.state.saved
  componentDidMount() {
    this.getSavedArticles()
  }

  // Method for getting saved articles (all articles) from the db
  getSavedArticles = () => {
    API.getArticle()
      .then((res) => {
        this.setState({ saved: res.data });
      });
  }

  // A helper method for rendering one search results div for each article
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

  // A helper method for rendering one div for each saved article
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

  // Keep track of what user types into topic input so that input can be grabbed later
  handleTopicChange = (event) => {
    this.setState({ topic: event.target.value });
  }

  // Keep track of what user types into topic input so that input can be grabbed later
  handleStartYearChange = (event) => {
    this.setState({ startYear: event.target.value });
  }

  // Keep track of what user types into topic input so that input can be grabbed later
  handleEndYearChange = (event) => {
    this.setState({ endYear: event.target.value });
  }

  // When the search form submits, perform NYT api search with user input
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

  // When save article button is clicked, add article to db
  handleSaveButton = (id) => {
    const findArticleByID = this.state.articles.find((el) => el._id === id);
    console.log("findArticleByID: ", findArticleByID);
    const newSave = {title: findArticleByID.headline.main, snippet: findArticleByID.snippet, date: findArticleByID.pub_date, url: findArticleByID.web_url};
    API.saveArticle(newSave)
    .then(this.getSavedArticles());
  }

  // When delete article button is clicked, remove article from db
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
              Use <span className="brandname">newsy</span> to dig deep into the New York Times archives to find everything on topic of your choice.
            </h4>
          </Card>
          {/* Search Form and Results Section */}
          <Card>

          <Search 
          handleTopicChange={this.handleTopicChange} 
          handleStartYearChange={this.handleStartYearChange} 
          handleEndYearChange={this.handleEndYearChange} 
          handleFormSubmit={this.handleFormSubmit} 
          renderArticles={this.renderArticles} />

          </Card>
          {/* Saved Articles Section */}
          <Card>

                    <h3>
                      <strong>
                        <i className="far fa-bookmark" aria-hidden="true" /> Saved Articles
                      </strong>
                    </h3>
                  <div className="card-body">
                    <ul className="list-group">{this.renderSaved()}</ul>
                  </div>

            </Card>
          <Footer
                  moreLinks={
                    <a className="grey-text text-lighten-4 right" href="https://rickknowlton.github.io/">© 2018 | Rick Knowlton</a>
                  }
                  className='blue lighten-1'>
                  <h5 className="white-text">About <span className="brandname">newsy</span></h5>
                  <p className="grey-text text-lighten-4"><span className="brandname">newsy</span> is a MERN stack application built to deliver and save articles on demand from the New York Times.</p>
                  <a className="grey-text text-lighten-3" href="https://www.github.com/rickknowlton/newsy"><i className="fab fa-github" aria-hidden="true" /> Checkout the Repo on Github</a>
          </Footer>
      </div>;
  }

}

export default Main;
