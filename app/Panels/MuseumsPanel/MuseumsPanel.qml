import QtQuick 2.0
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13
import QtMultimedia 5.13
import RostikObjects 1.0
import QtQuick.Controls.Material 2.12

Rectangle {
    property bool replaceblePanel: false;
    property string panelDevTitle: "MuseumsPanel";
    property string panelTitle: qsTr("Museums")
    color: "black";

    ColumnLayout {
        anchors.fill: parent;

        Rectangle {
            Layout.preferredHeight: 50;
            Layout.fillWidth: true;

            color: "black";

            RowLayout {
                anchors.fill: parent;



                Button {
                    Layout.fillHeight: true;
                    Layout.fillWidth: true;

                    text: qsTr("Find museums...");

                    Material.foreground: {
                        if(sv.currentIndex === 0)
                            return Material.color(Material.Cyan);
                    }

                    Material.background: {
                        if(sv.currentIndex === 0)
                            return Material.color(Material.Red);
                    }

                    onClicked: sv.setCurrentIndex(0);
                }

                Button {
                    Layout.fillHeight: true;
                    Layout.fillWidth: true;

                    text: qsTr("Saved museums...");

                    Material.foreground: {
                        if(sv.currentIndex === 1)
                            return Material.color(Material.Cyan);
                    }

                    Material.background: {
                        if(sv.currentIndex === 1)
                            return Material.color(Material.Red);
                    }

                    onClicked: sv.setCurrentIndex(1);
                }
            }
        }

        SwipeView {
            id: sv;
            currentIndex: 0;

            Layout.fillHeight: true;
            Layout.fillWidth: true;

            ColumnLayout {

                TextField {
                    Layout.fillWidth: true;
                    Layout.preferredHeight: 50;

                    placeholderText: qsTr("Pattern...");

                    onTextChanged: logic.loadMuseums(text);

                    Layout.margins: 10;
                }

                MuseumsList {
                    model: museums;
                }
            }

            MuseumsList {
                model: savedMuseums;
            }
        }
    }


}
