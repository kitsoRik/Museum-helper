const express = require("express");
const router = express.Router();
const { sendAllData, sendError } = require("../../statics");
const { getPictures, deletePicture, addPicture } = require("./db");

router.post("/getPicturesData", (req, res) => {
	const {
		searchParams: {
			searchText,
			sortedField,
			sortedType,
			museumId,
			updateId,
			pageNumber = 1,
			limit = 5,
		},
	} = req.body;

	getPictures(
		museumId,
		searchText,
		sortedField,
		sortedType,
		museumId,
		updateId,
		limit,
		pageNumber
	)
		.then((p) => {
			return p;
		})
		.then(sendAllData(res))
		.catch(sendError(res));
});

router.post("/deletePicture", (req, res) => {
	const {
		id,
		searchParams: {
			searchText,
			sortedField,
			sortedType,
			museumId,
			pageNumber,
			limit,
		},
	} = req.body;
	const userId = req._payload.user.id;
	deletePicture(id)
		.then(async () => {
			console.log("DTA");
			const data = await getPictures(
				userId,
				searchText,
				sortedField,
				sortedType,
				museumId,
				"current",
				limit,
				pageNumber
			);
			console.log(data);
			return data;
		})
		.then(sendAllData(res))
		.catch(sendError(res));
});

router.post("/addPicture", (req, res) => {
	const { museumId, name, description, qrcode } = req.body;

	addPicture(museumId, name, description, qrcode)
		.then((picture) => ({ picture }))
		.then(sendAllData(res))
		.catch(sendError(res));
});

module.exports = router;
