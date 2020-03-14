#ifndef LOGIC_H
#define LOGIC_H

#include <QtCore>
#include "models/savedmuseumsmodel.h"
#include "Objects/networkmanager.h"
#include "Objects/settings.h"
#include "Objects/dbc.h"

class Logic : public QObject
{
	Q_OBJECT

	Q_PROPERTY(bool museumsIsLoading READ museumsIsLoading NOTIFY museumsIsLoadingChanged)
	Q_PROPERTY(bool noInternetConnection READ noInternetConnection NOTIFY noInternetConnectionChanged)
public:

	explicit Logic(QObject *parent = nullptr);

	inline static Logic *instance() {
		return m_instance;
	}

	inline bool museumsIsLoading() const { return m_museumsIsLoading; }
	void setMuseumsIsLoading(const bool &museumsIsLoading);


	bool noInternetConnection() const;
	void setNoInternetConnection(bool noInternetConnection);

public slots:
	void loadMuseums(const QString &pattern = "");
	void loadSavedMuseums();

signals:
	void museumsIsLoadingChanged();
	void noInternetConnectionChanged();

private:
	static Logic* m_instance;

	bool m_museumsIsLoading;
	bool m_noInternetConnection;

};

#endif // LOGIC_H
