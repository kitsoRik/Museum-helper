#ifndef DBC_H
#define DBC_H


#if !defined(KIT_OS_WASM)
#include <QtSql>
#endif
#include "Data/picture.h"
#include "Data/museum.h"
#include "Data/bigmuseum.h"
#include <QPixmap>

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
	void removeMuseum(const int &id);
	void savePicturesIcons(const int &museumId, const QList<int> &ids, const QList<QPixmap> &icons);

	void removeMuseumById(const int &id);

	QList<Museum> getSavedMuseums();
	bool getSavedMuseumById(const int &id, BigMuseum *b);

	bool checkPictureQrcode(const QString &qrcode);
	QList<Picture> getSavedPicturesByMuseumId(const int &museumId);
	QList<PictureInfo> getSavedPicturesInfoByPictureQrcode(const QString &qrcode);
	int getPictureIdByQrCode(const QString &qrcode);
	QList<PictureInfo> getSavedPicturesInfoByPictureId(const int &id);
	QImage getIconByMuseumId (const int &id);
	QList<QImage> getSavedPicturesIconsByPictureId(const int &id);
	QList<PictureInfo> getSavedPicturesInfoByMuseumId(const int &museumId);


private:
	static DBC* m_instance;

#if !defined(KIT_OS_WASM)
	QSqlDatabase db;
#endif
};

#endif // DBC_H
