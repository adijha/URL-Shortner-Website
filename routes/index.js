const express = require('express');
const router = express.Router();

const Url = require('../models/Url');
const Store = require('../models/Shop');

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get('/:code', async (req, res) => {
	try {
		const url = await Url.findOne({ urlCode: req.params.code });

		if (url) {
			Store.updateOne(
				{ 'test.id': 1 },
				{
					$set: {
						'test.$.followUp': 6
					}
				},
				function(err, data) {
					if (!err) {
						console.log(data);
					} else {
						console.log(err);
					}
				}
			);
			return res.redirect(url.longUrl);
		} else {
			return res.status(404).json('No url found');
		}
	} catch (err) {
		console.error(err);
		res.status(500).json('Server error');
	}
});

module.exports = router;
