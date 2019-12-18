#include "logic.h"

#include <QtCore>

Logic* Logic::m_instance = nullptr;

Logic::Logic(QObject *parent)
	: QObject(parent)
{
	if(m_instance)
		throw std::invalid_argument("Create second logic");

	m_instance = this;

}
