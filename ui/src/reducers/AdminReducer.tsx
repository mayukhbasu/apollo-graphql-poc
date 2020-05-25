
export const initialProductState = {
    title: '',
    price: '',
    category: '',
    url: ''
};


export const adminReducer = (state:any, action:any) => {
    
    switch(action.type){
        case 'ADD_PRODUCT':
            console.log(action);
            return initialProductState
    }
}