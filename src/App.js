import './App.css';
import React from "react";
import { createBrowserHistory } from 'history';


export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
});

// eslint-disable-next-line no-undef

async function getQuotesFromApi() {
    try {
        let response = await fetch('https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
        let responseJson = await response.json();
        return responseJson.quotes;
    } catch(error) {
        console.error(error);
    }
}

let quoteList = [{quote: '', author: ''}];



const colorList = [
    "#8BD3E6",
    "#FF6D6A",
    "#b2b33c",
    "#EFBE7D",
    "#B1A2CA",
]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        quote: 'default quote',
        author: 'default author',
        color: '#00beef',
        colorCounter: 0,
    }
    this.changeQuoteAndBackground = this.changeQuoteAndBackground.bind(this);
  }

    componentDidMount() {
        console.log('compo')

        getQuotesFromApi().then(
            value => {
                quoteList = value;
                const quote = quoteList[Math.floor(Math.random() * quoteList.length)];
                this.setState({
                    quote: quote.quote,
                    author: quote.author,
                })
            },
            () => (quoteList = [{quote: 'An error occurred.', author: ''}])
        );


    }

    changeQuoteAndBackground() {
      // Change Quote
      const quote = quoteList[Math.floor(Math.random() * quoteList.length)];
      this.setState({
          quote: quote.quote,
          author: quote.author,
        })
      this.setState({color: colorList[this.state.colorCounter % colorList.length]});
      this.setState({colorCounter: this.state.colorCounter + 1});

  }

  render() {
      let styleBg = {backgroundColor: this.state.color, fontColor: 'aliceblue'};
      let styleFg = {color: this.state.color};
      return (
          <div id="page" style={styleBg}>
              <div id="quote-box">
                  <blockquote id="text" style={styleFg}>{this.state.quote}</blockquote>
                  <p id="author" style={styleFg}>{this.state.author}</p>
                  <div id="buttons">
                      <span id="share">
                         <a id="tweet-quote" rel="noopener noreferrer" target="_blank" href={"https://twitter.com/intent/tweet?hashtags=quotes&text=\""+this
                             .state.quote.split(' ').join('+')+"\"+"+this.state.author.split(' ').join('+')} style={styleBg}>
                            <i className="fa-brands fa-twitter"></i>
                         </a>
                      </span>
                      <button id="new-quote" onClick={this.changeQuoteAndBackground} style={styleBg}>New Quote</button>
                  </div>
              </div>
          </div>
      );
  }
}

export default App;
