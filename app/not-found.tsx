import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
          404
        </h1>
        <p className="text-lg text-gray-700 mb-8">ページが見つかりません</p>
        <Button href="/">ホームに戻る</Button>
      </div>
    </div>
  )
}
