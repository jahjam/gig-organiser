# GIGPAL | Organise Your Gig Life

A simple gig organiser to keep track of upcoming gigs.

Try it [HERE](https://gigpal.netlify.app/)! 👈

This project involved advanced DOM manipulation, advanced JavaScript features such as higher-order functions, implementation of the ‘this’ keyword and the spread operator, local storage, and JavaScript classes with emphasis on object-oriented programming. To ensure the code base was manageable from the start, I ensured that the UI components were separate from the managed data by separating them into different folders and implemented the bundler Parcel to manage and compile the project.
The most difficult part of this project was implementing an algorithm to manage the flagged gigs system and ensure they were all rendered in the same places between views as well as ensure when each gig was deleted from the side bar or the view, they were also deleted from everywhere else. This required me to develop a system that created each gig object with a unique id, and link the id with the various DOM elements, to ensure they were all tied together within the application. My main goal for this project was to create a useful application that solved a business need – keeping track of gigs is an important element of being a busy artist – whilst also keep the code easy to read and maintain.

TODO

Month view:

[x] - Fundamental logic\
[x] - Add month logic\
[x] - Render month selector\
[x] - Render month\
[x] - Add show and hide gig functionality\
[x] - Add gig logic\
[x] - Render add gig form\
[x] - View logic to render gigs in main view\
[x] - Required feilds to prevent bugs\
[x] - Prevent double months generation\
[x] - Create edit functionality\
[x] - Create delete functionality\
[x] - Add ability to delete months\
[x] - Generate delete options for each gig\
[x] - Generate view options for each gig\
[x] - Sort every view rendering to ensure gigs display from most recent to least\
[x] - Restrict dates on edit view like on add gig view\
[x] - Cancel add gig view if user aborts adding a gig after rendering form\
[x] - Format the info input to allow better formatting in the result view

[x] - FEATURE COMPLETE!

[x] - Code refactored

Additional fun addons for future

[ ] - Add hover function that shows gig information in hover popup window UI\

Local storage:

[x] - Impliment local storage

[x] - FEATURE COMPLETE!

Tour View (ABILITY TO ADD CUSTOM TOURS - POSSIBLE FUTURE UPDATE):

[ ] - Impliment ability to add full tours that work like months except all gigs are added at once and tours names are custom

[ ] - FEATURE COMPLETE!
