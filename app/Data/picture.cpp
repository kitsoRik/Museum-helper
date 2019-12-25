#include "picture.h"
#include <QVariant>
#include <QDebug>
#include <QJsonArray>
#include <QBuffer>

Picture::Picture() { }

Picture::Picture(const QJsonObject &json)
{
	m_qrcode = json["qrcode"].toString();
	m_name = json["name"].toString();
	m_icon = QImage::fromData(json["icon"].toString().toLatin1());

	QJsonArray langus = json["languages"].toArray();

	for(QJsonValueRef ref : langus)
	{
		PictureLanguage l(ref.toObject());

		m_languages.append(l);
	}
	qDebug() << json;
}

QDataStream &operator <<(QDataStream &stream, const Picture &picture)
{
	stream << picture.m_qrcode;
	stream << picture.m_languages.size();

	for(PictureLanguage l : picture.m_languages)
	{
		stream << l;
	}

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
	int size;
	stream >> size;

	for(int i = 0; i < size; i++)
	{
		PictureLanguage l;
		stream >> l;
		picture.m_languages.append(l);
	}

	QByteArray data;

	stream >> data;

	picture.m_icon = QImage::fromData(data);

	return stream;
}

PictureLanguage::PictureLanguage(const QJsonObject &json)
{
	m_title = json["title"].toString();
	m_language = json["language"].toString();
	m_description = json["description"].toString();
}

QDataStream &operator <<(QDataStream &stream, const PictureLanguage &picture)
{
	stream << picture.m_title;
	stream << picture.m_language;
	stream << picture.m_description;

	return stream;
}

QDataStream &operator >>(QDataStream &stream, PictureLanguage &picture)
{
	stream >> picture.m_title;
	stream >> picture.m_language;
	stream >> picture.m_description;

	return stream;
}
