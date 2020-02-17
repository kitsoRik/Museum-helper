#include "picture.h"
#include <QVariant>
#include <QDebug>
#include <QJsonArray>
#include <QBuffer>

PictureInfo::PictureInfo(const QString &title, const QString &description)
{
	m_title = title;
	m_description = description;
}

Picture::Picture(const int &id, const QString &name, const QString &qrcode)
{
	m_id = id;
	m_name = name;
	m_qrcode = qrcode;
}
