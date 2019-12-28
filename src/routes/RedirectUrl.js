const router        = require('express').Router();
const Urls          = require('../../models/Urls');

router.get('/:url', async (req, res) => {
    // Search Database For Entry With Matching Hashed Url
    const storedUrl = await Urls.findOne({ where: { hashedUrl: req.params.url } });
    
    if (!storedUrl) {
        
        res.status(404).json({ msg: 'This url does not exist in the database.' })

    } else {
        
        // Destructure Object Returned For Original Url
        const { longUrl } = storedUrl;

        try {

            res.status(301).redirect(longUrl);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error.')
        }
    }
    
});

module.exports = router;