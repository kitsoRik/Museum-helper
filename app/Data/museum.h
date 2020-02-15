#ifndef MUSEUM_H
#define MUSEUM_H

#include <QJsonObject>

class Museum
{
public:
	Museum(const QJsonObject &json);

	inline QString name () const { return m_name; }
	inline QString host () const { return m_host; }

private:
	QString m_name;
	QString m_host;

};

#endif // MUSEUM_H
