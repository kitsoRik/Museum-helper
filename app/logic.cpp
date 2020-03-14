#include "logic.h"

Logic* Logic::m_instance = nullptr;

Logic::Logic(QObject *parent)
	: QObject(parent),
	  m_noInternetConnection(false)
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
	static QTimer timer;
	timer.stop();
	timer.setSingleShot(true);
	timer.start(400);
	timer.disconnect();
	connect(&timer, &QTimer::timeout, [=]() {
		setNoInternetConnection(false);
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

		connect(reply, static_cast<void (QNetworkReply::*)(QNetworkReply::NetworkError)>(&QNetworkReply::error),
				[=](QNetworkReply::NetworkError code){
			setNoInternetConnection(true);
		});
	});
}

void Logic::loadSavedMuseums()
{
	auto museums = DBC::instance()->getSavedMuseums();
	SavedMuseumsModel::instance()->setMuseums(museums);
}

bool Logic::noInternetConnection() const
{
	return m_noInternetConnection;
}

void Logic::setNoInternetConnection(bool noInternetConnection)
{
	m_noInternetConnection = noInternetConnection;
	emit noInternetConnectionChanged();
}
