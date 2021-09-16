// Track which participant is in which video container
let videoContainerList = [
  { participantId: undefined },
  { participantId: undefined },
  { participantId: undefined },
  { participantId: undefined },
];

const addVideoNode = (participant, stream) => {
  let videoNode = document.getElementById('video-' + participant.id);

  // if a video node does not exist for a participant with this id, made a <video> element
  if (!videoNode) {
    videoNode = document.createElement('video');
    videoNode.setAttribute('id', 'video-' + participant.id);
    videoNode.setAttribute('height', 240);
    videoNode.setAttribute('width', 320);
    videoNode.setAttribute('playsinline', true);
    videoNode.muted = true;
    videoNode.setAttribute('autoplay', 'autoplay');

    // if participant id is not present in the video container list,
    // insert participant id into list and update DOM
    for (let i = 0; i < videoContainerList.length; i++) {
      if (!videoContainerList[i].participantId) {
        videoContainerList[i].participantId = participant.id;
        let videoContainer = document.getElementById('video-container-' + i);
        videoContainer.appendChild(videoNode);
        // create event listener for user to move their own avatar
        if (
          videoContainerList[i].participantId ===
          VoxeetSDK.session.participant.id
        ) {
          let avatar = document.getElementById('avatar-' + i);
          window.addEventListener('keydown', function () {
            moveAvatar(event, avatar);
          });
        }
        break;
      }
    }
  }

  navigator.attachMediaStream(videoNode, stream);
};

const removeVideoNode = (participant) => {
  let videoNode = document.getElementById('video-' + participant.id);
  if (videoNode) {
    // remove leaving participant's videonode from the DOM
    videoNode.srcObject = null; // Prevent memory leak in Chrome
    videoNode.parentNode.removeChild(videoNode);
    for (let i = 0; i < videoContainerList.length; i++) {
      // remove particpant from container list when they leave
      if (videoContainerList[i].participantId === participant.id) {
        videoContainerList[i].participantId = undefined;
      }
    }
  }
};
