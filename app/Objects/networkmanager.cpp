#include "networkmanager.h"
#include "logic.h"
#include "picturesmodel.h"
#include "settings.h"

NetworkManager::NetworkManager(QObject *parent) : QObject(parent)
{
	m_manager = new QNetworkAccessManager(this);
	// Warning: QEventLoop: Cannot be used without QApplication

	checkVersion();
}

void NetworkManager::checkVersion()
{
	Settings *settings = Settings::instance();

	QUrl url("http://" + HOST + ":" + QString::number(PORT) + "/app/checkVersion");
	QNetworkRequest request(url);

	QJsonObject json;
	json["version"] = settings->version();

	request.setHeader(QNetworkRequest::KnownHeaders::ContentTypeHeader, "application/json");
	QNetworkReply *reply = m_manager->post(request, QJsonDocument(json).toJson());

	connect(reply, &QNetworkReply::finished, [this, reply, settings](){
		QJsonDocument doc = QJsonDocument::fromJson(reply->readAll());
		QJsonObject root = doc.object();
		int version = root["version"].toInt();
		qDebug () << settings->version() << version;
		if(settings->version() == version)
			return;

		emit updateRequired();
	});
}

void NetworkManager::downloadUpdate()
{
	Settings *settings = Settings::instance();

	QUrl url("http://" + HOST + ":" + QString::number(PORT) + "/app/get");
	QNetworkRequest request(url);

	QJsonObject json;
	json["version"] = settings->version();

	request.setHeader(QNetworkRequest::KnownHeaders::ContentTypeHeader, "application/json");
	auto reply = m_manager->post(request, QJsonDocument(json).toJson());

	connect(reply, &QNetworkReply::finished, this, &NetworkManager::onUpdateFinished);
	connect(reply, &QNetworkReply::downloadProgress, [this](qint64 received, qint64 total)
	{
		m_updateProgress = static_cast<float>(received) / total * 100;
		emit updateProgressChanged();
	});

	m_updateProgress = 0;
}

void NetworkManager::onUpdateFinished()
{
	Settings *settings = Settings::instance();

	emit downloadUpdateFinished();
	QNetworkReply *reply = static_cast<QNetworkReply*>(sender());
	QByteArray data = reply->readAll();

	QJsonObject json = QJsonDocument::fromJson(data).object();

	settings->setVersion(json["version"].toInt());

	QJsonArray arrayPictures = json["pictures"].toArray();

	QList<Picture> pictures;

	for(QJsonValueRef arrayPicture : arrayPictures)
	{
		Picture picture(arrayPicture.toObject());

		pictures.append(picture);
	}

	PicturesModel::instance()->setPictures(pictures);

	Settings::instance()->save();
	emit installUpdateFinished();
}
