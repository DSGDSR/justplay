"use client"

import { useEffect, useState } from 'react'
import { HowLongToBeatEntry } from 'howlongtobeat'
import { cn } from '@/lib/utils'
import CountUp from 'react-countup';
import Section from './Section';

interface Props {
    gameName: string
    className?: string
}

const HowLongToBeat = ({ gameName, className }: Props) => {
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
            const hltbData = data.data

            setHltbData(hltbData)

            if (hltbData && hltbData.gameplayMain && hltbData.gameplayMainExtra && hltbData.gameplayCompletionist) {
                const styles = [data.data.gameplayMain, data.data.gameplayMainExtra, data.data.gameplayCompletionist]
                setAverage((styles.reduce((a, b) => a + b, 0) / styles.length).toFixed(0))
            }
        }))
    }, [gameName])

    return hltbData?.gameplayMain ? <Section title="How long to beat">
        <div className={cn(className)}>
            <div className='bg-primary-foreground h-40 rounded-md p-5'>
                <div className='flex gap-2 justify-between h-full'>
                    <div className='flex-grow flex flex-col justify-center items-center gap-5'>
                        <p className='font-semibold text-slate-400'>Main story</p>
                        <p className='text-3xl'><CountUp delay={.25} duration={2.5} end={hltbData.gameplayMain}/>h</p>
                    </div>
                    <div className='separator w-[1px] h-full border-l border-l-secondary'></div>
                    <div className='flex-grow flex flex-col justify-center items-center gap-5'>
                        <p className='font-semibold text-slate-400'>Main + extras</p>
                        <p className='text-3xl'><CountUp delay={.25} duration={2.5} end={hltbData.gameplayMainExtra}/>h</p>
                    </div>
                    <div className='separator w-[1px] h-full border-l border-l-secondary'></div>
                    <div className='flex-grow flex flex-col justify-center items-center gap-5'>
                        <p className='font-semibold text-slate-400'>Completionist</p>
                        <p className='text-3xl'><CountUp delay={.25} duration={2.5} end={hltbData?.gameplayCompletionist}/>h</p>
                    </div>
                    { average ? <>
                        <div className='separator w-[1px] h-full border-l border-l-secondary'></div>
                        <div className='flex-grow flex flex-col justify-center items-center gap-5'>
                            <p className='font-semibold text-slate-400'>All styles</p>
                            <p className='text-3xl'><CountUp delay={.25} duration={2.5} end={+average}/>h</p>
                        </div>
                    </> : <></> }
                </div>
            </div>
        </div>
    </Section> : <></>
}

export default HowLongToBeat