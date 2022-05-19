
import './App.css';
import './components/banner.css';
import './components/topics.css';
import './components/publication.css';
import Navbar from './components/NavBar';
import Banner from './components/Banner';
import Topics from './components/Topics';
import Publication from './components/Publication'


function App() {
  return (
    <div className="App">
      <Navbar/>
      
      <main>
      <Banner />
      <Topics/>
      <Publication/>
      </main>
    </div>
  );
}

export default App;
