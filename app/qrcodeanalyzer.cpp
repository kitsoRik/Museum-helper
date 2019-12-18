#include "qrcodeanalyzer.h"
#include "picturesmodel.h"
#include <QtMultimedia>
#include <QtDebug>

QRCodeAnalyzer* QRCodeAnalyzer::m_instance = nullptr;

QRCodeAnalyzer::QRCodeAnalyzer(QObject *parent)
	: QObject(parent), m_decoding(false)
{
	if(m_instance)
		throw std::invalid_argument("Create second qrcodeAnalyzer");
	m_instance = this;

	m_probe = new QVideoProbe(this);
	m_decoder = new QRCodeAnalyzerDecoder;

	connect(m_decoder, &QRCodeAnalyzerDecoder::decodingStarted,
			this, &QRCodeAnalyzer::onDecodingStarted, Qt::QueuedConnection);
	connect(m_decoder, &QRCodeAnalyzerDecoder::decodingFinished,
			this, &QRCodeAnalyzer::onDecodingFinished, Qt::QueuedConnection);
	connect(m_probe, &QVideoProbe::videoFrameProbed, this, &QRCodeAnalyzer::processFrame);
}

QObject *QRCodeAnalyzer::source() const
{
	return m_source;
}

bool QRCodeAnalyzer::setSource(QObject *source)
{
	m_decoding = true;
	m_source = source;
	bool b = m_probe->setSource(qvariant_cast<QMediaObject *>(source->property("mediaObject")));
	return b;
}

void QRCodeAnalyzer::onDecodingStarted()
{
	qDebug() << "Start decoding";
}

void QRCodeAnalyzer::onDecodingFinished(const QString &result)
{
	qDebug() << "Finish decoding, result:" << result;

	if(result.isEmpty())
	{
		emit failedDecoding(NotFoundCodeInImage);
		m_decoding = true;
	}else
	{
		PicturesModel *model = PicturesModel::instance();
		int index = model->indexPictureAtQRCode(result);
		if(index == -1)
		{
			emit failedDecoding(NotFoundCodeInBase);
			m_decoding = true;
		}else
		{
			emit successDecoding(index);
			m_decoding = false;
		}
	}
}

extern QImage qt_imageFromVideoFrame(const QVideoFrame &f);

void QRCodeAnalyzer::processFrame(const QVideoFrame &frame)
{
	if(!m_decoding)
		return;
	m_decoding = false;
	QImage imgbuf = qt_imageFromVideoFrame(frame);
	emit decode(imgbuf);
}

bool QRCodeAnalyzer::decoding() const
{
	return m_decoding;
}

void QRCodeAnalyzer::setDecoding(bool decoding)
{
	m_decoding = decoding;
}
