function App() {
  const [quotes, setQuotes] = React.useState([]);
  const [randomQuote, setRandomQuote] = React.useState("");
  const [copiedQuote, setCopiedQuote] = React.useState("");

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
    navigator.clipboard.writeText(randomQuote.text);
    setCopiedQuote(randomQuote.text);
  };

  const handleFbTimelineShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      randomQuote.text
    )}`;

    window.open(fbUrl, "_blank");
  };

  return (
    <div className="container pt-5">
      <div className="jumbotron">
        <div className="card">
          <div className="card-header">Inspirational Quotes</div>
          <div className="card-body d-flex flex-row justify-content-between align-items-center">
            {randomQuote ? (
              <>
                <div>
                  <h5 className="card-title">- {randomQuote.author || "NO author"}</h5>
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
                  {copiedQuote === randomQuote.text ? "Copied!" : "Copy"}
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
