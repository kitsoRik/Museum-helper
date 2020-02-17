#ifndef MUSEUMOBJECT_H
#define MUSEUMOBJECT_H

#include <QObject>
#include "networkmanager.h"

class MuseumObject : public QObject
{
	Q_OBJECT

	Q_PROPERTY(bool isSaved READ isSaved NOTIFY isSavedChanged)
	Q_PROPERTY(bool isLoading READ isLoading NOTIFY isLoadingChanged)

	Q_PROPERTY(bool needUpdate READ needUpdate NOTIFY needUpdateChanged)

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

	inline QString name() const { return m_name; }
	void setName(const QString &name);

public slots:
	void setMuseumId(const int &id);

	void saveMuseum();
	void updateMuseum();
	void goToStart();

signals:
	void isSavedChanged();
	void isLoadingChanged();

	void needUpdateChanged();

	void nameChanged();

private:
	static MuseumObject *m_instance;

	bool m_isSaved;
	bool m_isLoading;

	bool m_needUpdate;

	int m_id;
	QString m_name;
	int m_updateId;

};

#endif // MUSEUMOBJECT_H
