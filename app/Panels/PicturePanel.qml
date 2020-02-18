import QtQuick 2.13
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13
import RostikObjects 1.0;

Rectangle {
    property bool replaceblePanel: false;
    property string panelDevTitle: "PicturePanel";
    property string panelTitle: currentPicture.title;
    color: "lime";

    function push() {
        //mainStackView.push("PicturePanel.qml");
        //mainStackView.push(picturePanel, {destroyOnPop: false});
    }

    function pop() {
        mainStackView.pop();
    }

    Text {
        anchors.margins: 10;
        anchors.fill: parent;
        visible: currentPicture.languagesSize === 0;


        horizontalAlignment: Text.AlignHCenter;
        verticalAlignment: Text.AlignVCenter;

        text: "Picture without information, wait future update";
        font.pixelSize: 300;
        fontSizeMode: Text.Fit;
        wrapMode: Text.WordWrap;
    }

    ScrollView {
        visible: currentPicture.languagesSize !== 0;
        width: parent.width;
        height: parent.height;
        contentWidth: width;

        ScrollBar.horizontal: ScrollBar {

        }


        ColumnLayout {
            width: parent.width;

            Rectangle {
                id: iconR;
                Layout.minimumHeight: width / pictureIcon.correlation;
                Layout.fillWidth: true;
//                visible: !currentPicture.isNull;

                color: "transparent";
                clip: true;

                PinchHandler {
                    id: ph;
                    target: pictureIcon;
                }

                PictureIcon {
                    id: pictureIcon;
                    height: parent.height;
                    width: parent.width;

                    source: currentPicture.icon;
                }
            }

            ComboBox {
                Layout.preferredHeight: 50;
                Layout.fillWidth: true;

                model: currentPicture.languagesModel();

                onCurrentIndexChanged: currentPicture.setLanguageIndex(currentIndex);
            }

            Text {
                id: title;
                Layout.fillWidth: true;
                Layout.preferredHeight: 40;

                horizontalAlignment: Text.AlignHCenter;

                text: {
//                    if(currentPicture.isNull)
//                        return "";
                    return currentPicture.title;
                }

                font {
                    family: "Calibri";
                    pixelSize: 24;
                }
            }

            Text {
                id: description;
                Layout.fillWidth: true;
                Layout.fillHeight: true;
                Layout.margins: 10;

                font {
                    family: "Times New Roman";
                    pointSize: 14;
                }

                horizontalAlignment: Text.AlignJustify;

                wrapMode: Text.WrapAtWordBoundaryOrAnywhere;
                text: {
//                    if(currentPicture.isNull)
//                        return "";
                    return currentPicture.description;
                }
            }
        }
    }
}
