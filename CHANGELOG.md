## Version 2.4.1 (2020-12-09)

* [[`76788e6b`](https://github.com/ckotzbauer&#x2F;node-task-runner/commit/76788e6b)] - **chore**: fix release workflow
* [[`d83a07a7`](https://github.com/ckotzbauer&#x2F;node-task-runner/commit/d83a07a7)] - **chore**: improve automation
* [[`ae0031b3`](https://github.com/ckotzbauer&#x2F;node-task-runner/commit/ae0031b3)] - **chore**: Bump pascalgn&#x2F;size-label-action
* [[`93d198be`](https://github.com/ckotzbauer&#x2F;node-task-runner/commit/93d198be)] - **chore**: Bump pascalgn&#x2F;automerge-action
* [[`27b16d31`](https://github.com/ckotzbauer&#x2F;node-task-runner/commit/27b16d31)] - **chore**: Bump pascalgn&#x2F;automerge-action
* [[`c166c3c5`](https://github.com/ckotzbauer&#x2F;node-task-runner/commit/c166c3c5)] - **chore**: improved github-actions
* [[`67950dd5`](https://github.com/ckotzbauer&#x2F;node-task-runner/commit/67950dd5)] - **chore**: Bump pascalgn&#x2F;automerge-action
* [[`14b166b4`](https://github.com/ckotzbauer&#x2F;node-task-runner/commit/14b166b4)] - **chore**: Bump pascalgn&#x2F;automerge-action
* [[`6877e315`](https://github.com/ckotzbauer&#x2F;node-task-runner/commit/6877e315)] - **chore**: Bump pascalgn&#x2F;size-label-action
* [[`fa611cb1`](https://github.com/ckotzbauer&#x2F;node-task-runner/commit/fa611cb1)] - **chore**: Create Dependabot config file
* [[`1a824bc8`](https://github.com/ckotzbauer&#x2F;node-task-runner/commit/1a824bc8)] - **chore**: add github-actions
* [[`fdcc0959`](https://github.com/ckotzbauer&#x2F;node-task-runner/commit/fdcc0959)] - **chore**: add reviewer
# Changelog

## Version 2.4.0

Released on July 4, 2020.

-   Moved repository.


## Version 2.3.0

Released on April 16, 2019.

-   Added typescript definitions.


## Version 2.2.0

Released on April 08, 2019.

-   Added `ts-node` support (`tasks.ts` is now used by default if `ts-node` is detected.)


## Version 2.1.1

Released on February 20, 2019.

-   Handle unexported tasks object correctly.


## Version 2.1.0

Released on October 08, 2018.

-   New feature to run functions manually.


## Version 2.0.0

Released on February 26, 2018.

-   Task outputs are handled correctly in parallel mode.
-   Task durations are shown on task-end.
-   Exposed `runTask` function to manually execute tasks in other tasks.
-   Fixed error if task-function does not return a `Promise`.
-   Removed unused "tasks.js" file.
-   Updated docs.

### BREAKING CHANGES

-   Ordering of task arguments changed. Now: `(reporter, chainValue, arg...)`.
-   Module-Export of `tasks.js` file changed. Now: `{ tasks: {}, reporter: (message) => void }`.


## Version 1.0.3

Released on February 19, 2018.

-   Fixed folder where task-file is searched.
-   Updated docs.


## Version 1.0.2

Released on February 18, 2018.

-   Execute command in node execution context.


## Version 1.0.1

Released on February 18, 2018.

-   Fixed executable path.


## Version 1.0.0

Released on February 18, 2018.

-   First public release.
