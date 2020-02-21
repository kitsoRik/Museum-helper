#include "networkmanager.h"
#include "logic.h"
#include "models/museumsmodel.h"
#include "picturesmodel.h"
#include "settings.h"

QNetworkAccessManager *NetworkManager::m_manager = new QNetworkAccessManager;
// Warning: QEventLoop: Cannot be used without QApplication

QNetworkReply *NetworkManager::getMuseums()
{
	return postSend("/getMuseums");
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
	QUrl url(ICONS_URL + iconName);
	QNetworkRequest req(url);

	return m_manager->get(req);
}

QNetworkReply *NetworkManager::postSend(const QString &path, const QJsonObject &json)
{
	QUrl url(BASE + "/app" + path);
	QNetworkRequest request(url);

	request.setHeader(QNetworkRequest::KnownHeaders::ContentTypeHeader, "application/json");
	return m_manager->post(request, QJsonDocument(json).toJson());
}
