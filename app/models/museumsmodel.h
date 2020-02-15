#ifndef MUSEUMSMODEL_H
#define MUSEUMSMODEL_H

#include <QAbstractListModel>
#include "Data/museum.h"

class MuseumsModel : public QAbstractListModel
{
	Q_OBJECT
public:
	explicit MuseumsModel(QObject *parent = nullptr);

	static MuseumsModel* instance() { return m_instance; }

	int rowCount(const QModelIndex &parent) const override;
	QVariant data(const QModelIndex &index, int role) const override;

signals:

private:

	QList<Museum> m_data;

	static MuseumsModel *m_instance;

};

#endif // MUSEUMSMODEL_H
