export function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
