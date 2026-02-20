import Link from 'next/link';

const projectDetails: Record<string, any> = {
  "scheduler": {
    title: "スケジューラー (Laravel)",
    fullDescription: "家計簿、カレンダー、そして運動記録を一つの画面で管理できる統合ツールです。",
    tech: ["PHP", "Laravel", "PostgreSQL", "Tailwind CSS"],
    points: ["MVCモデルに基づいた設計", "カレンダー表示ライブラリのカスタマイズ"],
  },
  "sakurazaka-db": {
    title: "櫻坂46メンバーリスト (Java/AWS)",
    fullDescription: "推し活を効率化するために作成。メンバー情報や楽曲データを一括管理。",
    tech: ["Java 17", "Spring Boot", "MySQL", "AWS (EC2, S3, RDS)"],
    points: ["AWS S3を利用した画像アップロード機能", "リレーショナルDBによるデータ管理"],
  },
  "scraping": {
    title: "ブログスクレイピング (GAS/TS)",
    fullDescription: "推しメンのブログ更新を毎分チェック。更新があれば即座に通知を受け取れるように設計しました。",
    tech: ["TypeScript", "Google Apps Script", "clasp"],
    points: ["Cheerioを用いた効率的なパース処理", "TypeScriptによる型安全な実装"],
  },
  "kakeibo-vba": {
    title: "家計簿 (VBA)",
    fullDescription: "Excel上で動作する家計簿ツールです。カレンダー形式での入力と、グラフによる収支の自動可視化を実現しました。",
    tech: ["VBA", "Excel"],
    points: ["ユーザーフォームによる直感的な入力", "ピボットテーブルと連動した自動グラフ生成"],
  },
};

// async を追加して、Promiseを待つように変更
export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  // ここで await して id を取り出す
  const { id } = await params;
  const project = projectDetails[id];

  if (!project) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">プロジェクト（ID: {id}）が見つかりません。</p>
        <Link href="/" className="text-blue-500 underline">トップへ戻る</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-white text-gray-900">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-blue-500 hover:text-blue-700">← 戻る</Link>
        <h1 className="text-3xl font-bold mt-6 mb-4">{project.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t: string) => (
            <span key={t} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{t}</span>
          ))}
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-100 pb-1">概要</h2>
          <p className="text-gray-700 leading-relaxed">{project.fullDescription}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-100 pb-1">こだわったポイント</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {project.points.map((point: string, i: number) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}