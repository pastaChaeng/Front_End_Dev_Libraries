function App() {
  const [quotes, setQuotes] = React.useState([]);
  const [randomQuote, setRandomQuote] = React.useState("");
  const [copiedQuote, setCopiedQuote] = React.useState("");
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://type.fit/api/quotes/");
      const data = await response.json();

      setQuotes(data);
      let randIndex = Math.floor(Math.random() * data.length);
      setRandomQuote(data[randIndex]);
    }
    fetchData();
  }, []);

  const getNewQuote = () => {
    let randIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randIndex]);
    setCopiedQuote("");
  };

  const handleCopy = () => {
    const quoteWithAuthor = `- ${randomQuote.author || "Unknown Author"}: ${randomQuote.text}`;
    navigator.clipboard.writeText(quoteWithAuthor);
    setCopiedQuote("Copied!");
  };

  const handleFbTimelineShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      randomQuote.text
    )}`;

    window.open(fbUrl, "_blank");
  };

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`container pt-5 ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="toggle-button" onClick={handleModeToggle}>
        <i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"}`}></i>
      </div>
      <div className="jumbotron">
        <div className="card">
          <div className={`card-header ${isDarkMode ? "bg-dark text-white" : "bg-light"}`}>
            Inspirational Quotes
          </div>
          <div className="card-body d-flex flex-row justify-content-between align-items-center">
            {randomQuote ? (
              <>
                <div>
                  <h5 className="card-title">- {randomQuote.author || "Unknown Author"}</h5>
                  <p className="card-text">&quot;{randomQuote.text}&quot;</p>
                </div>
              </>
            ) : (
              <h2>Loading</h2>
            )}
            <div className="d-flex">
              <div className="mr-2">
                <button className="btn btn-primary" onClick={getNewQuote} style={{ backgroundColor: '#0c0c0c' }}>
                  New Quote
                </button>
              </div>
              <div className="mr-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${randomQuote.text}`}
                  className="btn btn-warning"
                  style={{ backgroundColor: '#0c0c0c', color: 'white' }}
                >
                  <i className="fa fa-twitter"> </i>
                </a>
              </div>
              <div className="mr-2">
                <button className="btn btn-info" onClick={handleFbTimelineShare} style={{ backgroundColor: '#0c0c0c', color: 'white' }}>
                  <i className="fa fa-facebook"></i>
                </button>
              </div>
              <div>
                <button className="btn btn-success" onClick={handleCopy} style={{ backgroundColor: '#0c0c0c', color: 'white' }}>
                  {copiedQuote === "Copied!" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
