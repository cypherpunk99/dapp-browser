// global main state
// redux-persist integration here

export type Permission = "ipfs" | "network" | "filesystem" | "storage" | "logger";

export type Client = {
  activeDapp: {
    appName: any
  },
  isHome: boolean,
  notification: {
    isOpen: boolean
  },
  statusBar: {
    isOpen: boolean,
    isPeersOpen: boolean
  },
  loader: {
    isOpen: boolean
  },
  search: {
    isOpen: boolean
  },
  window: {
    width: number,
    height: number
  },
  fileDialog: {
    isOpen: boolean
  }
}

export interface IState {
  channel: {};
  client: Client;
  feed: {};
  permissionManager: {
    isOpen: boolean,
    permissions: {[index:string]: Permission[]},
    grantedApps: string[],
  };
  tray: {};

  //@todo add MapPermissions
}

