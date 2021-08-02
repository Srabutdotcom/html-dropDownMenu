# html-selectMenu
Simple tools to create drop down menu or select menu
# Usage
~~~js
// html element created using l library from html-dom.js
import {l} from "https://deno.land/x/html_dom@v1.0.1/html-dom.js"
import {selectMenu} from './mod.js'
// sample of select menu
// in this sample the button text will be adjusted based on selection
const theselectMenu = selectMenu({
    title:'Select Me', // optional
    list:[ // required
        {value:'First Menu', active:true}, // active should be only one
        {value:'Second Menu'},
        {value:'Third Menu'}
    ], 
    fn:(val)=>alert(`You select Menu of ${val}`) // required
})
// sample of drop menu
// in this sample the button text remain fixed
const thedropMenu = selectMenu({
    title:'Select Me', // optional
    button:l.div('button'), // required for drop menu 
    list:[ // required
        {value:'First Menu'}, // no need to put active in any of these items
        {value:'Second Menu'},
        {value:'Third Menu'}
    ],
    fn:(val)=>alert(`You click drop Menu of ${val}`) // required
})
~~~
# Preview
* Drop Menu preview
> ![dropMenu](https://user-images.githubusercontent.com/11986154/127892038-5ddf4d54-1754-4024-b1cc-28608d49efe9.PNG)
* Select Menu preview
> ![selectMenu](https://user-images.githubusercontent.com/11986154/127892067-e449125e-2520-4830-951c-4362c3480eaa.PNG)


# Demo
Demo is available by calling > deno run --allow-read --allow-net serve.js
