#include "picturesmodel.h"
#include <QtDebug>

PicturesModel* PicturesModel::m_instance = nullptr;

PicturesModel::PicturesModel(QObject *parent) : QAbstractListModel(parent)
{
	if(m_instance)
		throw std::invalid_argument("Created second pictures model");

	m_instance = this;
}

int PicturesModel::indexPictureAtQRCode(const QString &qrCode)
{
	for(int i = 0; i < m_pictures.size(); i++)
	{
		if(m_pictures[i].qrcode() == qrCode)
			return i;
	}
	return -1;
}

void PicturesModel::setPictures(QList<Picture> &pictures)
{
	m_pictures = pictures;
	emit layoutChanged();
}

int PicturesModel::rowCount(const QModelIndex &) const
{
	return m_pictures.size();
}

QVariant PicturesModel::data(const QModelIndex &index, int role) const
{
	int row = index.row();

	switch (role)
	{
		case TitleRole:
			return m_pictures.at(row).title();
		case TextRole:
			return m_pictures.at(row).text();
		case IconRole:
			return m_pictures.at(row).icon();
		default:
			return QVariant();
	}
}

QHash<int, QByteArray> PicturesModel::roleNames() const
{
	QHash<int, QByteArray> hash;

	hash[TitleRole] = "title";
	hash[TextRole] = "text";
	hash[IconRole] = "icon";

	return hash;
}
