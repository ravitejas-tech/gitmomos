export function Backdrop({ grid = false }: { grid?: boolean }) {
    return (
        <div
            aria-hidden
            className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-[46rem]'>
            {grid && <div className='absolute inset-0 bg-grid-lines' />}
            <div className='absolute inset-0 bg-hero-glow' />
        </div>
    )
}
