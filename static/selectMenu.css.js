/* const cssFile = await(()=>fetch('selectMenu.css'))()
const cssText = await(()=>cssFile.text())()
debugger; */

const css = `
.rel {
    position:relative;
}

.dropdown-menu {
    background-clip: padding-box;
    background-color:white;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: var(--border-radius);
    color: var(--sl-color-info-950); 
    display: none;
    font-size: 1rem;
    list-style: none;
    margin: 0;
    min-width: 10rem;
    padding: .5rem 0;
    position: absolute;
    text-align: left;
    z-index: 1000;
}

.cell-controls-button {
    font-size: 10px;
    text-transform: uppercase;
    opacity:0.67;
    cursor: pointer;
    background: transparent;
    border: 1px solid var(--black-transparance);
    border-radius: 4px;
    color: var(--controls-color);
    cursor: pointer;
    display: flex;
    font-size: 12px;
    line-height: 1;
    opacity: 1;
    padding: 0 4px;
    transition: opacity .12s ease-in-out;
    user-select: none;
    z-index: 1;
}
.cell-controls-button:hover {
    color: var(--brand-color);
}

.dropdown-item {
    cursor: pointer;
    background-color: transparent;
    border: 0;
    clear: both;
    color: var(--sl-color-info-950); 
    display: block;
    font-weight: 400;
    padding: .25rem 1rem;
    text-align: inherit;
    text-decoration: none;
    white-space: nowrap;
}

.dropdown-header {
    color: var(--sl-color-gray-500);
    display: block;
    font-size: .875rem;
    margin-bottom: 0;
    padding: .5rem 1rem;
    white-space: nowrap;
}

.dropdown-item:focus, .dropdown-item:hover {
    background-color: var(--sl-color-primary-50);
    color: var(--sl-color-info-950); 
}

.dropdown-item.active, .dropdown-item:active {
    background-color: var(--sl-color-primary-300);
    color:white;
    text-decoration: none;
}

h6.dropdown-header {
    margin-top: unset;
}

:root {
    --sl-color-primary-300: #7dd3fc;
    --sl-color-gray-500: #6b7280;
    --sl-color-primary-50: #f0f9ff;
    --black-transparance:#ffffff00;
    --sl-color-info-950: #0d131e;
    --brand-color: var(--sl-color-primary-700);
    --controls-color:var(--sl-color-gray-400);
    --border-radius: 7px;
}
`

export { css }