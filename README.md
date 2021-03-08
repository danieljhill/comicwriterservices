# Read Me

This is forked from Daniel Hill's repo. All the hard work in gathering links is credited to Daniel Hill and Caleb Monroe. https://github.com/danieljhill/comicwriterservices

## Vue

There is a script, "comicwriterservices.js" in "public/scripts" folder which controls how the JSON data is retrieved, organised and then displayed. 

## NPM commands

All of the npm commands can be found in the package.json file at top level. Those commands are available to use.

### dev and prod

```npm run dev``` or ```npm run prod```

Running either of those commands will export a Tailwinds CSS stylesheet to the public folder. The difference between two commands is the filesize of the exported CSS file. 

```npm run dev``` will create a CSS file with a large file size. It will include all CSS style rules, regardless if you used some or all of them. 

```npm run prod``` will create a CSS file with a smaller file size, suitable for production server. It will only include CSS style rules used in the webpages or javascript. It will look for any CSS style rule names.

### exportjson

```npm run exportjson```

Running this command will export data from the spreadsheet "Comic Writer Services.xlsx". To export all data, run the command "npm run exportjson". In the spreadsheet, if you want to ignore any links, type "x" or any character in the "Ignore" column. If you want the process to ignore a worksheet, prefix the name of the worksheet with a dash "-" e.g. "-Editors". This means the Editors worksheet will be ignored.


## Original Repo - Read Me Notes

The original repo can be found at https://github.com/danieljhill/comicwriterservices