export const initialState = {
    basket: [], //empty basket initally.
    user: null
};

//selector
export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);

export const reducer = (state, action) => {

    console.log(action);
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state, //whatever the state was return same.
                basket: [...state.basket, action.item], // add to basket whatever the basket currently was with ...state.basket and add to basket what we decided to add with action.
            }

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }

            case 'EMPTY_BASKET':
                return{
                    ...state,
                    basket: []
                }

        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1);

            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in basket!`
                )
            }

            return {
                ...state,
                basket: newBasket
            }

            case "SET_USER":
                return{
                    ...state,
                    user:action.user
                }

        default:
            return state;
    }
};

//reducer.jsx is how we manipulate the data layer
