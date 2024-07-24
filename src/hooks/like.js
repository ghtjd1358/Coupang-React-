import { useState } from "react";

export const useLike = () => {
    const [like, setLike] = useState(0);
    const addLike = ()=>{
        setLike(prevState => prevState+1);
    }
    return [like, addLike];
  }


