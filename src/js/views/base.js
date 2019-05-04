// base object for search
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages')
};

// make a object to avoid the situation that clear the empty loader
export const elementStrings = {
    loader: 'loader'
};

// not in searchView but in base for spinner
// spinner template that needs to render
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

// clear the spinner after api called
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`)
    if(loader) {
        loader.parentElement.removeChild(loader);
    }
}