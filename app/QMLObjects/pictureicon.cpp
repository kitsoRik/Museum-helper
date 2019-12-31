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

	//Your's calculation area
	QRect topPortion = QRect(QPoint(0, 0), QSize(rect.width(), (rect.height() / 4) * 3));

	QPixmap pixmap = QPixmap::fromImage(m_source); //Random image


	//Scaled size that will be used to set draw aera to QPainter, with aspect ratio preserved
	QSize size = pixmap.size().scaled(topPortion.size(), Qt::AspectRatioMode::KeepAspectRatioByExpanding);

	//Draw the pixmap inside the scaled area, with aspect ratio preserved
	painter->drawPixmap(topPortion.x(), topPortion.y(), size.width(), size.height(), pixmap);
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
