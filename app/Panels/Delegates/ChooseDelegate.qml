import QtQuick 2.0
import QtQuick.Layouts 1.13
import RostikObjects 1.0;

Rectangle {
    color: "black";
    border {
        color: "white";
        width: 5;
    }

    function onClicked() {
        currentPicture.setCurrentPictureId(id); // IdRole
        //picturePanel.push();
        mainStackView.push("../PicturePanel.qml");
    }

    RowLayout {
        anchors {
            fill: parent;
            margins: parent.border.width;
        }

        Rectangle {
            visible: !pictureIcon.isNull;
            Layout.fillHeight: true;
            Layout.preferredWidth: height;

            PictureIcon {
                id: pictureIcon;
                height: parent.height;
                width: parent.width;

                source: icon; // IconRole
            }
        }

        Text {
            Layout.fillHeight: true;
            Layout.fillWidth: true;
            color: "white";
            font.pixelSize: 30;
            elide: Text.ElideRight;
            horizontalAlignment: Qt.AlignHCenter;
            verticalAlignment: Qt.AlignVCenter;
            text: name + "_ROS"; // NameRole
        }
    }

    MouseArea {
        anchors.fill: parent;

        onClicked: parent.onClicked();
    }
}
