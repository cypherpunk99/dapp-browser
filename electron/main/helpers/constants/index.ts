export const TOGGLE_NOTIFICATION_PANEL = 'TOGGLE_NOTIFICATION_PANEL';
export const TOGGLE_KEYCHAIN_PANEL = 'TOGGLE_KEYCHAIN_PANEL';
export const KEYCHAIN_REMOVE_KEY = 'KEYCHAIN_REMOVE_KEY';
export const KEYCHAIN_SELECT_KEY = 'KEYCHAIN_SELECT_KEY';
export const TOGGLE_LOADER_PANEL = 'TOGGLE_LOADER_PANEL';
export const TOGGLE_SETTINGS_PANEL = 'TOGGLE_SETTINGS_PANEL';
export const TOGGLE_SEARCH_PANEL = 'TOGGLE_SEARCH_PANEL';
export const TOGGLE_STATUS_BAR_PANEL = 'TOGGLE_STATUS_BAR_PANEL';
export const TOGGLE_PEERS_BAR_PANEL = 'TOGGLE_PEERS_BAR_PANEL';
export const ADD_APP_ITEM = 'ADD_APP_ITEM';
export const CLIENT_SWITCH_DAPP = 'CLIENT_SWITCH_DAPP';
export const SWITCH_DAPP = 'SWITCH_DAPP';
export const SWITCH_DAPP_SUCCESS = 'SWITCH_DAPP_SUCCESS';
export const SWITCH_DAPP_FAILURE = 'SWITCH_DAPP_FAILURE';
export const TOGGLE_HOME = 'TOGGLE_HOME';
export const CLIENT_TOGGLE_HOME = 'CLIENT_TOGGLE_HOME';
export const TOGGLE_APP_HOME = 'TOGGLE_APP_HOME';
export const SET_TRAY_PROGRESS = 'SET_TRAY_PROGRESS';
export const REMOVE_TRAY_ITEM = 'REMOVE_TRAY_ITEM';
export const CLIENT_ADD_NOTIFICATION = 'CLIENT_ADD_NOTIFICATION';
export const CLIENT_CLEAR_NOTIFICATION = 'CLIENT_CLEAR_NOTIFICATION';
export const CLIENT_CLEAR_ALL_NOTIFICATIONS = 'CLIENT_CLEAR_ALL_NOTIFICATIONS';

export const MARKET_DOWNLOAD_DAPP = 'MARKET_DOWNLOAD_DAPP';
export const MARKET_DOWNLOAD_DAPP_SUCCESS = 'MARKET_DOWNLOAD_DAPP_SUCCESS';
export const MARKET_DOWNLOAD_DAPP_FAILURE = 'MARKET_DOWNLOAD_DAPP_FAILURE';

// Dapp communication protocol
export const INTENT_OPEN_CHANNELS = 'INTENT_OPEN_CHANNELS';
export const OPEN_CHANNEL = 'OPEN_CHANNEL';
export const BIND_OPEN_CHANNELS = 'BIND_OPEN_CHANNELS';
export const BIND_OPEN_CHANNELS_DONE = 'BIND_OPEN_CHANNELS_DONE';
export const OPEN_CHANNEL_SUCCESS = 'OPEN_CHANNEL_SUCCESS';
export const OPEN_CHANNEL_FAILURE = 'OPEN_CHANNEL_FAILURE';

// Component-channel resolver
export const INTENT_CHANNEL_DATA_PASS = 'INTENT_CHANNEL_DATA_PASS';
export const ACCEPT_CHANNEL_DATA_PASS = 'ACCEPT_CHANNEL_DATA_PASS';

// Permission manager
export const TOGGLE_PERMISSION = 'TOGGLE_PERMISSION';
export const GRANT_PERMISSIONS = 'GRANT_PERMISSIONS';
export const CLOSE_MANAGER = 'CLOSE_MANAGER';
export const LOAD_PERMISSIONS = 'LOAD_PERMISSIONS';

// Names of system components
export const IPFS_COMPONENT = 'ipfs';

export const SHOW_FILE_ENTRIES = 'SHOW_FILE_ENTRIES';

export const NETWORK_GET_BLOCK = 'NETWORK_GET_BLOCK';
export const NETWORK_GET_BLOCK_SUCCESS = 'NETWORK_GET_BLOCK_SUCCESS';
export const NETWORK_GET_BLOCK_FAILURE = 'NETWORK_GET_BLOCK_FAILURE';

export const NETWORK_SUBSCRIBE = 'NETWORK_SUBSCRIBE';
export const NETWORK_SUBSCRIBE_SUCCESS = 'NETWORK_SUBSCRIBE_SUCCESS';
export const NETWORK_SUBSCRIBE_FAILURE = 'NETWORK_SUBSCRIBE_FAILURE';

