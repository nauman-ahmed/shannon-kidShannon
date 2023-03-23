import React from 'react'
import { Link, useParams } from 'react-router-dom'

function Navbar(props) {
    
    return (
        <div className="div-block-11 filterhomebox">
            <div className=" div-block-5">
                <div className='mobileViewNavbar'>
                    <div className='w-100 d-flex align-items-center justify-content-between flex-wrap'>
                    <a href="http://18.217.201.201//#/bipoc" target="_blank" className={"filterhomelink v2 " + (props.aciveBtn === "kidshannon" ? "w--current" : "")}>BIPOC</a>
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
              </div>

              <div className='fullViewNavbar'>
                <div className="div-block-5">
                <a href="http://18.217.201.201//#/bipoc" target="_blank" className={"filterhomelink v2 " + (props.aciveBtn === "kidshannon" ? "w--current" : "")}>BIPOC</a>
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