#include "dbc.h"
#include <QThread>

DBC* DBC::m_instance = nullptr;

DBC::DBC() :
	db(QSqlDatabase::addDatabase("QSQLITE"))
{
	if(m_instance) throw new std::runtime_error("DBC already created");

	m_instance = this;

	QThread *t = new QThread();
	this->moveToThread(t);
	t->start(QThread::Priority::HighestPriority);

	db.setHostName("host");
	db.setDatabaseName("nice.db");
	db.setUserName("kitsoRik");
	db.setPassword("kitsoRik");

	qDebug() << "DB OPEN" << db.open("kitsoRik", "kitsoRik");

	db.exec("CREATE TABLE IF NOT EXISTS 'saved_museums' ('id' INTEGER NOT NULL, 'name' TEXT NOT NULL, 'location' TEXT NOT NULL, 'update_id' INTEGER NOT NULL, 'icons_saved' INTEGER NOT NULL)");
	db.exec("CREATE TABLE IF NOT EXISTS 'saved_pictures' ('id'	INTEGER NOT NULL, 'museum_id' INTEGER NOT NULL,'qrcode' TEXT NOT NULL);");
	db.exec("CREATE TABLE IF NOT EXISTS 'saved_picturesInfo' ('id' INTEGER NOT NULL, 'picture_id' INTEGER NOT NULL, 'title' TEXT NOT NULL, 'description' TEXT NOT NULL, 'language'	TEXT NOT NULL );");
	db.exec("CREATE TABLE IF NOT EXISTS 'saved_picturesIcons' ('id'	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, 'picture_id' INTEGER NOT NULL,'icon' BLOB NOT NULL);");

}
QList<Museum> DBC::getSavedMuseums()
{
	QSqlQuery query(db);

	QString queryStr = QString("SELECT * FROM saved_museums");

	if(!query.exec(queryStr)) {
		qDebug() << query.lastError();
	}

	QList<Museum> museums;

	while (query.next()) {
		QSqlRecord record = query.record();

		Museum m(record.value(0).toInt(), record.value(1).toString(), record.value("updateId").toInt(), record.value("iconsSaved").toInt() == 1);

		museums.append(m);
	}
	return museums;
}

bool DBC::getSavedMuseumById(const int &id, BigMuseum *b)
{
	QSqlQuery query(db);

	query.prepare("SELECT * FROM saved_museums WHERE id=? LIMIT 1");
	query.addBindValue(id);

	if(!query.exec()) qDebug() << query.lastError();

	if(query.next()) {
		QSqlRecord record = query.record();

		b->setId(record.value(0).toInt());
		b->setName(record.value(1).toString());
		b->setUpdateId(record.value("update_id").toInt());
		b->setHasIcons(record.value("icons_saved").toInt() == 1);
		return true;
	}

	return false;
}

bool DBC::checkPictureQrcode(const QString &qrcode)
{
	QSqlQuery query(db);

	query.prepare("SELECT COUNT(id) FROM saved_pictures "
				  "WHERE qrcode=?");
	query.addBindValue(qrcode);
	query.exec();

	query.next();
	int count = query.record().value(0).toInt();
	return count != 0;
}

QList<Picture> DBC::getSavedPicturesByMuseumId(const int &museumId)
{
	QSqlQuery query(db);

	query.prepare("SELECT p.id, p.museum_id, pi.title, p.qrcode, i.icon FROM saved_pictures p LEFT JOIN saved_picturesIcons i ON ( i.id = ( SELECT min(id) FROM saved_picturesIcons WHERE picture_id = p.id ) ) LEFT JOIN saved_picturesInfo pi ON ( pi.id = ( SELECT id FROM saved_picturesInfo WHERE picture_id=p.id ORDER BY CASE WHEN language=? then 1 ELSE 2 END ) ) WHERE p.museum_id=?");
	query.addBindValue("ukrainian");
	query.addBindValue(museumId);
	if(!query.exec()) qDebug() << query.lastError();

	QList<Picture> pictures;

	while(query.next())
	{
		QSqlRecord record = query.record();
		int id = record.value("id").toInt();
		QString name = record.value("title").toString();
		QString qrcode = record.value("qrcode").toString();
		QPixmap pix;
		pix.loadFromData(record.value("icon").toByteArray());
		pictures.append(Picture(id, name, qrcode, pix.toImage()));
	}

	return pictures;
}

