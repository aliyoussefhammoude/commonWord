
import './App.css';

function App() {
  return (
    <div>
        <h1>React TextArea - highlight the most common  word with 'foo' + commonWord + 'bar'</h1>
        <form >
            <input className='texten' type="file" />
            <textarea className='visas' cols="100" rows="30" 
                    placeholder="text will appear here" >
            </textarea>
            <h2>Most used word is: </h2>
        </form>
    </div>
  );
}

export default App;
