export const onImageError: React.ReactEventHandler<HTMLImageElement> = e => {
  const element = e.target as HTMLImageElement
  element.src = '/img_fallback.png'
}
