import React from 'react';
import { connect } from 'dva';
import classnames from "classnames";

class Carpic extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let piclist = this.props.piclist;
        let picpage = [];
        let pics = [];
        let position = this.props.position,
            color = position.color,
            album = position.album,
            idx = position.idx,
            page = position.page;

        piclist && piclist.forEach((item, index) => {
            pics.push(<li key={index}><img 
                src={`./assets/images/Corolla/${color}/${album}/${item}`} 
                className={classnames({ cur: idx == index })} 
                onClick={()=>this.props.dispatch({type:"carpicI/changeidx",payload:{idx:index}})}
                /></li>);
            if ((index + 1) % 6 == 0 || (index + 1) == piclist.length) {
                picpage.push(<li key={(index + 1) % 6} className="picpage"><ul>{pics}</ul></li>);
                pics = [];
            }
        })
        return <div className="carpic" onMouseLeave={()=>{
            this.refs.ullist.style.left=`${-310*parseInt(idx/6)}px`,
            this.props.dispatch({type:"carpicI/changepage",payload:{page:parseInt(idx/6)}})}}>
            <ul ref="ullist" style={{left:`${-310*page}px`}}>
                {picpage}
            </ul>
            <ol>
                {
                    picpage.map((item,index)=>(
                        <li key={index} className={classnames({ cur: page == index ,hide : piclist.length<=6})}
                        onClick={()=>{
                            this.props.dispatch({type:"carpicI/changepage",payload:{page:index}});
                            this.refs.ullist.style.left=`${-310*index}px`
                        }}
                        ></li>
                    ))
                }
            </ol>
        </div>
    }
}
export default connect()(Carpic)