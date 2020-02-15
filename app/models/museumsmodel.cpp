#include "museumsmodel.h"

MuseumsModel *MuseumsModel::m_instance = nullptr;

MuseumsModel::MuseumsModel(QObject *parent) : QAbstractListModel(parent)
{
	if(m_instance) throw std::runtime_error("Museums already create")

	m_instance = this;
}


int MuseumsModel::rowCount(const QModelIndex &parent) const
{
	return m_data.size();
}

QVariant MuseumsModel::data(const QModelIndex &index, int role) const
{
	switch (role)
	{
		case Qt::EditRole:
		case Qt::DisplayRole:
			return m_data[index.row()].
	}
}
