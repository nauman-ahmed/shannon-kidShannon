import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { IMAGE_ROUTE } from '../../AxiosFunctions/Axiosfunctionality';
import { artistKeyword } from '../../redux/artistImageKeywordDataSlice';
import loading from '../../assets/loading.gif';

const images = window.location.origin + "/assets/images"

function Divisions(props) {


  const dispatch = useDispatch();
  const { artistImageKeywordDataSlice } = useSelector(state => state);
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  useEffect(() => {
    dispatch(artistKeyword("kid")).then((res) => {
    })
  }, [])


  return (<>
    <div class="sortingcont right pt-0 mt-0">
      <a class="filter-button w-inline-block  mt-0" >
        <div >DEFAULT</div>
      </a>
      <a class="filter-button w-inline-block  mt-0" >
        <div >ALPHABETICAL A-Z</div>
      </a>
    </div>
    <div className="_2cols">
      {props.children}
      <div id="w-node-_6f42e407-456f-5b2f-82e4-417072db3669-84f2d081" className="divisionscolumn">
        {/* <div className="form-block-2 divisions w-form">
          <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form-2">
            <input type="text" className="searchbarhome w-input" maxLength="256" value={props.searchDivision} onChange={(e)=>{props.updateTempDivision(e)}} name="Search-2" data-name="Search 2" placeholder="SEARCH" id="Search-2" />
            <Link to="#" className="link-block-3 w-inline-block"></Link>
          </form>
          <div className="w-form-done">
            <div>Thank you! Your submission has been received!</div>
          </div>
          <div className="w-form-fail">
            <div>Oops! Something went wrong while submitting the form.</div>
          </div>
        </div> */}
        <div id="w-node-_429c632c-0632-16be-f5b5-f2b7200da64a-84f2d081" className="divisioncontainer">
          {artistImageKeywordDataSlice.loading ?
            <div style={{ position: "absolute", top: "50%", left: "50%" }}>
              <img className="mb-3" alt="loading" src={loading} style={{ width: "50px" }} /></div>
            :
            artistImageKeywordDataSlice.artistKeywordImages !== undefined ? props.searchDivision === "" ?

              artistImageKeywordDataSlice.artistKeywordImages.map((item, key) => (
                <>
                  {item.ImageData.length > 0 ? (<>
                    <div className="d-flex mt-0 mb-2">
                      <h5 className=" mt-0" style={{
                        display: 'flex', whiteSpace: 'nowrap',
                        fontFamily: 'Roboto, sans-serif',
                        color: '#ce651e',
                        fontSize: '1vw',
                        lineHeight: 1,
                        fontWeight: '500',
                        textAlign: 'left'
                      }}>
                        {
                         
                            item.keyword.toUpperCase()
                        }
                      </h5> <span style={{ width: "100%", height: "1px", color: "#ce651e", border: "1px solid #ce651e", marginTop: "7px", marginLeft: 6 }}></span>
                    </div>
                    {/* <div className="divisiondivider grad">
                      <h2 className="divisionh2">{item.keyword.toUpperCase()} </h2>
                    </div> */}
                    <div id="w-node-f734ee66-0b58-4c14-e08b-49ceded015c9-84f2d081" className="_4cols-v2">
                      {item.ImageData.map((item1, key1) => (
                        <>
                          {key1 <= 7 ? item1.artistId && (<>
                            <Link key={key1} id="w-node-f734ee66-0b58-4c14-e08b-49ceded015ca-84f2d081" to="#" className="artistcard w-inline-block">
                              <img src={String(item1.mainImage[0].subImage[0] && item1.mainImage[0].subImage[0].path)} loading="lazy" alt="" className="image" />
                             
                              <div className="artistnamediv">
                                      <div className="artistnametext-v3">
                                      {item1.artistId.firstname}  {item1.artistId.lastname} 
                                      </div>
                                    </div>
                            </Link>
                          </>) : (<></>)}

                        </>
                      ))}
                    </div>
                    <div className="divisionbuttoncontainer mb-5">
                      <Link to={"/divisions/" + item.Id} className="talentbutton w-button seemoreText">SEE MORE</Link>
                    </div>

                  </>) : ""}

                </>
              )) :

              props.tempDivision.map((item, key) => (
                <>
                  {item.ImageData.length > 0 ? (<>
                    <div className="d-flex mt-0 mb-2">
                      <h5 className=" mt-0" style={{
                        display: 'flex', whiteSpace: 'nowrap',
                        fontFamily: 'Roboto, sans-serif',
                        color: '#ce651e',
                        fontSize: '1vw',
                        lineHeight: 1,
                        fontWeight: '500',
                        textAlign: 'left'
                      }}>
                        {
                         
                            item.keyword.toUpperCase()
                        }
                      </h5> <span style={{ width: "100%", height: "1px", color: "#ce651e", border: "1px solid #ce651e", marginTop: "4.5px", marginLeft: 6 }}></span>
                    </div>
                    {/* <div className="divisiondivider grad">
                      <h2 className="divisionh2">{item.keyword.toUpperCase()}</h2>
                    </div> */}
                    <div id="w-node-f734ee66-0b58-4c14-e08b-49ceded015c9-84f2d081" className="_4cols-v2">
                      {item.ImageData.map((item1, key1) => (
                        <>
                          {key1 <= 7 ? (<>
                            <Link key={key1} id="w-node-f734ee66-0b58-4c14-e08b-49ceded015ca-84f2d081" to="#" className="artistcard w-inline-block"><img src={String(item1.mainImage[0].path)} loading="lazy" alt="" className="image" />
                             
                             
                            <div className="artistnamediv">
                                      <div className="artistnametext-v3">
                                      {item1.artistId.firstname}  {item1.artistId.lastname} 
                                      </div>
                                    </div> 
                            </Link>
                          </>) : (<></>)}

                        </>
                      ))}
                    </div>
                    <div className="divisionbuttoncontainer mb-5">
                      <Link to={"/divisions/" + item.keyword} className="talentbutton w-button seemoreText">SEE MORE</Link>
                    </div>

                  </>) : ""}

                </>
              ))

              : ""}



        </div>

      </div>
    </div></>
  )
}

export default Divisions