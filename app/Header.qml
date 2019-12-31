import QtQuick 2.0
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13

import "Items"

Rectangle {
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
    }
}
