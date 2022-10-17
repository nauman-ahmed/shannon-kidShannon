import React from 'react'
import { Link, useParams } from 'react-router-dom'

function Navbar(props) {
    
    return (
        <div className="div-block-11">
            <div className="filterhomebox div-block-5">
                {props.navList.map((item,key)=>(
                    <Link key={key} to={"/illustration-artists/"+item} className={"filterhomelink v2 "+(props.aciveBtn === item?"w--current":"")}>{item}</Link>
                ))}
                
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
                    <input  onChange={(e)=>{props.updateTempArtist(e)}}  type="text" className="searchbarhome w-input" maxLength="256" name="Search" data-name="Search" placeholder="SEARCH" id="Search"/>
                    <Link to="#" className="link-block-3 w-inline-block"></Link>
                </form>
            </div>:null}
        </div>
    )
}

export default Navbar