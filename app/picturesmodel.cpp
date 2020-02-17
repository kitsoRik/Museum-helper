#include "picturesmodel.h"
#include <QtDebug>

PicturesModel* PicturesModel::m_instance = nullptr;

PicturesModel::PicturesModel(QObject *parent) : QAbstractListModel(parent)
{
	if(m_instance)
		throw std::runtime_error("Created second pictures model");

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

void PicturesModel::setPictures(const QList<Picture> &pictures)
{
	qDebug() << pictures.size();
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
		case NameRole: return m_pictures.at(row).name();
		case IconRole: return m_pictures.at(row).icon();
		case IdRole: return m_pictures.at(row).id();
		default: return QVariant();
	}
}

QHash<int, QByteArray> PicturesModel::roleNames() const
{
	QHash<int, QByteArray> hash;

	hash[NameRole] = "name";
	hash[DescriptionRole] = "description";
	hash[IconRole] = "icon";
	hash[IdRole] = "id";

	return hash;
}
