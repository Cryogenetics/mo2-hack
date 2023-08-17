## MO2-Hack

This is a simple js  application i made because i wanted to download a youtuber's modlist,
and i couldn't find a way to easily import all the urls into MO2.

It isn't perfect, and is more of a hack to automatically start downloads.
Any page with more than one mod organizer download, or no mod organizer downloads will have to be navigated and selected manually.

im just lazy and figured at least one other person would like a simple way to get all URLs open and maybe remove some navigation.

very glitchy/finicky
***
## Warning:
i was lazy and just spam open a bunch of browser windows, some autodownloading, and others just to the mod page.

There is no error checking, and if you have a bunch of tabs open, it will open a bunch more.

I am not responsible for any damage this causes, use at own risk.

The console contains output for any errors it occurs, ex: no files found, no url associated to the mod. adult content is outputted to console, to change this behavior, change the variable ```openAdultContent``` to true on line 6
***
## How to use
1. Get a CSV export you want to import the download links into MO2
2. hope there aren't situations i didn't plan for
3. place csv in modlist.csv
4. run ```node .```
5. cry as a bunch of pages are opened.


***
### Behaviors:

Multiple download links: Files page opened
Adult content: Printed to console / opened (relies on ``openAdultContent``'s value)
No files: Output to console
***

I made this at 4 am in about 2 hours, so ignore its ugliness, and any sleep-deprived code, and the lack of comments.



