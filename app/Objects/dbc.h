#ifndef DBC_H
#define DBC_H

#include <QtSql>
#include "Data/picture.h"
#include "Data/museum.h"

class DBC : public QObject
{
	Q_OBJECT
public:
	static DBC* instance() { return m_instance; }

	DBC();

	void saveMuseum(const int &id,
					const QString &name, const int &updateId,
					const QJsonArray &pictures,
					const QJsonArray &picturesInfo);

	void removeMuseumById(const int &id);

	QList<Museum> getSavedMuseums();
	bool getSavedMuseumById(const int &id, Museum *m);

	bool checkPictureQrcode(const QString &qrcode);
	QList<Picture> getSavedPicturesByMuseumId(const int &museumId);
	QList<PictureInfo> getSavedPicturesInfoByPictureQrcode(const QString &qrcode);
	QList<PictureInfo> getSavedPicturesInfoByPictureId(const int &id);
	QList<PictureInfo> getSavedPicturesInfoByMuseumId(const int &museumId);


private:
	static DBC* m_instance;

	QSqlDatabase db;
};

#endif // DBC_H
