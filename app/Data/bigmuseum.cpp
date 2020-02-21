#include "bigmuseum.h"

BigMuseum::BigMuseum()
{

}

int BigMuseum::id() const
{
	return m_id;
}

void BigMuseum::setId(int id)
{
	m_id = id;
}

QString BigMuseum::name() const
{
	return m_name;
}

void BigMuseum::setName(const QString &name)
{
	m_name = name;
}

QString BigMuseum::location() const
{
	return m_location;
}

void BigMuseum::setLocation(const QString &location)
{
	m_location = location;
}

int BigMuseum::updateId() const
{
	return m_updateId;
}

void BigMuseum::setUpdateId(int updateId)
{
	m_updateId = updateId;
}

bool BigMuseum::hasIcons() const
{
	return m_hasIcons;
}

void BigMuseum::setHasIcons(bool hasIcons)
{
	m_hasIcons = hasIcons;
}
