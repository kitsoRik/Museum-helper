#include "pictureobject.h"
#include "dbc.h"

PictureObject* PictureObject::m_instance = nullptr;

PictureObject::PictureObject(QObject *parent)
	: QObject(parent), m_languageIndex(0)
{
	if(m_instance)
		throw std::runtime_error("Current picture already created");
	m_instance = this;
}

void PictureObject::allChanged()
{
	emit iconChanged();
	emit titleChanged();
	emit descriptionChanged();
	emit languagesSizeChanged();
}

void PictureObject::setCurrentPictureId(const int &id)
{
	m_pictureInfo = DBC::instance()->getSavedPicturesInfoByPictureId(id);
	allChanged();
}
