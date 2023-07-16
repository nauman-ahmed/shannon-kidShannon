import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllContents } from '../../AxiosFunctions/Axiosfunctionality'
import { addCart } from "../../redux/addToCart";

const images = window.location.origin + "/assets/images";
function Header(props) {

  const { AddToCart } = useSelector((state) => state);
  const [shannonContent,setShannonContent] = useState([])
  const dispatch = useDispatch();

  const getAllContent = ()=>{
    getAllContents({type: "SHANNON"}).then((res)=>{
        let shannon = res[0].content
        console.log(shannon[0])
        setShannonContent(shannon)
    })
  }

    const localStorageAddToCart = () => {
      let addToCartArray = []
      Object.keys(AddToCart.cartInfo).map((oneKey, i) => {
        if(oneKey !== "messageShow" && oneKey !== "count" && oneKey !== "getAnEstimate" ){
          addToCartArray.push(AddToCart.cartInfo[oneKey])
        }
      })
      if(addToCartArray.length > 0){
        localStorage.setItem('addToCart',JSON.stringify(addToCartArray))
      }else{
        localStorage.removeItem('addToCart')
      }
    }
  
  const addToCartArtist = (id, firstname) => {
    dispatch(addCart({ key: id, data: { id: id, Name: firstname } }));
  };

  const addToCartArtistHandler = (id,title) =>{
    let key = Object.keys(AddToCart.cartInfo).find(element => element == id)
    if(key == undefined){
      addToCartArtist(id, title)
    }
  }

  useEffect(()=>{
    getAllContent();

    let obj = JSON.parse(localStorage.getItem("addToCart"));
    if(obj !== null){
      obj.map((val) => {
        addToCartArtistHandler(val.id,val.Name)
      })
      localStorage.removeItem("addToCart")
    }

  },[])

  useEffect(()=>{
  },[AddToCart])

  return (
    <div className="menu wf-section">
      <div className="containerhome f">
        <div
          data-animation="default"
          data-collapse="medium"
          data-duration="400"
          data-easing="ease"
          data-easing2="ease"
          role="banner"
          className="navbar w-nav"
          style={{ marginLeft: -35 }}
        >
          <div className="container w-container d-inline">
            <Link
              to="/"
              aria-current="page"
              className="brand w-nav-brand w--current"
            >
              <img
                src={images + "/Frame.png"}
                loading="lazy"
                alt=""
                className="logov2"
              />
            </Link>
            <nav role="navigation" className="navmenu w-nav-menu">
              <span>
                <a 
                href="http://3.132.94.46/#/" 
                target="_blank" 
                className="navlink v2 w-nav-link "  onClick={()=>localStorageAddToCart()} >SHANNON WEBSITE</a>

                <Link
                  to="/"
                  aria-current="page"
                  className={
                    "navlink v2 w-nav-link " +
                    (!props.aciveBtn ? "w--current" : "")
                  }
                >
                  ARTISTS
                </Link>
                <Link
                  to="/divisions"
                  className={
                    "navlink v2 w-nav-link " +
                    (props.aciveBtn === "divisions" ? "w--current" : "")
                  }
                >
                  DIVISIONS
                </Link>
                <Link 
                  to="/categories"
                  className={
                    "navlink v2 w-nav-link " +
                    (props.aciveBtn === "categories" ? "w--current" : "")
                  }
                >
                  CATEGORIES
                </Link>
                <Link
                  to="/about"
                  className={
                    "navlink v2 w-nav-link " +
                    (props.aciveBtn === "about" ? "w--current" : "")
                  }
                >
                  ABOUT
                </Link>
                <Link
                  to="/contact"
                  className={
                    "navlink v2 w-nav-link " +
                    (props.aciveBtn === "contact" ? "w--current" : "")
                  }
                >
                  CONTACT/ MY LIST
                  {AddToCart.cartInfo.count > 0 ? <div className="cartBadge">{AddToCart.cartInfo.count}</div> : null}
                </Link>
              </span>
              <div className="menuinfo v2">
                {shannonContent.length > 0 ? shannonContent[0].name : "INFO@SHANNONASSOCIATES.COM • 212.333.2251"}
              </div>
            </nav>
            <div className="menu-button w-nav-button">
              <Link to="#" className="w-inline-block">
                <img src={images + "/menu.svg"} loading="lazy" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Header;
