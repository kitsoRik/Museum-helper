QT += quick quickcontrols2 core multimedia network sql

CONFIG += c++11 qzxing_qml

# The following define makes your compiler emit warnings if you use
# any Qt feature that has been marked deprecated (the exact warnings
# depend on your compiler). Refer to the documentation for the
# deprecated API to know how to port your code away from it.
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if it uses deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

SOURCES += \
        Data/bigmuseum.cpp \
        Data/museum.cpp \
        Data/picture.cpp \
        Objects/dbc.cpp \
        Objects/museumobject.cpp \
        Objects/networkmanager.cpp \
        Objects/pictureobject.cpp \
        Objects/qrcodeanalyzerdecoder.cpp \
        Objects/settings.cpp \
        QMLObjects/pictureicon.cpp \
        logic.cpp \
        main.cpp \
        models/museumsmodel.cpp \
        models/savedmuseumsmodel.cpp \
        picturesmodel.cpp \
        qrcodeanalyzer.cpp

RESOURCES += qml.qrc \
    icons.qrc \
    trs.qrc

# Additional import path used to resolve QML modules in Qt Creator's code model
QML_IMPORT_PATH =

# Additional import path used to resolve QML modules just for Qt Quick Designer
QML_DESIGNER_IMPORT_PATH =

# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target

include(QZXingSource/QZXing.pri)

HEADERS += \
    Data/bigmuseum.h \
    Data/museum.h \
    Data/picture.h \
    Objects/dbc.h \
    Objects/museumobject.h \
    Objects/networkmanager.h \
    Objects/pictureobject.h \
    Objects/qrcodeanalyzerdecoder.h \
    Objects/settings.h \
    QMLObjects/pictureicon.h \
    logic.h \
    models/museumsmodel.h \
    models/savedmuseumsmodel.h \
    picturesmodel.h \
    qrcodeanalyzer.h

DISTFILES += \
    android/AndroidManifest.xml \
    android/build.gradle \
    android/gradle/wrapper/gradle-wrapper.jar \
    android/gradle/wrapper/gradle-wrapper.properties \
    android/gradlew \
    android/gradlew.bat \
    android/res/drawable/splash.png \
    android/res/values/libs.xml

contains(ANDROID_TARGET_ARCH,armeabi-v7a) {
    ANDROID_PACKAGE_SOURCE_DIR = \
        $$PWD/android
}

TRANSLATIONS += \
    $$PWD/translations/ru.ts \
    $$PWD/translations/ua.ts
