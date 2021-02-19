import "./Container.css"
import Column from "./Column/Column";
import { useEffect, useState } from "react";
import DragableItem from "./Items/DragableItem";
import Button from "./Button/Button";
import AnswersItem from "./Items/AnswersItem";
import DropableItem from "./Items/DropableItem";
import axios from "axios";
import useFetchQuestion from "../hooks/useFetchQuestion";
import Loader from "./Loader/Loader";
import {colors} from "../util/colors";



const Container = () => {
    const [answersArrayMapping, setAnswersMapping] = useState([0,1,2,4]);
    const [submit, setSubmit] = useState(false);
    const [dragData, setDragData ] = useState([]);
    const [answerFetchError, setAnswerFetchError] = useState(false);
    const [answersArray, setAnswersArray] = useState([])
    const {data, loading, error} = useFetchQuestion();

    const handleReset = () => {
        window.location.reload()
    }

    const checkAnswers = (answers) => {
        const mappingArray = answers.map((e,i) => answers[i] == dragData[i])
        const answersArray = answers.map((e,i) => data.right_column[e])
        setAnswersArray(answersArray)
        return mappingArray;
    }

        
    const handleSubmit = () => {
        axios.get("https://socratease.free.beeceptor.com/verify")
        .then(res => {
            let data = res.data;
            const correctAnswers = data["correct_ans_ind"];
            let result = checkAnswers(correctAnswers);
            setAnswersMapping(result);
            setSubmit(true)
        })
        .catch(err => {
            console.log("error occured", err);
            //***************************************
            const data = [3,2,1,0]
            let result = checkAnswers(data);
            setAnswersMapping(result);
            setSubmit(true);
            setAnswerFetchError(true)
            //***************************************
        })
    }

    return ( 
        <>
        {/* {error && <h4>Something Went Wrong. Please Refresh...</h4>} */}
        {loading && <Loader />}        
        {!loading &&    <div className = "Wrapper">
            <div className = "Container">
                <div className = "left-Col">
                    <Column title = "Column1">
                        {data.left_column.map((row, i) => 
                            <DragableItem 
                                key = {i} 
                                item = {{id: i, name : row}}
                                isDrag
                                submit = {submit}/>
                            )}
                    </Column>
                </div>

                <div className = "Right-Col">
                    <Column title = {submit ? "Your Answers" :"Column2"}>
                        {data.right_column.map((row, i) => {
                            let color = "white"
                            if(submit)color = (submit == (submit == answersArrayMapping[i])) ? colors.SUCCESS:colors.ERROR;
                            return <DropableItem 
                                key = {i}
                                color = {color}
                                item = {{id: i, name : row}}
                                dragData = {dragData}
                                submit = {submit}
                                setDragData = {setDragData} />
                            })
                        }
                    </Column>
                </div>

                {submit && <div className = "Answer-Col">
                    <Column title = "Correct Answer">
                        {answersArray.map((row, i) => <AnswersItem key = {i} 
                        item = {row}/>)}
                    </Column>
                </div>}
            </div>
            {!submit &&
                <div className = "submit-Section">
                <Button title = "RESET" buttonHandler = {handleReset}/>
                <Button title = "SUBMIT" buttonHandler = {handleSubmit}/>
                </div>
            }
            
        </div>}
        </>
    );
}
 
export default Container;