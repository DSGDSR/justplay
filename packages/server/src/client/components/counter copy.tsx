import { Suspense, useEffect, useState } from "react"
import React from "react"
import { IGame } from "../../../../common/interfaces/game"
import { fetchApi } from "../serve"

const CounterCopy = () => {
    const [count, setCount] = useState(0)
    return <>
    
        <h1>Counter 2 {count}</h1>
        <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
}

export default CounterCopy