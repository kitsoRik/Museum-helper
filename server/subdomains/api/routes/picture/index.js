const express = require("express");
const router = express.Router();
const { sendAllData, sendError, customError } = require("../../statics");
const multer = require("multer");
const {
	addPictureInfo,
	removePictureInfoById,
	getPictureInfo,
	changePictureInfo,
	addIconToPicture,
	deleteIconFromPictureById,
} = require("./db");
const { processFileToFilename } = require("../../utils");
const { changePicture } = require("../pictures/db");
const { getMuseumById } = require("../museums/db");

router.post("/getPictureData", (req, res) => {
	const { id } = req.body;
	getPictureInfo(id)
		.then(async (p) => {
			const museum = await getMuseumById(p.picture.museum_id);
			if (museum.owner_id !== req._payload.user.id)
				throw customError("ACCESS_BLOCKED");
			return p;
		})
		.then(sendAllData(res))
		.catch(sendError(res));
});

router.post("/savePictureInfo", (req, res) => {
	const { id, changes } = req.body;

	changePictureInfo(id, changes)
		.then((changes) => ({ changes }))
		.then(sendAllData(res))
		.catch(sendError(res));
});

router.post("/addPictureInfo", (req, res) => {
	const { pictureId, title = "", description = "", language } = req.body;
	addPictureInfo(pictureId, title, description, language)
		.then((addedPictureInfo) => ({ addedPictureInfo }))
		.then(sendAllData(res))
		.catch(sendError(res));
});

router.post("/removePictureInfo", (req, res) => {
	const { id } = req.body;
	removePictureInfoById(id).then(sendAllData(res)).catch(sendError(res));
});

router.post("/savePictureData", (req, res) => {
	const { id, changes } = req.body;
	changePicture(id, changes)
		.then((changes) => ({ changes }))
		.then(sendAllData(res))
		.catch(sendError(res));
});

router.post(
	"/addIconToPicture",
	multer({ dest: "uploads" }).single("icon"),
	(req, res) => {
		const { id } = req.body;

		processFileToFilename(req.file)
			.then((filename) => addIconToPicture(id, filename))
			.then((icon) => ({ icon }))
			.then(sendAllData(res))
			.catch(sendError(res));
	}
);

router.post(
	"/deleteIconFromPicture",
	multer({ dest: "uploads" }).single("icon"),
	(req, res) => {
		const { id } = req.body;

		deleteIconFromPictureById(id)
			.then(sendAllData(res))
			.catch(sendError(res));
	}
);

module.exports = router;
