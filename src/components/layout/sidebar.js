import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { keywordDataApi } from '../../redux/keywordSlice';
import { ArtistDataAPI } from '../../redux/artistDataSlice';
import { getCategoryTypeTwo, getArtistCategoryTypeTwo } from '../../AxiosFunctions/Axiosfunctionality';
import { sortAlphaOrder } from '../../UserServices/Services'

function Sidebar(props) {

  const { pages } = useParams()
  const { search } = useParams()

  const {artistDataAPI} = useSelector(state=>state)
  const dispatch = useDispatch();
  // const  {keywordReducer} = useSelector(state=>state);
  const  [keywordReducer,setKeywordReducer] = useState([]);
  const [artistData, setArtistData]  = useState([])
  let alpha = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

  useEffect(() => {
    if(props.activeBtn === "divisions" || props.activeBtn === "detailedPage"){
      if(artistDataAPI.artistData.length > 0){
        setArtistData(sortAlphaOrder(artistDataAPI!==undefined?artistDataAPI.artistData.length>0?artistDataAPI.artistData:[]:[]))
      }else{
        dispatch(ArtistDataAPI("kid"));
      }
    }
  },[artistDataAPI])

  useEffect(()=>{
    if(props.activeBtn === "EDUCATIONAL"){
      getArtistCategoryTypeTwo({keyword:"Educational", type: 2}).then(res => {
        setArtistData(
          sortAlphaOrder(res!==undefined?res.length>0?res:[]:[])
          )
        }
      )
    }
    else if(props.activeBtn === "CHARACTER-DEVELOPMENT"){
      getArtistCategoryTypeTwo({keyword:"Character Development",type:2}).then(res => {
        setArtistData(
          sortAlphaOrder(res!==undefined?res.length>0?res:[]:[])
          )
        }
      )
    }
    else if(props.activeBtn === "BLACK-AND-WHITE-INTERIOR"){
      getArtistCategoryTypeTwo({keyword:"Black and White Interior",type:2}).then(res => {
        setArtistData(
          sortAlphaOrder(res!==undefined?res.length>0?res:[]:[])
          )
        }
      )
    }else if(props.activeBtn === "MULTICULTURAL"){
      getArtistCategoryTypeTwo({keyword:"Multicultural",type:2}).then(res => {
        setArtistData(
          sortAlphaOrder(res!==undefined?res.length>0?res:[]:[])
          )
        }
      )
    }else if(props.activeBtn === "PICTURE-BOOK"){
      getArtistCategoryTypeTwo({keyword:"Picture Book",type:2}).then(res => {
        setArtistData(
          sortAlphaOrder(res!==undefined?res.length>0?res:[]:[])
          )
        }
      )
    }
    else if(props.activeBtn === "MIDDLE-GRADE"){
      getArtistCategoryTypeTwo({keyword:"Middle Grade Cover",type:2}).then(res => {
        setArtistData(
          sortAlphaOrder(res!==undefined?res.length>0?res:[]:[])
          )
        }
      )
    }
    getCategoryTypeTwo().then(res => {
      setKeywordReducer(res)})
  },[props.activeBtn])

  return (
    <div id="w-node-_783b3b4a-9daa-ecbf-356e-d84dbb36f4cc-bb36f4cc" className="respdivhide">
      <h3 className="homeh3" style={props.activeBtn === "detailedPage" ? {textDecorationLine:"none"} : props.activeBtn === "BLACK-AND-WHITE-INTERIOR" ? { color:"#000000", fontFamily: "Montserrat, sans-serif", textUnderlineOffset : "5px", fontWeight: 800, fontSize:"0.95vw" } : { color:"#000000", fontFamily: "Montserrat, sans-serif", textUnderlineOffset : "5px", fontWeight: 800 }}>{
        props.activeBtn === "EDUCATIONAL" ? "EDUCATIONAL" 
        : props.activeBtn === "CHARACTER-DEVELOPMENT" ? "CHARACTER DEVELOPMENT" 
        : props.activeBtn === "BLACK-AND-WHITE-INTERIOR" ? "BLACK AND WHITE INTERIOR" 
        : props.activeBtn === "MULTICULTURAL" ? "MULTICULTURAL" 
        : props.activeBtn === "PICTURE-BOOK" ? "PICTURE BOOK" 
        : props.activeBtn === "MIDDLE-GRADE" ? "MIDDLE GRADE" 
        : props.activeBtn === "categories" ? "CATEGORIES" 
        : props.activeBtn === "detailedPage" ? "SELECT BY CATEGORY" 
        : "DIVISIONS"
        }</h3>
      {pages == "categories"? 
      keywordReducer?.length > 0 ? keywordReducer?.map((item,key)=>(
        <div key={key}>
        {item.type === 2?(
          <Link 
            to={item.keyword.includes("/") ?  "/categories/"+item.keyword.replace(/\//g, '_') : "/categories/"+item.keyword.replace(/\s/g, '_')}
            onClick={()=>{localStorage.setItem("Category",item.keyword == '3D Rendering' ? "CGI" : item.keyword.charAt(0).toUpperCase() + item.keyword.slice(1) )}} 
            className={"divisionslink"+(localStorage.getItem("Category") === item.keyword?" w--current":"")}>
            <span className="sidebarlink">{item.keyword.toUpperCase()}<br /></span>
          </Link>)
          :""}
        
        </div>
     )):"" 
      :
      <div className="allartist v2">
        <Link to="/MIDDLE-GRADE" className={"divisionslink"+(props.activeBtn === "MIDDLE-GRADE" || localStorage.getItem("Category") == "Middle Grade Cover" ?" w--current":"")}><span className="sidebarlink">MIDDLE GRADE<br /></span></Link>
        <Link to="/PICTURE-BOOK" className={"divisionslink"+(props.activeBtn === "PICTURE-BOOK" || localStorage.getItem("Category") == "Picture Book" ?" w--current":"")}><span className="sidebarlink">PICTURE BOOK<br /></span></Link>
        <Link to="/MULTICULTURAL" className={"divisionslink"+(props.activeBtn === "MULTICULTURAL" || localStorage.getItem("Category") == "Multicultural" ?" w--current":"")}><span className="sidebarlink">MULTICULTURAL</span></Link>
        <span className="sidebarlink"><br /></span>
        <Link to="/BLACK-AND-WHITE-INTERIOR" className={"divisionslink"+(props.activeBtn === "BLACK-AND-WHITE-INTERIOR" || localStorage.getItem("Category") == "Black and White Interior" ?" w--current":"")}><span className="sidebarlink">BLACK AND WHITE INTERIOR<br /></span></Link>
        <Link to="/CHARACTER-DEVELOPMENT" className={"divisionslink"+(props.activeBtn === "CHARACTER-DEVELOPMENT" || localStorage.getItem("Category") == "Character Development" ?" w--current":"")}><span className="sidebarlink">CHARACTER DEVELOPMENT<br /></span></Link>
        <Link to="/EDUCATIONAL" className={"divisionslink"+(props.activeBtn === "EDUCATIONAL" || localStorage.getItem("Category") == "Educational" ?" w--current":"")}><span className="sidebarlink">EDUCATIONAL</span></Link>
        <br /><br /><br /><br />
       {pages == "categories" && keywordReducer?.length > 0 ? keywordReducer?.map((item,key)=>(
          <div key={key}>
          {item.type === 2?(<Link to={"/divisions/"+item.keyword}  className={"divisionslink"+(search === item.keyword?" w--current":"")}><span className="sidebarlink">{item.keyword.toUpperCase()}<br /></span></Link>):""}
          
          </div>
       )):""}
       <h3 className="homeh3" style={{textDecorationLine:"none"}}>SELECT BY ARTIST</h3>
        {alpha.map((item,key)=>
       (
        <div key={key}>
          {artistData[item] !== undefined ? (
          <div key={key}>
            {item}<br/>
            {artistData[item].map((item1,key1)=>(
              <div key={key1}>
               <Link to={item1.fullName} className="sidebarlink" style={pages === item1.fullName ? {color: "#fa8e37"} : {}}>{item1.firstname.toUpperCase()} {item1.lastname.toUpperCase()}<br/></Link>
              </div>
            ))}
            <br/>
          </div>
          ): ""}
       </div>
      ) 
      )}
        <br />
      </div>
      }
    </div>
  )
}

export default Sidebar