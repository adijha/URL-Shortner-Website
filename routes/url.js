const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');
const Store = require('../models/Shop');

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', async (req, res) => {
	const { longUrl } = req.body;
	const { followUp } = req.body;
	const { id } = req.body;
	const shop = 'mojitotest.myshopify.com';

	// console.log(followUp);

	const baseUrl = config.get('baseUrl');

	// Check base url
	if (!validUrl.isUri(baseUrl)) {
		return res.status(401).json('Invalid base url');
	}

	// Create url code
	const urlCode = shortid.generate();

	// Check long url /
	if (validUrl.isUri(longUrl)) {
		try {
			let url = await Url.findOne({ longUrl });

			if (url) {
				res.json(url);
			} else {
				const shortUrl = baseUrl + '/' + urlCode;

				url = new Url({
					longUrl,
					shortUrl,
					urlCode,
					followUp,
					id,
					shop
				});

				await url.save();

				res.json(url);
				console.log(url);
			}
		} catch (err) {
			console.error(err);
			res.status(500).json('Server error');
		}
	} else {
		res.status(401).json('Invalid long url');
	}
});

module.exports = router;
