import { useEffect } from "react";
import { useParams } from "react-router";
import { getGameBySlug } from "../services/games";

const GamePage = () => {
    let { slug } = useParams()

    useEffect(() => {
        if (!slug) {
            // 404
            return
        }

        const game = getGameBySlug(slug).then(console.log)
    }, [])
    
    return (
        <div>
            <h1>Game: {slug}</h1>
        </div>
    )
}

export default GamePage