import axios from 'axios';
import { useHistory } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import SearchIcon from '../../img/searchIcon.png'
import "../../stylesheet/globalSearch.css"


const GlobalSearchBar = () => {
    // console.log("globalSearch", props)
    const history = useHistory();
    const getOptions = (query)=>{
        let token = localStorage.getItem('token');
        if(query.length===0)return [];
        return new Promise((resolve,reject)=>{
            axios({
                url:process.env.REACT_APP_API_SERVER+'/api/friends/search/'+query,
                headers: { Authorization: `Bearer ${token}` },

            }).then((data)=>{
                //console.log('get options',data);
                resolve(data.data.map((user)=>{
                    return {
                        name:user.username,
                        username:user.username,
                        value:user.id,
                        imgPath:user.imgPath,
                        id:user.id
                    }
                }));
            }).catch((error)=>{
                reject(error);
            })
        })
    }
    const handleRedProfile = (username)=>{
        //console.log('handle red global search ',username);
        history.push('/'+username);
    }
    return (
        <div className="globalSearch-input-container">
            <img className="global-search-icon" src={SearchIcon} alt="SearchIcon" />
            <SelectSearch options={[]} getOptions={getOptions}   placeholder="Search CatchUp" search
                renderOption={(props, value) => {
                    //console.log('render option', value, props)
                    if(value.type){
                        return (
                            <p style={{color:'black'}}>{value.username}</p>
                        )
                    }
                    return (<div style={{ display: 'flex', fontSize: '20px', color: 'black', padding: '8px' ,cursor:'pointer'}}
                        key={value.id}
                    onClick={handleRedProfile.bind(this,value.username)}> 
                        <img style={{ height: '50px',width:'50px', borderRadius: '50%' }} src={process.env.REACT_APP_API_SERVER+value.imgPath} alt="" />
                        
                        <p style={{ marginLeft: '20px' }}>{value.username}</p>
                    </div>)
                }} />
        </div>
    )
}

export default GlobalSearchBar




