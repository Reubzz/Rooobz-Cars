// check api origin here 
require('dotenv').config()
const { allowed_hosts } = require('../../config.json')

exports.checkOrigin = async (req, res, next) => {
    const host = req.headers.host;

    if (allowed_hosts.includes(host)) {
        res.setHeader('Access-Control-Allow-Origin', host);
        next();
    } else {
        // Deny requests from other domains
        res.status(403).json({ message: 'Forbidden: Request host not allowed' });
    }
}