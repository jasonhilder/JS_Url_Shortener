import React from 'react';

const LinkItem = (link) => {
    
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
        <div className='container'>
            <h4>Converted Links</h4>
            <ul className='convertedLinks'>
                <li className='link'>
                    <span className='longLink'>
                        {link}
                    </span>
                    <br />
                    <span>
                        <span className='shortLink' id='short-link'>shortUrl</span>
                        <span className='copy'><button className='btn' onClick={copyLink}>Copy</button></span>
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default LinkItem;