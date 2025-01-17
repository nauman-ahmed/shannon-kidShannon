import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

function Navbar(props) {
    
    const { AddToCart } = useSelector((state) => state);

    const localStorageAddToCart = () => {
      let addToCartArray = []
      Object.keys(AddToCart.cartInfo).map((oneKey, i) => {
        if(oneKey !== "messageShow" && oneKey !== "count" && oneKey !== "getAnEstimate" ){
          addToCartArray.push(AddToCart.cartInfo[oneKey])
        }
      })
      console.log(addToCartArray)
      if(addToCartArray.length > 0){
        localStorage.setItem('addToCart',JSON.stringify(addToCartArray))
      }else{
        localStorage.removeItem('addToCart')
      }
    }

    return (
        <div className="div-block-11 filterhomebox">
            <div className=" div-block-5">
                <div className='mobileViewNavbar'>
                    <div className='w-100 d-flex align-items-center justify-content-between flex-wrap'>
                    <a href="https://www.shannonassociates.com/bipoc" target="_blank" className={"filterhomelink v2 " + (props.aciveBtn === "kidshannon" ? "w--current" : "")} onClick={()=>localStorageAddToCart()}>BIPOC</a>
                <a href="https://www.shannonassociates.com/graphicNovel" target="_blank" className={"filterhomelink v2 " + (props.aciveBtn === "kidshannon" ? "w--current" : "")} onClick={()=>localStorageAddToCart()}>GRAPHIC NOVEL</a>
                    <Link to="/MIDDLE-GRADE" className={"filterhomelink v2 "+(props.aciveBtn === "MIDDLE-GRADE"?"w--current":"")}>MIDDLE GRADE</Link>
                    <Link to="/PICTURE-BOOK" className={"filterhomelink v2 "+(props.aciveBtn === "PICTURE-BOOK"?"w--current":"")}>PICTURE BOOK</Link>              
                    </div>

                    <div className='w-100 d-flex align-items-center justify-content-center' style={{marginTop:10}}>
                        <Link to="/MULTICULTURAL" className={"filterhomelink v2 "+(props.aciveBtn === "MULTICULTURAL"?"w--current":"")}>MULTICULTURAL</Link>
                    </div>

                    <div className='w-100 d-flex align-items-center justify-content-center' style={{marginTop:10}}>
                        <Link to="/BLACK-AND-WHITE-INTERIOR" className={"filterhomelink v2 "+(props.aciveBtn === "BLACK-AND-WHITE-INTERIOR"?"w--current":"")}>BLACK AND WHITE INTERIOR </Link>
                        <Link to="/CHARACTER-DEVELOPMENT" className={"filterhomelink v2 "+(props.aciveBtn === "CHARACTER-DEVELOPMENT"?"w--current":"")}>CHARACTER DEVELOPMENT</Link>
                    </div>
                    <div className='w-100 d-flex align-items-center justify-content-center' style={{marginTop:10}}>
                        <Link to="/EDUCATIONAL" className={"filterhomelink v2 "+(props.aciveBtn === "EDUCATIONAL"?"w--current":"")}>EDUCATIONAL</Link>
                    </div>
                    {props.searchBar && props.aciveBtn == undefined?
                      <div className="form-block-2 search">
                        <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form-2"> 
                          <input onChange={(e) => { props.updateTempArtist(e) }} value={props.searchArtist} type="text" className="searchbarhome w-input" maxLength="256" name="Search" data-name="Search" placeholder="SEARCH" id="Search" />
                          <Link to="#" className="link-block-3 w-inline-block"></Link>
                        </form>
                      </div> 
                    : 
                    null}
              </div>

              <div className='fullViewNavbar'>
                <div className="div-block-5">
                <a href="https://www.shannonassociates.com/bipoc" target="_blank" className={"filterhomelink v2 " + (props.aciveBtn === "kidshannon" ? "w--current" : "")} onClick={()=>localStorageAddToCart()}>BIPOC</a>
                <a href="https://www.shannonassociates.com/graphicNovel" target="_blank" className={"filterhomelink v2 " + (props.aciveBtn === "kidshannon" ? "w--current" : "")} onClick={()=>localStorageAddToCart()}>GRAPHIC NOVEL</a>
                <Link to="/MIDDLE-GRADE" className={"filterhomelink v2 "+(props.aciveBtn === "MIDDLE-GRADE"?"w--current":"")}>MIDDLE GRADE</Link>
                <Link to="/PICTURE-BOOK" className={"filterhomelink v2 "+(props.aciveBtn === "PICTURE-BOOK"?"w--current":"")}>PICTURE BOOK</Link>              
                <Link to="/MULTICULTURAL" className={"filterhomelink v2 "+(props.aciveBtn === "MULTICULTURAL"?"w--current":"")}>MULTICULTURAL</Link>
                <Link to="/BLACK-AND-WHITE-INTERIOR" className={"filterhomelink v2 "+(props.aciveBtn === "BLACK-AND-WHITE-INTERIOR"?"w--current":"")}>BLACK AND WHITE INTERIOR</Link>
                <Link to="/CHARACTER-DEVELOPMENT" className={"filterhomelink v2 "+(props.aciveBtn === "CHARACTER-DEVELOPMENT"?"w--current":"")}>CHARACTER DEVELOPMENT</Link>
                <Link to="/EDUCATIONAL" className={"filterhomelink v2 "+(props.aciveBtn === "EDUCATIONAL"?"w--current":"")}>EDUCATIONAL</Link>
                </div>
              </div>
                {/* <Link to={"/kidshanon/illustration-artists"} className={"filterhomelink v2 "+(props.aciveBtn === "illustration-artists"?"w--current":"")}>PICTURE BOOK</Link>
                <Link to={"/kidshanon/illustration-artists"} className={"filterhomelink v2 "+(props.aciveBtn === "illustration-artists"?"w--current":"")}>MULTICULTURAL</Link>
                <Link to={"/kidshanon/illustration-artists"} className={"filterhomelink v2 "+(props.aciveBtn === "illustration-artists"?"w--current":"")}>BLACK AND WHITE CULTURAL</Link>
                <Link to={"/kidshanon/illustration-artists"} className={"filterhomelink v2 "+(props.aciveBtn === "illustration-artists"?"w--current":"")}>CHARACTER DEVELOPMENT</Link>
                <Link to={"/kidshanon/illustration-artists"} className={"filterhomelink v2 "+(props.aciveBtn === "illustration-artists"?"w--current":"")}>EDUCATIONAL</Link>
                {/* <a href="http://www.shannonassociates.com/kidshannon/" target="_blank" className={"filterhomelink v2 "+(props.aciveBtn === "kidshannon"?"w--current":"")}>KIDSHANNON</a> */}
                {/* <Link to="/cgi" className={"filterhomelink v2 "+(props.aciveBtn === "cgi"?"w--current":"")}>CGI</Link>
                <Link to="/photography" className={"filterhomelink v2 "+(props.aciveBtn === "photography"?"w--current":"")}>PHOTOGRAPHY</Link>
                <Link to="/bipoc" className={"filterhomelink v2 "+(props.aciveBtn === "bipoc"?"w--current":"")}>BIPOC</Link>  */}
            </div>
            {props.searchBar?
            <div className="form-block-2">
                <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form-2">
                    <input  onChange={(e)=>{props.updateTempArtist(e)}}  type="text" className="searchbarhome w-input" maxLength="256" value={props.searchArtist} name="Search" data-name="Search" placeholder="SEARCH" id="Search"/>
                    <Link to="#" className="link-block-3 w-inline-block"></Link>
                </form>
            </div>:null}
        </div>
    )
}

export default Navbar