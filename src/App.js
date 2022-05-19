
import './App.css';
import './components/banner.css';
import './components/topics.css';
import Navbar from './components/NavBar';
import Banner from './components/Banner';
import Topics from './components/Topics';



function App() {
  return (
    <div className="App">
      <Navbar/>
      
      <main>
      <Banner />
      <Topics/>
      </main>
    </div>
  );
}

export default App;
