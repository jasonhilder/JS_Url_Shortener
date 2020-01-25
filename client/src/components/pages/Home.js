import React, { Fragment, useContext, useState, useEffect } from 'react';
import LinkItem from '../layout/LinkItem';
import AppContext from '../../context/app/appContext';


const Home = () => {
    // Init Context State
    const appContext = useContext(AppContext);
    // Destructure Context State
    const { loading, shortUrls } = appContext;
    // Create Component State
    const [search, setSearch] = useState('');
    
    const onChange = (e) => {
        e.preventDefault();
        setSearch({ [e.target.name]: e.target.value })
    }
    
    // Checks local storage on load
    useEffect(() => {
        appContext.checkStorage();
        // eslint-disable-next-line
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        appContext.setLoading();
        appContext.getUrl(search);
    };

    const onClear = (e) => {
        e.preventDefault();
        appContext.setLoading();
        appContext.clearStorage();
    };
    // Copy link Button
    const copyLink = (e) => {
        e.preventDefault();
        const link = document.getElementById('short-link');
        const textArea = document.createElement('textarea');
        textArea.value = link.innerText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('Copy');
        textArea.remove();
    }

    if(loading) {
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
        {shortUrls.length > 0  &&
            <div className='container'>
                <h4>Converted Links</h4>
                <ul className='convertedLinks'>
                   {shortUrls.map(url => (
                       <LinkItem key={url.id} data={url} />
                   ))}
                </ul>
                <div>
                    <button className='btn btn-clear' onClick={onClear}> Clear History </button>
                </div>
            </div>
            
        }
        </Fragment>
    )
};

export default Home;