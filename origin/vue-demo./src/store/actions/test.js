export const TOGGLE_WATCH_LOADING = 'TOGGLE_WATCH_LOADING';

export function toggleWatch(niceData) {
    return function (dispatch) {//如果action是个action，那么就会默认执行这个function
        dispatch({
            type: TOGGLE_WATCH_LOADING
        });
    }
}