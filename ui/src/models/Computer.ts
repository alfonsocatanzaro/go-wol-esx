export interface Computer {
  ID: number,
  Name: string,
  IPAddress: string,
  Status: string,
  Child: ChildComputer[]
}


export type ChildComputer = Exclude<Computer, ["IPAddress", "Child"]>;