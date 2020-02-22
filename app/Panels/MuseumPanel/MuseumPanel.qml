import QtQuick 2.0
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13
import QtMultimedia 5.13
import RostikObjects 1.0

Rectangle {
    property bool replaceblePanel: false;
    property string panelDevTitle: "MuseumPanel";
    property string panelTitle: qsTr("Museum")
    color: "black";

    ColumnLayout {
        anchors.fill: parent;

        Text {
            Layout.fillWidth: true;
            Layout.preferredHeight: 30;
            text: currentMuseum.name + (currentMuseum.isSaved ? " (SAVED)": "");
            horizontalAlignment: Text.AlignHCenter;

            font.pointSize: 300;
            fontSizeMode: Text.Fit;
        }

        BusyIndicator {
            visible: currentMuseum.isLoading;

            Layout.fillWidth: true;
            Layout.fillHeight: true;
        }

        Item { Layout.fillHeight: true; }

        Button {
            visible: currentMuseum.needUpdate && !currentMuseum.isLoading;
            Layout.fillWidth: true;
            Layout.preferredHeight: 60;
            Layout.margins: 10;

            text: qsTr("Update");

            onClicked: currentMuseum.updateMuseum();
        }

        Button {
            visible: !currentMuseum.isSaved && !currentMuseum.isLoading;
            Layout.fillWidth: true;
            Layout.preferredHeight: 60;
            Layout.margins: 10;

            text: qsTr("Save museum");

            onClicked: currentMuseum.saveMuseum();
        }

        Button {

            visible: !currentMuseum.iconsSaved && currentMuseum.isSaved && !currentMuseum.isLoading;
            Layout.fillWidth: true;
            Layout.preferredHeight: 60;
            Layout.margins: 10;

            text: qsTr("Save icons");

            onClicked: currentMuseum.saveIcons();
        }

        Button {
            visible: currentMuseum.isSaved && !currentMuseum.isLoading;
            Layout.fillWidth: true;
            Layout.preferredHeight: 60;
            Layout.margins: 10;

            text: qsTr("Go to start");

            onClicked: {
                mainStackView.pop(null);
                mainStackView.replace(startPanel, {destroyOnPop: false});
                currentMuseum.goToStart();
            }
        }
    }
}
