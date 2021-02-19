import { useDrop } from "react-dnd";
import "./item.css"
import { ITEM_TYPE } from "../../util/types";
import {useState } from "react";
import classnames from "classnames"

const DropableItem = ({item, setDragData, dragData, submit, color}) => {
    const [newstate, setNewState] = useState({data : "", show : false});
    
    const style = {
        backgroundColor : color,
        color : "white",
        border: `2px solid ${color}`
    }
    
    const [{isOver},drop] = useDrop({
        accept: ITEM_TYPE,
        drop: (monitor) => {
            setNewState({data : monitor.name + 1, show : true})
            setDragData({...dragData, ...{[item.id] :monitor.name}})
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const dropClass = classnames({
        item,
        "item-active-before": newstate.show ,
        "item-isOver" : isOver
        })

    const userValue = newstate.show &&<div className = "badge">{newstate.data}</div>

    return (
        <div className = "itemContainer">
            <div style = {submit ? style: null} className = {dropClass} ref = {drop}>
                {item.name} 
            </div>
            {
                submit  ? null : userValue
            }
            
        </div>  
    
    );
}
 
export default DropableItem;
