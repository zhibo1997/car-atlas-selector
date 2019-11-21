import React from "react";
import {connect} from "dva";
import Piclist from "./piclist"

class App extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <Piclist></Piclist>
    }
}
export default connect()(App)