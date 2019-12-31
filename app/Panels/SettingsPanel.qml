import QtQuick 2.0
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13
import RostikObjects 1.0;

Rectangle {
    ScrollView {
        anchors.fill: parent;

        ColumnLayout {
            width: parent.width;

            Button {
                Layout.fillWidth: true;
                Layout.preferredHeight: 60;

                text: "A";
            }

            CheckBox {
                Layout.fillWidth: true;
                Layout.preferredHeight: 60;
                text: "Fullscreen";
                checked: settings.fullScreen;
                onClicked: settings.fullScreen = checked;
            }
        }
    }
}
