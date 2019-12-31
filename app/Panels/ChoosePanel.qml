import QtQuick 2.0
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13

import "Delegates"

Rectangle {
    color: "red";

    function push() {
        mainStackView.push(choosePanel, {destroyOnPop: false});
    }

    function pop() {
        mainStackView.pop();
    }

    ListView {
        anchors.fill: parent;
        model: pictures;

        delegate: ChooseDelegate {
            width: parent.width;
            height: 60;
        }
    }
}
