import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { increase } from "./store/userSlice"


export default function Cart(){
    const dispatch = useDispatch()
    const user = useSelector((state)=> state.user)
    console.log(user)

    return (
        <>
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
                
                    {
                        user.map((item,index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.count}</td>
                                    <td>
                                        <button onClick={()=>{dispatch(increase({ id : item.id, amount : 1}))}}>+</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                
            </tbody>
        </Table> 
        </>
    )
}