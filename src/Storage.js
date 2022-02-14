import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { storage } from "./firebase"

function Storage() {

    const [state, setState] = useState('');
    const [mestord, setMestord] = useState('');
    const [progress, setProgress] = useState(0);


    const formHandler = (e) => {
      e.preventDefault();
      const file = e.target[0].files[0];
      uploadFiles(file);
    };
    

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
            const commonWord =  getMax(val);
            const result = val.split(commonWord).join(`foo${commonWord}bar`);
            setState({body: result})
          });
        }
      );
    };
   

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
        // console.log(sortable)
        

        setMestord({body: mostCommonWord});
        
        return mostCommonWord;
   };


  
    return (
      <div>
        <h1>React TextArea - highlight the most common </h1>
        <h1> word with 'foo' + commonWord + 'bar'</h1>
        <form onSubmit={formHandler}>
            <input className='texten' type="file"/>
            <button type="submit">Upload to database</button>
                <textarea className='visas' cols="100" rows="30" 
                        placeholder="text will appear here" value={state.body}>
                </textarea>
                <h2>Most used word is: {mestord.body}</h2>
        </form>



        <h3>Uploaded {progress} %</h3>
      </div>
    );
  
}

  
export default Storage;