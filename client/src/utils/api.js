import axios from "axios";

const api = {
  // Query NYT API
  searchNYT: function(topic, startYear, endYear) {
    const API_KEY = 'b9f91d369ff59547cd47b931d8cbc56b:0:74623931';
    let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=`+API_KEY+`&q=`;
    
    queryURL += topic;

    if(startYear)
      queryURL += "&begin_date=" + startYear + "0101";

    if(endYear)
      queryURL += "&end_date=" + endYear + "0101";

    console.log(queryURL)
    
    return axios.get(queryURL);
  },
  // Retrieves saved articles from the db
  getArticle: function() {
    return axios.get("/api/saved");
  },
  // Saves a new article to the db
  saveArticle: function(articleObj) {
    return axios.post("/api/saved", articleObj);
  },
  // Deletes an article from the db
  deleteArticle: function(id) {
    return axios.delete(`/api/saved/${id}`);
  }
};

export default api;
