# Decent-a-Forums Vue UI.


Vue UI for Decent Forum / Decent-a-Forums 

This needs its sibling package, https://github.com/aokisok/decent-forum-api . 

To setup for dev, just clone both packages as sibling folders and everything should work fine including live-reload
on editing of either project.

With Vscode you can add both folders to a workspace. 

Current version deployed available at: 

[https://aokisok.github.io/decent-forum/latest.html](https://aokisok.github.io/decent-forum/latest.html)


NOTE: The UI is quite rough and inconsistently styled at the moment. No component library was used just html / css / some svgs

The idea is that the forum is user themeable, so all CSS is done with global, non-mangled class names and most layout is done with CSS grid.  

Eventually each forum or section could specify its own theme.

Practically, the CSS needs to be organized a bit better with consistent naming and probably some tweaks
to how the DOM is structured should be done. CSS Grid and CSS Custom Variables makes for extremely 
customizable themes and layouts, and they are supported in 92% of browsers now, IE11 is the only noteable holdout.
 

Some features that are supported in decent-forum-api are not surfaced fully in the UI yet: 
 - Nested forums, any amount of levels deep, ex:  Foo > Bar > Whiz > MyForum

 You can actually use them, by navigating to /forum/Foo_Bar_Whiz_MyForum, where you can post and the forum will be created, but they wont show up in the all-forums list at the moment.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
