import QtQuick 2.0
import QtQuick.Controls 2.12
import QtQuick.Layouts 1.12
import QtQuick.Controls.Material 2.12


Button {
    property string openPanelDevTitle;
    property string source;
    property string title;
    property string openPanelPath: "";
    property var openPanelRef: undefined;



    RowLayout {
        anchors.fill: parent;

        Image {
            Layout.fillHeight: true;
            Layout.preferredWidth: height;
            Layout.margins: 5;

            source: parent.parent.source;
        }

        Text {
            Layout.fillHeight: true;
            Layout.fillWidth: true;

            text: parent.parent.title;
            horizontalAlignment: Text.AlignHCenter;
            verticalAlignment: Text.AlignVCenter;
            color: "white";
            font {
                bold: true;
                pointSize: 21;
                family: "Calibri";
            }
        }
    }

    hoverEnabled: true;

    onClicked: {
        console.log("CL");
        if(mainStackView.currentItem.panelDevTitle === openPanelDevTitle) return;

        mainDrawer.close();
        if(mainStackView.currentItem.replaceblePanel)
        {
            if(openPanelPath == "")
                openPanelRef.replace();
            else mainStackView.replace(openPanelPath);
        }else
        {
            if(openPanelPath == "")
                openPanelRef.push();
            else mainStackView.push(openPanelPath);
        }


        parent.clicked();
    }

}
