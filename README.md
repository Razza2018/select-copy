# Select Copy

Select Copy allows you to select multiple input or textarea fields and copy them to the clipboard. You can then select multiple input or textarea fields to past them to from the clip board.

Two different shortcuts will need to be setup, one for initialising the copy and another for initialising the paste.

## Install

You require something that can run JavaScript code when a shortcut is pressed on the keyboard.

In this example we will use a Chrome plugin called Shortkeys.\
https://chrome.google.com/webstore/detail/shortkeys-custom-keyboard/logpjaacgmcbpdkdchjiaagddngobkck?utm_source=ext_sidebar&hl=en-GB

Add the extension above to your Chrome browser.

Click on the 'Manage Extenstions' button, click the three dots next to Shortkeys, click options.\
Alternatively go to the following address: chrome-extension://logpjaacgmcbpdkdchjiaagddngobkck/options/options.html

Add the two shortcuts.
The shortcuts needs to be in the format `ctrl+alt+c` with no spaces, option entered as `alt`, command is entered as `meta`.
In this example we will use `ctrl+alt+c` for the copy script and `ctrl+alt+v` for the paste script.
Label can be whatever you want.
Behaviour needs to be 'Run JavaScript'.

Use the down arrow to open up more options for a shortcut.

Copy the code found in `./sc-copy.js` to the 'Javascript Code' text area of the copy shortcut.

Copy the code found in `./sc-paste.js` to the 'Javascript Code' text area of the paste shortcut.

Set the toggle on for 'Active while in inputs' so the shortcut works when an input field has focus.

Set drop down to show 'All Sites' so it works on any site.

Press 'Save shortcuts'.

## Opening the Team Selector

Go to another site and make sure you have refreshed the page after saving the shortcut.

Press your chosen shortcut.

A modal will open showing the FireHawk Team Selector.

Search for your desired team and press enter or click the button next to the site to open.

## Copying from fields

Go to another site and make sure you have refreshed the page after saving the shortcut.

Press your chosen copy shortcut.

Select the fields you want to copy from. (They will show as outlined.)

Press your copy chosen shortcut.

This will copy the value of the fields you have selected to your clipboard.

## Pasting to fields

Go to another site and make sure you have refreshed the page after saving the shortcut.

Press your chosen paste shortcut.

Select the fields you want to paste to. (They will show as outlined.)

Press your chosen paste shortcut.

This will paste the value of the fields you have selected to your clipboard. (If the same number of fields were selected.)
