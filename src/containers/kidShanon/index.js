import React, { useEffect, useState } from 'react'
import { Redirect, useParams, useHistory } from 'react-router-dom'
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
import { artistIfExist } from "../../AxiosFunctions/Axiosfunctionality"


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
    const history = useHistory()
    const divisions = ["MIDDLE-GRADE","PICTURE-BOOK","MULTICULTURAL","BLACK-AND-WHITE-INTERIOR","CHARACTER-DEVELOPMENT","EDUCATIONAL"]

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

        if(pages == undefined){
            localStorage.setItem("Category","none")
            localStorage.setItem("Bipoc","none")
            localStorage.removeItem("routePaths");
        }

        if(pages == "divisions"){
            const route = [{val:"Home",link:"./"},{val:"Divisions",link:"./divisions"}]

            localStorage.setItem("routePaths",JSON.stringify(route))
            localStorage.setItem("Category","none")
            localStorage.setItem("Bipoc","none")
        }
        if(divisions.includes(pages)){
            localStorage.setItem("Category",pages.charAt(0).toUpperCase() + pages.slice(1) )
            const letter = pages.charAt(0).toUpperCase() + pages.slice(1);
            const route = [{val:"Home",link:"./"},{val:"Divisions",link:"./divisions"},{val:letter,link:"./"+pages}]
            localStorage.setItem("routePaths",JSON.stringify(route))
            localStorage.setItem("Bipoc","none")
        }

        if(pages == "categories"){
            console.log(localStorage.getItem("Category"))
            const route = [{val:"Home",link:"./"},{val:"Categories",link:"./categories"}]
            localStorage.setItem("routePaths",JSON.stringify(route))
            localStorage.setItem("Bipoc","none")
            if(search){
                const path = localStorage.getItem("Category")
                const route = [{val:"Home",link:"./"},{val:"Categories",link:"./categories"},{val:path,link:"./categories/"+search}]
                localStorage.setItem("routePaths",JSON.stringify(route))
                localStorage.setItem("Bipoc","none")
            }
        }

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

    const artistIfExistHandler = async () => {
        await artistIfExist({fullName: pages}).then((res) => {
            if(res.length > 0){
                return true
            }else if(res.length == 0){
                return false
            }else{
                history.push("/404")
            }
        })
    }

    useEffect(() => {
        filterChange()
        dispatch(keywordDataApi("kid"));
    }, [])

    return (
        <>
            <Header aciveBtn={pages} kid={"kid"} />
            <div className={(artistIfExistHandler()?"talentsection":"homesection")+" wf-section "+(pages?"divisions":"")}>
                <div className={"containerhome "+(artistIfExistHandler()?"":"home")}>
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
                        <Sidebar activeBtn={"categories"} />
                    </SearchByCategories>
                    :<Categories searchArtist={searchArtist}>
                        <Sidebar activeBtn={pages} />
                    </Categories>
                    :pages === "artists"? 
                        search?
                        <SearchByArtist>
                            <Sidebar activeBtn="detailedPage" />
                        </SearchByArtist>
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
                    :artistIfExistHandler()?
                        <SearchByArtist>
                            <Sidebar activeBtn="detailedPage" />
                        </SearchByArtist>
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
