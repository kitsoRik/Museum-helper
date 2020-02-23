#include "logic.h"

Logic* Logic::m_instance = nullptr;

Logic::Logic(QObject *parent)
	: QObject(parent)
{
	if(m_instance)
		throw std::runtime_error("Create second logic");

	m_instance = this;

	loadMuseums();
	loadSavedMuseums();
}

void Logic::setMuseumsIsLoading(const bool &museumsIsLoading)
{
	m_museumsIsLoading = museumsIsLoading;
	emit museumsIsLoadingChanged();
}

void Logic::loadMuseums(const QString &pattern)
{
	setMuseumsIsLoading(true);
	auto reply = NetworkManager::getMuseums(pattern);

	connect(reply, &QNetworkReply::finished, [reply, this]() {
		auto data = reply->readAll();

		QJsonObject json = QJsonDocument::fromJson(data).object();

		if(json["success"].toBool())
		{
			QJsonArray museumsArray = json["museums"].toArray();

			QList<Museum> museums;

			for(QJsonValueRef ref : museumsArray)
			{
				Museum m(ref.toObject());
				museums.push_back(m);
			}

			MuseumsModel::instance()->setMuseums(museums);
			setMuseumsIsLoading(false);
		}
	});
}

void Logic::loadSavedMuseums()
{
	auto museums = DBC::instance()->getSavedMuseums();
	SavedMuseumsModel::instance()->setMuseums(museums);
}
