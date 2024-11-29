import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate, useParams } from 'react-router-dom';



export default function VideoVoice() {
    const navigate = useNavigate();
    const params = useParams();
    const roomID = params.id;
    const url = new URLSearchParams(window.location.search);
    const name = url.get('name');

    let myMeeting = async (element) => {
    const appID = 333034266;
    const serverSecret = "6c76db311b24f399823b2e546f1f755a";
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  Date.now().toString(),  name || 'Aryan');

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
    container: element,
    sharedLinks: [
        {
        name: 'Personal link',
        url: "http://localhost:5173/room/" + roomID
        },
    ],
    scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, 
        onLeaveRoom: () => {
            console.log('onLeaveRoom')
            navigate('/')
        },
        onUserLeave: (users)=>{
            console.log('onUserLeave', users)
            navigate('/')
        },
        onReturnToHomeScreenClicked: () => {
            window.location.href = '/';
        }

    },
    });

  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
