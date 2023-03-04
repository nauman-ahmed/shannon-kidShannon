import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import ArtistSideBar from '../../components/layout/artistSideBar'
import DivisionSideBar from '../../components/layout/divisionSideBar'
import Footer from '../../components/layout/footer'
import Header from '../../components/layout/header'
import Navbar from '../../components/layout/navbarKid'
import About from './about'
import Artists from './artists'
import Contact from './contact'
import Divisions from './divisions'
import Categories from './categories'
import NavBarArtist from './navBarPagesArtist'
import SearchByArtist from './searchPages/searchByArtist'
import SearchByDivision from './searchPages/searchByDivision'
import SearchByCategories from './searchPages/searchByCategories'


import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import SnackbarCustom from '../../components/snackBar/SnackbarCustom'
import { ArtistDataAPI } from '../../redux/artistDataSlice'
import { ArtistImageSliceData } from '../../redux/artistImageDataSlice'
import { keywordDataApi } from '../../redux/keywordSlice'
import Sidebar from '../../components/layout/sidebar'
import { getKeywordKidShanon } from '../../AxiosFunctions/Axiosfunctionality'

function IndexKid(props) {
    const navList = [
        "MIDDLE GRADE","PICTURE BOOK","MULTICULTURAL","BLACK AND WHITE CULTURAL","CHARACTER DEVELOPMENT","EDUCATIONAL"
    ];
    const Filters = [
        "DEFAULT",
        "ALPHABATICAL (A-Z)",
        "ALPHABATICAL (Z-A)",
        "NEW ARTISTS",
        "UPDATED PORTFOLIOS"
    ];
    const { pages } = useParams()
    const { search } = useParams()

    const [data,setData] = useState(null)

    const filterChange=()=>{
        let tempData = null;
        if(localStorage.getItem("filter")==="ALPHABATICAL (A-Z)"){
            tempData = data.sort((a, b) => a.artistId.firstname.normalize().localeCompare(b.artistId.firstname.normalize()));
        }
        else if(localStorage.getItem("filter")==="ALPHABATICAL (Z-A)"){
            tempData = data.sort((a, b) => a.artistId.firstname.normalize().localeCompare(b.artistId.firstname.normalize()));
            tempData.reverse();
        }
        else if(localStorage.getItem("filter")==="NEW ARTISTS"){
            tempData = data.sort((a, b) => a.artistId.date.localeCompare(b.artistId.date));
        }
        else if(localStorage.getItem("filter")==="UPDATED PORTFOLIOS"){
            tempData = data.sort((a, b) => a.artistId.date.localeCompare(b.artistId.date));
        }
        else{
            tempData = data;
            localStorage.setItem("filter","DEFAULT")
        }
        setData(tempData);
    }
    useEffect(()=>{
        setData(null)
        getKeywordKidShanon({keyword:search}).then((res)=>{
            setData(res)
        })
    },[search])
    
    useEffect(() => {
        setSearchArtist("")
    }, [pages,search])

    const dispatch = useDispatch();
    const  {artistImageDataSlice} = useSelector(state=>state);
    const  {artistImageKeywordDataSlice} = useSelector(state=>state);


    const [searchArtist,setSearchArtist] = useState("");
    const [tempArtist,setTempArtist]= useState([]);

    const [searchDivision,setSearchDivision] = useState("");
    const [tempDivision,setTempDivision]= useState([]);


    const updateTempArtist = (e)=>{
        setSearchArtist(e.target.value);
        const searchvalue = e.target.value.toLowerCase();
        setTempArtist( artistImageDataSlice !== undefined ?artistImageDataSlice.artistImages.filter(function (element) {
            return element.artistId.firstname.toLowerCase().includes(searchvalue);
        }):[]);

    }
    const updateTempDivision = (e)=>{
        setSearchDivision(e.target.value);
        const searchvalue = e.target.value.toLowerCase();
        setTempDivision( artistImageKeywordDataSlice !== undefined ?artistImageKeywordDataSlice.artistKeywordImages.filter(function (element) {
            return element.keyword.toLowerCase().includes(searchvalue);
        }):[]);

    }

    useEffect(() => {
        filterChange()
        dispatch(ArtistDataAPI("kid"));
        dispatch(keywordDataApi("kid"));
    }, [])

    return (
        <>
            <Header aciveBtn={pages} kid={"kid"} />
            <div className={(pages === "artists"?"talentsection":"homesection")+" wf-section "+(pages?"divisions":"")}>
                <div className={"containerhome "+(pages !== "artists"?"home":"")}>
                    <Navbar navList={navList} aciveBtn={pages} searchBar={true}  searchArtist={searchArtist} kid={"kid"} updateTempArtist={updateTempArtist}/>
                    {pages?
                    pages === "divisions"?
                        search?
                        <SearchByDivision> 
                            <Sidebar activeBtn={pages} />
                        </SearchByDivision>
                        :<Divisions searchArtist={searchArtist}>
                            <Sidebar activeBtn={pages} />
                        </Divisions>
                    :pages === "categories"?
                    search?
                    <SearchByCategories searchArtist={searchArtist}> 
                        <Sidebar activeBtn={pages} />
                    </SearchByCategories>
                    :<Categories searchArtist={searchArtist}>
                        <Sidebar activeBtn={pages} />
                    </Categories>
                    :pages === "artists"?
                        search?
                        <SearchByArtist/>
                        :<Artists>
                            <ArtistSideBar kid={"kid"}/>
                        </Artists>
                    :pages === "MIDDLE-GRADE"?
                        <NavBarArtist searchArtist={searchArtist} currPage= "Middle Grade Cover">
                            <Sidebar activeBtn={pages} />
                        </NavBarArtist>
                    :pages === "PICTURE-BOOK"?
                    <NavBarArtist searchArtist={searchArtist} currPage= "Picture Book">
                        <Sidebar activeBtn={pages} />
                    </NavBarArtist>
                    :pages === "MULTICULTURAL"?
                    <NavBarArtist searchArtist={searchArtist} currPage= "Multicultural">
                        <Sidebar activeBtn={pages} />
                    </NavBarArtist>
                    :pages === "BLACK-AND-WHITE-INTERIOR"?
                    <NavBarArtist searchArtist={searchArtist} currPage= "Black and White Interior">
                        <Sidebar activeBtn={pages} />
                    </NavBarArtist>
                    :pages === "CHARACTER-DEVELOPMENT"?
                    <NavBarArtist searchArtist={searchArtist} currPage= "Character Development">
                        <Sidebar activeBtn={pages} />
                    </NavBarArtist>
                    :pages === "EDUCATIONAL"?
                    <NavBarArtist searchArtist={searchArtist} currPage= "Educational">
                        <Sidebar activeBtn={pages} />
                    </NavBarArtist>
                    :pages === "about"?
                        <About/>
                    :pages === "contact"?
                        <Contact/>
                    // :pages === "bipoc"?
                    //     <Bipoc/>
                    :<Redirect to="/404"/>
                    :<Artists  tempArtist={tempArtist} searchArtist={searchArtist}>
                        <ArtistSideBar activeBtn={pages} kid={"kid"}/>
                    </Artists>
                    }
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default IndexKid