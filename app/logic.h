#ifndef LOGIC_H
#define LOGIC_H

#include <QObject>
#include <QSettings>
#include <QDebug>

class Logic : public QObject
{
	Q_OBJECT
public:

	explicit Logic(QObject *parent = nullptr);

	inline static Logic *instance() {
		return m_instance;
	}

signals:

private:
	QSettings m_settings;

	static Logic* m_instance;

};

#endif // LOGIC_H
