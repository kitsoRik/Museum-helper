import QtQuick 2.5
import QtQuick.Window 2.12
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13
import RostikObjects 1.0;

Rectangle {
    property bool replaceblePanel: true;
    property string panelDevTitle: "SettingsPanel";
    property string panelTitle: qsTr("Settings");

    color: "black";

    ScrollView {
        anchors.fill: parent;

        ColumnLayout {
            width: parent.parent.width;

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

            ComboBox {
                Layout.fillWidth: true;
                Layout.preferredHeight: 70;
                currentIndex: {
                    let arr = ['en', 'ua', 'ru'];

                    for(let i = 0; i < arr.length; i++)
                        if(arr[i] === settings.language)
                            return i;
                }
                onCurrentIndexChanged: settings.language = ['en', 'ua', 'ru'][currentIndex];
                textRole: "text";
                model: ListModel {
                    ListElement { text: "English"; value: 'en' }
                    ListElement { text: "Українська"; value: 'ua' }
                    ListElement { text: "Русская"; value: 'ru' }
                }
            }
        }
    }
}
