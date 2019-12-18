#ifndef QRCODEANALYZERDECODER_H
#define QRCODEANALYZERDECODER_H

#include "QZXing.h"
#include <QThread>

class QRCodeAnalyzerDecoder : public QObject
{
	Q_OBJECT
public:
	explicit QRCodeAnalyzerDecoder(QObject *parent = nullptr);

signals:
	void decodingStarted();
	void decodingFinished(const QString &result);

public slots:

private:
	QZXing *m_decoder;
};

#endif // QRCODEANALYZERDECODER_H
