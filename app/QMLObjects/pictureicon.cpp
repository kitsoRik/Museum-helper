#include "pictureicon.h"
#include <QPainter>
#include "Objects/networkmanager.h"

PictureIcon::PictureIcon(QQuickItem *parent)
	: QQuickPaintedItem(parent)
{

}


void PictureIcon::paint(QPainter *painter)
{
	QRectF rect = contentsBoundingRect();
	QRectF sourceRect = m_source.rect();
	painter->drawImage(rect, m_source);
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
