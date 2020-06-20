const { db, serverError } = require("../../statics");

exports.addMuseum = (userId, name, location) =>
	new Promise((resolve, reject) => {
		addMuseum(userId, name, location)
			.then(() => getLastMuseumByData(userId, name, location))
			.then(resolve)
			.catch(reject);
	});

exports.removeMuseum = (museumId) =>
	new Promise((resolve, reject) => {
		db.run(
			`DELETE FROM museums
            WHERE id=?`,
			[museumId],
			(run, err) => {
				if (run || err) return reject(serverError());
				resolve();
			}
		);
	});

exports.getMuseumById = (id) =>
	new Promise((resolve, reject) => {
		db.get(
			`SELECT id, owner_id, name, location, update_id updateId FROM museums
            WHERE id=?`,
			[id],
			(err, museum) => {
				if (err) return reject(serverError());

				resolve(museum);
			}
		);
	});

exports.getMuseumsByUserId = (userId) =>
	new Promise((resolve, reject) => {
		db.all(
			`SELECT id, name, location, icon_name iconName, update_id updateId
            FROM museums 
            WHERE owner_id=?`,
			[userId],
			(err, museums) => {
				if (err) return reject(serverError());

				resolve(museums);
			}
		);
	});

exports.changeMuseumData = (id, changes) =>
	new Promise((resolve, reject) => {
		const key = Object.keys(changes)[0];
		db.run(
			`UPDATE museums 
            SET ${key}=?
            WHERE id=?`,
			[changes[key], id],
			(run, err) => {
				if (run || err) reject(serverError());
				resolve();
			}
		);
	});

exports.getMuseumsByNamePattern = (name) =>
	new Promise((resolve, reject) => {
		db.all(
			`SELECT id, name, location, update_id updateId
            FROM museums
            WHERE name LIKE ? AND updateId != 0`,
			[`%${name}%`],
			(err, museums) => {
				if (err) return reject(serverError());

				resolve(museums);
			}
		);
	});

exports.checkId = (id) =>
	new Promise((resolve, reject) => {
		if (id !== -1) return resolve(id);

		db.get(
			`SELECT id 
            FROM museums
            ORDER BY id DESC
            LIMIT 1`,
			(err, row) => {
				if (err) return reject(serverError());
				if (!row) return resolve(-1);
				resolve(row.id);
			}
		);
	});

exports.newReleaseByMuseumId = (museumId) =>
	new Promise((resolve, reject) => {
		let releaseId;
		getLastReleaseIdByMuseumId(museumId)
			.then((rid) => (releaseId = rid))
			.then(() =>
				setReleaseIdByMuseumId(museumId, releaseId + 1, releaseId)
			)
			.then(
				() =>
					new Promise((resolve, reject) => {
						db.run(
							`INSERT INTO pictures_old
                    SELECT id, museum_id, name, description, qrcode, ?
                    FROM pictures
                    WHERE museum_id=? AND include_release=1`,
							[releaseId, museumId],
							(run, err) => {
								if (run || err) return reject({});
								resolve({});
							}
						);
					})
			)
			.then(
				() =>
					new Promise((resolve, reject) => {
						db.run(
							`INSERT INTO pictures_info_old
                    SELECT *, ?
                    FROM pictures_info
                    WHERE picture_id IN
                    (
                        SELECT id FROM pictures WHERE museum_id=? AND include_release=1
                    )`,
							[releaseId, museumId],
							(run, err) => {
								if (run || err) return reject({});

								resolve({});
							}
						);
					})
			)
			.then(
				() =>
					new Promise((resolve, reject) => {
						db.run(
							`DELETE FROM pictures_release
                    WHERE museum_id=?`,
							[museumId],
							(run, err) => {
								if (run || err) return reject({});

								resolve({});
							}
						);
					})
			)
			.then(
				() =>
					new Promise((resolve, reject) => {
						db.run(
							`DELETE FROM pictures_info_release
                    WHERE picture_id IN
                    (
                        SELECT id FROM pictures WHERE museum_id=?
                    )`,
							[museumId],
							(run, err) => {
								if (run || err) return reject({});

								resolve({});
							}
						);
					})
			)
			.then(
				() =>
					new Promise((resolve, reject) => {
						db.run(
							`INSERT INTO pictures_info_release
                    SELECT id, picture_id, title, description, language
                    FROM pictures_info
                    WHERE picture_id IN
                    (
                        SELECT id FROM pictures WHERE museum_id=? AND include_release=1
                    )`,
							[museumId],
							(run, err) => {
								if (run || err) return reject({});

								resolve({});
							}
						);
					})
			)
			.then(
				() =>
					new Promise((resolve, reject) => {
						db.run(
							`INSERT INTO pictures_release
                    SELECT id, museum_id, name, description, qrcode
                    FROM pictures
                    WHERE museum_id=? AND include_release=1`,
							[museumId],
							(run, err) => {
								if (run || err) return reject({});

								resolve({});
							}
						);
					})
			)
			.then(resolve)
			.catch(reject);
	});

const addMuseum = (userId, name, location) =>
	new Promise((resolve, reject) => {
		db.run(
			`INSERT INTO museums (owner_id, name, location, icon_name)
            VALUES (?, ?, ?, ?)`,
			[userId, name, location, ""],
			(run, err) => {
				if (err || run) return reject(serverError());
				resolve();
			}
		);
	});

const getLastReleaseIdByMuseumId = (museumId) =>
	new Promise((resolve, reject) => {
		db.get(
			`SELECT update_id updateId
            FROM museums
            WHERE id=?`,
			[museumId],
			(err, row) => {
				if (err) return reject(serverError());

				resolve(row.updateId);
			}
		);
	});

const setReleaseIdByMuseumId = (museumId, releaseId, lastReleaseId) =>
	new Promise((resolve, reject) => {
		db.run(
			`UPDATE museums
            SET update_id=? 
            WHERE id=? AND update_id=?`,
			[releaseId, museumId, lastReleaseId],
			(run, err) => {
				if (run || err) return reject(serverError());
				resolve();
			}
		);
	});

const getLastMuseumByData = (userId, name, location) =>
	new Promise((resolve, reject) => {
		db.get(
			`SELECT id, name, location, icon_name iconName, update_id updateId
            FROM museums
            WHERE owner_id=? AND name=? AND location=? 
            ORDER BY id DESC
            LIMIT 1`,
			[userId, name, location],
			(err, museum) => {
				if (err || !museum) return reject({ error: SERVER_ERROR });
				resolve(museum);
			}
		);
	});
