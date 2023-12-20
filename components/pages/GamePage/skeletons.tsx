import Skeleton from '@/components/Skeleton'

export const ThumbSkeleton = () => <div className="relative thumb-filter blur opacity-70">
    <Skeleton className="w-full h-[236px] sm:h-64 md:h-96 rounded-none" />
</div>

export const CoverSkeleton = () => <Skeleton className="w-full h-full rounded-md aspect-[9/12]" />
