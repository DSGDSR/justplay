'use client'

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
            <div className='bg-primary-foreground sm:h-28 md:h-40 rounded-md p-5 sm:p-4 md:p-5 flex gap-5 sm:gap-2 justify-between flex-wrap'>
                <HltbItem title="Main story" time={hltbData.gameplayMain}/>
                <HltbSeparator />
                <HltbItem title="Main + extras" time={hltbData.gameplayMainExtra}/>
                <HltbSeparator />
                <HltbItem title="Completionist" time={hltbData.gameplayCompletionist}/>
                { average ? <>
                    <HltbSeparator />
                    <HltbItem title="All styles" time={+average}/>
                </> : <></> }
            </div>
        </div>
    </Section> : <></>
}

const HltbSeparator = () => <div className='separator hidden sm:block w-[1px] h-full border-l border-l-secondary'></div>

const HltbItem = ({ title, time }: any) => <div style={{width: 'calc(50% - 1.25rem)'}} className='flex-grow sm:!w-auto flex flex-col justify-center items-center gap-1.5 md:gap-5'>
    <p className='text-sm md:text-base font-semibold text-slate-400'>{title}</p>
    <p className='text-2xl md:text-3xl'><CountUp delay={.25} duration={2.5} end={time}/>h</p>
</div>

export default HowLongToBeat