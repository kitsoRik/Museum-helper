#include "museumobject.h"
#include "dbc.h"
#include "picturesmodel.h"

MuseumObject* MuseumObject::m_instance = nullptr;

MuseumObject::MuseumObject(QObject *parent)
	: QObject(parent),
	  m_isSaved(false)
{
	if(m_instance) throw std::runtime_error("Museum object already created");

	m_instance = this;
}

void MuseumObject::setIsSaved(const bool &isSaved)
{
	m_isSaved = isSaved;
	emit isSavedChanged();
}

void MuseumObject::setIsLoading(const bool &isLoading)
{
	m_isLoading = isLoading;
	emit isLoadingChanged();
}

void MuseumObject::setNeedUpdate(const bool &needUpdate)
{
	m_needUpdate = needUpdate;
	emit needUpdateChanged();
}

void MuseumObject::setName(const QString &name)
{
	m_name = name;
	emit nameChanged();
}

void MuseumObject::setMuseumId(const int &id)
{
	m_id = id;
	Museum m;

	setNeedUpdate(false);

	if(DBC::instance()->getSavedMuseumById(id , &m))
	{
		m_updateId = m.updateId();
		setName(m.name());
		setIsSaved(true);

		setIsLoading(true);
		auto reply = NetworkManager::getMuseum(id);

		connect(reply, &QNetworkReply::finished, [reply, this]() {
			auto data = reply->readAll();

			QJsonObject json = QJsonDocument::fromJson(data).object();

			if(json["success"].toBool())
			{
				QJsonObject info = json["museum"].toObject();

				int fupdateId = info["updateId"].toInt();

				if(m_updateId != fupdateId)
				{
					setNeedUpdate(true);
				}
			}
			setIsLoading(false);
		});
	}
	else
	{
		setIsSaved(false);
		setIsLoading(true);
		auto reply = NetworkManager::getMuseum(id);

		connect(reply, &QNetworkReply::finished, [reply, this]() {
			auto data = reply->readAll();

			QJsonObject json = QJsonDocument::fromJson(data).object();

			if(json["success"].toBool())
			{
				QJsonObject info = json["museum"].toObject();

				setName(info["name"].toString());
				m_updateId = info["updateId"].toInt();
			}
			setIsLoading(false);
		});
	}
}

void MuseumObject::saveMuseum()
{
	auto reply = NetworkManager::getPictures(m_id);
	connect(reply, &QNetworkReply::finished, [reply, this]() {
		auto data = reply->readAll();

		QJsonObject json = QJsonDocument::fromJson(data).object();
		if(json["success"].toBool())
		{
			QJsonArray pictures = json["pictures"].toArray();
			QJsonArray picturesInfo = json["picturesInfo"].toArray();
			DBC::instance()->saveMuseum(m_id, m_name, m_updateId, pictures, picturesInfo);
			setIsSaved(true);
		}
	});
}

void MuseumObject::updateMuseum()
{
	DBC::instance()->removeMuseumById(m_id);
	setMuseumId(m_id);
	saveMuseum();
}

void MuseumObject::goToStart()
{
	auto a = DBC::instance()->getSavedPicturesByMuseumId(m_id);
	PicturesModel::instance()->setPictures(a);
}
