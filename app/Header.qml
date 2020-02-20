import QtQuick 2.0
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13
import QtQuick.Controls.Material 2.12

import "Items"

Rectangle {
    property string title;

    color: "black";

    function onBackClicked() {
        if(mainStackView.depth > 1)
        {
            if(mainStackView.currentItem.pop)
                mainStackView.currentItem.pop();
            else
                mainStackView.pop();
        }

        else
            mainDrawer.open();
    }

    RowLayout {
        anchors.fill: parent;

        MenuBackButton {
            Layout.fillHeight: true;
            Layout.preferredWidth: height;
            onClicked: onBackClicked();
        }
        Label {
            Layout.fillHeight: true;
            Layout.fillWidth: true;
            verticalAlignment: Text.AlignVCenter;
            horizontalAlignment: Text.AlignHCenter;
            anchors.centerIn: parent;
            text: title;
            color: "white";
            font {
                pointSize: 20;
                family: "PT SANS";
            }
        }

        Button {
            Layout.fillHeight: true;
            Layout.preferredWidth: height;
            text: "M";

            onClicked: {
                mainStackView.pop(null);
                mainStackView.replace(museumsPanel, {destroyOnPop: false});
            }
        }
    }
}
