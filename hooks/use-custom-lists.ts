import { List } from '@/lib/models/lists'
import { useGlobalStore } from '@/lib/stores/global.store'
import { getLists } from '@/services/lists'
import { useState, useEffect } from 'react'

const useCustomLists = (userId: string) => {
    const [lists, setLists] = useState<List[]>([])
    const { lists: customLists, setLists: setCustomLists } = useGlobalStore()

    useEffect(() => {
        if (!userId) return

        if (customLists === null) {
            updateInternalLists(userId)
        } else {
            setLists(customLists)
            return
        }
    }, [])

    const updateInternalLists = (userId: string, callback?: () => void) => {
        getLists(userId).then(lists => {
            if (lists?.data) {
                setLists(lists.data)
                setCustomLists(lists.data)
            }
            callback?.()
        })
    }

    const updateCustomLists = (callback?: () => void) => {
        updateInternalLists(userId, callback)
    }

    return { customLists: lists, updateCustomLists }
}

export default useCustomLists