import QtQuick 2.0
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13
import QtMultimedia 5.13

import "./../Items"

Rectangle {
    property bool replaceblePanel: false;
    property string panelDevTitle: "StartPanel";
    property string panelTitle: qsTr("Home");

    color: "orange";

    function onScanClick() {
        scannerPanel.push();
    }

    function onChooseClick() {
        choosePanel.push();
    }

    ColumnLayout {
        anchors.fill: parent;

        ButtonWithIcon {
            id: scanningButton;
            Layout.fillHeight: true;
            Layout.fillWidth: true;
            visible: QtMultimedia.availableCameras.length > 0;

            source: "qrc:main/icons/ScanningIcon.png";
            sourceInverse: "qrc:main/icons/ScanningIcon_inverse.png";

            onClicked: onScanClick();
        }

        ButtonWithIcon {
            id: searchButton;
            Layout.fillHeight: true;
            Layout.fillWidth: true;

            source: "qrc:/main/icons/SearchIcon.png";
            sourceInverse: "qrc:/main/icons/SearchIcon_inverse.png";

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
