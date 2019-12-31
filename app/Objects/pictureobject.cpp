#include "pictureobject.h"

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

void PictureObject::setPicture(const Picture &picture)
{
	m_picture = picture;
	m_languageIndex = 0;

	allChanged();


}
