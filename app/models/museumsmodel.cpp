#include "museumsmodel.h"
#include <QDebug>

MuseumsModel *MuseumsModel::m_instance = nullptr;

MuseumsModel::MuseumsModel(QObject *parent) : QAbstractListModel(parent)
{
	if(!m_instance) m_instance = this;
}


int MuseumsModel::rowCount(const QModelIndex &parent) const
{
	return m_data.size();
}

QVariant MuseumsModel::data(const QModelIndex &index, int role) const
{
	int row = index.row();
	switch (role)
	{
		case NameRole: return m_data[row].name();
		case MuseumIdRole: return m_data[row].id();

		default: return QVariant();
	}
}

void MuseumsModel::setMuseums(const QList<Museum> museums)
{
	m_data = museums;
	emit layoutChanged();
}


QHash<int, QByteArray> MuseumsModel::roleNames() const
{
	QHash<int, QByteArray> hash;

	hash[NameRole] = "name";
	hash[MuseumIdRole] = "museumId";

	return hash;
}
