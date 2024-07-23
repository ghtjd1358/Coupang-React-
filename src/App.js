import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import { data } from './data';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Detail from './Detail';

function App() {
  const [shoes] = useState(data);
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
        <Route path="/" element={<Home shoes={shoes} />} />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/cart" element={<div>장바구니 페이지</div>} />
        <Route path="*" element={<div>존재하지 않는 페이지</div>} />
      </Routes>
    </div>
  );
}

function Home({ shoes }) {
  return (
    <div className="container">
      <div className="row">
        {shoes.map((item, i) => (
          <Card key={i} shoe={item} index={i + 1} />
        ))}
      </div>
    </div>
  );
}

function Card({ shoe, index }) {
  return (
    <Link to={`/detail/${shoe.id}`}>
      <div className="col-md-4">
        <img src={`https://codingapple1.github.io/shop/shoes${index}.jpg`} width="80%" alt={`shoe-${index}`} />
        <h4>{shoe.title}</h4>
        <p>{shoe.content}</p>
        <i>{shoe.price}원</i>
      </div>
    </Link>
  );
}

export default App;
