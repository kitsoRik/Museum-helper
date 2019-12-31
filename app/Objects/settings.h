#ifndef SETTINGS_H
#define SETTINGS_H

#include <QSettings>

class Settings : public QObject
{
	Q_OBJECT

	Q_PROPERTY(bool fullScreen READ fullScreen WRITE setFullScreen NOTIFY fullScreenChanged)
public:
	explicit Settings(QObject *parent = nullptr);


	inline int version() const { return m_version; }
	inline void setVersion(const int &version) {
		m_version = version;
		emit versionChanged();
	}

	static Settings *instance() { return m_instance; }

	inline bool fullScreen() const { return m_settigns.value("fullScreen", false).toBool(); }
	void setFullScreen(const bool &fullScreen);

signals:
	void fullScreenChanged();
	void versionChanged();

	void loaded();

public slots:
	void save();
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
