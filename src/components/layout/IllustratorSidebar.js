import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { keywordDataApi } from '../../redux/keywordSlice';

function IllustrationSidebar(props) {

  const dispatch = useDispatch();
  const  {keywordReducer} = useSelector(state=>state);
  useEffect(()=>{
    dispatch(keywordDataApi(props.kid))
  },[])
  return (
    <div id="w-node-_783b3b4a-9daa-ecbf-356e-d84dbb36f4cc-bb36f4cc" className="respdivhide">
      
      {/* <div className="allartist v2"> */}
        
        {/* <span className="sidebarlink"><br /></span> */}
        {props.Filters.map((item,key)=>(
            <Link to="#" key={key} onClick={()=>{localStorage.setItem("filter",item);props.filterChange()}} className={"divisionslink " +(localStorage.getItem("filter").trim().toUpperCase() === item.toUpperCase() ? "w--current":"")}>{item}<br /></Link>
        ))}
       
        {/* <span className="sidebarlink">ALPHABATICAL (A-Z)<br /></span>
        <span className="sidebarlink ">ALPHABATICAL (Z-A)<br /></span>
        <span className="sidebarlink ">NEW ARTISTS<br /></span>
        <span className="sidebarlink ">UPDATED PORTFOLIOS</span> */}

       {/* {keywordReducer.keyword!==null?keywordReducer.map((item,key)=>(
          <div key={key}>
          {item.type === 2?(<Link to={props.kid?"/kidshanon/divisions/"+item._id:"/divisions/"+item._id}  className={"divisionslink"+(props.activeBtn === item.keyword?" w--current":"")}><span className="sidebarlink">{item.keyword.toUpperCase()}<br /></span></Link>):""}
          
          </div>
       )):""}
        <span className="sidebarlink spacing"><br /></span>
        {keywordReducer.keyword!==null?keywordReducer.map((item,key)=>(
          <div key={key}>
          {item.type === 1?(<Link to={props.kid?"/kidshanon/divisions/"+item._id:"/divisions/"+item._id} className={"divisionslink"+(props.activeBtn === item.keyword?" w--current":"")}><span className="sidebarlink">{item.keyword.toUpperCase()}<br /></span></Link>):""}
          
          </div>
       )):""} */}
        {/* <br /> */}
      {/* </div> */}
    </div>
  )
}

export default IllustrationSidebar