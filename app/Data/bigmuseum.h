#ifndef BIGMUSEUM_H
#define BIGMUSEUM_H

#include <QString>

class BigMuseum
{
public:
	BigMuseum();

	int id() const;
	void setId(int id);

	QString name() const;
	void setName(const QString &name);

	QString location() const;
	void setLocation(const QString &location);

	int updateId() const;
	void setUpdateId(int updateId);

	bool hasIcons() const;
	void setHasIcons(bool hasIcons);

private:

	int m_id;
	QString m_name;
	QString m_location;
	int m_updateId;
	bool m_hasIcons;
};

#endif // BIGMUSEUM_H
