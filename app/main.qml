import QtQuick 2.13
import QtQuick.Window 2.13
import QtQuick.Controls 2.13

import "Panels"

ApplicationWindow {

    property int dpi: Screen.pixelDensity * 25.4

    function dp(x){
        if(dpi < 120) {
            return x; // For the usual computer monitor
        } else {
            return x*(dpi/160);
        }
    }

    visible: true
    width: 1000;
    height: 500;
    title: qsTr("Hello World")

    header: Header { height: 50; }

    DrawerPanel {
        id: mainDrawer;
        width: dp(280);
        height: parent.height;
    }

    StackView {
        id: mainStackView;
        anchors.fill: parent;
        initialItem: StartPanel { }
        onCurrentItemChanged: {
            if(currentItem.scanner) qrcodeAnalyzer.decoding = true;
        }
    }
}
