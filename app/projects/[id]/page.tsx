import Link from 'next/link';

const projectDetails: Record<string, any> = {
  // スケジューラー (Laravel)
  "scheduler": {
    title: "スケジューラー (Laravel)",
    fullDescription: "家計簿、カレンダー、そして運動記録を一つの画面で管理できる統合ツールです。PHP/Laravelを用いたフルスクラッチ開発で、実用性を重視しました。",
    tech: ["PHP", "Laravel", "PostgreSQL", "Tailwind CSS"],
    points: ["MVCモデルに基づいた設計", "カレンダー表示ライブラリのカスタマイズ"],
    images: [
      "/images/laravel/①.png", "/images/laravel/②.png", "/images/laravel/③.png",
      "/images/laravel/④.png", "/images/laravel/⑤.png", "/images/laravel/⑥.png",
      "/images/laravel/⑦.png"
    ],
    github: "https://github.com/KHaruki1242/hello-laravel" // 通常のGitHubリンク
  },

  // メンバーリスト (Java/AWS)
  "sakurazaka-db": {
    title: "櫻坂46メンバーリスト (Java/AWS)",
    fullDescription: "推し活を効率化するために作成。メンバー情報や楽曲データを一括管理。AWS S3とRDS(MySQL)を連携させた「クラウド運用版」と、SQL Serverを用いた「ローカル開発版」の2つの構成で開発しました。",
    tech: ["Java 21", "Spring Boot", "MySQL / SQL Server", "AWS (EC2, S3, RDS)"],
    points: [
      "AWS S3連携: 画像メタデータとS3オブジェクトの動的マッピング",
      "複雑なSQL集計: STRING_AGGやJOINを用いたフォーメーション・選抜回数の自動集計",
      "マルチDB対応: 環境変数によるMySQL(AWS)とSQL Server(Local)の柔軟な切り替え"
    ],
    images: [
      "/images/Java/structure_sakura.png", 
      "/images/Java/DB①.png", "/images/Java/DB②.png", "/images/Java/DB③.png",
      "/images/Java/DB④.png", "/images/Java/DB⑤.png", "/images/Java/DB⑥.png", "/images/Java/DB⑦.png",
      "/images/Java/①.png", "/images/Java/②.png", "/images/Java/③.png",
      "/images/Java/④.png", "/images/Java/⑤.png"
    ],
    github: "https://github.com/KHaruki1242/SakuraService-", // AWS版のリポジトリ
    github_local: "https://github.com/KHaruki1242/SakuraService2", // 新しく作成したJava&SQL版リポジトリ
    code: `// SongService.java - STRING_AGGを用いた高度な集計SQL
@Service
public class SongService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getAllSongsWithMembers() {
        String sql = "SELECT s.id, s.title, s.release_date, s.single_number, " +
                     "STRING_AGG(m.member_name, ', ') WITHIN GROUP (ORDER BY m.member_name) as member_list " +
                     "FROM song_list s " +
                     "LEFT JOIN song_members sm ON s.id = sm.song_id " +
                     "LEFT JOIN members m ON sm.member_id = m.id " +
                     "GROUP BY s.id, s.title, s.release_date, s.single_number";
        return jdbcTemplate.queryForList(sql);
    }
}`
  },

  // スクレイピング (GAS)
  "scraping": {
    title: "ブログスクレイピング (GAS/TS)",
    fullDescription: "推しメンのブログ更新を毎分チェック。更新があれば即座にスプレッドシートへ記録し、通知を受け取れるように設計しました。",
    tech: ["TypeScript", "Google Apps Script", "clasp"],
    points: ["Cheerioを用いた効率的なパース処理", "TypeScriptによる型安全な実装", "トリガーによる定期実行の自動化"],
    images: ["/images/GAS/①.png"],
    link: "https://docs.google.com/spreadsheets/d/1iZeEO0-iypdu7CbrT96AMebsYGqjS4yGxOB4B7hc8Gg/edit?usp=sharing",
    github: "https://github.com/KHaruki1242/GAS_scraping"
  },

  // 家計簿 (VBA)
  "kakeibo-vba": {
    title: "家計簿 (VBA)",
    fullDescription: "Excel上で動作する家計簿ツールです。ユーザーフォームによる入力と、シートの自動複製機能を備えています。",
    tech: ["VBA", "Excel"],
    points: ["自作集計ロジックによる詳細な収支分析", "シートのバックアップとクリアの自動化"],
    images: ["/images/VBA/①.png"],
    github: "https://github.com/KHaruki1242/VBA_kakeibo"
  }
};

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projectDetails[id];
  if (!project) return <div className="p-8 text-center"><Link href="/">戻る</Link></div>;

  const structureImg = project.images.find((img: string) => img.includes("structure"));
  const dbImages = project.images.filter((img: string) => img.includes("DB"));
  const uiImages = project.images.filter((img: string) => !img.includes("DB") && !img.includes("structure"));

  return (
    <main className="min-h-screen p-8 bg-white text-gray-900">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-blue-500 hover:text-blue-700">← 戻る</Link>
        <h1 className="text-3xl font-bold mt-6 mb-4">{project.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t: string) => (
            <span key={t} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{t}</span>
          ))}
        </div>

        {/* 画像表示ロジック */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3 border-l-4 border-blue-500 pl-3">ギャラリー</h2>
          {id === 'sakurazaka-db' ? (
            <div className="space-y-8">
              {structureImg && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">システム構成図</p>
                  <div className="bg-white p-2 border rounded-xl shadow-sm"><img src={structureImg} className="w-full h-auto rounded-lg" /></div>
                </div>
              )}
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                {uiImages.concat(dbImages).map((img: string, i: number) => (
                  <div key={i} className="flex-shrink-0 w-80 bg-white p-2 border rounded-lg shadow-sm">
                    <img src={img} className="w-full h-auto rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
              {project.images.map((img: string, i: number) => (
                <div key={i} className="flex-shrink-0 w-80 bg-white p-2 border rounded-lg shadow-sm">
                  <img src={img} className="w-full h-auto rounded" />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mb-10 text-gray-700">
          <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-100 pb-1">概要</h2>
          <p className="leading-relaxed whitespace-pre-wrap">{project.fullDescription}</p>
        </section>

        {project.code && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-100 pb-1">主要ソースコード</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
              <code>{project.code}</code>
            </pre>
          </section>
        )}

        {/* ボタンエリア */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 mb-10">
          {id === 'sakurazaka-db' ? (
            <>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white px-6 py-3 rounded-full font-bold hover:bg-black transition-all text-center shadow-lg">
                GitHub (Java&AWS版)
              </a>
              <a href={project.github_local} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-all text-center shadow-lg">
                GitHub (Java&SQL版)
              </a>
            </>
          ) : (
            project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white px-6 py-3 rounded-full font-bold hover:bg-black transition-all text-center shadow-lg">
                GitHubでコードを見る
              </a>
            )
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition-all text-center shadow-lg">
              スプレッドシートを見る
            </a>
          )}
        </div>
      </div>
    </main>
  );
}