import QtQuick 2.0
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13
import RostikObjects 1.0

Drawer {
    background: Rectangle {
        color: "orange";
    }

    ColumnLayout {
        anchors.fill: parent;
        anchors.margins: 5;

        Item { Layout.fillHeight: true; Layout.fillWidth: true; }

        Button {
            Layout.fillWidth: true;
            Layout.preferredHeight: 40;
        }
    }
}
