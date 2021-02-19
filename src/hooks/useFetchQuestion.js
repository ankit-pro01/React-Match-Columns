import axios from "axios";
import { useEffect, useState } from "react";

const useFetchQuestion = () => {

    const [state, setState] = useState({loading : true, error: false, data: {left_column : [], right_column : []}})


    useEffect(() => {
        setState({...state, loading : true})
    axios.get("https://socratease.free.beeceptor.com/content")
    .then(
        res => {
            let data = res.data;
            const rightColArray = data.right_column.map(item => item.choice)
            data.right_column = rightColArray
            setState({...state, error : false, data : data, loading: false})
        }
    )
    .catch( err => {
        setState({...state,
            error : true, 
            data: {left_column : [], right_column : []}, loading: false})

        //******************************************************************
        console.log("error occured : ", err);
        const data = {
        left_column : ["chole bhatore", "brinjal", "honey", "apple"],
        right_column : ["fruit", "sweet", "vegetable" ,"spicy"]
        }
        setState({...state,error : true, data: data, loading: false})
        //******************************************************************


        })
     
}, [])

    return state
}
 
export default useFetchQuestion;