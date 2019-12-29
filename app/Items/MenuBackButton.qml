import QtQuick 2.13
import QtQuick.Controls 2.13

Button {
    property int animationDuration: 350

    id: root;
    hoverEnabled: true;

    background: Rectangle {
        color: {
            if(root.pressed)
                return "#FFFFFFFF";
            return "transparent";
        }
    }

    state: mainStackView.depth == 1 ? "menu" : "back";

    states: [
        State {
            name: "menu"
        },

        State {
            name: "back"
            PropertyChanges { target: root; rotation: 180 }
            PropertyChanges { target: bar1; rotation: 45;
                width: root.width * 13/24; x: root.width * 9.5/24; y: root.width * 8/24 }
            PropertyChanges { target: bar2;
                width: root.width * 17/24; x: root.width * 3/24; y: root.width * 12/24 }
            PropertyChanges { target: bar3; rotation: -45;
                width: root.width * 13/24; x: root.width * 9.5/24; y: root.width * 16/24 }
        }
    ]
    transitions: [
        Transition {
          RotationAnimation { target: root; direction: RotationAnimation.Clockwise;
                duration: animationDuration; easing.type: Easing.InOutQuad }
          PropertyAnimation { target: bar1; properties: "rotation, width, x, y";
                              duration: animationDuration; easing.type: Easing.InOutQuad }
          PropertyAnimation { target: bar2; properties: "rotation, width, x, y";
                              duration: animationDuration; easing.type: Easing.InOutQuad }
          PropertyAnimation { target: bar3; properties: "rotation, width, x, y";
                              duration: animationDuration; easing.type: Easing.InOutQuad }
        }
      ]

    Rectangle {
        id: bar1;
        x: root.width * 2/24;
        y: root.width * 5/24;
        radius: 5;
        width: root.width * 20/24;
        height: root.width * 2/24;
        antialiasing: true
        color: {
            if(root.pressed)
                return "#FF000000";
            return "#FFFFFFFFF";
        }
      }

      Rectangle {
        id: bar2;
        x: root.width * 2/24;
        y: root.width * 10/24;
        radius: 5;
        width: root.width * 20/24;
        height: root.width * 2/24;
        antialiasing: true
        color: {
            if(root.pressed)
                return "#FF000000";
            return "#FFFFFFFFF";
        }
      }

      Rectangle {
        id: bar3;
        x: root.width * 2/24;
        y: root.width * 15/24;
        radius: 5;
        width: root.width * 20/24;
        height: root.width * 2/24;
        antialiasing: true
        color: {
            if(root.pressed)
                return "#FF000000";
            return "#FFFFFFFFF";
        }
      }

}
