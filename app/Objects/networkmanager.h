#ifndef NETWORKMANAGER_H
#define NETWORKMANAGER_H

#include <QtNetwork>

const QString HOST = "localhost";
const quint16 PORT = 3006;
const QString BASE = "http://4e04e0ef.ngrok.io";//"http://" + HOST + ":" + QString::number(PORT);
const QString ICONS_URL = BASE + "/static/pictureIcons/";

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
