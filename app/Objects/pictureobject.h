#ifndef PICTUREOBJECT_H
#define PICTUREOBJECT_H

#include <QDebug>
#include "Data/picture.h"
#include <QImage>

class PictureObject : public QObject
{
	Q_OBJECT

	Q_PROPERTY(int languagesSize READ languagesSize NOTIFY languagesSizeChanged)

	Q_PROPERTY(int iconsSize READ iconsSize NOTIFY iconsChanged)
	Q_PROPERTY(QString title READ title NOTIFY titleChanged)
	Q_PROPERTY(QString description READ description NOTIFY descriptionChanged)
	Q_PROPERTY(bool isNull READ isNull NOTIFY languagesSizeChanged)
public:
	explicit PictureObject(QObject *parent = nullptr);

	static PictureObject *instance() { return m_instance; }

	inline bool isNull() const {
		return m_pictureInfo.size() == 0;
	}

	inline int iconsSize() const { return m_icons.size(); }

	Q_INVOKABLE inline QImage icon(const int &index) const {
		return m_icons[index];
	}

	inline QString title() const {
		if(m_languageIndex >= m_pictureInfo.size()) return "NONE";
		return m_pictureInfo[m_languageIndex].title();
	}

	inline QString description() const {
		if(m_languageIndex >= m_pictureInfo.size()) return "NONE";
		return m_pictureInfo[m_languageIndex].description();
	}

	inline QString language() const {
		if(m_languageIndex >= m_pictureInfo.size()) return "NONE";
		return m_pictureInfo[m_languageIndex].language();
	}

	inline int languagesSize() const {
		return m_pictureInfo.size();
	}

	Q_INVOKABLE QStringList languagesModel() const;

signals:
	void iconsChanged();
	void titleChanged();
	void descriptionChanged();
	void languagesSizeChanged();

private slots:
	void allChanged();

public slots:
	void setCurrentPictureQrcode(const QString &qrcode);
	void setCurrentPictureId(const int &id);
	void setLanguageIndex(const int &index) { m_languageIndex = index; allChanged(); }

private:
	int m_languageIndex;
	Picture m_picture;
	QList<PictureInfo> m_pictureInfo;
	QList<QImage> m_icons;

	static PictureObject *m_instance;
};

#endif // PICTUREOBJECT_H
