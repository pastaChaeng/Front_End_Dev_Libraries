function App(){

    const [quotes, setQuotes] = React.useState([]);
    const [randomQuote, setRandomQuotes] = React.useState([]);

    React.useEffect(() =>{
    async function fetchData(){
        const response = await fetch("https://type.fit/api/quotes/")
        const data = await response.json();

        setQuotes(data);
        let randIndex = Math.floor(Math.random() * data.length);
        setRandomQuote(data[randIndex])
    }   
    fetchData();
    }, [])

    const getNewQuote = () => {
        let randIndex = Math.floor(Math.random() * quotes.length);
        setRandomQuote(data[randIndex])
    }

    return (
    <div className="container pt-5">
        <div className="jumbotron">
            <div className="card">
            <div className="card-header">Taylor's Quote</div>
            <div className="card-body">
                {randomQuote ? (
                    <>
                    <h5 className="card-title">- {randomQuote.author || "NO author"}</h5>
                    <p className="card-text">&qout;{randomQuote.text}&qout;</p>
                  </>
                ):(
                    <h2>Loading</h2>
                )}
                <div className="row">
                    <button onCLick={getNewQuote} className="btn btn-primary ml-3">New Quote</button>
                    <a href=""></a>
                    <a href=""></a>

            </div>
        </div>
        </div>
        </div>
       hello
    </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('app'))