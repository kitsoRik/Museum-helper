import QtQuick 2.0
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.12

Button {
    property string source;
    property string sourceInverse;
    id: root;
    hoverEnabled: true;
    background: Rectangle {

        color: "white";

        Image {
            anchors {
                fill: parent;
                margins: 10;
            }

            source: {
                if(parent.parent.pressed
                        || parent.parent.hovered)
                    return sourceInverse;
                return parent.parent.source;
            }

            fillMode: Image.PreserveAspectFit;
        }
    }
}
