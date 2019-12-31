#ifndef PICTUREOBJECT_H
#define PICTUREOBJECT_H

#include <QObject>
#include "Data/picture.h"

class PictureObject : public QObject
{
	Q_OBJECT

	Q_PROPERTY(int languagesSize READ languagesSize NOTIFY languagesSizeChanged)

	Q_PROPERTY(QImage icon READ icon NOTIFY iconChanged)
	Q_PROPERTY(QString title READ title NOTIFY titleChanged)
	Q_PROPERTY(QString description READ description NOTIFY descriptionChanged)
	Q_PROPERTY(bool isNull READ isNull NOTIFY languagesSizeChanged)
public:
	explicit PictureObject(QObject *parent = nullptr);

	static PictureObject *instance() { return m_instance; }

	inline bool isNull() const {
		return m_picture.languages().size() == 0;
	}

	inline QImage icon() const {
		return m_picture.icon();
	}

	inline QString title() const {
		return m_picture.languages()[m_languageIndex].title();
	}

	inline QString description() const {
		return m_picture.languages()[m_languageIndex].description();
	}

	inline int languagesSize() const {
		return m_picture.languages().size();
	}

signals:
	void iconChanged();
	void titleChanged();
	void descriptionChanged();
	void languagesSizeChanged();

private slots:
	void allChanged();

public slots:
	void setLanguageIndex(const int &index) { m_languageIndex = index; allChanged(); }
	void setPicture(const Picture &picture);

private:
	int m_languageIndex;
	Picture m_picture;

	static PictureObject *m_instance;
};

#endif // PICTUREOBJECT_H
