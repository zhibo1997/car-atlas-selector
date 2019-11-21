import React from 'react';
import { connect } from 'dva';
import classnames from "classnames"

import Carpic from "./carpic"
class Piclist extends React.Component {
    constructor(props) {
        super(props);
        props.dispatch({ type: "carpicI/initcar" })
    }
    // componentDidMount(){
    //     $()
    // }
    render() {
        const
            position = this.props.position ? this.props.position : {
                color: "",
                album: "",
                idx: 0
            },
            carlist = this.props.carlist ? this.props.carlist : "",
            color = position.color,
            album = position.album,
            colorlist = Object.keys(carlist),
            albuminfo = carlist[color] ? carlist[color] : "",
            albumlist = Object.keys(albuminfo),
            piclist = albuminfo ? albuminfo[album]:""

        const albummap = {
            "view": "外观",
            "center": "内饰",
            "detail": "细节"
        }
        return <div className="piclist">
            <h2>奥迪</h2>
            <div className="typemodel">
                {
                    albumlist.map((item, index) => (
                        <span key={index}
                            className={classnames({ cur: album == item })}
                            onClick={() => this.props.dispatch({ type: "carpicI/changealbum", payload: { album: item } })}
                        >{albummap[item]}({albuminfo[item].length})</span>
                    ))
                }
            </div>
            <div className="colormodel">
                {
                    colorlist.map((item, index) => (
                        <span key={index} style={{ backgroundColor: item }} className={classnames({ cur: color == item })}
                            onClick={() => this.props.dispatch({ type: "carpicI/changecolor", payload: { color: item } })}
                        ></span>
                    ))
                }
            </div>
            <Carpic piclist={piclist} position={position}></Carpic>
            <button onClick={()=>this.props.dispatch({type: "carpicI/next"})}>=></button>
            <button onClick={()=>this.props.dispatch({type: "carpicI/prev"})}>asasass</button>
        </div>
    }
}
export default connect(({ carpicI }) => ({
    carlist: carpicI.carlist,
    position: carpicI.position
}))(Piclist)