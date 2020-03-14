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

QStringList PictureObject::languagesModel() const
{
	QStringList list;

	for(auto info : m_pictureInfo) {
		if(info.language() == "english")
		{
			list.append("English");
		} else if(info.language() == "russian")
		{
			list.append("Русский");
		} else if(info.language() == "ukrainian")
		{
			list.append("Українська");
		}
	}

	return list;
}

void PictureObject::allChanged()
{
	emit iconsChanged();
	emit titleChanged();
	emit descriptionChanged();
	emit languagesSizeChanged();
}

void PictureObject::setCurrentPictureQrcode(const QString &qrcode)
{
	m_pictureInfo = DBC::instance()->getSavedPicturesInfoByPictureQrcode(qrcode);
	allChanged();
}

void PictureObject::setCurrentPictureId(const int &id)
{
	m_pictureInfo = DBC::instance()->getSavedPicturesInfoByPictureId(id);
	m_icons = DBC::instance()->getSavedPicturesIconsByPictureId(id);
	allChanged();
}