QList<PictureInfo> DBC::getSavedPicturesInfoByPictureQrcode(const QString &qrcode)
{
	QSqlQuery query(db);

	query.prepare("SELECT * FROM saved_picturesInfo WHERE picture_id IN (SELECT id FROM saved_pictures WHERE qrcode=?)");
	query.addBindValue(qrcode);
	query.exec();

	QList<PictureInfo> picturesInfo;

	while(query.next())
	{
		QSqlRecord record = query.record();
		int id = record.value(0).toInt();
		int pictureId = record.value(1).toInt();
		QString title = record.value(2).toString();
		QString description = record.value(3).toString();
		QString language = record.value(4).toString();

		picturesInfo.append(PictureInfo(title, description, language));
	}

	return picturesInfo;
}

QList<PictureInfo> DBC::getSavedPicturesInfoByPictureId(const int &id)
{
	QSqlQuery query(db);

	query.prepare("SELECT * FROM saved_picturesInfo WHERE picture_id=?");
	query.addBindValue(id);
	query.exec();

	QList<PictureInfo> picturesInfo;

	while(query.next())
	{
		QSqlRecord record = query.record();
		int id = record.value(0).toInt();
		int pictureId = record.value(1).toInt();
		QString title = record.value(2).toString();
		QString description = record.value(3).toString();
		QString language = record.value(4).toString();

		picturesInfo.append(PictureInfo(title, description, language));
	}

	return picturesInfo;
}

QImage DBC::getIconByMuseumId(const int &id)
{
	QSqlQuery query(db);

	query.prepare("SELECT icon FROM saved_picturesIcons WHERE picture_id=? LIMIT 1");
	query.addBindValue(id);
	query.exec();

	QImage icon;

	if(query.next())
	{
		QSqlRecord record = query.record();
		QByteArray icond = record.value(0).toByteArray();

		QPixmap p;
		p.loadFromData(icond);
		icon = p.toImage();
	}

	return icon;
}

QList<QImage> DBC::getSavedPicturesIconsByPictureId(const int &id)
{
	QSqlQuery query(db);

	query.prepare("SELECT icon FROM saved_picturesIcons WHERE picture_id=?");
	query.addBindValue(id);
	query.exec();

	QList<QImage> icons;

	while(query.next())
	{
		QSqlRecord record = query.record();
		QByteArray icon = record.value(0).toByteArray();

		QPixmap p;
		p.loadFromData(icon);
		icons.append(p.toImage());
	}

	return icons;
}

QList<PictureInfo> DBC::getSavedPicturesInfoByMuseumId(const int &museumId)
{
	QSqlQuery query(db);

	query.prepare("SELECT * FROM saved_picturesInfo WHERE picture_id IN (SELECT id FROM saved_pictures WHERE museum_id=?)");
	query.addBindValue(museumId);
	query.exec();

	QList<PictureInfo> picturesInfo;

	while(query.next())
	{
		QSqlRecord record = query.record();
		int id = record.value(0).toInt();
		int pictureId = record.value(1).toInt();
		QString title = record.value(2).toString();
		QString description = record.value(2).toString();
		QString language = record.value(2).toString();

		picturesInfo.append(PictureInfo(title, description, language));
	}

	return picturesInfo;
}

