"use client"

import { useEffect, useState } from 'react'
import { HowLongToBeatEntry } from 'howlongtobeat'

interface Props {
    gameName: string
}

const HowLongToBeat = ({ gameName }: Props) => {
    const [hltbData, setHltbData] = useState<HowLongToBeatEntry | null>(null)
    const [average, setAverage] = useState<string | null>(null)

    useEffect(() => {
        fetch('/api/hltb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: gameName })
        }).then(res => res.json().then(data => {
            setHltbData(data.data)
            const styles = [data.data.gameplayMain, data.data.gameplayMainExtra, data.data.gameplayCompletionist]
            setAverage((styles.reduce((a, b) => a + b, 0) / styles.length).toFixed(0))
        }))
    }, [])

    return hltbData ? <>
        <h3 className="text-xl font-bold mb-3.5 mt-10">How long to beat</h3>
        <div className='bg-primary-foreground h-40 rounded-md p-5'>
            <div className='flex gap-2 justify-between h-full'>
                <div className='flex-grow flex flex-col justify-center items-center gap-5'>
                    <p className='font-semibold text-slate-400'>Main story</p>
                    <p className='text-3xl'>{hltbData?.gameplayMain}h</p>
                </div>
                <div className='separator w-[1px] h-full border-l border-l-secondary'></div>
                <div className='flex-grow flex flex-col justify-center items-center gap-5'>
                    <p className='font-semibold text-slate-400'>Main + extras</p>
                    <p className='text-3xl'>{hltbData?.gameplayMainExtra}h</p>
                </div>
                <div className='separator w-[1px] h-full border-l border-l-secondary'></div>
                <div className='flex-grow flex flex-col justify-center items-center gap-5'>
                    <p className='font-semibold text-slate-400'>Completionist</p>
                    <p className='text-3xl'>{hltbData?.gameplayCompletionist}h</p>
                </div>
                { average ? <>
                    <div className='separator w-[1px] h-full border-l border-l-secondary'></div>
                    <div className='flex-grow flex flex-col justify-center items-center gap-5'>
                        <p className='font-semibold text-slate-400'>All styles</p>
                        <p className='text-3xl'>{average}h</p>
                    </div>
                </> : <></> }
            </div>
        </div>
    </> : <></>
}

export default HowLongToBeat