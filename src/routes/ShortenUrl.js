const router        = require('express').Router();
const Urls          = require('../../models/Urls');
const validUrl      = require('valid-url');
const crypto        = require('crypto');
const cfg           = require('../../config');


router.post('/short', async (req, res) => {

    // Check Is It Is A Valid URL (NOT GREAT!!)
    if (validUrl.isUri(req.body.longUrl)) {

        // Check Data Base For The URL
        const urlExist = await Urls.findOne({where: {longUrl: req.body.longUrl}});
        
        if (urlExist) {
            const { hashedUrl, id } = urlExist;
            // Make This Return the short URL Rather Than Generate A New One If Its There
            return res.status(200).json({
                msg: 'The URL already exists.',
                id: id,
                hashedUrl: hashedUrl
            });
        
        } else {
            try{
                // Create Hash Of URL
                const hashedUrl = crypto.scryptSync(req.body.longUrl, cfg.salt, 2);
                const mykey = hashedUrl.toString('hex');
                
                // Store Details In Variable For Database
                const url = {
                    longUrl: req.body.longUrl,
                    hashedUrl: mykey
                }
                // Then Create Entry
                await Urls.create(url);
                res.status(200).json({
                    msg: 'Url successfully stored and hashed',
                    hashedUrl: mykey
                })
            }catch(err){
                res.status(404).send(err);
            }
        };

    } else {
        res.status(401).json({ msg: "Invalid Url" });
    }
});

module.exports = router;