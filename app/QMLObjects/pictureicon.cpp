#include "pictureicon.h"
#include <QPainter>

PictureIcon::PictureIcon(QQuickItem *parent)
	: QQuickPaintedItem(parent)
{

}


void PictureIcon::paint(QPainter *painter)
{
	QRectF rect = contentsBoundingRect();
	QRectF sourceRect = m_source.rect();

	painter->drawImage(rect, m_source, sourceRect);
}

QImage PictureIcon::source() const
{
	return m_source;
}

void PictureIcon::setSource(const QImage &source)
{
	m_source = source;
	emit sourceChanged();
}
