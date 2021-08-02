import {l} from "https://deno.land/x/html_dom@v1.0.1/html-dom.js"
import {selectMenu} from './selectMenu.js'

// sample of select menu
const theselectMenu = selectMenu({
    title:'Select Me',
    list:[
        {value:'First Menu', active:true},
        {value:'Second Menu'},
        {value:'Third Menu'}
    ],
    fn:(val)=>alert(`You select Menu of ${val}`)
})

document.querySelector('#selectMenu').append(theselectMenu)

// sample of drop menu
const thedropMenu = selectMenu({
    title:'Select Me',
    button:l.div('button'),
    list:[
        {value:'First Menu'},
        {value:'Second Menu'},
        {value:'Third Menu'}
    ],
    fn:(val)=>alert(`You click drop Menu of ${val}`)
})

document.querySelector('#dropMenu').append(thedropMenu)
