// Handle Moving Avatar
const moveAvatar = (evt, avatar) => {
  switch (evt.keyCode) {
    case 37:
      leftArrowPressed(avatar);
      break;
    case 39:
      rightArrowPressed(avatar);
      break;
    case 38:
      upArrowPressed(avatar);
      break;
    case 40:
      downArrowPressed(avatar);
      break;
  }
};

const leftArrowPressed = (avatar) => {
  if (parseInt(avatar.style.left) - 5 < 0) {
    // don't allow avatar to move beyond boundary
    return;
  } else {
    // move participant's own avatar
    avatar.style.left = parseInt(avatar.style.left) - 5 + 'px';
    let dataPayload = {
      horizontalPosition: avatar.style.left,
    };
    // send command with data of avatar's position to other participants
    VoxeetSDK.command
      .send(dataPayload)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }
};

const rightArrowPressed = (avatar) => {
  if (parseInt(avatar.style.left) + 5 > 1000 - 150) {
    return;
  } else {
    avatar.style.left = parseInt(avatar.style.left) + 5 + 'px';
    let dataPayload = {
      horizontalPosition: avatar.style.left,
    };
    VoxeetSDK.command
      .send(dataPayload)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }
};

const upArrowPressed = (avatar) => {
  if (parseInt(avatar.style.top) - 5 < 0) {
    return;
  } else {
    avatar.style.top = parseInt(avatar.style.top) - 5 + 'px';
    let dataPayload = {
      verticalPosition: avatar.style.top,
    };
    VoxeetSDK.command
      .send(dataPayload)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }
};

const downArrowPressed = (avatar) => {
  if (parseInt(avatar.style.top) + 5 > 800 - 288) {
    return;
  } else {
    avatar.style.top = parseInt(avatar.style.top) + 5 + 'px';
    let dataPayload = {
      verticalPosition: avatar.style.top,
    };
    VoxeetSDK.command
      .send(dataPayload)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }
};

const moveAvatarHorizontally = (participantId, leftCoordinate) => {
  // find that participant's avatar and update its position in the DOM,
  // using videoContainerList set in video.js
  let avatarId;
  for (let i = 0; i < videoContainerList.length; i++) {
    if (videoContainerList[i].participantId === participantId) {
      avatarId = 'avatar-' + i;
    }
  }
  let avatar = document.getElementById(avatarId);
  avatar.style.left = leftCoordinate;
};

const moveAvatarVertically = (participantId, topCoordinate) => {
  let avatarId;
  for (let i = 0; i < videoContainerList.length; i++) {
    if (videoContainerList[i].participantId === participantId) {
      avatarId = 'avatar-' + i;
    }
  }
  let avatar = document.getElementById(avatarId);
  avatar.style.top = topCoordinate;
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
