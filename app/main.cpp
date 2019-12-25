#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QStandardPaths>
#include <QDebug>
#include <QtCore>
#include <QtQml>
#include "QZXing.h"
#include "logic.h"
#include "picturesmodel.h"
#include "qrcodeanalyzer.h"
#include "Objects/networkmanager.h"
#include "QMLObjects/pictureicon.h"
#include "Objects/settings.h"
#include "Objects/pictureobject.h"
#include <QtCore>


int main(int argc, char *argv[])
{
	QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);

	QGuiApplication app(argc, argv);

	Logic logic;
	PicturesModel pictureModel;
	QRCodeAnalyzer qrcodeAnalyzer;
	Settings settings;
	NetworkManager networkManager;

	QQmlApplicationEngine engine;

	qmlRegisterType<QZXing>("QZXing", 2, 3, "QZXing");
	qmlRegisterType<Logic>("RostikObjects", 1, 0, "Logic");
	qmlRegisterType<PicturesModel>("RostikObjects", 1, 0, "Pictures");
	qmlRegisterType<QRCodeAnalyzer>("RostikObjects", 1, 0, "QRCodeAnalyzer");

	qmlRegisterType<PictureIcon>("RostikObjects", 1, 0, "PictureIcon");
	qmlRegisterType<PictureObject>("RostikObjects", 1, 0, "PictureObject");

	engine.rootContext()->setContextProperty("logic", &logic);
	engine.rootContext()->setContextProperty("settings", &settings);
	engine.rootContext()->setContextProperty("qrcodeAnalyzer", &qrcodeAnalyzer);
	engine.rootContext()->setContextProperty("pictures", &pictureModel);
	engine.rootContext()->setContextProperty("networkManager", &networkManager);
	engine.rootContext()->setContextProperty("currentPicture", new PictureObject);

	const QUrl url(QStringLiteral("qrc:/main.qml"));
	QObject::connect(&engine, &QQmlApplicationEngine::objectCreated,
					 &app, [url](QObject *obj, const QUrl &objUrl) {
		if (!obj && url == objUrl)
			QCoreApplication::exit(-1);
	}, Qt::QueuedConnection);
	engine.load(url);

	int exec = app.exec();

	return exec;
}
