#include "qrcodeanalyzerdecoder.h"
#include "qrcodeanalyzer.h"
#include <QtDebug>

QRCodeAnalyzerDecoder::QRCodeAnalyzerDecoder(QObject *parent) : QObject(parent)
{
	m_decoder = new QZXing(QZXing::DecoderFormat::DecoderFormat_QR_CODE);
	m_decoder->setTryHarder(true);

	QThread *t = new QThread();
	this->moveToThread(t);
	t->start(QThread::Priority::HighestPriority);


	auto codea = QRCodeAnalyzer::instance();

	connect(codea, &QRCodeAnalyzer::decode, this, [this](const QImage &image)
	{
		emit decodingStarted();
		QString result = m_decoder->decodeImage(image);
		emit decodingFinished(result);
	}, Qt::QueuedConnection);
}
