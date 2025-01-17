import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getKeywordKidShanon } from '../../AxiosFunctions/Axiosfunctionality'
import loading from '../../assets/loading.gif';
import { IMAGE_ROUTE,artistImageNavSliceData } from '../../AxiosFunctions/Axiosfunctionality';

const images = window.location.origin + "/assets/images"

function NavBarArtist(props) {

  const { pages } = useParams()

  const [data,setData] = useState(null)
  const [dataOriginal,setDataOriginal] = useState(null)
  const [dataLoad,setDataLoad] = useState(true)
  const [tempArtist,setTempArtist]= useState([]);  
  const [filterHighlighted,setFilterHighlighted]= useState(null);
  const [filterCond, setFilterCond] = useState(true);

  const filterChange= (filter) => {
    console.log("W")
    let tempData = [...data];
    setDataOriginal([...data])
    if(filter==="A-Z"){
      setFilterCond(false)
      setFilterHighlighted(2)
      tempData = tempData.sort((a, b) => a.artistId.lastname.normalize().localeCompare(b.artistId.lastname.normalize()));

    }
    else if (dataOriginal){
      setFilterHighlighted(1)
      setFilterCond(true)
      tempData = [...dataOriginal];
      // tempData = dataOriginal;
    }

    setData(tempData);

  }

  useEffect(() => {
    localStorage.setItem("Category",props.currPage )
    const letter = props.currPage
    const route = [{val:"Home",link:"./"},{val:"Divisions",link:"./divisions"},{val:letter,link:"./"+pages}]
    localStorage.setItem("routePaths",JSON.stringify(route))
    localStorage.setItem("Bipoc","none")

    setDataLoad(true)
    setFilterHighlighted(null)
    artistImageNavSliceData({ keyword: props.currPage, type: 2 }).then((res)=>{
      setData(res)
      setDataLoad(false)
    })

  }, [props.currPage]);


  const updateTempArtist = (e)=>{
    if(data && e){
      const searchvalue = e.toLowerCase();
      setTempArtist( data !== undefined ? data.filter(function (element) {
          let checker = false
          if(element.artistId.firstname.toLowerCase().includes(searchvalue) || element.artistId.lastname.toLowerCase().includes(searchvalue)){
              checker = true
          }
          return checker;
   
      }):[]);
    }
}

  useEffect(() => {
    localStorage.setItem("Category",props.currPage)
    console.log("kidShannon",pages)
    updateTempArtist(props.searchArtist)
  }, [props.searchArtist,pages]);



  return (
    <> 
      <div class="sortingcont right pt-0 mt-0">
        <div className="d-flex right-filter-button">
          <a class={filterHighlighted == 1 ? "filter-button sort-active w-inline-block  mt-0" : (filterHighlighted == 2)? "filter-button w-inline-block  mt-0" : "filter-button sort-active w-inline-block  mt-0"} style={{ marginLeft: "0px" }} onClick={()=>filterChange("Default")}>
            <div >FEATURED</div>
          </a>
          <a class={filterHighlighted == 2 ? "filter-button sort-active mt-0 me-0" : "filter-button mt-0 me-0"} onClick={()=>filterChange("A-Z")}>
            <div >ALPHABETICAL A-Z</div>
          </a>
        </div>
      </div>
    <div className="_2cols2_" style={{clear:"both"}}>
    {props.children}
    <div id="w-node-_4a165d69-02be-f2c1-10f5-69fa4946403e-576fcec6" className="divisionscolumn">
      <div id="w-node-_4a165d69-02be-f2c1-10f5-69fa4946403f-576fcec6" className="divisioncontainer">
       
      <div id="w-node-_4a165d69-02be-f2c1-10f5-69fa49464043-576fcec6" className="_4cols-v2">
        { dataLoad ?
        (
          <div style={{ position: "absolute", top: "50%", left: "50%" }}>
            <img
              className="mb-3"
              alt="loading"
              src={loading}
            />
          </div>
        ) :
        data && props.searchArtist === "" ?  (
          data.map((val, ind) => (
            <>
              <Link
                id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                to={val.artistId.fullName}
                className="artistcard  w-inline-block"
              >
                <img
                  src={String(val.mainImage[0].subImage[0].path)}
                  loading="lazy"
                  alt=""
                  className="image"
                />
                {/* <p className="card_img_text2"> 
                {val.artistId.firstname} {val.artistId.lastname} </p> */}
                {/* <div className="artistnamediv">
                  <div className="artistnametext">
                    {val.artistId.firstname} {val.artistId.lastname} 
                  </div>
                </div> */}
                <div className="artistnamediv">
                  <div className="artistnametext-v3">
                  {val.artistId.firstname}  {val.artistId.lastname} 
                  </div>
                </div>
              </Link>
              </>
        )))
        : 
        (
          tempArtist.map((val, ind) => (
            <>
              <Link
                id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                to={val.artistId.fullName}
                className="artistcard  w-inline-block"
              >
                <img
                  src={String(val.mainImage[0].subImage[0].path)}
                  loading="lazy"
                  alt=""
                  className="image"
                />
                {/* <p className="card_img_text2 pt-2">
                {val.artistId.firstname} {val.artistId.lastname} </p> */}
                {/* <div className="artistnamediv">
                  <div className="artistnametext">
                    {val.artistId.firstname} {val.artistId.lastname} 
                  </div>
                </div> */}
                <div className="artistnamediv">
                  <div className="artistnametext-v3">
                  {val.artistId.firstname}  {val.artistId.lastname} 
                  </div>
                </div>
              </Link>
              </>
        )))
        
        }
        </div>
      </div>
    </div>
  </div>
   </>
  )
}

export default NavBarArtist
