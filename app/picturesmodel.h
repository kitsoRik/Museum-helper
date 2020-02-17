#ifndef PICTURESMODEL_H
#define PICTURESMODEL_H

#include "Data/picture.h"
#include <QAbstractListModel>
#include <QtDebug>
#include "Objects/pictureobject.h"

class PicturesModel : public QAbstractListModel
{
	Q_OBJECT
public:
	enum MyRoles
	{
		NameRole = Qt::UserRole + 1,
		DescriptionRole,
		IconRole,
		IdRole
	};

	Q_ENUMS(MyRoles)

	inline static PicturesModel *instance() {
		return m_instance;
	}

	explicit PicturesModel(QObject *parent = nullptr);
	void setPictures(const QList<Picture> &pictures);

	int indexPictureAtQRCode(const QString &qrCode);

	int rowCount(const QModelIndex &) const override;
	QVariant data(const QModelIndex &index, int role) const override;

	QHash<int, QByteArray> roleNames() const override;

signals:

public slots:

private:
	QList<Picture> m_pictures;

	static PicturesModel *m_instance;
};

#endif // PICTURESMODEL_H
