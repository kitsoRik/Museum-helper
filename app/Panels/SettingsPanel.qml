import QtQuick 2.5
import QtQuick.Window 2.12
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13
import RostikObjects 1.0;

Rectangle {
    property bool replaceblePanel: true;
    property string panelDevTitle: "SettingsPanel";
    property string panelTitle: qsTr("Settings");

    ScrollView {
        anchors.fill: parent;

        ColumnLayout {
            width: parent.parent.width;

            Flow {
                Layout.fillWidth: true;
                Layout.fillHeight: true;
                Layout.margins: 4
                spacing: 10

                CheckBox {
                    Layout.fillWidth: true;
                    Layout.preferredHeight: 60;
                    text: qsTr("Fullscreen");
                    checked: settings.fullScreen;
                    onClicked: settings.fullScreen = checked;
                }

                CheckBox {
                    Layout.fillWidth: true;
                    Layout.preferredHeight: 60;
                    text: qsTr("Preloaded camera");
                    checked: settings.preloadedCamera;
                    onClicked: settings.preloadedCamera = checked;
                }
            }
        }
    }
}
