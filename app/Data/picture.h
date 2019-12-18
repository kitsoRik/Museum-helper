#ifndef PICTURE_H
#define PICTURE_H

#include <QJsonObject>
#include <QImage>
#include <QDataStream>

class Picture
{
public:
	Picture();
	Picture(const QJsonObject &json);

	inline QString qrcode() const { return m_qrcode; }

	inline QString title() const { return m_title; }

	inline QString text() const { return m_text; }

	inline QImage icon() const { return m_icon; }

	friend QDataStream& operator <<(QDataStream &stream, const Picture &picture);
	friend QDataStream& operator >>(QDataStream &stream, Picture &picture);

private:
	QString m_qrcode;
	QString m_title;
	QString m_text;
	QImage m_icon;
};

#endif // PICTURE_H