export const NETWORK_UNSUBSCRIBE = 'NETWORK_UNSUBSCRIBE';
export const NETWORK_UNSUBSCRIBE_SUCCESS = 'NETWORK_UNSUBSCRIBE_SUCCESS';
export const NETWORK_UNSUBSCRIBE_FAILURE = 'NETWORK_UNSUBSCRIBE_FAILURE';

export const NETWORK_BLOCK_CREATED = 'NETWORK_BLOCK_CREATED';

export const SHOW_BLOCK = 'SHOW_BLOCK';

export const NETWORK_GET_WITNESS = 'NETWORK_GET_WITNESS';
export const NETWORK_GET_WITNESS_SUCCESS = 'NETWORK_GET_WITNESS_SUCCESS';
export const NETWORK_GET_WITNESS_FAILURE = 'NETWORK_GET_WITNESS_FAILURE';

// Logger
export const LOGGER_WRITE = 'LOGGER_WRITE';
export const LOGGER_WRITE_SUCCESS = 'LOGGER_WRITE_SUCCESS';
export const LOGGER_WRITE_FAILURE = 'LOGGER_WRITE_FAILURE';

// System components names
export const PERMISSION_NAME_FILE_MANAGER = 'filesystem';
export const PERMISSION_NAME_NETWORK = 'network';
export const PERMISSION_NAME_IPFS = 'ipfs';
export const PERMISSION_NAME_LOGGER = 'logger';
export const PERMISSION_NAME_KEYCHAIN = 'keychain';
export const PERMISSION_NAME_ORBIT_DB = 'orbitdb';

export const KEYCHAIN_CREATE = 'KEYCHAIN_CREATE';
export const KEYCHAIN_CREATE_SUCCESS = 'KEYCHAIN_CREATE_SUCCESS';
export const KEYCHAIN_CREATE_FAILURE = 'KEYCHAIN_CREATE_FAILURE';

export const KEYCHAIN_LIST = 'KEYCHAIN_LIST';
export const KEYCHAIN_LIST_SUCCESS = 'KEYCHAIN_LIST_SUCCESS';
export const KEYCHAIN_LIST_FAILURE = 'KEYCHAIN_LIST_FAILURE';

export const KEYCHAIN_LOCK = 'KEYCHAIN_LOCK';
export const KEYCHAIN_LOCK_SUCCESS = 'KEYCHAIN_LOCK_SUCCESS';
export const KEYCHAIN_LOCK_FAILURE = 'KEYCHAIN_LOCK_FAILURE';

export const KEYCHAIN_UNLOCK = 'KEYCHAIN_UNLOCK';
export const KEYCHAIN_UNLOCK_SUCCESS = 'KEYCHAIN_UNLOCK_SUCCESS';
export const KEYCHAIN_UNLOCK_FAILURE = 'KEYCHAIN_UNLOCK_FAILURE';

export const KEYCHAIN_SIGN = 'KEYCHAIN_SIGN';
export const KEYCHAIN_SIGN_SUCCESS = 'KEYCHAIN_SIGN_SUCCESS';
export const KEYCHAIN_SIGN_FAILURE = 'KEYCHAIN_SIGN_FAILURE';

export const KEYCHAIN_PUBLIC_KEY = 'KEYCHAIN_PUBLIC_KEY';
export const KEYCHAIN_PUBLIC_KEY_SUCCESS = 'KEYCHAIN_PUBLIC_KEY_SUCCESS';
export const KEYCHAIN_PUBLIC_KEY_FAILURE = 'KEYCHAIN_PUBLIC_KEY_FAILURE';

export const KEYCHAIN_SHOW_RESULT = 'KEYCHAIN_SHOW_RESULT';

export const ETHEREUM_BUILD_TRANSACTION = 'ETHEREUM_BUILD_TRANSACTION';
export const ETHEREUM_BUILD_TRANSACTION_SUCCESS = 'ETHEREUM_BUILD_TRANSACTION_SUCCESS';
export const ETHEREUM_BUILD_TRANSACTION_FAILURE = 'ETHEREUM_BUILD_TRANSACTION_FAILURE';

export const ETHEREUM_PUBLISH_TRANSACTION = 'ETHEREUM_PUBLISH_TRANSACTION';
export const ETHEREUM_PUBLISH_TRANSACTION_SUCCESS = 'ETHEREUM_PUBLISH_TRANSACTION_SUCCESS';
export const ETHEREUM_PUBLISH_TRANSACTION_FAILURE = 'ETHEREUM_PUBLISH_TRANSACTION_FAILURE';

export const TOGGLE_APP_HOME_SUCCESS = 'TOGGLE_APP_HOME_SUCCESS';

export const OPEN_DAPP_BY_HTTP_PROTOCOL = 'OPEN_DAPP_BY_HTTP_PROTOCOL';

export const CREATE_DAPP_VIEW = 'CREATE_DAPP_VIEW';
