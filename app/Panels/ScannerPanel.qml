import QtQuick 2.0
import QtMultimedia 5.13
import QtQuick.Controls 2.13
import QZXing 2.3
import RostikObjects 1.0

Rectangle {
    property bool scanner: true;

    function onSuccessDecoding(index) {
        console.log(index);
        pictures.setCurrentIndex(index);
        mainStackView.push("PicturePanel.qml");
    }

    function onFailedDecoding(type) {
        if(type === QRCodeAnalyzer.NotFoundCodeInImage)
        {
            errorRect.show(qsTr("Try more"));
        }else if(type === QRCodeAnalyzer.NotFoundCodeInBase)
        {
            errorRect.show(qsTr("Bad code"));
        }else
        {
            throw "Unknown failed decoding type";
        }
    }

    Connections {
        target: qrcodeAnalyzer;
        onSuccessDecoding: onSuccessDecoding(index);
        onFailedDecoding: onFailedDecoding(type);
    }

    Rectangle {
        id: errorRect;
        z: 1;
        width: parent.width * 2 / 3;
        height: 30;
        visible: false;

        color: "white";
        opacity: 0.8;

        Text {
            id: innerText;
        }

        Timer {
            id: innerTimer;
            interval: 1000;
            running: false;
            repeat: false;

            onTriggered: {
                parent.visible = false;
            }
        }

        function show(text) {
            if(innerTimer.running)
                innerTimer.running = false;

            innerTimer.running = true;

            visible = true;
            innerText.text = text;
        }
    }

    VideoOutput {
        id: vo;
        width: parent.width;
        height: parent.height;

        fillMode: VideoOutput.PreserveAspectCrop;
        autoOrientation: true;
        source: camera;

        Camera {
            id: camera;
            captureMode: Camera.CaptureViewfinder;
        }
    }

    Image {
        visible: false;
        id: image;
    }

    Component.onCompleted: {
        camera.cameraState = Camera.ActiveState;
        qrcodeAnalyzer.source = camera;
    }
}
