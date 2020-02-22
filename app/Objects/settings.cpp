#include "settings.h"
#include <QFile>
#include <QStandardPaths>
#include <QDebug>
#include <QDataStream>
#include "picturesmodel.h"
#include <QQmlApplicationEngine>


Settings* Settings::m_instance = nullptr;

Settings::Settings(QObject *parent)
	: QObject(parent),
	  m_settigns("kitsoRik Organization", "Museum helper")
{
	if(m_instance)
		throw std::invalid_argument("Create second settings");
	m_instance = this;
	load();
}

void Settings::setFullScreen(const bool &fullScreen)
{
	m_settigns.setValue("fullScreen", fullScreen);
	emit fullScreenChanged();
}

void Settings::setPreloadedCamera(const bool &preloadedCamera)
{
	m_settigns.setValue("preloadedCamera", preloadedCamera);
	emit preloadedCameraChanged();
}

void Settings::setLanguage(const QString &language)
{
	m_settigns.setValue("language", language);
	emit languageChanged();
}

void Settings::save(const bool &savePictures)
{
	m_settigns.setValue("VERSION", m_version);

	if(savePictures) this->savePictures();

	m_settigns.sync();
}

void Settings::load()
{
	loadPictures();
}

void Settings::savePictures()
{

}

void Settings::loadPictures()
{

}


