import QtQuick 2.0
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13
import RostikObjects 1.0

Rectangle {
    ScrollView {
        anchors.fill: parent;

        ColumnLayout {
            width: parent.width;

            Image {
                id: aboutImage;
                Layout.fillWidth: true;
                Layout.preferredHeight: width; // width / (sourceWidth / sourceHeight);

                fillMode: Image.PreserveAspectFit;
                source: "qrc:/main/drawericons/SettingsIcon.png"
            }

            Item { Layout.minimumHeight: 30; }

            Text {
                Layout.fillHeight: true;
                Layout.fillWidth: true;
                text: qsTr("assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddssssssssssssssssssssssssssssss")
                wrapMode: Text.WrapAtWordBoundaryOrAnywhere;
            }
        }
    }
}
