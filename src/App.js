import { Route, Routes } from 'react-router';
import './App.scss';
import KeywordCaptionizer from './component/KeywordCaptionizer/KeywordCaptionizer'; 
// import ImageUploader from './component/ImageUploader/ImageUploader'
// import Body from './component/body/body';
import AppHeader from './component/AppHeader/AppHeader';
// import Keyword from './component/keyword/keyword';
// import Photo from './component/photo/photo';
// import Random from './component/random/random';
import ImageCaptionizer from './component/ImageCaptionizer/ImageCaptionizer';

function App() {
  return (
    <div className="app">
      <div className = 'hero'>
        <div className = 'cube'></div>
        <div className = 'cube'></div>
        <div className = 'cube'></div>
        <div className = 'cube'></div>
        <div className = 'cube'></div>
        <div className = 'cube'></div>
      </div>
      {/* <img className = 'logo' src = {logo}/> */}
      <AppHeader />
      {/* <p className='app-p'><bold>Captionizer: </bold> Automated caption suggestions</p> */}
      <Routes>
        {/* <Route path='/photo' element={<Photo />}></Route>
        <Route path='/keyword' element={<Keyword></Keyword>}></Route>
        <Route path='/random' element={<Random></Random>}></Route> */}
        {/* <Route path='/' element={}></Route> */}
        <Route path='/' element={<ImageCaptionizer></ImageCaptionizer>}></Route>
        <Route path='/keyword' element = {<KeywordCaptionizer></KeywordCaptionizer>}></Route>
      </Routes>
    </div >
  );
}

export default App;
