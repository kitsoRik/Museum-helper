#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QStandardPaths>
#include <QDebug>
#include <QtCore>
#include <QtQml>
#include "QZXing.h"
#include "logic.h"
#include "picturesmodel.h"
#include "models/savedmuseumsmodel.h"
#include "qrcodeanalyzer.h"
#include "Objects/networkmanager.h"
#include "QMLObjects/pictureicon.h"
#include "Objects/settings.h"
#include "Objects/pictureobject.h"
#include "Objects/museumobject.h"
#include <QtCore>
#include <QQuickStyle>


int main(int argc, char *argv[])
{
	QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
	QQuickStyle::setStyle("Material");

	QGuiApplication app(argc, argv);

	DBC dbc;

	PicturesModel pictureModel;
	MuseumsModel museumsModel;
	SavedMuseumsModel savedMuseumsModel;

	QRCodeAnalyzer qrcodeAnalyzer;
	Settings settings;

	Logic logic;

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
	engine.rootContext()->setContextProperty("museums", &museumsModel);
	engine.rootContext()->setContextProperty("savedMuseums", &savedMuseumsModel);
	engine.rootContext()->setContextProperty("currentPicture", new PictureObject);
	engine.rootContext()->setContextProperty("currentMuseum", new MuseumObject);

	const QUrl url(QStringLiteral("qrc:/main.qml"));
	QObject::connect(&engine, &QQmlApplicationEngine::objectCreated,
					 &app, [url](QObject *obj, const QUrl &objUrl) {
		if (!obj && url == objUrl)
			QCoreApplication::exit(-1);
	}, Qt::QueuedConnection);
	engine.load(url);

	QObject::connect(&app, &QGuiApplication::aboutToQuit, [&]() {
		settings.save();
	});

	int exec = app.exec();

	return exec;
}
