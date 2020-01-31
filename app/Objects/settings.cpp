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

void Settings::save(const bool &savePictures)
{
	m_settigns.setValue("VERSION", m_version);

	if(savePictures) this->savePictures();

	m_settigns.sync();
}

void Settings::load()
{
	setVersion(m_settigns.value("VERSION", 0).toInt());

	loadPictures();
}

void Settings::savePictures()
{
	QFile file(QStandardPaths::writableLocation(QStandardPaths::DataLocation) + "/Pictures.dat");
	if(!file.open(QIODevice::WriteOnly))
	{
		qDebug() << "NOT OPENED WRITE" << file.errorString();
		return;
	}

	QByteArray data;
	QDataStream stream (&data, QIODevice::WriteOnly);


	QList<Picture> pictures = PicturesModel::instance()->pictures();

	stream << pictures.size();

	for(Picture p : pictures)
	{
		stream << p;
	}

	file.write(data);
	file.close();
}

void Settings::loadPictures()
{
	QFile file(QStandardPaths::writableLocation(QStandardPaths::DataLocation) + "/Pictures.dat");
	if(!file.exists(file.fileName()))
	{
		setVersion(0);
		qDebug() << "NOT EXISTS";
		return;
	}

	if(!file.open(QIODevice::ReadOnly))
	{
		setVersion(0);
		qDebug() << "NOT OPENED READ";
		return;
	}

	QByteArray data = file.readAll();
	QDataStream stream (&data, QIODevice::ReadOnly);

	file.close();

	QList<Picture> pictures;
	int size;
	stream >> size;

	for(int i = 0; i < size; i++)
	{
		Picture p;
		stream >> p;
		pictures.append(p);
	}

	PicturesModel::instance()->setPictures(pictures);
}


