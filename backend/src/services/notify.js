const listeners = {};

function emit(userId, message) {
  if (listeners[userId]) {
    listeners[userId](message);
  }
}

function listen(userId, callback) {
  listeners[userId] = callback;
}
