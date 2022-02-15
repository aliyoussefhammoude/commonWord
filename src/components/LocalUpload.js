import React, { useState } from 'react';
import '../styles/style.css';
  
function LocalUpload() {

    //here is the states created for changing the value of textBody and most common word later on
    const [bodyState, setBodyState] = useState('');
    const [mostUsedWord, setmostUsedWord] = useState('');
   
    //the upload function here takes the file locally, reads it, and changed the bodyState to the value of the file
    //which displays the text
    const upload = () => {
        const input = document.getElementsByClassName('chooseFile');
        // const textarea = document.getElementsByClassName('displayText');

        let files =  input[0].files;

        const file = files[0];
        
        let reader = new FileReader();
    
            reader.onload = (event) => {
                const file = event.target.result;
                //here we use the getTheMostUsedWord function to take out the most used word
                const commonWord =  getTheMostUsedWord(file);

                const result = file.split(commonWord).join(`foo${commonWord}bar`);

                setBodyState({body: result});
            }

        reader.readAsText(file);
    }


    //this function get the most used word
    const getTheMostUsedWord = (str) => {

        let wordCounts = {};
        let words = str.match(/[a-z'\-]+/gi);

        for(let i = 0; i < words.length; i++) {
            wordCounts[words[i]] = (wordCounts[words[i]] || 0) + 1;
        }

        let sortable = [];

        for (let word in wordCounts) {
            sortable.push([word, wordCounts[word]]);
        }
    
        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        const mostCommonWord = sortable[0][0];
        console.log(sortable)
        
        //here we check if we have the same amount of word then throw an Error alert
        if(sortable[0][1] == sortable[1][1]) return alert("Can't solve it, same amount of words! Try again")

        //when we have the most used word we display it abode the textArea to highlight it
        setmostUsedWord({body: mostCommonWord});
        
        return mostCommonWord;
   };

   const handleSubmit = (e) => e.preventDefault()
  
    return (
      <div className='container'> 
        <div className='containerArea'>
          <form onSubmit={handleSubmit}>
              <input className='chooseFile' type="file" onChange={upload}/>
              <h2>Most used word is: {mostUsedWord.body}</h2>
                  <textarea className='displayText textinput' cols="100" rows="30" 
                          placeholder="text will appear here" value={bodyState.body}>
                  </textarea>
          </form>
        </div>
      </div>
    );
  
}

  
export default LocalUpload;