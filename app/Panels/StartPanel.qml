import QtQuick 2.0
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13
import QtMultimedia 5.13

Rectangle {
    color: "orange";

    function onScanClick() {
        mainStackView.push("ScannerPanel.qml");
    }

    function onChooseClick() {
        mainStackView.push("ChoosePanel.qml");
    }

    ColumnLayout {
        anchors.fill: parent;

        Button {
            Layout.fillHeight: true;
            Layout.fillWidth: true;

            visible: QtMultimedia.availableCameras.length > 0;

            text: qsTr("Scan");

            onClicked: onScanClick();
        }

        Button {
            Layout.fillHeight: true;
            Layout.fillWidth: true;

            text: qsTr("Choose");

            onClicked: onChooseClick();
        }
    }

    Connections {
        target: networkManager;

        onUpdateRequired: {
            mainStackView.push("./UpdatePanel.qml");
        }
    }
}
