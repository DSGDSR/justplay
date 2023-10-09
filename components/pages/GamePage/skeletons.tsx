import Skeleton from "@/components/Skeleton"

export const ThumbSkeleton = () => <div className="relative thumb-filter blur opacity-70">
    <Skeleton className="w-full h-[22rem] rounded-none" />
</div>

export const CoverSkeleton = () => <Skeleton className="w-full h-full" />