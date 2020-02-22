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
public:

	explicit Logic(QObject *parent = nullptr);

	inline static Logic *instance() {
		return m_instance;
	}

public slots:
	void loadMuseums(const QString &pattern = "");
	void loadSavedMuseums();

signals:

private:
	static Logic* m_instance;

};

#endif // LOGIC_H
