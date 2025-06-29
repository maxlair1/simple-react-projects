
import type { todoItem } from "./App"

export function getItem(value: string) {
    try {
        const item = window.localStorage.getItem(value)
        console.log("Retrieved old data")
        return (item ? JSON.parse(item) as todoItem[] : undefined)
    } catch (error) {
        console.log(error)
    }
}

export function setItem(key: string, value: todoItem[]) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value))
        // console.log("Storred items")
    } catch (error) {
        console.log(error)
    }
}