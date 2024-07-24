import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import { addItem } from './store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

// import styled from "styled-components";

// let YellowBtn = styled.button`
//   background : ${ props => props.bg };
//   color : ${ props => props.bg === 'blue' ? 'white' : 'black' };
//   padding : 10px;
// `;

export default function Detail({ shoes }) {
  const dispatch = useDispatch();
  const user = useSelector((state=>state.user))
  console.log('detail', user)

  // 상세페이지 및 데이터
  const { id } = useParams();
  const results = shoes.find((item) => item.id === parseInt(id));
  // console.log(results);
  // console.log('id : ', id);

  const [alert, setAlert] = useState(true);
  const [check, setCheck] = useState('');
  const [tab, setTab] = useState(0);
  const [ani, setAni] = useState('');
  const [error, setError] = useState('');

  // 초기 렌더링 시 타이머
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // 수량 체크란에 isNaN일 경우
  useEffect(() => {
    if (isNaN(check)) {
      setError('그러지마시오');
    } else {
      setError('');
    }
  }, [check]);

  // 페이지로드시 animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setAni(ani);

      return () => {
        setAni('');
        clearTimeout(timer);
      };
    }, 2000);
  }, [ani]);

  if (!results) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={`container start ${ani}`}>
      {alert ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : (
        ''
      )}
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${results.id + 1}.jpg`}
            width="100%"
            alt="shoes"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">상품명</h4>
          <p>{results.title}</p>
          <input
            type="text"
            value={check}
            onChange={(e) => setCheck(e.target.value)}
          />
          {error && <p className="alert alert-danger">{error}</p>}
          <p>{results.content}</p>
          <p>{results.price}원</p>
          <button className="btn btn-danger"
    onClick={() => dispatch(addItem({ id: results.id, name: results.title, count: 1 }))}
>주문하기</button>
          {/* <YellowBtn bg='black'>버튼</YellowBtn> */}
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
               eventKey="link1"
            onClick={() => {
              setTab(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
}

const TabContent = ({ tab }) => {
  let [fade, setFade] = useState('');

  useEffect(() => {
    let timer = setTimeout(() => {
      setFade('end');
    }, 100);

    return () => {
      setFade('');
      clearTimeout(timer);
    };
  }, [tab]);

  return (
    <>
      <div className={`start ${fade}`}>
        {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
      </div>
      {/* {tab === 0 && <div>내용0</div>}
      {tab === 1 && <div>내용1</div>}
      {tab === 2 && <div>내용2</div>} */}
    </>
  );
};
