#ifndef NETWORKMANAGER_H
#define NETWORKMANAGER_H

#include <QtNetwork>

const QString HOST = "http://5.45.118.116";
const QString BASE = "http://5.45.118.116:3006";//"http://" + HOST + ":" + QString::number(PORT);
const QString ICONS_URL = HOST + "/static/pictureIcons/";

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
