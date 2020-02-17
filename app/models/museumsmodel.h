#ifndef MUSEUMSMODEL_H
#define MUSEUMSMODEL_H

#include <QAbstractListModel>
#include "Data/museum.h"

class MuseumsModel : public QAbstractListModel
{
	Q_OBJECT
public:
	enum Roles {
		NameRole = Qt::UserRole + 1,
		MuseumIdRole
	};

	explicit MuseumsModel(QObject *parent = nullptr);

	static MuseumsModel* instance() { return m_instance; }

	int rowCount(const QModelIndex &parent) const override;
	QVariant data(const QModelIndex &index, int role) const override;

public slots:
	void setMuseums (const QList<Museum> museums);

signals:

private:

	QList<Museum> m_data;

	static MuseumsModel *m_instance;


	// QAbstractItemModel interface
public:
	QHash<int, QByteArray> roleNames() const override;
};

#endif // MUSEUMSMODEL_H
