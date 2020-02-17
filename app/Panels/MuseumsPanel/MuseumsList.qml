import QtQuick 2.0
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13
import QtMultimedia 5.13
import RostikObjects 1.0

ListView {
    Layout.fillHeight: true;
    Layout.fillWidth: true;

    spacing: 5;
    clip: true;

    delegate: Rectangle {
        width: parent.width;
        height: 50;
        color: {
            if(ma.containsMouse) return "black";
            return "red";
        }

        Text {
            anchors.fill: parent;
            color: "white";
            text: name; // NameRol

            horizontalAlignment: Text.AlignHCenter;
            font.pointSize: 100;
            fontSizeMode: Text.Fit;
        }

        MouseArea {
            id: ma;
            anchors.fill: parent;
            hoverEnabled: true;

            onClicked: {
                currentMuseum.setMuseumId(museumId); // MuseumIdRole
                mainStackView.push(museumPanel, { destroyOnPop: false });
            }
        }
    }
}
