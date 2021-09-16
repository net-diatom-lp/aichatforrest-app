// Handle Moving Avatar
const moveAvatar = (evt, avatar) => {
  let left = parseInt(avatar.style.left);
  let top = parseInt(avatar.style.top);

  switch (evt.keyCode) {
    case 37:
      left -= 5;
      break;
    case 39:
      left += 5;
      break;
    case 38:
      top -= 5;
      break;
    case 40:
      top += 5;
      break;
    default:
      return;
  }

  if (0 <= left && left <= 1000 - 150 && 0 <= top && top <= 800 - 288) {
    avatar.style.left = left + 'px';
    avatar.style.top = top + 'px';

    const dataPayload = {
      horizontalPosition: avatar.style.left,
      verticalPosition: avatar.style.top,
    };

    // send command with data of avatar's position to other participants
    VoxeetSDK.command.send(dataPayload).catch((err) => console.error(err));
  }
};

const moveAvatarPosition = (participantId, topCoordinate, leftCoordinate) => {
  // find that participant's avatar and update its position in the DOM,
  // using videoContainerList set in video.js
  for (let i = 0; i < videoContainerList.length; i++) {
    if (videoContainerList[i].participantId === participantId) {
      let avatar = document.getElementById('avatar-' + i);
      avatar.style.top = topCoordinate;
      avatar.style.left = leftCoordinate;
      return;
    }
  }
};

// Update conference name in url as user types
const updateConferenceName = (event) => {
  let queryStringParams = new URLSearchParams(window.location.search);
  queryStringParams.set('alias', event.target.value);
  if (window.history.replaceState) {
    let url =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      '?' +
      queryStringParams.toString();

    window.history.replaceState(
      {
        path: url,
      },
      '',
      url
    );
  }
};

const getConferenceNameFromURL = () => {
  let query = window.location.search.substring(1);
  let params = query.split('&');
  for (let i = 0; i < params.length; i++) {
    let pair = params[i].split('=');
    if (pair[0] == 'alias') {
      return pair[1];
    }
  }
  return false;
};

const setConferenceName = (
  conferenceUrl,
  conferenceNameInput,
  conferenceNameInputPrompt
) => {
  // if there is already a conference name in the url (ie joining with a join link),
  // disable the conference name input form
  if (!conferenceUrl) {
    return;
  } else {
    conferenceNameInput.value = conferenceUrl;
    conferenceNameInput.disabled = true;
    conferenceNameInput.style.backgroundColor = 'lightgrey';
    conferenceNameInput.style.borderColor = 'lightgrey';
    conferenceNameInputPrompt.innerText = 'Will join conference:';
  }
};
