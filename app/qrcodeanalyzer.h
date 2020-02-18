#ifndef QRCODEANALYZER_H
#define QRCODEANALYZER_H

#include "Objects/qrcodeanalyzerdecoder.h"

#include <QObject>
#include <QtMultimedia/QVideoProbe>

class QRCodeAnalyzer : public QObject
{
	Q_OBJECT

	Q_PROPERTY(QObject* source READ source WRITE setSource)

	Q_PROPERTY(bool decoding READ decoding WRITE setDecoding)
public:
	enum FailedDecodingType
	{
		NotFoundCodeInImage,
		NotFoundCodeInBase
	};

	Q_ENUM(FailedDecodingType)

	explicit QRCodeAnalyzer(QObject *parent = nullptr);


	QObject *source() const;
	bool setSource(QObject *source);

	inline static QRCodeAnalyzer* instance() {
		return m_instance;
	}

	bool decoding() const;
	void setDecoding(bool decoding);

signals:
	void decode(const QImage &image);
	void successDecoding();
	void failedDecoding(const FailedDecodingType& type);

public slots:

private:
	void onDecodingStarted();
	void onDecodingFinished(const QString &result);

private slots:
	void processFrame(const QVideoFrame &frame);

private:
	QRCodeAnalyzerDecoder *m_decoder;
	bool m_decoding;
	bool m_decodedS;
	QObject* m_source;
	QVideoProbe *m_probe;

	static QRCodeAnalyzer *m_instance;
};

#endif // QRCODEANALYZER_H
