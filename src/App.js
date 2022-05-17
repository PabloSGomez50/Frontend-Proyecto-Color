
import './App.css';
import './components/Main.css';
import Navbar from './components/NavBar';
import Banner from './components/Banner';




function App() {
  return (
    <div className="App">
      <Navbar />
      
      <main>
      <Banner />
      </main>
    </div>
  );
}

export default App;
