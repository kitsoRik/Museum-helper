#include "picture.h"
#include <QVariant>
#include <QDebug>
#include <QJsonArray>
#include <QBuffer>

PictureInfo::PictureInfo(const QString &title, const QString &description, const QString &language)
{
	m_title = title;
	m_description = description;
	m_language = language;
}

Picture::Picture(const int &id, const QString &name, const QString &qrcode, const QImage &icon)
{
	m_id = id;
	m_name = name;
	m_qrcode = qrcode;
	m_icon = icon;
}
