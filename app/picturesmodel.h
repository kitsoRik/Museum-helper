#ifndef PICTURESMODEL_H
#define PICTURESMODEL_H

#include "Data/picture.h"
#include <QAbstractListModel>

class PicturesModel : public QAbstractListModel
{
	Q_OBJECT
public:
	enum MyRoles
	{
		TitleRole = Qt::UserRole + 1,
		TextRole,
		IconRole
	};

	Q_ENUMS(MyRoles)

	explicit PicturesModel(QObject *parent = nullptr);

	Q_INVOKABLE inline Picture pictureAt(const int &index) {
		return m_pictures.at(index);
	}
	Q_INVOKABLE inline QVariant pictureDataAt(const int &index, const int &role) {
		return data(createIndex(index, 0), role);
	}
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

private:
	QList<Picture> m_pictures;

	static PicturesModel *m_instance;
};

#endif // PICTURESMODEL_H
