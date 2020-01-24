import React, { useReducer } from 'react';
import AppContext from './appContext';
// Import Reducer For Actions Here To Dispatch To
import AppReducer from './appReducer';
// Need Types
// *HERE*

// Create App Level State
const AppState = props => {
    const initialState = {
        searchBar: null,
        longUrl: null,
        shortUrl: null,
        shortUrls: null,
        hash: null
    }
};


const [state, dispatch] = useReducer(AppState, initialState);