void DBC::saveMuseum(const int &id,
					 const QString &name,
					 const int &updateId,
					 const QJsonArray &pictures,
					 const QJsonArray &picturesInfo)
{
	QSqlQuery query(db);
	query.prepare("INSERT INTO saved_museums (id, name, location, update_id, icons_saved) VALUES (?, ?, ?, ?, 0)");
	query.addBindValue(id);
	query.addBindValue(name);
	query.addBindValue("");
	query.addBindValue(updateId);

	if(!query.exec()) qDebug() << query.lastError();

	for(auto ref : pictures)
	{
		QJsonObject refo = ref.toObject();
		int p_id = refo["id"].toInt();
		int p_museumId = refo["museumId"].toInt();
		QString p_qrcode = refo["qrcode"].toString();

		query.prepare("INSERT INTO saved_pictures (id, museum_id, qrcode)"
					  "VALUES (?, ?, ?)");
		query.addBindValue(p_id);
		query.addBindValue(p_museumId);
		query.addBindValue(p_qrcode);

		if(!query.exec()) qDebug() << query.lastError();
	}

	for(auto ref : picturesInfo)
	{
		QJsonObject refo = ref.toObject();
		int p_id = refo["id"].toInt();
		int p_pictureId = refo["pictureId"].toInt();
		QString p_title = refo["title"].toString();
		QString p_description = refo["description"].toString();
		QString p_language = refo["language"].toString();

		query.prepare("INSERT INTO saved_picturesInfo (id, picture_id, title, description, language)"
					  "VALUES (?, ?, ?, ?, ?)");
		query.addBindValue(p_id);
		query.addBindValue(p_pictureId);
		query.addBindValue(p_title);
		query.addBindValue(p_description);
		query.addBindValue(p_language);

		if(!query.exec()) qDebug() << query.lastError();
	}
}

void DBC::removeMuseum(const int &id)
{
	QSqlQuery query(db);

	query.prepare("DELERE FROM saved_museums WHERE museum_id=?");
	query.addBindValue(id);
	if(!query.exec()) qDebug() << query.lastError();

	query.prepare("DELERE FROM saved_picturesInfo WHERE picture_id ON (SELECT id FROM saved_pictures WHERE museum_id=?)");
	query.addBindValue(id);
	if(!query.exec()) qDebug() << query.lastError();

	query.prepare("DELERE FROM saved_picturesIcons WHERE pictures_id ON (SELECT id FROM saved_pictures WHERE museum_id=?)");
	query.addBindValue(id);
	if(!query.exec()) qDebug() << query.lastError();

	query.prepare("DELERE FROM saved_pictures WHERE museum_id=?");
	query.addBindValue(id);
	if(!query.exec()) qDebug() << query.lastError();
}

void DBC::savePicturesIcons(const int &museumId,
							const QList<int> &ids,
							const QList<QPixmap> &icons)
{
	QSqlQuery query(db);

	for(int i = 0; i < ids.size(); i++)
	{
		int id = ids[i];
		QPixmap pix = icons[i];
		query.prepare("INSERT INTO saved_picturesIcons (picture_id, icon) VALUES (?, ?)");

		QByteArray inByteArray;
		QBuffer inBuffer( &inByteArray );
		inBuffer.open( QIODevice::WriteOnly );
		pix.save( &inBuffer, "PNG" );
		query.addBindValue(id);
		query.addBindValue(inByteArray);
		if(!query.exec()) qDebug() << query.lastError();
	}

	query.prepare("UPDATE saved_museums SET icons_saved = 1 WHERE id=?");
	query.addBindValue(museumId);
	if(!query.exec()) qDebug() << query.lastError();
}

void DBC::removeMuseumById(const int &id)
{
	QSqlQuery query(db);

	query.prepare("DELETE FROM saved_museums WHERE id=?");
	query.addBindValue(id);
	if(!query.exec()) qDebug() << query.lastError();

	query.prepare("DELETE FROM saved_picturesInfo WHERE picture_id IN (SELECT id FROM saved_pictures WHERE museum_id=?)");
	query.addBindValue(id);

	if(!query.exec()) qDebug() << query.lastError();

	query.prepare("DELETE FROM saved_picturesIcons WHERE picture_id IN (SELECT id FROM saved_pictures WHERE museum_id=?)");
	query.addBindValue(id);

	if(!query.exec()) qDebug() << query.lastError();

	query.prepare("DELETE FROM saved_pictures WHERE museum_id=?");
	query.addBindValue(id);

	if(!query.exec()) qDebug() << query.lastError();
}

