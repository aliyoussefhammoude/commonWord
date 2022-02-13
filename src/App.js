import React, { useState } from 'react';
  
function App() {

    const [state, setState] = useState('');
    const [mestord, setMestord] = useState('');
   
    const upload = () => {
        const input = document.getElementsByClassName('texten');
        // const textarea = document.getElementsByClassName('visas');


        let files =  input[0].files;

        const file = files[0];
        
        let reader = new FileReader();

    
            reader.onload = (event) => {
                const file = event.target.result;

                const commonWord =  getMax(file);

                const result = file.split(commonWord).join(`foo${commonWord}bar`);

                setState({body: result});
            }

        reader.readAsText(file);
    }


    const getMax = (str) => {

        var wordCounts = {};
        var words = str.match(/[a-z'\-]+/gi);

        for(var i = 0; i < words.length; i++) {
            wordCounts[words[i]] = (wordCounts[words[i]] || 0) + 1;
        }

        var sortable = [];

        for (var word in wordCounts) {
            sortable.push([word, wordCounts[word]]);
        }
    
        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        const mostCommonWord = sortable[0][0];
        console.log(sortable)
        

        setMestord({body: mostCommonWord});
        
        return mostCommonWord;
   };

   const handleSubmit = (e) => e.preventDefault()
  
    return (
      <div>
        <h1>React TextArea - highlight the most common  word with 'foo' + commonWord + 'bar'</h1>
        <form onSubmit={handleSubmit}>
            <input className='texten' type="file" onChange={upload}/>
                <textarea className='visas' cols="100" rows="30" 
                        placeholder="text will appear here" value={state.body}>
                </textarea>
                <h2>Most used word is: {mestord.body}</h2>
        </form>
      </div>
    );
  
}

  
export default App;