import { useParams } from "react-router-dom";

export default function Detail({ shoes }) {
  const { id } = useParams();
  const results = shoes.find((item) => item.id === parseInt(id));
  console.log(results)
  console.log('id : ', id)

  if (!results) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container">
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
          <p>{results.content}</p>
          <p>{results.price}원</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
    </div> 
  );
}
