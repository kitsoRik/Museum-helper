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
		IconRole
	};

	Q_ENUMS(MyRoles)

	explicit PicturesModel(QObject *parent = nullptr);

	Q_INVOKABLE int indexPictureAtQRCode(const QString &qrCode);

	inline const QList<Picture> &pictures() {
		return m_pictures;
	}
	void setPictures(QList<Picture> &pictures);


	int rowCount(const QModelIndex &) const override;
	QVariant data(const QModelIndex &index, int role) const override;

	QHash<int, QByteArray> roleNames() const override;

	inline static PicturesModel *instance() {
		return m_instance;
	}

signals:

public slots:
	void setCurrentIndex(const int &index) {
		PictureObject::instance()->setPicture(m_pictures[index]);
	}

private:
	QList<Picture> m_pictures;

	static PicturesModel *m_instance;
};

#endif // PICTURESMODEL_H
