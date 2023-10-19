// Import Libraries
import { HashRouter, Route, Switch, BrowserRouter } from "react-router-dom";
import 'react-image-crop/dist/ReactCrop.css'

// Import Resources
// import Index from "./containers/clientSite";
import Page404 from "./containers/kidShanon/404";
import PrivateRoute from "./containers/PrivateRoute";
import PrivateArtistRoute from "./containers/PrivateArtistRoute";
import { setAuthToken } from "./AxiosFunctions/setCommonHeader";
import { useEffect } from "react";
import { ArtistDataAPI } from './redux/artistDataSlice';
import { useDispatch,useSelector } from 'react-redux'

import IndexKid from "./containers/kidShanon";






function App() {
  const dispatch = useDispatch();
  const {artistDataAPI} = useSelector(state=>state)

  useEffect(()=>{
    if(artistDataAPI.artistData.length == 0){
      dispatch(ArtistDataAPI("kid"));
    }
  },[])
  localStorage.removeItem("artistViewedKid_V1");
  localStorage.removeItem("artistViewedKid_V2");
  localStorage.removeItem("artistViewedKid_V3");

  return ( 
  <>
    <BrowserRouter>
      <Switch>
        <Route
            exact
            path="/"
            name="Kid"
            render={(props) => 
              {
                if (props.match.params.pages !== "admin" || props.match.params.pages !== "artist") {
                  return <IndexKid/>
                }
                else{
                  return <Page404/>
                }
              }}
          />

          <Route
            exact
            path="/:pages"
            name="Home"
            render={(props) => 
              {
                
              
                if (props.match.params.pages === "404"){
                  return <Page404/>
                }
                else{
                  return <IndexKid/>
                }
          }}
          /> 
           <Route
            exact
            path="/:pages/:search"
            name="Home"
            render={(props) => 
              {
                if(props.match.params.search){
                  if (props.match.params.pages === "artists") {
                  return <IndexKid/>
                  }else if (props.match.params.pages === "divisions" || props.match.params.pages === "categories" ){
                    return <IndexKid/>
                  }
                  else if (props.match.params.pages === "illustration-artists"){
                    return <IndexKid/>
                  }
                  else{
                    return <Page404/>
                  }
                }
                else{
                  return <Page404/>
                }
          }}
          />
         
      </Switch>
    </BrowserRouter>
  </>
  );
}

export default App;
