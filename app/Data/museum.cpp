#include "museum.h"

Museum::Museum(const int &id, const QString &name, const int &updateId)
{
	m_id = id;
	m_name = name;
	m_updateId = updateId;
}

Museum::Museum(const QJsonObject &json)
	: Museum(
		  json["id"].toInt(),
		  json["name"].toString(),
		  json["update_id"].toInt())
{ }
