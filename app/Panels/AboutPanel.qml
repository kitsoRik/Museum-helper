import QtQuick 2.0
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13
import RostikObjects 1.0

Rectangle {
    property bool replaceblePanel: true;
    property string panelDevTitle: "AboutPanel";
    property string panelTitle: qsTr("About");

    ListView {
        anchors.fill: parent;
        model: [1];
        delegate: ColumnLayout {
            spacing: 20
            width: parent.width;

            Item { height: 30; }

            Text {
                Layout.fillWidth: true;
                text: qsTr("Created by Pidburachynskyi Rostyslav");
                wrapMode: Text.WrapAtWordBoundaryOrAnywhere;
                font.pixelSize: {
                    console.log(width);
                    return 30;
                }

                horizontalAlignment: Text.AlignHCenter;
            }
        }
    }
}
