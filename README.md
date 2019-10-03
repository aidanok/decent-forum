# Decent-a-Forums Vue UI.


Vue UI for Decent Forum / Decent-a-Forums 

This needs its sibling package, https://github.com/aokisok/decent-forum-api . 

To setup for dev, just clone both packages as sibling folders and everything should work fine including live-reload
on editing of either project.

With VsCode you can add both folders to a workspace. 

Current version deployed at 

https://arweave.net/XmAbFupu0hT4poTBSNGuwIMGVKTpJwf8unt--dgFPxw#/


NOTE: The UI is quite rough and inconsistently styled at the moment. No component library was used just html / css and the icon font from: https://remixicon.com. 

The idea is that the forum is user themeable, so all CSS is done with global, non-mangled class names and most layout is done with CSS grid. You may (will) encounter some display issues in this early version.   

Eventually each forum or section could specify its own theme, though that would need decent-forum-api to add in support for configurable forums that the creator can configure.  

NOTE2: Some features that are supported in decent-forum-api are not surfaced fully in the UI yet: 
 - Nested forums, any amount of levels deep, ex:  Foo > Bar > Whiz > MyForum
 - Fully theaded discussions. The UI at the moment will display everything in a flat thread, though you can reply to individual posts rather than the top level post in a thread. 
 - Notifcations when your post has been mined into a block and is live.


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

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

