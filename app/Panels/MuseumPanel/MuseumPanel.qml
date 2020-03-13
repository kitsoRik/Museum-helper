import QtQuick 2.0
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13
import QtMultimedia 5.13
import RostikObjects 1.0
import QtQuick.Dialogs 1.1

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

            background: Rectangle { color: "red"; }

            onClicked: currentMuseum.updateMuseum();
        }

        Button {
            visible: !currentMuseum.isSaved && !currentMuseum.isLoading;
            Layout.fillWidth: true;
            Layout.preferredHeight: 60;
            Layout.margins: 10;

            text: qsTr("Save museum");

            onClicked: currentMuseum.saveMuseum();

            Connections {
                target: currentMuseum;
                onMuseumSaved: {
                    saveIconsDialog.visible = true;
                }
            }
        }

        Button {
            visible: currentMuseum.isSaved && !currentMuseum.isLoading;
            Layout.fillWidth: true;
            Layout.preferredHeight: 60;
            Layout.margins: 10;

            text: qsTr("Remove museum");

            onClicked: currentMuseum.removeMuseum();

            Dialog {
                id: dialog
                modal: true;
                x: fullMainWindow.width / 2 - width / 2;
                y: fullMainWindow.height / 2 - height / 2;
                title: qsTr("Update warning!");
                standardButtons: Dialog.Ok | Dialog.Cancel;

                function loadm() {
                    mainStackView.pop(null);
                    mainStackView.replace(startPanel, {destroyOnPop: false});
                    currentMuseum.goToStart();
                }

                onAccepted: {
                    mainStackView.update();
                }

                onRejected: {
                    loadm();
                }
            }
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
                if(currentMuseum.needUpdate)
                    messageDialog.visible = true;
                else updateDialog.loadm();
            }
        }


    }

    Dialog {
        id: updateDialog;
        modal: true;
        x: fullMainWindow.width / 2 - width / 2;
        y: fullMainWindow.height / 2 - height / 2;
        title: qsTr("Update warning!");
        standardButtons: Dialog.Ok | Dialog.Cancel;

        function loadm() {
            mainStackView.pop(null);
            mainStackView.replace(startPanel, {destroyOnPop: false});
            currentMuseum.goToStart();
        }

        onAccepted: {
            currentMuseum.updateMuseum();
        }

        onRejected: {
            loadm();
        }

        Label {
            text: qsTr("This museum have an update, update now?");
        }
    }

    Dialog {
        id: saveIconsDialog;
        modal: true;
        x: fullMainWindow.width / 2 - width / 2;
        y: fullMainWindow.height / 2 - height / 2;
        title: qsTr("Save icons?");
        Label {
            text: qsTr("This museum have icons, save its?");
        }

        standardButtons: Dialog.Ok | Dialog.Cancel;

        onAccepted: {
            currentMuseum.saveIcons();
        }
    }

}
