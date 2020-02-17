#ifndef PICTURE_H
#define PICTURE_H

#include <QJsonObject>
#include <QImage>
#include <QDataStream>

class PictureInfo
{
public:
	PictureInfo(const QString &title, const QString &description);

	inline QString title() const { return m_title; }
	inline QString description() const { return m_description; }

private:
	QString m_title;
	QString m_description;
};

class Picture
{
public:
	Picture(const int &id = 0,
			const QString &name = "",
			const QString &qrcode = "");

	inline int id() const { return m_id; }
	inline QString name() const { return m_name; }
	inline QString qrcode() const { return m_qrcode; }
	inline QImage icon() const { return m_icon; }

private:
	int m_id;
	QString m_name;
	QString m_qrcode;
	QImage m_icon;
};

#endif // PICTURE_H
