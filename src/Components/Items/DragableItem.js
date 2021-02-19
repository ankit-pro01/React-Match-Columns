import { useDrag } from "react-dnd";
import "./item.css"
import { ITEM_TYPE } from "../../util/types";
import { useEffect, useState } from "react";
import classnames from "classnames"

const DragableItem = ({item, isDrag, submit}) => {

    useEffect(() => {
        setIsDropped(false)
    }, [submit])

    const [isDropped, setIsDropped] = useState()

    const [{ isDragging }, drag] = useDrag({
        item: { name : item.id , type : ITEM_TYPE },
        end: (item,monitor) => {
            setIsDropped(monitor.didDrop())   
            
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
      })

    const opacity = {opacity : isDragging ? "0.5" : "1"}
    const dragClass = classnames({
        item,
        "item-draggable": isDrag,
        "item-disable": isDropped,
        "item-freeze": submit

    })

    return (
        <div className = "itemContainer">
            <div style = {opacity} className = {dragClass} ref ={drag}>
                {item.name} 
            </div>
        </div>  

    );
}
 
export default DragableItem;
