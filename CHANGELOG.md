# Changelog

## v0.3.3 - 2024-10-25

This patch release includes minor updates, bug fixes to improve UI/UX

### Bug Fixes
- Fixed an issue where content editor and course page had insufficient padding [#207](https://github.com/Andamio-Platform/andamio-platform/issues/207)
- Fixed an issue where course modules were not appearing in order in Learner Dashboard [#189](https://github.com/Andamio-Platform/andamio-platform/issues/189)

### Improvements
- Add a paragraph formatting button to editor BubbleMenu [#201](https://github.com/Andamio-Platform/andamio-platform/issues/201)
- Copy edits: message on network icon [#211](https://github.com/Andamio-Platform/andamio-platform/issues/211)
- Add ability for Course Creator to delete a course [#203](https://github.com/Andamio-Platform/andamio-platform/issues/203)
- Add ability for Course Creator to remove contributors from a course [#202](https://github.com/Andamio-Platform/andamio-platform/issues/202)
- Add ability for Course Creator to publish all content for a Course Module [#208](https://github.com/Andamio-Platform/andamio-platform/issues/208), [#212](https://github.com/Andamio-Platform/andamio-platform/issues/212)
- Add copy button to Code Blocks in content view

### Experimental Features + Tests
- Module Code can now be a string of length 3-12 [#204](https://github.com/Andamio-Platform/andamio-platform/issues/204)
- Remove placeholder text in content editor [#209](https://github.com/Andamio-Platform/andamio-platform/issues/209). Test: validate whether users need help finding where to write content.
- If lesson has a video, show the video at top of lesson editor [#205](https://github.com/Andamio-Platform/andamio-platform/issues/205). Test: validate with users how they want to see video.
- When a new lesson is created, set the title to match the learning target [#217](https://github.com/Andamio-Platform/andamio-platform/issues/217). Test: validate whether this streamlines the process for lesson writers to get started. 

### Known Issues

## [v0.3.2] - 2024-10-07

This patch release includes minor updates, bug fixes to improve UI/UX

### Bug Fixes

- Fixed an issue where Footer was duplicated [#183](https://github.com/Andamio-Platform/andamio-platform/issues/183)
- Fixed an issue where name of month was same color as background in date-picker [#187](https://github.com/Andamio-Platform/andamio-platform/issues/187)

### Improvements

- Improved how Loading state is displayed when building a transaction [#181](https://github.com/Andamio-Platform/andamio-platform/issues/181), [#182](https://github.com/Andamio-Platform/andamio-platform/issues/182)
- Add Undo and Redo options to file menu in course studio [#161](https://github.com/Andamio-Platform/andamio-platform/issues/161)
- Add a warning when collateral is not set [#186](https://github.com/Andamio-Platform/andamio-platform/issues/186)

### Experimental Features

- Course contributor can copy a module from one course to another in basic UI [#193](https://github.com/Andamio-Platform/andamio-platform/pull/193)

### Known Issues

- Dark mode colors lack consistency and contrast
- Transactions should handle all error states
- There may still be an issue where content editor assigns external links to non-url [#163](https://github.com/Andamio-Platform/andamio-platform/issues/163). Ignoring this possible issue for initial user-testing. Will re-open when it is a priority.
