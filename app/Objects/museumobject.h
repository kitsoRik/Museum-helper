#ifndef MUSEUMOBJECT_H
#define MUSEUMOBJECT_H

#include <QObject>
#include "networkmanager.h"
#include "Data/bigmuseum.h"

class MuseumObject : public QObject
{
	Q_OBJECT

	Q_PROPERTY(bool isSaved READ isSaved NOTIFY isSavedChanged)
	Q_PROPERTY(bool isLoading READ isLoading NOTIFY isLoadingChanged)

	Q_PROPERTY(bool needUpdate READ needUpdate NOTIFY needUpdateChanged)
	Q_PROPERTY(bool iconsSaved READ iconsSaved NOTIFY iconsSavedChanged)

	Q_PROPERTY(QString name READ name NOTIFY nameChanged)
public:
	static MuseumObject *instance() { return m_instance; }

	explicit MuseumObject(QObject *parent = nullptr);

	inline bool isSaved() const { return m_isSaved; }
	void setIsSaved(const bool &isSaved);

	inline bool isLoading() const { return m_isLoading; }
	void setIsLoading(const bool &isLoading);

	inline bool needUpdate() const { return m_needUpdate; }
	void setNeedUpdate(const bool &needUpdate);

	inline bool iconsSaved() const { return m_bigMuseum.hasIcons(); }
	void setIconsSaved(const bool &iconsSaved);

	inline QString name() const { return m_bigMuseum.name(); }
	void setName(const QString &name);

private:
	void clear();

public slots:
	void setMuseumId(const int &id);

	void saveMuseum();
	void saveIcons();
	void updateMuseum();
	void goToStart();

signals:
	void isSavedChanged();
	void isLoadingChanged();

	void needUpdateChanged();
	void iconsSavedChanged();

	void nameChanged();


private:
	static MuseumObject *m_instance;

	bool m_isSaved;
	bool m_isLoading;

	bool m_needUpdate;

	QJsonArray m_picturesIcons;

	BigMuseum m_bigMuseum;

};

#endif // MUSEUMOBJECT_H
