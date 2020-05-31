
export interface Computer {
  ID: number,
  Name: string,
  IPAddress: string,
  Status: Status,
  Child: ChildComputer[]
}

export type ChildComputer = Exclude<Computer, ["IPAddress", "Child"]>;

export type Status = "" | "ONLINE" | "OFFLINE" | "PAUSED" | "STOPPED" | "RUNNING" | "PENDING" 