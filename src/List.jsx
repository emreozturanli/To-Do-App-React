import {TiEdit, TiTrash, TiArrowRightThick } from 'react-icons/ti';
import listStyle from './scss/list.module.scss';


export const List = (props) => {
    const {index,todo,deleteItem,editItem} = props
  return (
    <li className={listStyle["listItem"]}>
        <div className={listStyle["todoP"]}>
          <TiArrowRightThick className={listStyle["arrow"]}/>
          <p>{todo}</p>
        </div>
        <div className={listStyle["icons"]}>
          <TiEdit style={{color: 'green'}} onClick={()=>editItem(todo,index)}/>
          <TiTrash style={{color: 'red'}} onClick={()=>deleteItem(index)}/>
        </div>
    </li>
  )
}
