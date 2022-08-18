import './App.css';

import CollectionGallery from 'nft-collection-gallery';
import tokens from './tokens.json';

function App() {
  return (
    <div className="App">
      <CollectionGallery tokens={tokens} />
    </div>
  );
}

export default App;
