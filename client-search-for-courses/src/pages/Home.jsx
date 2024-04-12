import {useState} from 'react';
import "./Home.css"
import Navbar from '../components/Navbar';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Filter the data based on the search term
      console.log(`Searching for: ${searchTerm}`);
    };
  
    return (
      <div className="home-search-bar">
        <Navbar/>
        <div className='home-title'>ค้นหารายวิชา</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ชื่อวิชาหรือรหัสวิชา"
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="submit">ค้นหา</button>
        </form>
      </div>
    );
};

export default Home;
