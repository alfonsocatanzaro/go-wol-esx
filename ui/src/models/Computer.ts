
export interface Computer {
  ID: string,
  Name: string,

  Status: Status,
  Child: ChildComputer[]
}

export type ChildComputer = Exclude<Computer, ["IPAddress", "Child"]>;

export type ComputerActionArgs = {
  computer: Computer,
  child?: ChildComputer,
  action: CommandAction,
}
export type CommandAction = "POWERON" | "SUSPEND" | "SHUTDOWN" | "EDIT";
export type Status = "" | "ONLINE" | "OFFLINE" | "PAUSED" | "STOPPED" | "RUNNING" | "PENDING"


export interface ComputerEditViewModel extends Computer {
  IPAddress: string,
  BroadcastIPAddress: string,
  MAC: string,
  SSHEnabled: boolean,
  isESXHost: boolean
}

interface SSHInfo {
  Username: string,
  Password: string,
  UsePublicKey: boolean,
  PublicKey: string,
}