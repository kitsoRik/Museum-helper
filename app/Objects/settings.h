#ifndef SETTINGS_H
#define SETTINGS_H

#include <QSettings>

class Settings : public QObject
{
	Q_OBJECT

	Q_PROPERTY(bool fullScreen READ fullScreen WRITE setFullScreen NOTIFY fullScreenChanged)
	Q_PROPERTY(bool preloadedCamera READ preloadedCamera WRITE setPreloadedCamera NOTIFY preloadedCameraChanged)
	Q_PROPERTY(QString language READ language WRITE setLanguage NOTIFY languageChanged)
public:
	explicit Settings(QObject *parent = nullptr);

	static Settings *instance() { return m_instance; }

	inline bool fullScreen() const { return m_settigns.value("fullScreen", false).toBool(); }
	void setFullScreen(const bool &fullScreen);

	inline bool preloadedCamera() const { return m_settigns.value("preloadedCamera", true).toBool(); }
	void setPreloadedCamera(const bool &preloadedCamera);

	inline QString language() const { return m_settigns.value("language", "ua").toString(); }
	void setLanguage(const QString &language);

signals:
	void fullScreenChanged();
	void preloadedCameraChanged();
	void languageChanged();

public slots:
	void save(const bool &savePictures = false);
	void load();

private slots:
	void savePictures();
	void loadPictures();

private:
	QSettings m_settigns;

	int m_version;

	static Settings *m_instance;
};

#endif // SETTINGS_H
