// Import Libraries
import { HashRouter, Route, Switch } from "react-router-dom";
import 'react-image-crop/dist/ReactCrop.css'

// Import Resources
import SignInUp from "./containers/signInUp/signInUp";
import Artist from "./containers/artist/artist";
import Image_uploading from "./containers/artist/image_uploading";
import Admin from "./containers/admin/admin";
// import Index from "./containers/clientSite";
import Page404 from "./containers/kidShanon/404";
import PrivateRoute from "./containers/PrivateRoute";
import PrivateArtistRoute from "./containers/PrivateArtistRoute";
import { setAuthToken } from "./AxiosFunctions/setCommonHeader";
import Admin_update from "./containers/admin/Image_uploading";
import ForgetPassword from "./containers/signInUp/forgetPassword";
import { useEffect } from "react";

import IndexKid from "./containers/kidShanon";






function App() {

  return ( 
  <>
    <HashRouter>
      <Switch>
        <Route
            exact
            path="/"
            name="Kid"
            render={(props) => 
              {
                console.log(props)
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
                if (props.match.params.pages === "admin") {
                  return <Admin/>
                }
                else if (props.match.params.pages === "artist"){
                  return <Artist/>
                }
                else if (props.match.params.pages === "404"){
                  return <Page404/>
                }
                else if (!props.match.params.pages){
                  return <Artist/>
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
                  }else if (props.match.params.pages === "divisions"){
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
    </HashRouter>
  </>
  );
}

export default App;
