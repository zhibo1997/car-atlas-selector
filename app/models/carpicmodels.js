const axios = require('axios');
export default {
    namespace: "carpicI",
    state: {
        carlist: {},
        position: {
            color: "",
            album: "center",
            idx: 0,
            page: 0
        }
    },
    reducers: {
        init(state, { results }) {
            return {
                ...state,
                carlist: results,
                position: {
                    ...state.position,
                    color: Object.keys(results)[0],
                    idx: 0
                }
            }
        },
        changecolor(state, { payload }) {
            return {
                ...state,
                position: {
                    color: payload.color,
                    album: Object.keys(state.carlist[payload.color])[0],
                    idx: 0,
                    page: 0
                }
            }
        },
        changealbum(state, { payload }) {
            return {
                ...state,
                position: {
                    ...state.position,
                    album: payload.album,
                    idx: 0,
                    page: 0
                }
            }
        },
        changeidx(state, { payload }) {
            return {
                ...state,
                position: {
                    ...state.position,
                    idx: payload.idx,
                    page: parseInt(payload.idx / 6)
                }
            }
        },
        changepage(state, { payload }) {
            return {
                ...state,
                position: {
                    ...state.position,
                    page: payload.page
                }
            }
        },
        next(state) {
            let idx = state.position.idx,
                album = state.position.album,
                color = state.position.color;
            let albums = Object.keys(state.carlist[color]);
            let colors = Object.keys(state.carlist);
            const indexOf = (arr, n) => {
                let a=-1;
                arr.forEach((item,index)=>{
                    if(item==n) a=index
                })
                return a;
            }
            if (idx < state.carlist[color][album].length-1) {
                return {
                    ...state,
                    position: {
                        ...state.position,
                        idx: idx + 1,
                        page:parseInt((idx+1) / 6)
                    }
                }
            } else if (indexOf(albums, album) < albums.length-1) {
                return {
                    ...state,
                    position: {
                        ...state.position,
                        album: albums[indexOf(albums, album) + 1],
                        idx: 0,
                        page: 0
                    }
                }
            } else if (indexOf(colors, color) < colors.length-1) {
                return {
                    ...state,
                    position: {
                        color: colors[indexOf(colors, color) + 1],
                        album: Object.keys(state.carlist[colors[indexOf(colors, color) + 1]])[0],
                        idx: 0,
                        page: 0
                    }
                }
            } else {
                alert("已到最后一张");
                return state
            }
        },
        prev(state){
            let idx = state.position.idx,
                album = state.position.album,
                color = state.position.color;
            let albums = Object.keys(state.carlist[color]);
            let colors = Object.keys(state.carlist);
            const indexOf = (arr, n) => {
                let a=-1;
                arr.forEach((item,index)=>{
                    if(item==n) a=index
                })
                return a;
            }
            if (idx >0) {
                return {
                    ...state,
                    position: {
                        ...state.position,
                        idx: idx - 1,
                        page:parseInt((idx-1) / 6)
                    }
                }
            } else if (indexOf(albums, album) >0) {
                let albumprev=albums[indexOf(albums, album) - 1]
                return {
                    ...state,
                    position: {
                        ...state.position,
                        album: albumprev,
                        idx: state.carlist[color][albumprev].length-1,
                        page: parseInt((state.carlist[color][albumprev].length-1)/6)
                    }
                }
            } else if (indexOf(colors, color) >0) {
                let colorprev=colors[indexOf(colors, color) - 1],
                albumlast=Object.keys(state.carlist[colorprev]).slice(-1);
                return {
                    ...state,
                    position: {
                        color: colorprev,
                        album: Object.keys(state.carlist[colorprev]).slice(-1),
                        idx: state.carlist[colorprev][albumlast].length-1,
                        page: parseInt((state.carlist[colorprev][albumlast].length-1)/6)
                    }
                }
            } else {
                alert("已到第一张");
                return state;
            }
        }
    },
    effects: {
        *initcar({ payload }, { put }) {
            const { results } = yield axios.get('./api').then(data => data.data);
            yield put({ type: "init", results })
        }
    }
}