import QtQuick 2.0
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13

Rectangle {
    color: "black";

    function onBackClicked() {
        if(mainStackView.depth > 1)
            mainStackView.pop();
        else
            mainDrawer.open();
    }

    RowLayout {
        anchors.fill: parent;

        Button {
            Layout.fillHeight: true;
            Layout.preferredWidth: height;

            onClicked: onBackClicked();
        }
    }
}
