import QtQuick 2.0
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13
import QtMultimedia 5.13
import RostikObjects 1.0

import "./Delegates"

Drawer {
    background: Rectangle {
        color: "black";
    }

    ScrollView {
        anchors.fill: parent;

        clip: true;

        ColumnLayout {
            width: parent.parent.width;
            spacing: 1;

            DrawerDelegate {
                visible: QtMultimedia.availableCameras.length > 0;
                Layout.fillWidth: true;
                Layout.preferredHeight: 90;
                title: "Scanner";
                source: "qrc:/main/drawericons/SettingsIcon.png";
                openPanelDevTitle: "ScannerPanel";
                openPanelRef: scannerPanel;
            }

            DrawerDelegate {
                Layout.fillWidth: true;
                Layout.preferredHeight: 90;
                title: "Choose";
                source: "qrc:/main/drawericons/SettingsIcon.png";
                openPanelDevTitle: "ChoosePanel";
                openPanelRef: choosePanel;
            }

            DrawerDelegate {
                Layout.fillWidth: true;
                Layout.preferredHeight: 80;
                title: "Settings";
                source: "qrc:/main/drawericons/SettingsIcon.png";
                openPanelDevTitle: "SettingsPanel";
                openPanelPath: "qrc:/Panels/SettingsPanel.qml";
            }

            DrawerDelegate {
                Layout.fillWidth: true;
                Layout.preferredHeight: 70;
                title: "About";
                source: "qrc:/main/drawericons/SettingsIcon.png";
                openPanelDevTitle: "AboutPanel";
                openPanelPath: "qrc:/Panels/AboutPanel.qml";
            }
        }
    }
}
