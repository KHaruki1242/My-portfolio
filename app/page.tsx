import Link from 'next/link';

const projects = [
  {
    id: "scheduler",
    title: "スケジューラー",
    description: "家計簿・カレンダー・運動量計測を統合した1日の管理ツール。",
    tech: ["PHP", "Laravel", "HTML/CSS"],
  },
  {
    id: "sakurazaka-db",
    title: "櫻坂46メンバーリスト",
    description: "メンバーと楽曲のデータベース。AWS(S3/RDS)を活用した本格構成。",
    tech: ["Java", "SQL", "AWS", "Eclipse"],
  },
  {
    id: "scraping",
    title: "ブログスクレイピング",
    description: "推しメンのブログ更新を自動で取得。TypeScriptで型安全に実装。",
    tech: ["TypeScript", "Google Apps Script"],
  },
  {
    id: "kakeibo-vba",
    title: "家計簿",
    description: "日々の収支をカレンダー形式で可視化するExcelツール。",
    tech: ["VBA", "Excel"],
  },
  // --- ここから追加 ---
  {
    id: "trend-news",
    title: "トレンド＆気象解析",
    description: "仙台のニュースと天気を自動収集し、ngrok経由でJavaサーバーへ送信する解析システム。",
    tech: ["Java", "GAS", "ngrok", "API連携"],
  },
  // --- ここまで ---
];

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">My Portfolio</h1>
          <p className="text-gray-600">IT Engineer / Specialist in Automation & Infrastructure</p>
        </header>
        
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id} className="block group">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 group-hover:shadow-md group-hover:border-blue-300 transition-all h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-blue-600 group-hover:text-blue-700">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] uppercase font-bold rounded-md border border-blue-100">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 余裕があればフッター的なリンクを置いておく */}
        <footer className="mt-16 text-center text-gray-400 text-sm">
          © 2026 My Portfolio - Developed with Next.js
        </footer>
      </div>
    </main>
  );
}