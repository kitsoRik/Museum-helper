import QtQuick 2.0
import QtMultimedia 5.13
import QtQuick.Controls 2.13
import QZXing 2.3
import RostikObjects 1.0

Rectangle {
    id: root;
    property bool replaceblePanel: false;
    property string panelDevTitle: "ScannerPanel";
    property string panelTitle: qsTr("Scanning");


    function push() {
        mainStackView.push(scannerPanel, {destroyOnPop: false});
    }

    function replace() {
        mainStackView.replace(scannerPanel, {destroyOnPop: false});
    }

    function pop() {
        mainStackView.pop();
    }

    function onSuccessDecoding(index) {
        if(mainStackView.currentItem.isPicturePanel)
            return;
        console.log(index);
        pictures.setCurrentIndex(index);
        //picturePanel.push();
        mainStackView.push("PicturePanel.qml");
    }

    function onFailedDecoding(type) {
//        if(type === QRCodeAnalyzer.NotFoundCodeInImage)
//        {
//            errorRect.show(qsTr("Try more"));
//        }else if(type === QRCodeAnalyzer.NotFoundCodeInBase)
//        {
//            errorRect.show(qsTr("Bad code"));
//        }else
//        {
//            throw "Unknown failed decoding type";
//        }
    }

    Connections {
        target: qrcodeAnalyzer;
        onSuccessDecoding: onSuccessDecoding(index);
        onFailedDecoding: onFailedDecoding(type);
    }

    Rectangle {
        id: voback;
        visible: mainStackView.currentItem === root;
        anchors.fill: parent;

        color: "red";

        VideoOutput {
            id: vo;
            width: parent.width;
            height: parent.height;

            fillMode: VideoOutput.PreserveAspectCrop;
            autoOrientation: true;
            source: camera;


            Image {
                anchors.fill: parent;
                source: "qrc:/main/icons/ScanningBackground.png"
                fillMode: Image.Stretch;

                Image {
                    anchors {
                        fill: parent;
                        margins: 15;
                    }
                    opacity: 0.2;

                    source: "qrc:/main/icons/ScanningQRCode.png"
                    fillMode: Image.PreserveAspectFit;
                }
            }

            Camera {
                id: camera;
                captureMode: Camera.CaptureViewfinder;
                cameraState: {
                    if(settings.preloadedCamera || mainStackView.currentItem === scannerPanel)
                        return Camera.ActiveState;
                    return Camera.UnloadedState;
                }
            }
        }
    }

    Image {
        visible: false;
        id: image;
    }

    Component.onCompleted: {
        qrcodeAnalyzer.source = camera;
    }
}
