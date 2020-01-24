import React, { Fragment, useState, useEffect } from 'react';
import LinkItem from '../layout/LinkItem';
import axios from 'axios';
import array from 'lodash/array';

const Home = () => {
    // Create Component State
    const [state, setState] = useState({
        searchBar: null,
        longUrl: null,
        loading: false,
        shortUrls: [],
    });
    const { searchBar, shortUrls } = state;
    
    const onChange = (e) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value })
    }
    
    
    
    
    
    // Checks local storage on load
    useEffect(() => {
        if (localStorage.getItem('Converted-Links') !== null) {
            let list = JSON.parse(localStorage.getItem('Converted-Links'));            
            setState({ shortUrls: state.shortUrls.concat(list)})    
        }
        // eslint-disable-next-line
    }, []);

    
    
     
    
    
    
    const onSubmit = async (e) => {
        e.preventDefault();
        
        // Make this an Action in the contextState file
        setState({...state, loading: true})
        
        // Config for axios
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post('/api/short', { longUrl: state.searchBar }, config);
        const response = {
            id: res.data.id,
            shortUrl: 'http://localhost:5000/r/' + res.data.hashedUrl,
            longUrl: searchBar,
        }
        console.log(response);
        // Set/Append the state to local storage 
        let list = JSON.parse(localStorage.getItem('Converted-Links'));
        if(list === null) list = [];
        list.push(response);
        const uniqueList = array.uniqBy(list, 'longUrl');
        // Set the response to state
        setState({ ...state, shortUrls: uniqueList, loading: false });
        localStorage.setItem("Converted-Links", JSON.stringify(uniqueList));
        
        
        
    };

    
    
    if(state.loading) {
        return <Fragment>Loading....</Fragment>
    }

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
        
        {/* If array Exists loop through and create link components */}
        {state.shortUrls !== null &&
            <div className='container'>
                <h4>Converted Links</h4>
                <ul className='convertedLinks'>
                   {shortUrls.map(url => (
                       <LinkItem key={url.id} data={url} />
                   ))}
                </ul>
            </div>
        }
        </Fragment>
    )
};

export default Home;