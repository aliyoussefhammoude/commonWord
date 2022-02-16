import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { storage } from "../firebase"
import '../styles/style.css';


function FirebaseUpload() {

  //here is the states created for changing the value of textBody and most common word later on
    const [bodyState, setBodyState] = useState('');
    const [mostUsedWord, setmostUsedWord] = useState('');
    const [progress, setProgress] = useState(0);

    //here we take out the actual file to use it in the uploadFile function
    const formHandler = (e) => {
      e.preventDefault();
      const file = e.target[0].files[0];
      uploadFiles(file);
    };
    

    //when we get the URL from Firebase we wanna display the content, this function
    //takes the value of the URL and shows us the content
    function httpGet(theUrl) {
        let xmlhttp;
        
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        } 
        
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                return xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", theUrl, false);
        xmlhttp.send();
        
        return xmlhttp.response;
    }


    //this function uploads the file to the Firebase storage
    const uploadFiles = (file) => {
      if(!file) return;

      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed", 
        (snapshot) => {
          const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setProgress(prog);
        }, 
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
            const val = httpGet(url);
            const commonWord =  getTheMostUsedWord(val);
            const result = val.split(commonWord).join(`foo${commonWord}bar`);
            //here we update the state so that the textArea shows the text from the file.
            setBodyState({body: result})
          });
        }
      );
    };
   
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
        
        //check if there is equal amount of words, then let the user try again
        if(checkForDuplicates(sortable[0][0])) return alert("Can't solve it, found equal amount of words! Try again")

        //when we have the most used word we display it abode the textArea to highlight it
        setmostUsedWord({body: mostCommonWord});
        
        return mostCommonWord;
   };


   function checkForDuplicates(array) {
    let valuesAlreadySeen = []
  
    for (let i = 0; i < array.length; i++) {
      let value = array[i]
      if (valuesAlreadySeen.indexOf(value) !== -1) {
        return true
      }
      valuesAlreadySeen.push(value)
    }
    return false
  }

  
    return (
      <div className="container"> 
        <div className="containerArea">
            <form onSubmit={formHandler}>
                <input className='chooseFile' type="file"/>
                <button className='uploadBtn noselect' type="submit">Upload to database</button>
                <h3>Uploaded {progress} %</h3>
                <h2>Most used word is: <span className='spanWord'>{mostUsedWord.body}</span></h2>
                    <textarea className='displayText textinput' cols="100" rows="30" 
                            placeholder="text will appear here" value={bodyState.body}>
                    </textarea>
            </form>
        </div>
      </div>
    );
  
}

  
export default FirebaseUpload;