import {l} from "https://deno.land/x/html_dom@v1.0.1/html-dom.js"
import {css} from "./selectMenu.css.js"

const selectMenu=(arg={
    title:'title',
    list:[],
    fn:()=>{},
    button: null // button is optional, if exist that button will be fixed
})=>{
    const {title,list,button} = arg
    let activeMenu = null
    const dropdownItem = (args)=>{
        const {value,active} = args
        //const _title = 
        return l.li(l.div(value,{class:`dropdown-item ${active?'active':''}`, title:value instanceof Element? value.textContent:value}))
    }
    const listMenu = list.map(e=>{
        const menuItem = dropdownItem({value:e.value,active:e.active})
        if(e.active)activeMenu=menuItem.firstElementChild
        return menuItem
    })
    const buttonId = `${(title??'button').replace(/\s+/g, '')}${Date.now()}`// remove all empty space with .replace(/\s+/g, '')
    const getButton = (but)=>{
        
        // check if but is defined
        if(but&&but instanceof Element){
            //debugger;
            //but.classList.add('cell-controls-button')
            but.setAttribute('id',buttonId)
            return but
        } else {
            return l.div(activeMenu?.innerText??but,{class:'cell-controls-button',id:buttonId})
        }
    }
    
    const selectMenuItem = !title?listMenu:[
        l.li(l.h6(title,{class:'dropdown-header'})),
        ...listMenu]
    const selectMenuElement = l.div(selectMenuItem,{class:'dropdown-menu'})
    
    const menuButton = getButton(button)//l.div(activeMenu?.innerText??button,{class:'cell-controls-button',id:buttonId})
    const _selectMenu = l.div([menuButton,selectMenuElement],{class:'rel'})

    selectMenuElement.style.display ='none'
    function hideselectMenu(e){
        if (!e.target.matches(`#${buttonId}`)) {
            selectMenuElement.style.display = 'none'
            window.removeEventListener('click',hideselectMenu)
        }
    }
    menuButton.addEventListener('click',(e)=>{
        document.head.click()
        selectMenuElement.style.display = 'block'
        const rightAlign = selectMenuElement.offsetWidth-e.target.offsetWidth;
        const leftAlign = 0
        const topAlign = -selectMenuElement.offsetHeight-e.target.offsetHeight
        const bottomAlign = 0
        
        const w = window.innerWidth
        const h = window.innerHeight
        // by default we set to bottom left Align
        const xPos = bottomAlign
        const yPos = leftAlign
        selectMenuElement.style.transform = `translate(-${xPos}px,${yPos}px)`
        const {top, left, bottom, right} = selectMenuElement.getBoundingClientRect()

        const transX = Math.min(left,w-right,0)
        const transY = Math.min(top,h-bottom,0)
        selectMenuElement.style.transform = `translate(${transX}px,${transY}px)`
        window.addEventListener('click',hideselectMenu)
        event.stopPropagation();//preventing for next event
    })
    function callBack(e){
        if(activeMenu){ // to differentiate between select menu and drop menu
            e.target.classList.toggle('active')
            activeMenu.classList.toggle('active')
            activeMenu = e.target
            menuButton.innerText = e.target.innerText;//debugger;
        }
        arg.fn(e.target.innerText)
    }

    [...listMenu].map(e=>e.addEventListener('click',callBack))

    // create blob css and append to head
    const cssBlob = new Blob([css], {type: 'text/css'});
    const cssLink = l.link('',{rel:'stylesheet',href:URL.createObjectURL(cssBlob),id:'linkCssSelectMenu'})
    
    if(!window['linkCssSelectMenu'])document.head.append(cssLink)

    return _selectMenu
}

export {selectMenu}