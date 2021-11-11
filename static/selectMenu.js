import {l} from "https://deno.land/x/html_dom@v1.0.2/html-dom.js"
import {css} from "./selectMenu.css.js"

const selectMenu=(arg={
    title:'title',
    list:[],//[{value,active,menu}]
    fn:()=>{},
    button: null, // button is optional, if exist that button will be fixed
    hideMenu: true, // when button clicked then hide menu 
    classN:'rel' // class name for selectMenu div container
})=>{
    const {title,list,button,hideMenu=true,classN='rel'} = arg
    let activeMenu = null
    const dropdownItem = (args)=>{
        const {value,active,menu,title} = args
        //const _title = 
        return l.li(l.div(value,{class:`dropdown-item ${active?'active':''} ${menu?'menu':''}`, title:/* value instanceof Element? */ title??value.textContent??value}))
    }
    const listMenu = list.map(e=>{
        const menuItem = dropdownItem({value:e.value,active:e.active,menu:e.menu,title:e.title})
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
    const _selectMenu = l.div([menuButton,selectMenuElement],{class:classN})

    selectMenuElement.style.display ='none'
    function menuButtonEvent(e){
        if(hideMenu)document.head.click()
        // debugger;
        // show menu element items
        selectMenuElement.style.display = 'block'
        // show close svg 
        const close = this.querySelector("svg.hide")
        const burger = this.querySelector("svg.disflex")
        close?.classList.toggle("hide");
        close?.classList.toggle("disflex");
        burger?.classList.toggle("hide");
        burger?.classList.toggle("disflex");

        // aligning with menuButton aka e.target position
        const _rightAlign = selectMenuElement.offsetWidth-this.offsetWidth+this.offsetLeft;
        const leftAlign = +this.offsetLeft
        const _topAlign = -selectMenuElement.offsetHeight-this.offsetHeight+this.offsetTop
        const bottomAlign = +this.offsetTop
        
        const w = document.documentElement.clientWidth//window.innerWidth
        const h = document.documentElement.clientHeight//window.innerHeight
        // by default we set to bottom left Align
        const xPos = leftAlign
        const yPos = bottomAlign
        selectMenuElement.style.transform = `translate(${xPos}px,${yPos}px)`
        const {top, left, bottom, right} = selectMenuElement.getBoundingClientRect()

        const transX = xPos+Math.min(left,w-right,0)
        const transY = yPos+Math.min(top,h-bottom,0)
        selectMenuElement.style.transform = `translate(${transX}px,${transY}px)`
        // switch icon 
        const {click,icon} = menuButton.dataset
        menuButton.dataset.icon = click??''
        menuButton.dataset.click = icon??''
        // add window click event and remove menuButton click event 
        window.addEventListener('click',hideselectMenu)
        menuButton.removeEventListener('click',menuButtonEvent)
        event.stopPropagation();//preventing for next event
    }
    
    function hideselectMenu(e){
        //if (!e.target.matches(`#${buttonId}`)) {
        if(e.target!==selectMenuElement){
            selectMenuElement.style.display = 'none'
            // show close svg 
            const close = menuButton.querySelector("svg.hide")
            const burger = menuButton.querySelector("svg.disflex")
            close?.classList.toggle("hide");
            close?.classList.toggle("disflex");
            burger?.classList.toggle("hide");
            burger?.classList.toggle("disflex");

            window.removeEventListener('click',hideselectMenu)
            //event.stopImmediatePropagation();//preventing for next event
            menuButton.addEventListener('click',menuButtonEvent)
            const {click,icon} = menuButton.dataset
            menuButton.dataset.icon = click??''
            menuButton.dataset.click = icon??''
            
        }
        
    }
    
    menuButton.addEventListener('click',menuButtonEvent)
    
    function callBack(e){
        //debugger;
        if(activeMenu){ // to differentiate between select menu and drop menu
            e.target.classList.toggle('active')
            activeMenu.classList.toggle('active')
            activeMenu = e.target
            menuButton.innerText = e.target.innerText;//debugger;
        }
        /* if(e.target.classList.contains('menu')){
            debugger;
            window.removeEventListener('click',hideselectMenu)
        } */
        //debugger;
        arg.fn(e.target.innerText,e)
    }

    [...listMenu].map(e=>e.addEventListener('click',callBack))

    // create blob css and append to head
    const cssBlob = new Blob([css], {type: 'text/css'});
    const cssLink = l.link('',{rel:'stylesheet',href:URL.createObjectURL(cssBlob),id:'linkCssSelectMenu'})
    
    if(!window['linkCssSelectMenu'])document.head.append(cssLink)

    return {
        _selectMenu:_selectMenu,
        menuButton:menuButton,
        selectMenuElement:selectMenuElement,
        menuButtonEvent:menuButtonEvent,
        hideselectMenu:hideselectMenu
    }
}

export {selectMenu}