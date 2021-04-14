declare module "mongoose" {
  export interface Aggregate {
    project(arg: Record<string, unknown>): this;
    unwind(arg: string): this;
  }
}
