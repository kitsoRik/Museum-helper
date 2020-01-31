import QtQuick 2.0
import QtQuick.Controls 2.12
import QtQuick.Layouts 1.12

import RostikObjects 1.0

Rectangle {
    property bool replaceblePanel: true;
    property string panelDevTitle: "UpdatePanel";
    property string title: qsTr("Update");
    color: "brown";

    ColumnLayout {
        id: col;
        anchors.fill: parent;
        anchors.margins: 10;

        BusyIndicator {
            id: busy;
            Layout.fillHeight: true;
            Layout.fillWidth: true;
            Layout.alignment: Qt.AlignVCenter;

            Text {
                id: busyText;
                anchors.centerIn: parent;
                text: {
                    let result = networkManager.updateProgress.toPrecision(2);
                    if(result < 1 && result !== 0)
                        result = 1;
                    return result + "%";
                }

                font.pixelSize: {
                    let min = parent.height < parent.width ? parent.height : parent.width;
                    return min * 1/7;
                }
            }
            state: "holding";
            states: [
                State {
                    name: "holding";
                    PropertyChanges {
                        target: busy;
                        visible: false;
                    }
                },
                State {
                    name: "loading";
                    PropertyChanges {
                        target: busy;
                        visible: true;
                    }
                }
            ]
            transitions: [
                Transition {
                    from: "holding"
                    to: "loading"
                }
            ]
        }

        Item { Layout.fillHeight: true; Layout.fillWidth: true; }
        Text {
            id: updateText;
            Layout.preferredHeight: 40;
            Layout.fillWidth: true;
            text: "Loading";
            font.pointSize: 24;
            horizontalAlignment: Qt.AlignCenter | Qt.AlignBottom;
        }

        Button {
            Layout.fillWidth: true;
            Layout.minimumHeight: 60;

            background: Rectangle { color: "orange"; }
            text: "Upload";

            onClicked: {
                busy.state = "loading";
                networkManager.downloadUpdate();
            }
        }
    }

    Connections {
        target: networkManager;

        onDownloadUpdateFinished: {
            busyText.text = "100%";
            updateText.text = "Installing";
        }
        onInstallUpdateFinished: {
            updateText.text = "Ready";
            mainStackView.pop();
        }
    }
}
