#ifndef NETWORKMANAGER_H
#define NETWORKMANAGER_H

#include <QtNetwork>

const QString BASE = "5.45.118.116";
const QString API_HOST = QString("http://api.%1").arg(BASE);
const QString ICONS_HOST =
		QString("http://%1%2")
		.arg(BASE)
		.arg("/static/pictureIcons/");

class NetworkManager
{
public:
	static QNetworkAccessManager *netManager() { return m_manager; }
	static QNetworkReply *getMuseums(const QString &pattern);
	static QNetworkReply *getMuseum(const int &id);

	static QNetworkReply *getPictures(const int &id);

	static QNetworkReply *getIcon(const QString &iconName);

private:

	static QNetworkAccessManager *m_manager;

	static QNetworkReply* postSend(const QString &path, const QJsonObject &json = QJsonObject());
};

#endif // NETWORKMANAGER_H
