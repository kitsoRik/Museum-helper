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

	db.exec("CREATE TABLE IF NOT EXISTS 'saved_museums' ('id' INTEGER NOT NULL, 'name' TEXT NOT NULL, 'location' TEXT NOT NULL, 'update_id' INTEGER NOT NULL)");
	db.exec("CREATE TABLE IF NOT EXISTS 'saved_pictures' ('id'	INTEGER NOT NULL, 'museum_id' INTEGER NOT NULL,'qrcode' TEXT NOT NULL);");
	db.exec("CREATE TABLE IF NOT EXISTS 'saved_picturesInfo' ('id' INTEGER NOT NULL, 'picture_id' INTEGER NOT NULL, 'title' TEXT NOT NULL, 'description' TEXT NOT NULL, 'language'	TEXT NOT NULL );");

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

		Museum m(record.value(0).toInt(), record.value(1).toString(), record.value("updateId").toInt());

		museums.append(m);
	}
	return museums;
}

bool DBC::getSavedMuseumById(const int &id, Museum *m)
{
	QSqlQuery query(db);

	query.prepare("SELECT * FROM saved_museums WHERE id=? LIMIT 1");
	query.addBindValue(id);

	if(!query.exec()) qDebug() << query.lastError();

	if(query.next()) {
		QSqlRecord record = query.record();
		*m = Museum(record.value(0).toInt(), record.value(1).toString(), record.value("update_id").toInt());
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

	query.prepare("SELECT * FROM saved_pictures "
				  "WHERE museum_id=?");
	query.addBindValue(museumId);
	query.exec();

	QList<Picture> pictures;

	while(query.next())
	{
		QSqlRecord record = query.record();
		int id = record.value(0).toInt();
		QString name = record.value(1).toString();
		QString qrcode = record.value(2).toString();
		pictures.append(Picture(id, name, qrcode));
	}

	return pictures;
}

QList<PictureInfo> DBC::getSavedPicturesInfoByPictureQrcode(const QString &qrcode)
{
	QSqlQuery query(db);

	query.prepare("SELECT * FROM saved_picturesInfo WHERE picture_id=(SELECT id FROM saved_pictures WHERE qrcode=?)");
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

QList<PictureInfo> DBC::getSavedPicturesInfoByMuseumId(const int &museumId)
{
	QSqlQuery query(db);

	query.prepare("SELECT * FROM saved_picturesInfo WHERE picture_id=(SELECT id FROM saved_pictures WHERE museum_id=?)");
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
	query.prepare("INSERT INTO saved_museums (id, name, location, update_id) VALUES (?, ?, ?, ?)");
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

void DBC::removeMuseumById(const int &id)
{
	QSqlQuery query(db);

	query.prepare("DELETE FROM saved_museums WHERE id=?");
	query.addBindValue(id);
	qDebug() << "DEL";
	if(!query.exec()) qDebug() << query.lastError();

	query.prepare("DELETE FROM saved_picturesInfo WHERE picture_id=(SELECT id FROM saved_pictures WHERE museum_id=?)");
	query.addBindValue(id);

	if(!query.exec()) qDebug() << query.lastError();

	query.prepare("DELETE FROM saved_pictures WHERE museum_id=?");
	query.addBindValue(id);

	if(!query.exec()) qDebug() << query.lastError();
}

