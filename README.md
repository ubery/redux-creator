# reduxCreator

## Local Actions
Flux Standard Action Creator and Reducer

```javascript
function addTodo(data) {
    return {
        type: 'ADD_TODO',
        payload: data
    }
}

function todoReducer(state = [], action) {
    if (action.type === 'ADD_TODO') {
        return [...state, action.payload];
    }
    return state;
}
```

reduxCreator Style

```javascript
reduxCreator({
    todos: {
        initial: [],
        actions: {
            add: (data) => data // null does the same
        },
        reducer: function (state, action) {
            if (action.type === this.add) {
                return [...state, action.payload];
            }
            return state;
        }
    }
});
```

## Server Actions
The real benefits are gained by using Server Actions. Under the hood it's a [redux-api-middleware](https://github.com/agraboso/redux-api-middleware) in `reduxCreator` style. It's easy to combine both types of actions and our app is DRY. For example load `GET` todos from RESTful API. Creator makes all necessary actions: `request`, `success`, `failure` and bind them to reducer (creating own reducer is only for local actions, but it can be mixed).

```javascript
reduxCreator({
    todos: {
        initial: [],
        actions: {
            load: {
                method: 'GET',
                endpoint: 'http://localhost:8080/api/todos',
                success: (action, state, res) => getJSON(res)
            }
        }
    }
});
```

## Finally
After all `reduxCreator` returns an object contains all `reducers` and `actions` (grouped according to reducers).

```javascript
import { combineReducers } from 'redux';

const rx = reduxCreator(...);
const reducers = combineReducers(rx.reducers);

store.dispatch(rx.actions.todos.load());
```
