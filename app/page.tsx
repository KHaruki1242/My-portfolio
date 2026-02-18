// src/app/page.tsx
const projects = [
  {
    title: "スケジューラー (Laravel)",
    description: "家計簿・カレンダー・運動量計測を統合した1日の管理ツール。",
    tech: ["PHP", "Laravel", "HTML/CSS"],
  },
  {
    title: "櫻坂46メンバーリスト (Java/AWS)",
    description: "メンバーと楽曲のデータベース。AWS(S3/RDS)を活用した本格構成。",
    tech: ["Java", "SQL", "AWS", "Eclipse"],
  },
  {
    title: "ブログスクレイピング (GAS/TS)",
    description: "推しメンのブログ更新を自動で取得。TypeScriptで型安全に実装。",
    tech: ["TypeScript", "Google Apps Script"],
  },
  {
    title: "家計簿 (VBA)",
    description: "日々の収支をカレンダー形式で可視化するExcelツール。",
    tech: ["VBA", "Excel"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">My Portfolio</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-2 text-blue-600">{project.title}</h2>
              <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-100">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}