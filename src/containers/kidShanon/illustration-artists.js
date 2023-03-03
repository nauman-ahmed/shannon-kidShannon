import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getKeywordKidShanon } from '../../AxiosFunctions/Axiosfunctionality'
import loading from '../../assets/loading.gif';
import { IMAGE_ROUTE } from '../../AxiosFunctions/Axiosfunctionality';

const images = window.location.origin + "/assets/images"

function IllustrationArtists(props) {

  const { search } = useParams();
  useEffect(() => {
    localStorage.setItem("filter", "DEFAULT")
  }, [])

  return (
    <>
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
        <div id="w-node-_4a165d69-02be-f2c1-10f5-69fa4946403e-576fcec6" className="divisionscolumn">
          <div id="w-node-_4a165d69-02be-f2c1-10f5-69fa4946403f-576fcec6" className="divisioncontainer">
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
               {search}
              </h5> <span style={{ width: "100%", height: "1px", color: "#ce651e", border: "1px solid #ce651e", marginTop: "8.5px", marginLeft: 6 }}></span>
            </div>
            {/* <div className="divisiondivider grad">
              <h2 className="divisionh2"></h2>
            </div> */}
            <div id="w-node-_4a165d69-02be-f2c1-10f5-69fa49464043-576fcec6" className="_4cols-v2">
              {props.data ?
                props.data.map((val, ind) =>
                  <Link id="w-node-_4a165d69-02be-f2c1-10f5-69fa49464049-576fcec6" to={"/kidshanon/artists/" + val.artistId.firstname} className="artistcard w-inline-block">
                    <img src={String(val.ImageData[0].mainImage[0].subImage[0].path)} loading="lazy" alt="" className="image" />
                    <div className="artistnamediv">
                                      <div className="artistnametext-v3">
                                      {val.artistId.firstname} {val.artistId.lastname}
                                      </div>
                                    </div>
                    {/* <div className="artistnamediv">
                      <div className="artistnametext">{val.artistId.firstname} {val.artistId.lastname}</div>
                    </div> */}
                  </Link>
                )
                :
                <div style={{ position: "absolute", top: "50%", left: "50%" }}><img className="mb-3" alt="loading" src={loading} style={{ width: "50px" }} /></div>
              }
            </div>
          </div>
        </div>
      </div></>
  )
}

export default IllustrationArtists