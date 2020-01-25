import React, { useReducer } from 'react';
import AppContext from './appContext';
import axios from 'axios';
import array from 'lodash/uniqBy';
import AppReducer from './appReducer';
import { 
    GET_URL,
    CHECK_STORAGE,
    SET_LOADING,
    CLEAR_STORAGE
} from '../types';

// Create App Level State
const AppState = props => {
    const initialState = {
        longUrl: null,
        loading: false,
        shortUrls: []
    }
    
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Set Loading
    const setLoading = () => {
        dispatch({ type: SET_LOADING });
    };

    // If Local Storage Exists Add to State
    const checkStorage = () => {
        // Check Local Storage
        if (localStorage.getItem('Converted-Links') !== null) {
            let list = JSON.parse(localStorage.getItem('Converted-Links'));
            dispatch({
                type: CHECK_STORAGE,
                payload: list
            })
        }
    };


    // Get Short Url
    const getUrl = async (search) => {
        const {searchBar} = search;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        // Hit Server Endpoint To Get Hashed Url
        const res = await axios.post('/api/short', { longUrl: searchBar }, config);
        const response = {
            id: res.data.id,
            shortUrl: 'http://localhost:5000/r/' + res.data.hashedUrl,
            longUrl: searchBar,
        }

        // Set/Append The State To A List Then To Local Storage 
        let list = JSON.parse(localStorage.getItem('Converted-Links'));
        if (list === null) list = [];
        list.push(response);
        const uniqueList = array(list, 'longUrl');
        localStorage.setItem("Converted-Links", JSON.stringify(uniqueList));
        
        dispatch({
            type: GET_URL,
            payload: uniqueList
        })

    };

    // Clear Local Storage
    const clearStorage = () => {
        localStorage.clear();
        dispatch({
            type: CLEAR_STORAGE
        })
    };

    return <AppContext.Provider value={{
        longUrl: state.longUrl,
        loading: state.loading,
        shortUrls: state.shortUrls,
        setLoading,
        checkStorage,
        clearStorage,
        getUrl
    }}>
        {props.children}
    </AppContext.Provider>

};

export default AppState;
