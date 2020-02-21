#ifndef PICTUREICON_H
#define PICTUREICON_H

#include <QQuickPaintedItem>
#include <QImage>

class PictureIcon : public QQuickPaintedItem
{
	Q_OBJECT

	Q_PROPERTY(QImage source READ source WRITE setSource NOTIFY sourceChanged)
	Q_PROPERTY(float correlation READ correlation NOTIFY sourceChanged)

	Q_PROPERTY(int iwidth READ iwidth NOTIFY sourceChanged)
	Q_PROPERTY(int iheight READ iheight NOTIFY sourceChanged)

	Q_PROPERTY(bool isNull READ isNull NOTIFY sourceChanged)
public:
	PictureIcon(QQuickItem *parent = nullptr);

public:
	void paint(QPainter *painter) override;

	QImage source() const;
	void setSource(const QImage &source);

	float correlation() const {
		return static_cast<float>(m_source.width()) / m_source.height();
	}

	inline int iwidth() const { return m_source.width(); }
	inline int iheight() const { return m_source.height(); }

	inline bool isNull() const { return m_source.isNull(); }

signals:
	void sourceChanged();

private:
	QImage m_source;
};

#endif // PICTUREICON_H
