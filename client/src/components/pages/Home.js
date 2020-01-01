import React, { Fragment, useState, useEffect } from 'react';
import LinkItem from '../layout/LinkItem';
import axios from 'axios';

const Home = () => {
    // Create Component State
    const [ state, setState ] = useState({
        searchBar: null,
        longUrl: null,
        shortUrl: null,
        shortUrls: null,
        hash: null
    });

    // Checks local storage on load
    useEffect(() => {
        if(localStorage.getItem('Converted-Links') !== null) {
            let list = JSON.parse(localStorage.getItem('Converted-Links'));
            setState({ ...state, longUrl: Object.values(list[0])[0], shortUrl: Object.values(list[0])[1], shortUrls: list})
            console.log(Object.values(list[0])[1]);
        }
        // eslint-disable-next-line
    }, []);

    const onChange = (e) => {
        e.preventDefault();
        setState({...state, [e.target.name]:e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post('/api/short', {longUrl: state.searchBar}, config);
        const short_url = 'http://localhost:8080/'+res.data.hashedUrl

        //Store to localstorage, It overwrites on each store so we check first and create an array
        let existingEntries = JSON.parse(localStorage.getItem('Converted-Links'));
        if (existingEntries === null) existingEntries = [];
        // Create our new entry and append to array
        const entry = { longUrl: state.searchBar, shortUrl: short_url };
        existingEntries.push(entry);
        // Store new array
        localStorage.setItem('Converted-Links', JSON.stringify(existingEntries));

        // Set the response to state
        setState({ ...state, hash: res.data.hashedUrl, longUrl: state.searchBar  , shortUrl: short_url, shortUrls: existingEntries });
        
    };

    return (
        <Fragment>
        <div className='container'>
            <div className='homeHeader'>
                <h1> URL Shortener </h1>
            </div>
        </div>
        <div className='container'>
            <div>
                <form onSubmit={onSubmit}>
                    <input  className='searchBar' name='searchBar' type='text' placeholder='Shorten Your Link' onChange={onChange}/>
                    <input className='btn btn-lg shortenButton' type='submit' value='Shorten' />
                </form>
            </div>
        </div>

        {/* Need to dynamically load a input bar with the short url if the state has a hashedUrl & Possibly store to local storage & add transitions */}
            {state.shortUrls !== null && (
                state.shortUrls.map((link) => (
                    <LinkItem link={link} />
                )) 
            )}
        </Fragment>
    )
};

export default Home;