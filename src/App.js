import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import { data } from './data';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Detail from './Detail';
import About from './About';
import axios from 'axios';



function App() {
  const [shoes, setShoes] = useState(data);
  console.log(shoes[1].id);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Shoes Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg' style={{ backgroundImage: 'url(/bg.png)' }}></div>

      <Routes>
        <Route path="/" element={<Home shoes={shoes} setShoes={setShoes} />} />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/cart" element={<div>장바구니 페이지</div>} />
        <Route path="*" element={<div>존재하지 않는 페이지</div>} />

        <Route path='/about' element = {<About/>}>
          <Route path="member" element={<div>멤버임</div>}/>
          <Route path="location" element={<div>지역임</div>}/>
        </Route>
      </Routes>
    </div>
  );
}

function Home({ shoes, setShoes }) {
  
  // ajax요청 
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://codingapple1.github.io/shop/data2.json`);
      const results = await response.data;
      console.log('Ajax',results);
      setShoes(predata => [...predata, ...results]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="container">
      <div className="row">
        {shoes.map((item, i) => (
          <Card key={i} shoe={item} index={i + 1} />
        ))}
      </div>
    </div>
    <button onClick={fetchData}>불러오기</button>
    </>
  );
}

function Card({ shoe, index }) {
  return (
      <div className="col-md-4">
        <Link to={`/detail/${shoe.id}`}>
        <img src={`https://codingapple1.github.io/shop/shoes${index}.jpg`} width="80%" alt={`shoe-${index}`} />
        </Link>
        <h4>{shoe.title}</h4>
        <p>{shoe.content}</p>
        <i>{shoe.price}원</i>
      </div>
  );
}



export default App;

// const fetchData = async () => {
//   try {
//     const response = await axios.get('https://codingapple1.github.io/shop/data2.json');
//     const results = response.data;

//     if (results.length === 0) {
//       setHasMore(false);
//       return;
//     }

//     const filteredResults = results.filter(newItem => {
//       return !shoes.some(existingItem => existingItem.id === newItem.id);
//     });

//     if (filteredResults.length === 0) {
//       setHasMore(false);
//       return;
//     }

//     setShoes(prevData => [...prevData, ...filteredResults]);
//   } catch (e) {
//     console.log(e);
//   }
// };
