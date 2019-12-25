#ifndef PICTURE_H
#define PICTURE_H

#include <QJsonObject>
#include <QImage>
#include <QDataStream>

class PictureLanguage
{
public:
	PictureLanguage() { }
	PictureLanguage(const QJsonObject &json);

	QString description() const { return m_description; }
	QString title() const { return m_title; }
	QString language() const { return m_language; }

	friend QDataStream& operator <<(QDataStream &stream, const PictureLanguage &picture);
	friend QDataStream& operator >>(QDataStream &stream, PictureLanguage &picture);

private:
	QString m_description;
	QString m_title;
	QString m_language;
};

class Picture
{
public:
	Picture();
	Picture(const QJsonObject &json);

	inline QString qrcode() const { return m_qrcode; }
	inline QString name() const { return m_name; }

	inline QList<PictureLanguage> languages() const { return m_languages; }

	inline QImage icon() const { return m_icon; }

	friend QDataStream& operator <<(QDataStream &stream, const Picture &picture);
	friend QDataStream& operator >>(QDataStream &stream, Picture &picture);

private:
	QString m_qrcode;
	QString m_name;
	QList<PictureLanguage> m_languages;
	QImage m_icon;
};

#endif // PICTURE_H
