import QtQuick 2.13
import QtQuick.Window 2.13
import QtQuick.Controls 2.13
import QtQuick.Controls.Material 2.12

import "Panels"
import "Panels/MuseumsPanel"
import "Panels/MuseumPanel"
import "Items"

ApplicationWindow {
    property int dpi: Screen.pixelDensity * 25.4

    function dp(x){
        if(dpi < 120) {
            return x; // For the usual computer monitor
        } else {
            return x*(dpi/160);
        }
    }

    Material.theme: Material.Dark;
    Material.accent: Material.Yellow;

    id: mainWindow;
    visible: true
    width: 1000;
    height: 500;
    visibility: {
        if(settings.fullScreen)
            return "FullScreen";
        return "AutomaticVisibility";
    }

    title: qsTr("Museum helper")

    header: Header { id: mainHeader; title: qsTr("Home"); height: 50; }

    onClosing: {
        if(mainStackView.depth > 1)
        {
            mainHeader.onBackClicked();
            close.accepted = false;
        }else {
            close.accepted = true;
        }
    }

    DrawerPanel {
        id: mainDrawer;
        width: dp(280);
        height: parent.height;
    }

    StackView {
        id: mainStackView;
        anchors.fill: parent;
        initialItem: museumsPanel;

        onCurrentItemChanged: {
            if(currentItem === scannerPanel) {
                qrcodeAnalyzer.startDecoding();
            } else {
                qrcodeAnalyzer.stopDecoding();
            }

            if(currentItem && currentItem.panelTitle) mainHeader.title = currentItem.panelTitle;
        }
    }

    MuseumsPanel { id: museumsPanel; visible: false; }
    StartPanel { id: startPanel; visible: false; }
    MuseumPanel { id: museumPanel; visible: false; }
    ScannerPanel { id: scannerPanel; visible: false; }
    ChoosePanel { id: choosePanel;  visible: false; }
}
