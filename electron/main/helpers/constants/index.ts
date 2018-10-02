
const TOGGLE_NOTIFICATION_PANEL = 'TOGGLE_NOTIFICATION_PANEL';
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';
const CLEAR_ALL_NOTIFICATIONS = 'CLEAR_ALL_NOTIFICATIONS';
const TOGGLE_LOADER_PANEL = 'TOGGLE_LOADER_PANEL';
const TOGGLE_SETTINGS_PANEL = 'TOGGLE_SETTINGS_PANEL';
const TOGGLE_SEARCH_PANEL = 'TOGGLE_SEARCH_PANEL';
const ADD_APP_ITEM = 'ADD_APP_ITEM';
const SWITCH_DAPP = 'SWITCH_DAPP';
const TOGGLE_HOME = 'TOGGLE_HOME';
const TOGGLE_APP_HOME = 'TOGGLE_APP_HOME';
const SET_TRAY_COUNTER = 'SET_TRAY_COUNTER';
const SET_TRAY_PROGRESS = 'SET_TRAY_PROGRESS';
const REMOVE_TRAY_ITEM = 'REMOVE_TRAY_ITEM';
const APPS_FEED_RESIZE = 'APPS_FEED_RESIZE';

// Dapp communication protocol
const INTENT_OPEN_CHANNELS = 'INTENT_OPEN_CHANNELS';
const OPEN_CHANNEL = 'OPEN_CHANNEL';
const BIND_OPEN_CHANNELS = 'BIND_OPEN_CHANNELS';
const BIND_OPEN_CHANNELS_DONE = 'BIND_OPEN_CHANNELS_DONE';
const OPEN_CHANNEL_SUCCESS = 'OPEN_CHANNEL_SUCCESS';
const OPEN_CHANNEL_FAILURE = 'OPEN_CHANNEL_FAILURE';
const TOGGLE_STATUS_BAR_PANEL = 'TOGGLE_STATUS_BAR_PANEL';
const TOGGLE_PEERS_BAR_PANEL = 'TOGGLE_PEERS_BAR_PANEL';
const INTENT_OPEN_FILE = "INTENT_OPEN_FILE";

// Component-channel resolver
const INTENT_CHANNEL_DATA_PASS = 'INTENT_CHANNEL_DATA_PASS';
const ACCEPT_CHANNEL_DATA_PASS = 'ACCEPT_CHANNEL_DATA_PASS';


export {
  TOGGLE_NOTIFICATION_PANEL,
  CLEAR_NOTIFICATION,
  CLEAR_ALL_NOTIFICATIONS,
  TOGGLE_LOADER_PANEL,
  TOGGLE_SETTINGS_PANEL,
  SET_TRAY_COUNTER,
  SET_TRAY_PROGRESS,
  REMOVE_TRAY_ITEM,
  APPS_FEED_RESIZE,
  ADD_APP_ITEM,
  SWITCH_DAPP,
  TOGGLE_HOME,
  TOGGLE_APP_HOME,
  TOGGLE_STATUS_BAR_PANEL,
  TOGGLE_PEERS_BAR_PANEL,
  TOGGLE_SEARCH_PANEL,
  INTENT_OPEN_FILE,

  OPEN_CHANNEL_FAILURE,
  BIND_OPEN_CHANNELS,

  INTENT_OPEN_CHANNELS,
  OPEN_CHANNEL,
  OPEN_CHANNEL_SUCCESS,
  BIND_OPEN_CHANNELS_DONE,
  INTENT_CHANNEL_DATA_PASS,
  ACCEPT_CHANNEL_DATA_PASS
}
