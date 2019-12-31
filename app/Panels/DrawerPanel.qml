import QtQuick 2.0
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13
import QtMultimedia 5.13
import RostikObjects 1.0

import "./Delegates"

Drawer {
    background: Rectangle {
        color: "orange";
    }

    ColumnLayout {
        anchors.fill: parent;
        spacing: 0;

        Rectangle {
            Layout.fillWidth: true;
            Layout.preferredHeight: 200;

            color: "green";
        }

        ScrollView {
            Layout.fillWidth: true;
            Layout.fillHeight: true;

            clip: true;

            Rectangle {
                anchors.fill: parent;
                color: "black";
            }

            ColumnLayout {
                width: parent.width;
                spacing: 1;

                DrawerDelegate {
                    visible: QtMultimedia.availableCameras.length > 0;
                    Layout.fillWidth: true;
                    Layout.preferredHeight: 60;
                    title: "Scanner";
                    source: "qrc:/main/drawericons/SettingsIcon.png";

                    onClicked: {
                        mainDrawer.close();
                        scannerPanel.push();
                    }
                }

                DrawerDelegate {
                    Layout.fillWidth: true;
                    Layout.preferredHeight: 60;
                    title: "Choose";
                    source: "qrc:/main/drawericons/SettingsIcon.png";

                    onClicked: {
                        mainDrawer.close();
                        choosePanel.push();
                    }
                }

                DrawerDelegate {
                    Layout.fillWidth: true;
                    Layout.preferredHeight: 60;
                    title: "Settings";
                    source: "qrc:/main/drawericons/SettingsIcon.png";

                    onClicked: {
                        mainStackView.push("SettingsPanel.qml");
                        mainDrawer.close();
                    }
                }

                DrawerDelegate {
                    Layout.fillWidth: true;
                    Layout.preferredHeight: 60;
                    title: "About";
                    source: "qrc:/main/drawericons/SettingsIcon.png";

                    onClicked: {
                        mainStackView.push("AboutPanel.qml");
                        mainDrawer.close();
                    }
                }
            }
        }
    }
}
