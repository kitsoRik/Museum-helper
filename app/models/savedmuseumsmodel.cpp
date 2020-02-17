#include "savedmuseumsmodel.h"

SavedMuseumsModel* SavedMuseumsModel::m_instance = nullptr;

SavedMuseumsModel::SavedMuseumsModel(QObject *parent)
	: MuseumsModel(parent)
{
	if(m_instance) throw std::runtime_error("Saves museums model already created");

	m_instance = this;
}
