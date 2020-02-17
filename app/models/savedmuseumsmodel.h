#ifndef SAVEDMUSEUMSMODEL_H
#define SAVEDMUSEUMSMODEL_H

#include "museumsmodel.h"

class SavedMuseumsModel : public MuseumsModel
{
public:

	static SavedMuseumsModel *instance () { return m_instance; }

	SavedMuseumsModel(QObject *parent = nullptr);

private:
	static SavedMuseumsModel *m_instance;
};

#endif // SAVEDMUSEUMSMODEL_H
