#include "logic.h"

#include <QtCore>

Logic* Logic::m_instance = nullptr;

Logic::Logic(QObject *parent)
	: QObject(parent)
{
	if(m_instance)
		throw std::runtime_error("Create second logic");

	m_instance = this;

}
