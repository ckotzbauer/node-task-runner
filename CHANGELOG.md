# Changelog

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
