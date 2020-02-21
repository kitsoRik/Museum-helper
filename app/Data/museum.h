#ifndef MUSEUM_H
#define MUSEUM_H

#include <QJsonObject>

class Museum
{
public:
	Museum() { }
	Museum(const int &id, const QString &name, const int &updateId, const int &iconsSaved);
	Museum(const QJsonObject &json);

	inline int id() const { return m_id; }
	inline QString name () const { return m_name; }
	inline int updateId() const { return m_updateId; }
	inline bool iconsSaved() const { return m_iconsSaved; }

private:
	int m_id;
	QString m_name;
	int m_updateId;
	bool m_iconsSaved;
};

#endif // MUSEUM_H
