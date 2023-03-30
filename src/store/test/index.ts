import { defineStore } from 'pinia'
export const testStore = defineStore('testStore', {
    //定义state
    state: () => {
        return {
            count: 10
        }
    },
    //定义getter
    getters: {
        getCount(state) {
            return state.count
        }
    },
    //定义action 此处不能使用箭头函数，会改变this的指向
    actions: {
        setCount() {
            this.count++;
        }
    }
})