const express = require("express");
const router = express.Router();
const { sendAllData, sendError, customError } = require("../../statics");
const {
	addMuseum,
	removeMuseum,
	getMuseumById,
	getMuseumsByUserId,
	changeMuseumData,
	newReleaseByMuseumId,
} = require("./db");

router.post("/getMuseum", (req, res) => {
	const { museumId } = req.body;

	getMuseumById(museumId)
		.then((museum) => {
			if (museum.owner_id !== req._payload.user.id)
				throw customError("ACCESS_BLOCKED");
			return museum;
		})
		.then((museum) => ({ museum }))
		.then(sendAllData(res))
		.catch(sendError(res));
});

router.post("/getMuseums", (req, res) => {
	const {
		user: { id },
	} = req._payload;
	getMuseumsByUserId(id)
		.then((museums) => ({ museums }))
		.then(sendAllData(res))
		.catch(sendError(res));
});

router.post("/changeMuseumData", (req, res) => {
	const { museumId, changes } = req.body;

	changeMuseumData(museumId, changes)
		.then(sendAllData(res))
		.catch(sendError(res));
});

router.post("/addMuseum", (req, res) => {
	const { name, location } = req.body;
	const {
		user: { id },
	} = req._payload;
	addMuseum(id, name, location)
		.then((addedMuseum) => ({ addedMuseum }))
		.then(sendAllData(res))
		.catch(sendError(res));
});

router.post("/removeMuseum", (req, res) => {
	const { museumId } = req.body;

	removeMuseum(museumId).then(sendAllData(res)).catch(sendError(res));
});

router.post("/newReleaseMuseum", (req, res) => {
	const { museumId } = req.body;

	newReleaseByMuseumId(museumId).then(sendAllData(res)).catch(sendError(res));
});

module.exports = router;
