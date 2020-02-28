#include "networkmanager.h"
#include "logic.h"
#include "models/museumsmodel.h"
#include "picturesmodel.h"
#include "settings.h"

QNetworkAccessManager *NetworkManager::m_manager = new QNetworkAccessManager;
// Warning: QEventLoop: Cannot be used without QApplication

QNetworkReply *NetworkManager::getMuseums(const QString &pattern)
{
	QJsonObject json;

	json["pattern"] = pattern;

	return postSend("/getMuseums", json);
}

QNetworkReply *NetworkManager::getMuseum(const int &id)
{
	QJsonObject json;
	json["id"] = id;
	return postSend("/getMuseum", json);
}

QNetworkReply *NetworkManager::getPictures(const int &id)
{
	QJsonObject json;
	json["museumId"] = id;
	return postSend("/getPictures", json);
}

QNetworkReply *NetworkManager::getIcon(const QString &iconName)
{
	QUrl url(ICONS_HOST + iconName);
	QNetworkRequest req(url);

	return m_manager->get(req);
}

QNetworkReply *NetworkManager::postSend(const QString &path, const QJsonObject &json)
{
	QUrl url(API_HOST + "/app" + path);
	QNetworkRequest request(url);


	request.setHeader(QNetworkRequest::KnownHeaders::ContentTypeHeader, "application/json");
	auto reply = m_manager->post(request, QJsonDocument(json).toJson());

	QObject::connect(reply, static_cast<void (QNetworkReply::*)(QNetworkReply::NetworkError)>(&QNetworkReply::error),
					 [&](QNetworkReply::NetworkError err) {
		qDebug() << err;
	});

	return reply;
}
