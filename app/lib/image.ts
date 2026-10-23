export async function coverImage(file: Blob, width: number, height: number, type: string, quality: number) {
    const bitmap = await createImageBitmap(file)
    const scale = Math.max(width / bitmap.width, height / bitmap.height)
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    context?.drawImage(
        bitmap,
        (width - bitmap.width * scale) / 2,
        (height - bitmap.height * scale) / 2,
        bitmap.width * scale,
        bitmap.height * scale,
    )
    bitmap.close()
    return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality))
}
