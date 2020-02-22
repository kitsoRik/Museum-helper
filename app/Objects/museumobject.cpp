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

void MuseumObject::setIconsSaved(const bool &iconsSaved)
{
	m_bigMuseum.setHasIcons(iconsSaved);
	emit iconsSavedChanged();
}

void MuseumObject::setName(const QString &name)
{
	m_bigMuseum.setName(name);
	emit nameChanged();
}

void MuseumObject::clear()
{
	setIsLoading(false);
	setIsSaved(false);
	setNeedUpdate(false);
	setIconsSaved(false);
}

void MuseumObject::setMuseumId(const int &id)
{
	m_bigMuseum.setId(id);
	clear();

	BigMuseum b;
	if(DBC::instance()->getSavedMuseumById(id , &b))
	{

		m_bigMuseum.setUpdateId(b.updateId());
		setName(b.name());
		setIsSaved(true);
		setIconsSaved(b.hasIcons());

		setIsLoading(true);
		auto reply = NetworkManager::getMuseum(id);

		connect(reply, &QNetworkReply::finished, [reply, this]() {
			auto data = reply->readAll();

			QJsonObject json = QJsonDocument::fromJson(data).object();

			if(json["success"].toBool())
			{
				QJsonObject info = json["museum"].toObject();

				int fupdateId = info["updateId"].toInt();

				if(m_bigMuseum.updateId() != fupdateId)
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
				m_bigMuseum.setUpdateId(info["updateId"].toInt());
			}
			setIsLoading(false);
		});
	}
}

void MuseumObject::saveMuseum()
{
	setIsLoading(true);
	auto reply = NetworkManager::getPictures(m_bigMuseum.id());
	connect(reply, &QNetworkReply::finished, [reply, this]() {
		auto data = reply->readAll();

		QJsonObject json = QJsonDocument::fromJson(data).object();
		if(json["success"].toBool())
		{
			QJsonArray pictures = json["pictures"].toArray();
			QJsonArray picturesInfo = json["picturesInfo"].toArray();
			m_picturesIcons = json["picturesIcons"].toArray();
			DBC::instance()->saveMuseum(m_bigMuseum.id(),
										m_bigMuseum.name(),
										m_bigMuseum.updateId(), pictures, picturesInfo);
			setIsSaved(true);
			setIsLoading(false);
		}
	});
}

void MuseumObject::saveIcons()
{
	if(m_picturesIcons.size() == 0)
	{
		DBC::instance()->savePicturesIcons(m_bigMuseum.id(), QList<int>(), QList<QPixmap>());
		setIconsSaved(true);
		return;
	}
	setIsLoading(true);
	int *_index = new int(0);
	QList<int> *l = new QList<int>();
	QList<QPixmap> *p = new QList<QPixmap>();
	for(auto ref : m_picturesIcons)
	{
		auto obj = ref.toObject();
		int *id = new int(obj["pictureId"].toString().toInt());
		QString iconName = obj["iconName"].toString();
		auto reply = NetworkManager::getIcon(iconName);
		connect(reply, &QNetworkReply::finished, [reply, id, l, p, this, _index]() {
			auto data = reply->readAll();
			l->append(*id);
			p->append(QPixmap::fromImage(QImage::fromData(data)));

			if(++(*_index) == m_picturesIcons.size())
			{
				DBC::instance()->savePicturesIcons(m_bigMuseum.id(), *l, *p);

				setIconsSaved(true);
				setIsLoading(false);

				delete _index;
				delete l;
				delete p;
				delete id;
			}
		});
	}
}

void MuseumObject::updateMuseum()
{
	DBC::instance()->removeMuseumById(m_bigMuseum.id());
	setMuseumId(m_bigMuseum.id());
	saveMuseum();
}

void MuseumObject::goToStart()
{
	auto a = DBC::instance()->getSavedPicturesByMuseumId(m_bigMuseum.id());
	PicturesModel::instance()->setPictures(a);
}

void MuseumObject::removeMuseum()
{

}
