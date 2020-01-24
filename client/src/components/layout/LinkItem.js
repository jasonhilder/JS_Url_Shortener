import React from 'react';

const LinkItem = ({ data: {shortUrl, longUrl}}) => {

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

    return (
        <li className='link'>
            <span className='longLink'>
               {longUrl}
            </span>
            <br />
            <span>
                <span className='shortLink' id='short-link'>{shortUrl}</span>
                <span className='copy'><button className='btn' onClick={copyLink}>Copy</button></span>
            </span>
        </li>
    )
}

export default LinkItem;