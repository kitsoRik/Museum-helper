import QtQuick 2.13
import QtQuick.Controls 2.13
import QtQuick.Layouts 1.13
import RostikObjects 1.0;
import QtQuick.Window 2.13;

Rectangle {
    property bool replaceblePanel: false;
    property string panelDevTitle: "PicturePanel";
    property string panelTitle: currentPicture.title;
    color: "black";

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
                Layout.preferredHeight: {
                    if(currentPicture.iconsSize === 0)
                        return 0;
                    let s = Screen.height;
                    let h = mainHeader.height;
                    let b = settings.fullScreen ? 10 : 0;

                    return s - h - b;
                }
                Layout.fillWidth: true;
//                visible: !currentPicture.isNull;

                color: "transparent";
                clip: true;

                ListView {
                    id: lv;
                    height: parent.height;
                    width: parent.width;

                    orientation: ListView.Horizontal;

                    model: currentPicture.iconsSize;

                    delegate: Rectangle {
                        width: height * pictureIcon.correlation;
                        height: parent.height;
                        color: "red";
                        clip: true;

                        PictureIcon {
                            id: pictureIcon;
                            height: parent.height;
                            width: parent.width;

                            source: currentPicture.icon(index);
                        }
                    }
                }
            }

            ComboBox {
                Layout.preferredHeight: 70;
                Layout.fillWidth: true;

                model: currentPicture.languagesModel();

                onCurrentIndexChanged: currentPicture.setLanguageIndex(currentIndex);
            }

            Text {
                id: title;
                Layout.fillWidth: true;
                Layout.preferredHeight: 40;

                horizontalAlignment: Text.AlignHCenter;
                color: "white";
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

                color: "white";
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
