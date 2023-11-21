import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Slider, {
  SliderItem,
  SliderShow,
  SliderItems,
  FullScreenSliderItem,
} from "../../../components/slider/slider";
import loading from '../../../assets/loading.gif';

import { useDispatch, useSelector } from "react-redux";
import { artistImageKidDetailedSliceData } from '../../../AxiosFunctions/Axiosfunctionality';
import { ArtistImageSliceData } from "../../../redux/artistImageDataSlice";
import { addCart, saveCartItemMessageKey, getAnEstimateHandler } from "../../../redux/addToCart";
import { updateMessage, updateOpen } from "../../../redux/message";
import MyPopup from "../../../components/myPopup/myPopup";
// import { setImageRoute } from '../../../UserServices/Services';

// import downloadArrow from "../../images/download.png";
const images = window.location.origin + "/assets/images";

function SearchByArtist(props) {

  const history = useHistory()

  const [keyword, setKeyword] = useState(0);
  const [tab, setTab] = useState(0);
  const [fullscreen, setFullscreen] = useState({ screen: false, route: null });
  const [fullScreenData, setFullScreenData] = useState({ screen: false, route: null });
  const { pages } = useParams();
  const { artistImageDataSlice, AddToCart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [data1, setData1] = useState(null);
  const [dataViewed, setDataViewed] = useState({});
  const [similarData, setSimilarData] = useState({});
  const [artistImages, setArtistImages] = useState(8);
  const [artistSimilar, setArtistSimilar] = useState(8);
  const [sliderImages, setSliderImages] = useState(null);
  const [sliderIndex, setSliderIndex] = useState(null);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [isPopupShow, setIsPopupShow] = useState(false);
  const [isPopupShowWithCheckbox, setIsPopupShowWithCheckbox] = useState(true);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sliderTriggerred, setSliderTriggerred] = useState(false);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [imageIndexDisplayed, setImageIndexDisplayed] = useState(true);
  
  const fullscreenCondRef = useRef({
    full:false,
    imageInd:0
  });
  const myStateRef = useRef(0);
  const queryParams = new URLSearchParams(history.location.search);
  const imageIndex = queryParams.get('image');
  const fullscreenCond = queryParams.get('fullscreen');
  
  function getWindowSize() {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight };
  }

  function handleWindowResize() {
    setWindowSize(getWindowSize());
  }

  const changeIndex = (index) => {
    console.log(index)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    let imageInd

    if(data1){
      if(data1[pages].slideList.length < parseInt(imageIndex, 10)){
        imageInd = data1[pages].slideList.length - 1
        history.push(pages +"?image="+imageInd)
      }else{
        imageInd = parseInt(imageIndex, 10)
      }
      let tempObj = {...fullScreenData}
      tempObj.screen = fullscreenCond=="true" ? true : false
      tempObj.route = data1[pages].slideList[imageInd]
      setFullscreen(tempObj)
      fullscreenCondRef.current.full = tempObj.screen
      fullscreenCondRef.current.imageInd = parseInt(imageInd, 10)
    }

    myStateRef.current = imageInd; 
    setSliderIndex(parseInt(imageInd, 10))
    
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('scroll', function(){});
    };

  }, [data1]);

  useEffect(()=>{
    if(!fullscreenCond){
      if(!imageIndex){
        history.push(pages +"?image=0")
      }else{
        history.push(pages +"?image="+imageIndex)
      }
    }
    
    // return () => {
    //   localStorage.setItem("Category","none")
    // };
  },[fullscreenCond])

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if(history.action == "POP"){
        if(fullscreenCondRef.current.full){
          let temp = { ...fullscreen };

          temp.resposive = windowSize.innerWidth < 479 ? true : false
          temp.screen = false;
          fullscreenCondRef.current.full = false
          fullscreenCondRef.current.imageInd = parseInt(imageIndex, 10)
          setFullscreen(temp);
        }else{
          history.goBack()
        }
  
      }
    });
  
    // Return a cleanup function to remove the listener when the component unmounts.
    return () => {
      unlisten();
    };
  }, [history]);

  useEffect(()=>{
    if(!imageIndex){
      history.push(pages +"?image=0")
    }
    // return () => {
    //   localStorage.setItem("Category","none")
    // };
  },[])

  const addToCartArtist = (id, firstname,getAnEstimate=false) => {
    dispatch(addCart({ key: id, data: { id: id, Name: firstname } }));
    if(getAnEstimate){
      dispatch(getAnEstimateHandler());
    }
  };

  const dataLocalArtist = (key, _id, firstname, bio, listData, subListData) => {
    let tempData = localStorage.getItem("artistViewedKid_V4");

    tempData = JSON.parse(tempData);
    if (tempData === null) {
      tempData = {};
      tempData[key] = {
        id: _id,
        title: firstname,
        detail: bio,
        slideList: listData,
      };
      localStorage.setItem("artistViewedKid_V4", JSON.stringify(tempData));
    } else {
      tempData[key] = {
        id: _id,
        title: firstname,
        detail: bio,
        slideList: listData,
        subListData: subListData,
      };

      let tempDataOnlySix = {}

      // Convert the object into an array of key-value pairs
      const entries = Object.entries(tempData);
      // Reverse the array
      const reversedEntries = entries.reverse();

      // Loop over the reversed array
      reversedEntries.forEach(([key, value],index) => {
          tempDataOnlySix[key] = value
      });

      localStorage.setItem("artistViewedKid_V4", JSON.stringify(tempDataOnlySix));
    }
  };

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  } 

  const getUserData = async () => {
    setIsLoading(true)
    let localPrevCate = localStorage.getItem("Category") || "none"

    let tempData = await artistImageKidDetailedSliceData({ "fullName": pages, "category": localPrevCate  })

    if(localStorage.getItem("routePaths")){
      let route = JSON.parse(localStorage.getItem("routePaths"))
      if(!route.find((obj) => obj.artistExist == true)){
        route.push({val:tempData.activeArtist[pages].firstname + " " + tempData.activeArtist[pages].lastname,artistExist:true})
        localStorage.setItem("routePaths",JSON.stringify(route))
      }
    }

    dataLocalArtist(
      tempData.activeArtist[pages].fullName,
      tempData.activeArtist[pages].id,
      tempData.activeArtist[pages].lastname + " " + tempData.activeArtist[pages].firstname,
      tempData.activeArtist[pages].detail,
      tempData.activeArtist[pages].slideList,
      tempData.activeArtist[pages].subListData
    );

    let tempImage = []
    tempImage.push(tempData.activeArtist[pages].subListData[0])

    setDisplayedImages(tempImage)
    setSimilarData(tempData.similarArtist);
    setData1(tempData.activeArtist);

  }

  useEffect(() => {

    let currentSelectedSlider = document.getElementById("firstSlider"+imageIndex);
    var prev = document.getElementsByClassName('slick-prev')[0];
    var next = document.getElementsByClassName('slick-next')[0]

    if(currentSelectedSlider){
      
      currentSelectedSlider.style.boxShadow = "0 2px 10px #141c2a"
      if(prev){
        prev.addEventListener("click", (e) => {
          if(myStateRef.current == 0 ){
            setSliderIndexHandler(data1[pages].pictureTitle.length-1,myStateRef.current,true)
          }else{
            setSliderIndexHandler(myStateRef.current -1 ,myStateRef.current,true)
          }
        })
      }
        
      if(next){
        next.addEventListener("click", (e) => {
          if(myStateRef.current !== data1[pages].pictureTitle.length-1){
            setSliderIndexHandler(myStateRef.current+1,myStateRef.current,true)
          }else{
            setSliderIndexHandler(0,data1[pages].pictureTitle.length - 1,true)
          }
        })
      }
    }
  }, [imageIndexDisplayed]);

  const setSliderIndexHandler = (keys, oldValue = null, clickedSliderButton = false) => {
    if(clickedSliderButton){
      

      let previousSelectedSlider = document.getElementById("firstSlider"+oldValue);
      let currentSelectedSlider = document.getElementById("firstSlider"+keys);

      currentSelectedSlider.style.boxShadow = "0 2px 10px #141c2a"
      previousSelectedSlider.style.boxShadow = ""
      myStateRef.current = keys
      setSliderIndex(keys)
    }else{
      let previousSelectedSlider = document.getElementById(sliderIndex? "firstSlider"+sliderIndex : "firstSlider0");
      let currentSelectedSlider = document.getElementById("firstSlider"+keys);
      
      currentSelectedSlider.style.boxShadow = "0 2px 10px #141c2a"
      previousSelectedSlider.style.boxShadow = ""
      myStateRef.current = keys
      setSliderIndex(keys)
    }
    history.push(pages +"?image="+keys)
  };

  useEffect(() => {
    setSliderTriggerred(false)
    setData1(null)
    
    function getLocalStorage() {
      if (localStorage.getItem("artistViewedKid_V4") !== null) {
        setDataViewed(JSON.parse(localStorage.getItem("artistViewedKid_V4")));
      }
    }
    handleWindowResize()
    getLocalStorage();
    getUserData()

    setIsLoading(false)
  }, [pages]);

  const setFullScreenHandler = (route, key) => {
    let temp = { ...fullscreen };

    if (!temp.screen) {
      temp.route = route;
      temp.key = key
    }

    temp.resposive = windowSize.innerWidth < 479 ? true : false
    temp.screen = !temp.screen;
    fullscreenCondRef.current.full = temp.screen
    fullscreenCondRef.current.imageInd = parseInt(imageIndex, 10)
    setFullscreen(temp);
    setFullScreenData(data1[pages])
    if(temp.screen){
      history.push(pages +"?image="+imageIndex+"&fullscreen=true")
    }else{
      setImageIndexDisplayed(!imageIndexDisplayed)
      history.push(pages +"?image="+imageIndex)
    }

  };

  const saveCartMessage = (msg) =>{
    dispatch(saveCartItemMessageKey({ messageShow:msg }));
  }

  const addToCartArtistHandler = (id,title,getAnEstimate=false) =>{
    let key = Object.keys(AddToCart.cartInfo).find(element => element == id)
    if(key == undefined){
      if(AddToCart.cartInfo.messageShow){
        setMsg("You have added "+ title +" to your list, to view your list visit Contact/My List Page.")
        setIsPopupShow(true)
      }
      addToCartArtist(id, title, getAnEstimate)
    }else{
      setMsg("You have already added "+ title +" to your list, to view your list visit Contact/My List Page.")
      setIsPopupShow(true)
      setIsPopupShowWithCheckbox(false)
    }
  }

  const onImageLoad = (index) => {
    if(index+1 == displayedImages.length && data1[pages].subListData.length !== index+1){
      let tempImage = [...displayedImages]
      tempImage.push(data1[pages].subListData[index+1])
      setDisplayedImages(tempImage)
    }

    if(displayedImages.length == imageIndex+1){
      setImageIndexDisplayed(!imageIndexDisplayed)
    }
  }

  if (fullscreen.screen) {
    return (
      <FullScreenSliderItem
        onClick={setFullScreenHandler}
        currentData={fullScreenData}
        fullscreen={fullscreen}
      />)
  }

  if (isLoading) {

    
    return (
      <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <img
            className="mb-3"
            alt="loading"
            src={loading}
          />
        </div>
    )
  }

  return (
    <div>
    {data1 !== null ? 
      <div className={windowSize.innerWidth < 479 ? "" : "d-flex"} style={windowSize.innerWidth < 479 ? { marginLeft: "8%" } : { justifyContent: "end", marginTop: "-10px" }} > 
        <div className="d-flex" style={windowSize.innerWidth < 479 ? { } :  { justifyContent: "space-between", width: "20%" }}>
            <Link
              to="/contact"
              className={windowSize.innerWidth < 479 ? "talentbuttonArtistSearchDetailed  col-lg-2 col-md-3 mr-1" : "talentbutton mr-3"}
              onClick={() => addToCartArtistHandler(data1[pages].id, data1[pages].title, true)}
            >
              GET ESTIMATE
            </Link>
            <Link
              data-w-id="e04f643e-f302-16e2-74ee-4bc7e85391d8"
              to="#"
              className={windowSize.innerWidth < 479 ? "talentbuttonArtistSearchDetailed  col-lg-2 col-md-3 mr-1" : "talentbutton mr-3"}
              onClick={() => addToCartArtistHandler(data1[pages].id, data1[pages].title)}
              style={{ marginRight: "0px" }}
            >
              ADD TO MY LIST
            </Link>
        </div>
      </div>
    : "" }
    
    <div className="row m-0 pt-0" style={{
      maxWidth: "100%",
      justifyContent: "space-around",
      margin: "0px"
    }}>
      {data1 !== null && data1[pages] ? (
        <>
          <div className="pl-2 left_content">
            {props.children}
          </div>
          <div className="row mid_full_content">
            <div className="pl-2 mid_content">
              {
                JSON.parse(localStorage.getItem("routePaths")) ? 
                <div className={windowSize.innerWidth < 479 ? "" : "d-flex"} style={windowSize.innerWidth < 479 ? { marginLeft: "8%" } : {marginBottom:"10px", width:"98.4%" }} >
                  {
                    JSON.parse(localStorage.getItem("routePaths")).map((obj,ind) => <p className={JSON.parse(localStorage.getItem("routePaths")).length == ind + 1 ? "breadCrumbs" : "breadCrumbsActive" } onClick={JSON.parse(localStorage.getItem("routePaths")).length == ind + 1 ? () => {} : ()=> history.push(obj.link)} style={ind == 0 ? { } : { marginLeft:"5px" }}>{obj.val} {JSON.parse(localStorage.getItem("routePaths")).length == ind + 1 ? null : ">"}</p>)
                  }
                  </div>
                : null
              }
            <div className={windowSize.innerWidth < 479 ? "" : "d-flex"} style={windowSize.innerWidth < 479 ? { marginLeft: "8%" } : { justifyContent: "space-between", marginTop: "-10px", marginBottom:"10px", width:"98.4%" }} > 
                <h2 className="h2talent">{data1[pages].title}</h2> 
                <a href={"https://www.shannonassociates.com/"+data1[pages].fullName} target="_blank" className="linkToKS">Visit Main Portfolio</a> 
            </div>

              {windowSize.innerWidth < 479 ?
                <div className="tabs-menu w-tab-menu">
                  <div
                    onClick={() => setTab(0)}
                    className={
                      "tabs py-2 w-inline-block w-tab-link flex_center " +
                      (tab === 0 ? "bg-white text-black flex_center" : null)
                    }
                  >
                    <div style={{ fontWeight: '600' }}>PORTFOLIO</div>
                  </div>
                  <div
                    onClick={() => setTab(1)}
                    className={
                      "tabs py-2 w-inline-block w-tab-link " +
                      (tab === 1 ? "bg-white  text-black" : null)
                    }
                  >
                    <div style={{ fontWeight: '600' }}>SIMILAR ILLUSTRATORS</div>
                  </div>

                </div>
              : null}
            {tab === 0 ?
                  windowSize.innerWidth < 479 ?
                    <div>
                      <div
                        className="imagecont"
                        style={{ marginTop: 10 }}
                      >
                        {data1[pages].subListData.map((item, keys) =>
                          keys < artistImages ?
                            <div className="talentthumbslide resp">
                              <img
                                src={item}
                                loading="lazy"
                                alt=""
                                className="image"
                              />
                            </div> : null
                        )
                        }
                      </div>
                      <div style={{ textAlign: "center", margin: "10px", marginTop: 25 }}>
                        <Link
                          to="#"
                          style={{ fontSize: "16px" }}
                          className="talentbuttonArtistSearch col-3 mr-1"
                          onClick={() => setArtistImages(artistImages + 8)}
                        >
                          See More
                        </Link>
                      </div>
                    </div>
                    : (
                        <div className="detail_card w-inline-block ">
                          {
                            displayedImages.map((item, keys) => (
                              <div id={"firstSlider"+keys} className="detail_card5_h" style={windowSize.innerWidth <= 991 ? { overflow: "hidden", height:"8vh" } : { overflow: "hidden", height:"14.5vh" }} onClick={() => { setSliderIndexHandler(keys) }}> 
                                <img srcSet={item} className="w-100 h-100" 
                                style={{objectFit: "cover"}}
                                loading="lazy"
                                fetchpriority = {"high"}
                                // onLoad={() => onImageLoad(keys)}
                                onLoadCapture={()=> onImageLoad(keys)}
                                ></img>
                              </div>
                            ))
                          }
                          {data1[pages].subListData[displayedImages.length] ?
                            <div  style={windowSize.innerWidth <= 991 ? { overflow: "hidden", height:"8vh" } : { overflow: "hidden", height:"14.5vh" }}> 
                              <img
                                className="mb-3"
                                alt="loading"
                                src={loading}
                              />
                            </div> 
                            :null
                          }
                        </div>
                    ) : null}
                {/* <div className="detail_card w-inline-block ">
                  {
                    data1[search].subListData.map((item, keys) => (
                      <div id={"firstSlider"+keys} className="detail_card5_h" style={windowSize.innerWidth <= 991 ? { overflow: "hidden", height:"8vh" } : { overflow: "hidden", height:"14.5vh" }} onClick={() => { setSliderIndexHandler(keys) }}> 
                        <img src={item} className="w-100 h-100" 
                        style={{objectFit: "cover"}}
                        ></img>
                      </div>
                    ))
                  }
              </div> */}
            </div>
            <div className="right_content">
              <div className="rightside">
                <div className="d-flex" style={{ justifyContent: 'center' }}>
                  {fullscreen.screen ? (
                    <FullScreenSliderItem
                      onClick={setFullScreenHandler}
                      currentData={data1[pages]}
                      fullscreen={fullscreen}
                      />
                  ) : (
                    <> 
                      <SliderShow
                        changeIndex={changeIndex}
                        sliderIndex={sliderIndex}
                        setSliderTriggerred={setSliderTriggerred}
                      >
                        {
                          data1[pages].slideList.map((item, keys) => (
                            <SliderItems
                              keys={keys}
                              src={item}
                              data1={data1}
                              search={pages}
                              windowSize={windowSize}
                              onClick={setFullScreenHandler}
                              addToCartArtistHandler={addToCartArtistHandler}
                            />
                          ))
                        }

                      </SliderShow>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div style={{ width: "100%", backgroundColor: "white", zIndex:"1" }}>
              {/* Starting of Similar Artist */}
              {windowSize.innerWidth > 479 ?
                  <div style={{
                    fontWeight: '700',
                    backgroundColor: "#ce651e",
                    fontSize: "18px",
                    color: "#fff",
                    paddingLeft: "20px",
                    marginTop: '8vh',
                    marginBottom: "3vh",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }} className=" ">
                    CLIENTS WHO VIEWED THIS ARTIST ALSO VIEWED</div> : null
              }
              <div className="pl-2">
              {
                windowSize.innerWidth < 479 ?
                  tab === 1 ? (<div>
                    <div
                      className="imagecont"
                      style={{ marginTop: 10 }}
                    >
                      {Object.keys(similarData).length > 0 ?
                        Object.keys(similarData).map((key, i) =>
                          <div className="talentthumbslide resp">
                            <Link
                              id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                              data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                              className="card_img3"
                              // style={{ position: "relative" }}
                              to={key}
                            >
                              <div className="detail_card6_h">
                                <img
                                  src={String(similarData[key].mainImage)}
                                  loading="lazy"
                                  alt=""
                                  className="image"
                                  style={{ width: "100%", }} />
                                <div className="artistnamediv">
                                  <div className="artistnametext-v3" style={{padding:"6px 0px"}}>
                                    {similarData[key].firstname} {similarData[key].lastname} 
                                  </div>
                                </div>
                                {/* <p className="card_img_text3 pb-3 pt-1">
                                  {similarData[key].lastname} {similarData[key].firstname}</p> */}
                              </div>
                            </Link>
                         </div>
                        )
                        : "NO SIMILAR IMAGES FOUND"
                      }
                    </div>
                    {/* <div style={{ textAlign: "center", margin: "25px 10px 10px" }}>
                      <Link
                        to="#"
                        style={{ fontSize: "16px" }}
                        className="talentbuttonArtistSearch col-3 mr-1"
                        onClick={() => setArtistSimilar(artistSimilar + 8)}
                      >
                        See More
                      </Link>
                    </div> */}
                  </div>) : null
                  :
                  <div className="detail_card2 my-2">
                    {Object.keys(similarData).length > 0
                      ? Object.keys(similarData).map((key, i) => 
                      (
                        <Link
                          id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                          data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                          className="card_img3"
                          // style={{ position: "relative" }}
                          to={key}
                        >
                          <div className="detail_card6_h">
                            <img
                              src={String(similarData[key].mainImage)}
                              loading="lazy"
                              alt=""
                              className="image"
                              style={{ width: "100%", }} />
                            <div className="artistnamediv">
                              <div className="artistnametext-v3" style={{padding:"6px 0px"}}>
                                {similarData[key].firstname} {similarData[key].lastname}
                              </div>
                            </div>
                            {/* <p className="card_img_text3 pb-3 pt-1">
                              {similarData[key].lastname} {similarData[key].firstname}</p> */}
                          </div>
                        </Link>
                      ))
                      : "NO SIMILAR IMAGES FOUND"
                    }
                    </div>
                  }
              </div>
              {/* ENDING of Similar Artist */}

              {/* Starting of Recently Viewed */}
              {/* Starting of Recently Viewed */}

              {windowSize.innerWidth > 479 ?
                  <div style={{
                    width: "100%",
                    fontWeight: '700',
                    backgroundColor: "#ce651e",
                    fontSize: "18px",
                    color: "#fff",
                    paddingLeft: "20px",
                    marginTop: '8vh',
                    marginBottom: "3vh",

                  }} className="py-2 ">RECENTLY VIEWED</div>
                : null
              }
              {
                  windowSize.innerWidth < 479 ?
                  null :
                  (
                    <div className="detail_card2 my-2">

                      {Object.keys(dataViewed).length > 0
                        ? Object.keys(dataViewed).map((key, i) => 
                        i<=18 && dataViewed[key].subListData?
                        (

                          <Link
                          id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                          data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                          className="card_img3"
                          to={key}
                        >
                          <div className="detail_card6_h">
                            <img
                              src={String(dataViewed[key].subListData[0])}
                              loading="lazy"
                              alt=""
                              className="image"
                              style={{ width: "100%", }} />
                            <div className="artistnamediv">
                              <div className="artistnametext-v3" style={{padding:"6px 0px"}}>
                              {dataViewed[key].title}
                              </div>
                            </div>
                          </div>
                        </Link>
                        ): null)
                        : ""
                      }

                    </div>
                  )}

              {/* Ending of Recently Viewed */}
              {/* Ending of Recently Viewed */}

              </div>
          </div>
        </>
      ) :
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <img
            className="mb-3"
            alt="loading"
            src={loading}
          />
        </div>
      }
    </div>

    {/* END OF ROWS AND COLUMN */}
    {/* END OF ROWS AND COLUMN */}
    {/* END OF ROWS AND COLUMN */}
    {/* END OF ROWS AND COLUMN */}
    {/* END OF ROWS AND COLUMN */}


    <div className="contactpage mt-5 pt-2" >
      {isPopupShow && isPopupShowWithCheckbox? (
        <MyPopup
          BackClose
          onClose={() => {
            saveCartMessage(!isCheckboxChecked) 
            setIsPopupShow(false);
          }}
        >
          <div className="mx-5 my-4">
            <div>{msg}</div>
            <div class="form-check form-switch mt-2" style={{ display: "flex" }}> 
              <input 
                class="form-check-input" 
                type="checkbox" 
                id="flexSwitchCheckDefault" 
                style={{cursor:"pointer",accentColor:"#BC6127"}}
                checked={isCheckboxChecked}
                onClick={()=> { setIsCheckboxChecked(!isCheckboxChecked);}}
                />
              <label class="form-check-label" for="flexSwitchCheckDefault" style={{paddingTop:"5px"}}>Do not show this again</label>
            </div>
          </div>
          <div className="cartBadgeSearchArtist" onClick={() => {
            saveCartMessage(!isCheckboxChecked) 
            setIsPopupShow(false);
          }} >x</div>
        </MyPopup>
      ) : isPopupShow && !isPopupShowWithCheckbox?
      <MyPopup
          BackClose
          onClose={() => {
            setIsPopupShowWithCheckbox(true);
            setIsPopupShow(false);
          }}
        >
          <div className="mx-5 my-4">
            <div>{msg}</div>
          </div>
          <div className="cartBadgeSearchArtist" onClick={() => {
            saveCartMessage(!isCheckboxChecked) 
            setIsPopupShow(false);
          }} >x</div>
        </MyPopup> : null
      }
    </div>
  </div>
  );
}

export default SearchByArtist;

