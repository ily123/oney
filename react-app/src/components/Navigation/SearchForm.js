import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {search} from '../../store/search';
import {useHistory} from "react-router";

const SearchForm = () => {

const dispatch = useDispatch();
const history = useHistory();

const [searchKeyWord,setSearchKeyWord] = useState('')

const handleKeyPress = async (e) =>{
    // console.log(e)
    if (e.charCode === 13) {
        e.preventDefault();
        let resultFromSearch = await dispatch(search(searchKeyWord));
        if (resultFromSearch) {
            history.push('/search')
        }
    }
}

return (
    <form >
        <input className="searchForm"
            type="text"
            name="searchKeyWord"
            placeholder="Search Products"
            value={searchKeyWord}
            onChange={(e)=>setSearchKeyWord(e.target.value)}
            onKeyPress={(e)=> handleKeyPress(e)}/>
    </form>
)
}

export default SearchForm
