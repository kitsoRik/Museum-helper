#include "picture.h"
#include <QVariant>
#include <QDebug>
#include <QJsonArray>
#include <QBuffer>

Picture::Picture() { }

Picture::Picture(const QJsonObject &json)
{
	m_qrcode = json["qrcode"].toString();
	m_title = json["title"].toString();
	m_text = json["text"].toString();
	m_icon = QImage::fromData(json["icon"].toString().toLatin1());
}

QDataStream &operator <<(QDataStream &stream, const Picture &picture)
{
	stream << picture.m_qrcode;
	stream << picture.m_title;
	stream << picture.m_text;

	QByteArray data;
	if(!picture.m_icon.isNull())
	{
		QBuffer buffer(&data);
		buffer.open(QIODevice::ReadWrite);

		picture.m_icon.save(&buffer, "jpeg");
	}
	stream << data;

	return stream;
}

QDataStream &operator >>(QDataStream &stream, Picture &picture)
{
	stream >> picture.m_qrcode;
	stream >> picture.m_title;
	stream >> picture.m_text;

	QByteArray data;

	stream >> data;

	picture.m_icon = QImage::fromData(data);

	return stream;
}
