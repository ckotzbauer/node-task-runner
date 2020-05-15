
declare module "node-task-runner" {
  interface TaskDefinitions {
    [id: string]: TaskFunction;
  }

  function runTask(name: string, parallel?: boolean): Promise<unknown>;
  function runFunction(name: string, func: TaskFunction, parallel?: boolean): Promise<unknown>;

  type Reporter = (s: string) => void;
  type TaskFunction = (reporter: Reporter, chainValue: unknown, ...args: unknown[]) => void|Promise<unknown>;
}
