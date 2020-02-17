#ifndef NETWORKMANAGER_H
#define NETWORKMANAGER_H

#include <QtNetwork>

const QString HOST = "5.45.118.116";
const quint16 PORT = 3006;
const QString BASE = "http://" + HOST + ":" + QString::number(PORT);

class NetworkManager
{
public:
	static QNetworkReply *getMuseums();
	static QNetworkReply *getMuseum(const int &id);

	static QNetworkReply *getPictures(const int &id);

private:

	static QNetworkAccessManager *m_manager;

	static QNetworkReply* postSend(const QString &path, const QJsonObject &json = QJsonObject());
};

#endif // NETWORKMANAGER_H
