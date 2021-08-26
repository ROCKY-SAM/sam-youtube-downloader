import './App.css';
import { useState } from 'react';

function App() {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);
  const [searchInfo, setSearchInfo] = useState("");

  const handleSearch =  (value) => {
    setSearch(value);
    if(value){
      setSearchInfo(value.includes('v=')?value.split("v=")[1].split("&")[0]:"");
    }
  }

  const loadLinks = async (value) =>{
    console.log(value)
    let endpoint="";
    if(value =="Audio"){
      endpoint = `https://api.vevioz.com/@api/button/mp3/${searchInfo}`;
    }else if(value == "Video"){
      endpoint = `https://api.vevioz.com/@api/button/videos/all/${searchInfo}`;
    }
    let finalUrl = `<iframe src="${endpoint}" scrolling="no" class="downloadFrame"></iframe>`;
    setResults(finalUrl);
  }

  return (
    <div >

      <div className="card-container">
        {/* <span class="pro">PRO</span> */}
        <h6>Sam's YTube Downloader</h6>

        {(searchInfo) ? 
        <iframe className='video'
        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
        src={`https://www.youtube.com/embed/${searchInfo}`}>
        </iframe>
        : ''}

        <p className="textInput">
          <input
            type="search"
            placeholder="Paste your youTube link here"
            value={search}
            onChange={e => handleSearch(e.target.value)} />
        </p>


        <div className="buttons">
          <button className="primary" onClick={() => loadLinks('Audio')}>
            Audio
          </button>
          <button className="primary" onClick={() => loadLinks('Video')}>
            Video
          </button>
        </div>

       

        <div className="skills">
          {(results)?<h3>Available Types</h3>:""}
          <div dangerouslySetInnerHTML= {{ __html:results }}/></div>
      </div>

    </div>
  );
}

export default App;
